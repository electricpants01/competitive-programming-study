#include <algorithm>
#include <cstdlib>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<long long> x(n), y(n);
  for (int i = 0; i < n; ++i) cin >> x[i] >> y[i];

  constexpr long long INF = (1LL << 62);
  long long lo = 1;
  long long hi = INF;
  long long c = 0;

  for (int i = 1; i <= n; ++i) {
    if (i & 1) lo = max(lo, 1 - c);
    else hi = min(hi, c - 1);

    if (i < n) {
      long long d = abs(x[i - 1] - x[i]) + abs(y[i - 1] - y[i]);
      c = d - c;
    }
  }

  if (lo <= hi) cout << hi << '\n';
  else cout << -1 << '\n';
}
