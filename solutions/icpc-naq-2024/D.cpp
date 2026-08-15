#include <iostream>
#include <map>
#include <utility>
#include <vector>
using namespace std;

using int64 = long long;

int n;
vector<int> color, total;
vector<vector<pair<int, int>>> adj;
vector<int64> answer;
vector<map<int, int>> maps;
vector<int64> f;

void mergeInto(int to, int from) {
  if (maps[to].size() < maps[from].size()) {
    maps[to].swap(maps[from]);
    swap(f[to], f[from]);
  }
  for (const auto& [col, cntFrom] : maps[from]) {
    const int64 oldCnt = maps[to][col];
    f[to] -= oldCnt * (total[col] - oldCnt);
    const int64 newCnt = oldCnt + cntFrom;
    maps[to][col] = static_cast<int>(newCnt);
    f[to] += newCnt * (total[col] - newCnt);
  }
  maps[from].clear();
}

void dfs(int u, int parent) {
  maps[u][color[u]] = 1;
  f[u] = total[color[u]] - 1;
  for (auto [v, edgeIndex] : adj[u]) {
    if (v == parent) continue;
    dfs(v, u);
    answer[edgeIndex] = f[v];
    mergeInto(u, v);
  }
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  cin >> n;
  color.assign(n + 1, 0);
  total.assign(n + 1, 0);
  for (int i = 1; i <= n; ++i) {
    cin >> color[i];
    ++total[color[i]];
  }

  adj.assign(n + 1, {});
  for (int i = 0; i < n - 1; ++i) {
    int a, b;
    cin >> a >> b;
    adj[a].push_back({b, i});
    adj[b].push_back({a, i});
  }

  answer.assign(n - 1, 0);
  maps.assign(n + 1, {});
  f.assign(n + 1, 0);

  dfs(1, 0);

  for (int64 value : answer) cout << value << '\n';
}
