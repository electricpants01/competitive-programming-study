#include <algorithm>
#include <iostream>
#include <numeric>
#include <random>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n, m;
  cin >> n >> m;
  vector<int> a(n);
  for (int i = 0; i < n; ++i) cin >> a[i];
  vector<pair<int, int>> edges(m);
  for (int i = 0; i < m; ++i) {
    cin >> edges[i].first >> edges[i].second;
    --edges[i].first;
    --edges[i].second;
  }

  mt19937 rng(249);
  vector<int> best;
  vector<int> order(m);
  iota(order.begin(), order.end(), 0);

  for (int trial = 0; trial < 4000; ++trial) {
    shuffle(order.begin(), order.end(), rng);
    vector<int> deg(n, 0), cur;
    for (int id : order) {
      int u = edges[id].first, v = edges[id].second;
      if (deg[u] < a[u] && deg[v] < a[v]) {
        cur.push_back(id);
        ++deg[u];
        ++deg[v];
      }
    }
    // local improve: try add any missing
    bool changed = true;
    while (changed) {
      changed = false;
      for (int id = 0; id < m; ++id) {
        if (find(cur.begin(), cur.end(), id) != cur.end()) continue;
        int u = edges[id].first, v = edges[id].second;
        if (deg[u] < a[u] && deg[v] < a[v]) {
          cur.push_back(id);
          ++deg[u];
          ++deg[v];
          changed = true;
        }
      }
      // try swap one out for two in — skip for speed
    }
    if (cur.size() > best.size()) best = cur;
  }

  cout << best.size() << '\n';
  for (size_t i = 0; i < best.size(); ++i) {
    if (i) cout << ' ';
    cout << best[i] + 1;
  }
  cout << '\n';
  return 0;
}
