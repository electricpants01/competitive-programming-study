#include <algorithm>
#include <cmath>
#include <iomanip>
#include <iostream>
#include <vector>
using namespace std;

// Antiderivative of sqrt(r^2 - x^2).
double antiSqrt(double x, double r) {
  x = max(-r, min(r, x));
  const double s = sqrt(max(0.0, r * r - x * x));
  return 0.5 * (x * s + r * r * asin((r == 0) ? 0.0 : x / r));
}

// Exact area of disk (origin, r) ∩ rectangle [x1, x2] × [y1, y2].
double circleRectIntersection(double r, double x1, double x2, double y1, double y2) {
  if (r <= 0) return 0.0;
  const double L = max(x1, -r);
  const double R = min(x2, r);
  if (L >= R) return 0.0;

  vector<double> xs = {L, R};
  auto addX = [&](double x) {
    if (x > L + 1e-15 && x < R - 1e-15) xs.push_back(x);
  };
  auto addBreakForY = [&](double y) {
    if (fabs(y) > r) return;
    const double dx = sqrt(max(0.0, r * r - y * y));
    addX(-dx);
    addX(dx);
  };
  addBreakForY(y1);
  addBreakForY(y2);

  sort(xs.begin(), xs.end());
  xs.erase(unique(xs.begin(), xs.end(),
                  [](double a, double b) { return fabs(a - b) < 1e-14; }),
           xs.end());

  double area = 0.0;
  for (size_t i = 0; i + 1 < xs.size(); ++i) {
    const double a = xs[i];
    const double b = xs[i + 1];
    if (b - a <= 1e-15) continue;

    const double mid = 0.5 * (a + b);
    const double s = sqrt(max(0.0, r * r - mid * mid));
    const double lo = max(y1, -s);
    const double hi = min(y2, s);
    if (hi <= lo) continue;

    const bool topOnCircle = (y2 >= s - 1e-12);
    const bool botOnCircle = (y1 <= -s + 1e-12);
    const double dF = antiSqrt(b, r) - antiSqrt(a, r);

    if (topOnCircle && botOnCircle) {
      area += 2.0 * dF;
    } else if (topOnCircle) {
      // [-bound, s] where bound = y1 (and y1 > -s)
      area += dF - y1 * (b - a);
    } else if (botOnCircle) {
      // [-s, y2]
      area += dF + y2 * (b - a);
    } else {
      area += (hi - lo) * (b - a);
    }
  }
  return area;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, r, w, h;
  cin >> n >> r >> w >> h;

  const double totalArea = static_cast<double>(w) * static_cast<double>(h);
  double expected = 0.0;

  for (int i = 0; i < n; ++i) {
    int x, y, v;
    cin >> x >> y >> v;
    const double area = circleRectIntersection(
        static_cast<double>(r),
        -static_cast<double>(x),
        static_cast<double>(w - x),
        -static_cast<double>(y),
        static_cast<double>(h - y));
    expected += v * (area / totalArea);
  }

  cout << fixed << setprecision(15) << expected << '\n';
}
