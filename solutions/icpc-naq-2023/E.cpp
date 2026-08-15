#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> a(n + 1), b(n + 1);
  for (int i = 1; i <= n; ++i) cin >> a[i] >> b[i];

  auto valid = [&](int i, int j, int k) -> bool {
    // Ranks i < j < k must each accept the other two.
    if (j < a[i] || j > b[i] || k < a[i] || k > b[i]) return false;
    if (i < a[j] || i > b[j] || k < a[j] || k > b[j]) return false;
    if (i < a[k] || i > b[k] || j < a[k] || j > b[k]) return false;
    return true;
  };

  // dp[i] = max teams using a subset of people 1..i
  vector<int> dp(n + 1, 0);
  for (int i = 1; i <= n; ++i) {
    dp[i] = dp[i - 1];
    for (int x = 1; x <= i - 2; ++x) {
      for (int y = x + 1; y <= i - 1; ++y) {
        if (valid(x, y, i)) {
          dp[i] = max(dp[i], dp[x - 1] + 1);
        }
      }
    }
  }

  cout << dp[n] << '\n';
}
