#include <iostream>
#include <numeric>
using namespace std;

using int64 = long long;

// Spidey reachability: orth steps cost 1, diagonal steps cost 1.5.
// Equivalent to 2 * max(|x|,|y|) + min(|x|,|y|) <= 2 * s.
bool spideyOk(int64 x, int64 y, int64 s) {
  x = x < 0 ? -x : x;
  y = y < 0 ? -y : y;
  const int64 mx = x > y ? x : y;
  const int64 mn = x < y ? x : y;
  return 2 * mx + mn <= 2 * s;
}

int64 maxSpideyY(int64 x, int64 s) {
  // Largest y >= 0 with spideyOk(x, y, s). Assumes 0 <= x <= s.
  int64 lo = 0;
  int64 hi = s;
  int64 ans = -1;
  while (lo <= hi) {
    const int64 mid = (lo + hi) / 2;
    if (spideyOk(x, mid, s)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int64 t, s;
  cin >> t >> s;

  int64 spideyPoints = 0;
  int64 bothPoints = 0;

  for (int64 x = -s; x <= s; ++x) {
    const int64 maxY = maxSpideyY(x < 0 ? -x : x, s);
    if (maxY < 0) continue;
    spideyPoints += 2 * maxY + 1;

    const int64 ax = x < 0 ? -x : x;
    if (ax > t) continue;
    const int64 lim = maxY < (t - ax) ? maxY : (t - ax);
    bothPoints += 2 * lim + 1;
  }

  const int64 g = std::gcd(bothPoints, spideyPoints);
  bothPoints /= g;
  spideyPoints /= g;

  if (spideyPoints == 1) {
    cout << bothPoints << '\n';
  } else {
    cout << bothPoints << '/' << spideyPoints << '\n';
  }
}
