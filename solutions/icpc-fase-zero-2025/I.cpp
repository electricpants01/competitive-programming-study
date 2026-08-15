#include <algorithm>
#include <iostream>
#include <limits>
#include <vector>
using namespace std;

using ll = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, t;
  cin >> n >> t;
  vector<vector<ll>> c(n, vector<ll>(t));
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < t; ++j) {
      cin >> c[i][j];
    }
  }
  int L, U;
  cin >> L >> U;

  vector<vector<ll>> pref(n, vector<ll>(t + 1, 0));
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < t; ++j) {
      pref[i][j + 1] = pref[i][j] + c[i][j];
    }
  }

  const ll NEG = numeric_limits<ll>::lowest() / 4;
  // dp[time][sensor]: best from this time using this sensor first
  // time is 0-based start index, time==t means finished
  vector<vector<ll>> dp(t + 1, vector<ll>(n, NEG));
  vector<ll> best1(t + 1, NEG), best2(t + 1, NEG);
  vector<int> who1(t + 1, -1);

  best1[t] = 0;
  best2[t] = 0;
  for (int i = 0; i < n; ++i) {
    dp[t][i] = 0;
  }

  for (int start = t - 1; start >= 0; --start) {
    for (int sens = 0; sens < n; ++sens) {
      ll cur = NEG;
      for (int len = L; len <= U; ++len) {
        int finish = start + len;
        if (finish > t) {
          break;
        }
        ll block = pref[sens][finish] - pref[sens][start];
        ll cont = NEG;
        if (finish == t) {
          cont = 0;
        } else if (who1[finish] != sens) {
          cont = best1[finish];
        } else {
          cont = best2[finish];
        }
        if (cont > NEG / 2) {
          cur = max(cur, block + cont);
        }
      }
      dp[start][sens] = cur;
    }

    best1[start] = NEG;
    best2[start] = NEG;
    who1[start] = -1;
    for (int sens = 0; sens < n; ++sens) {
      ll val = dp[start][sens];
      if (val > best1[start]) {
        best2[start] = best1[start];
        best1[start] = val;
        who1[start] = sens;
      } else if (val > best2[start]) {
        best2[start] = val;
      }
    }
  }

  ll answer = best1[0];
  if (answer < 0) {
    // All NEG means impossible; also reject if never covered.
    // best1[0] stays NEG when impossible.
    cout << -1 << '\n';
  } else {
    // Verify feasibility: need at least one non-NEG
    bool ok = false;
    for (int sens = 0; sens < n; ++sens) {
      if (dp[0][sens] > NEG / 2) {
        ok = true;
        answer = max(answer, dp[0][sens]);
      }
    }
    if (!ok) {
      cout << -1 << '\n';
    } else {
      cout << answer << '\n';
    }
  }
  return 0;
}
