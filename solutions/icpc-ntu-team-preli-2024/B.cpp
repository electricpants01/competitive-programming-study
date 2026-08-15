#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool better(const string& s, int i, int j) {
  int n = (int)s.size();
  int len = j - i;
  int k = 0;
  while (k < len && j + k < n && s[i + k] == s[j + k]) ++k;
  if (k == len) return false;
  if (j + k >= n) return false;
  return s[i + k] < s[j + k];
}

int solve(const string& s) {
  int n = (int)s.size();
  vector<int> dp(n + 1, 1);
  for (int i = n - 1; i >= 0; --i) {
    int best = 1;
    for (int j = i + 1; j < n; ++j) {
      if (better(s, i, j)) best = max(best, 1 + dp[j]);
    }
    dp[i] = best;
  }
  return dp[0];
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int T;
  cin >> T;
  while (T--) {
    string s;
    cin >> s;
    cout << solve(s) << '\n';
  }
  return 0;
}
