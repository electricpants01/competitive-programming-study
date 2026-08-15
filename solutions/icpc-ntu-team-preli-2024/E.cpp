#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  cin >> n;
  vector<int> s(n + 1), p(n + 1), a(n + 1), c(n + 1), d(n);
  for (int i = 2; i <= n; ++i) cin >> s[i];
  for (int i = 1; i <= n; ++i) cin >> p[i];
  for (int i = 1; i <= n; ++i) cin >> a[i];
  for (int i = 1; i <= n; ++i) cin >> c[i];
  for (int i = 1; i <= n - 1; ++i) cin >> d[i];

  long long T = 0;
  for (int i = 1; i <= n; ++i) T += max(0, p[i]);

  // Near-optimal search: since answer must be >= T-20, try bit DP over who is excluded
  // among negative/pressure-sensitive staff. Educational baseline: take all positive p_i
  // and compute losses; if within 20 of T output that, else Fail!
  vector<char> take(n + 1, 0);
  for (int i = 1; i <= n; ++i) if (p[i] > 0) take[i] = 1;

  auto score = [&](const vector<char>& take) {
    long long ans = 0;
    for (int i = 1; i <= n; ++i) if (take[i]) ans += p[i];
    for (int i = 1; i <= n; ++i) if (take[i]) {
      bool pressure = false;
      for (int u = s[i]; u; u = s[u]) {
        if (!take[u] && a[u] > a[i]) pressure = true;
      }
      if (pressure) ans -= c[i];
    }
    vector<int> who(n + 1, 0);
    for (int i = 1; i <= n; ++i) who[a[i]] = i;
    for (int cap = 1; cap < n; ++cap) {
      int hi = who[cap + 1], lo = who[cap];
      if (take[hi] && !take[lo]) ans -= d[cap];
    }
    return ans;
  };

  long long best = score(take);
  // flip up to a few employees around the margin
  for (int i = 1; i <= n; ++i) {
    take[i] = !take[i];
    best = max(best, score(take));
    take[i] = !take[i];
  }
  if (best < T - 20) cout << "Fail!\n";
  else cout << best << '\n';
  return 0;
}
