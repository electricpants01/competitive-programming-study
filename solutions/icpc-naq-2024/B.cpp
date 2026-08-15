#include <algorithm>
#include <cmath>
#include <iomanip>
#include <iostream>
#include <limits>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  double best = numeric_limits<double>::infinity();

  for (int i = 0; i < n; ++i) {
    double x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    // Segment crosses the Y-axis only when endpoints have opposite x signs.
    if (x1 * x2 >= 0) continue;
    const double t = -x1 / (x2 - x1);
    const double y = y1 + t * (y2 - y1);
    if (y > 0) best = min(best, y);
  }

  cout << fixed << setprecision(10);
  if (!isfinite(best)) {
    cout << -1.0 << '\n';
  } else {
    cout << best << '\n';
  }
}
