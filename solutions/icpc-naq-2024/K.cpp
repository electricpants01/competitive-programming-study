#include <algorithm>
#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

int scoreDiff(long long diff) {
  if (diff < 0) diff = -diff;
  if (diff <= 15) return 7;
  if (diff <= 23) return 6;
  if (diff <= 43) return 4;
  if (diff <= 102) return 2;
  return 0;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  vector<long long> expected(n + 1), actual(m + 1);
  for (int i = 1; i <= n; ++i) cin >> expected[i];
  for (int j = 1; j <= m; ++j) cin >> actual[j];

  vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
  for (int i = 1; i <= n; ++i) {
    for (int j = 1; j <= m; ++j) {
      dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      const int gain = scoreDiff(expected[i] - actual[j]);
      if (gain > 0) {
        dp[i][j] = max(dp[i][j], dp[i - 1][j - 1] + gain);
      }
    }
  }

  cout << dp[n][m] << '\n';
}
