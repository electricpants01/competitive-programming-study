#include <algorithm>
#include <deque>
#include <iostream>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  string S, T;
  cin >> S >> T;

  const long long INF = (1LL << 60);
  vector<long long> dp(m + 1, INF);
  dp[0] = 0;

  // KMP occurrence ends of S in T
  vector<int> pi(n, 0);
  for (int i = 1; i < n; ++i) {
    int j = pi[i - 1];
    while (j > 0 && S[i] != S[j]) j = pi[j - 1];
    if (S[i] == S[j]) ++j;
    pi[i] = j;
  }
  vector<char> isEnd(m + 1, 0);
  int j = 0;
  for (int i = 0; i < m; ++i) {
    while (j > 0 && T[i] != S[j]) j = pi[j - 1];
    if (T[i] == S[j]) ++j;
    if (j == n) {
      isEnd[i + 1] = 1;
      j = pi[j - 1];
    }
  }

  deque<pair<long long, int>> dq;  // (dp[p]+p, p)
  for (int pos = 0; pos <= m; ++pos) {
    if (pos > 0) dp[pos] = min(dp[pos], dp[pos - 1] + 1);
    while (!dq.empty() && dq.front().second < pos - n) dq.pop_front();
    if (pos >= n && isEnd[pos] && !dq.empty()) {
      dp[pos] = min(dp[pos], dq.front().first - (pos - n));
    }
    if (dp[pos] < INF) {
      long long key = dp[pos] + pos;
      while (!dq.empty() && dq.back().first >= key) dq.pop_back();
      dq.push_back({key, pos});
    }
  }

  cout << dp[m] << '\n';
  return 0;
}
