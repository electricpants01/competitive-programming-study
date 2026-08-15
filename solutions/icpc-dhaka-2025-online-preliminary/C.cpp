#include <cstdint>
#include <functional>
#include <iostream>
#include <vector>
using namespace std;

constexpr int MOD = 998244353;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int testCases;
  cin >> testCases;
  while (testCases--) {
    int n;
    cin >> n;
    vector<vector<int>> graph(n);
    for (int i = 1; i < n; ++i) {
      int u, v;
      cin >> u >> v;
      --u;
      --v;
      graph[u].push_back(v);
      graph[v].push_back(u);
    }

    vector<vector<int>> children(n);
    vector<int> subtreeMask(n);
    function<void(int, int)> buildTree = [&](int u, int parent) {
      subtreeMask[u] = 1 << u;
      for (int v : graph[u]) {
        if (v == parent) continue;
        children[u].push_back(v);
        buildTree(v, u);
        subtreeMask[u] |= subtreeMask[v];
      }
    };
    buildTree(0, -1);

    vector<int> postorder;
    function<void(int)> buildOrder = [&](int u) {
      for (int child : children[u]) buildOrder(child);
      postorder.push_back(u);
    };
    buildOrder(0);

    const int maskCount = 1 << n;
    vector<vector<int>> dp(n, vector<int>(maskCount));

    for (int u : postorder) {
      for (int forbidden = maskCount - 1; forbidden >= 0; --forbidden) {
        int64_t ways = 0;
        for (int image = 0; image < n; ++image) {
          if (forbidden & (1 << image)) continue;
          int nextForbidden = forbidden | subtreeMask[image];
          int64_t current = 1;
          for (int child : children[u]) {
            current = current * dp[child][nextForbidden] % MOD;
          }
          ways += current;
          if (ways >= MOD) ways -= MOD;
        }
        dp[u][forbidden] = static_cast<int>(ways);
      }
    }

    cout << dp[0][0] << '\n';
  }
}
