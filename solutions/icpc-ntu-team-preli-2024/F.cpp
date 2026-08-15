#include <cmath>
#include <iomanip>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n, m;
  cin >> n >> m;
  vector<double> p(n), q(n), d(n);
  for (int i = 0; i < n; ++i) cin >> p[i];
  for (int i = 0; i < n; ++i) cin >> q[i];
  for (int i = 0; i < n; ++i) cin >> d[i];
  vector<vector<pair<int, double>>> g(n);
  for (int i = 0; i < m; ++i) {
    int u, v;
    double w;
    cin >> u >> v >> w;
    --u;
    --v;
    g[u].push_back({v, w});
    g[v].push_back({u, w});
  }
  // DP over subset of "known full" stations: expected remaining time from station v
  // with mask of known-full stations. n<=18.
  const double INF = 1e100;
  int N = 1 << n;
  vector<vector<double>> dp(N, vector<double>(n, INF));
  for (int mask = 0; mask < N; ++mask) {
    // value iteration / Bellman for this mask
    for (int iter = 0; iter < 60; ++iter) {
      for (int v = 0; v < n; ++v) {
        double best = INF;
        // wait here
        if (mask & (1 << v)) best = min(best, q[v] + d[v]);
        else {
          // observe: with p succeed immediately, else choose wait or mark full and leave
          double succ = p[v] * d[v];
          double failWait = (1 - p[v]) * (q[v] + d[v]);
          double failLeave = INF;
          int nmask = mask | (1 << v);
          for (auto [to, w] : g[v]) failLeave = min(failLeave, w + dp[nmask][to]);
          if (failLeave >= INF / 2) failLeave = 1e50;
          best = min(best, succ + failWait);
          best = min(best, succ + (1 - p[v]) * failLeave);
          // also can skip observe and just leave to neighbor / or wait without observe?
          // problem allows not observing — then cannot return immediately via p.
          for (auto [to, w] : g[v]) best = min(best, w + dp[mask][to]);
          best = min(best, q[v] + d[v]);  // wait without success chance?
        }
        dp[mask][v] = best;
      }
    }
  }
  cout << fixed << setprecision(12) << dp[0][0] << '\n';
  return 0;
}
