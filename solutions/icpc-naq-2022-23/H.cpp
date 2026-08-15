#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  int64 s, k;
  cin >> n >> s >> k;
  vector<int64> x(n);
  for (int i = 0; i < n; ++i) cin >> x[i];
  sort(x.begin(), x.end());

  for (int i = 0; i + 1 < n; ++i) {
    if (x[i + 1] - x[i] < s) {
      cout << -1 << '\n';
      return 0;
    }
  }

  vector<int64> y(n, s);
  for (int i = 0; i < n; ++i) {
    int64 lim = k;
    if (i > 0) lim = min(lim, 2 * (x[i] - x[i - 1]) - y[i - 1]);
    if (i + 1 < n) lim = min(lim, 2 * (x[i + 1] - x[i]) - y[i + 1]);
    if (lim < s) {
      cout << -1 << '\n';
      return 0;
    }
    y[i] = lim;
  }

  int64 sum = 0;
  for (int64 v : y) sum += v;
  cout << sum << '\n';
}
