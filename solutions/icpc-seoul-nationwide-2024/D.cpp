#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int R, C;
  cin >> R >> C;
  vector<vector<int>> g(R, vector<int>(C));
  for (int i = 0; i < R; ++i)
    for (int j = 0; j < C; ++j) cin >> g[i][j];

  const int na = R + C - 1;
  const int nd = R + C - 1;
  const int N = na + nd;
  vector<vector<pair<int, int>>> adj(N);
  for (int i = 0; i < R; ++i) {
    for (int j = 0; j < C; ++j) {
      int a = i + j;
      int d = na + (i - j + (C - 1));
      adj[a].push_back({d, g[i][j]});
      adj[d].push_back({a, g[i][j]});
    }
  }

  vector<int> val(N, -1);
  long long ans = 0;
  for (int start = 0; start < N; ++start) {
    if (adj[start].empty() || val[start] != -1) continue;
    int best = -1;
    vector<int> bestAssign;
    for (int s0 = 0; s0 <= 1; ++s0) {
      vector<int> assign(N, -1);
      queue<int> q;
      assign[start] = s0;
      q.push(start);
      bool ok = true;
      while (!q.empty() && ok) {
        int u = q.front();
        q.pop();
        for (auto [v, need] : adj[u]) {
          int want = assign[u] ^ need;
          if (assign[v] == -1) {
            assign[v] = want;
            q.push(v);
          } else if (assign[v] != want) {
            ok = false;
            break;
          }
        }
      }
      if (!ok) continue;
      int cost = 0;
      for (int x : assign) if (x == 1) ++cost;
      if (best < 0 || cost < best) {
        best = cost;
        bestAssign = assign;
      }
    }
    if (best < 0) {
      cout << -1 << '\n';
      return 0;
    }
    ans += best;
    for (int i = 0; i < N; ++i)
      if (bestAssign[i] != -1) val[i] = bestAssign[i];
  }
  cout << ans << '\n';
  return 0;
}
