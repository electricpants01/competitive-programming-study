#include <iostream>
#include <vector>
using namespace std;

using ll = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> a(n);
  for (int& value : a) {
    cin >> value;
  }

  constexpr int OFFSET = 4000;
  constexpr int SIZE = 8001;
  vector<vector<ll>> dp(5, vector<ll>(SIZE, 0));
  dp[0][OFFSET] = 1;

  for (int value : a) {
    vector<vector<ll>> next = dp;
    for (int k = 0; k < 4; ++k) {
      for (int sum = 0; sum < SIZE; ++sum) {
        if (dp[k][sum] == 0) {
          continue;
        }
        int nxt = sum + value;
        if (0 <= nxt && nxt < SIZE) {
          next[k + 1][nxt] += dp[k][sum];
        }
      }
    }
    dp.swap(next);
  }

  int q;
  cin >> q;
  while (q--) {
    int target;
    cin >> target;
    int idx = target + OFFSET;
    if (idx < 0 || idx >= SIZE) {
      cout << 0 << '\n';
    } else {
      cout << dp[4][idx] << '\n';
    }
  }
  return 0;
}
