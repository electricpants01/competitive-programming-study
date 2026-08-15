#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  double x1, y1, x2, y2, a;
  cin >> x1 >> y1 >> x2 >> y2 >> a;

  const double cx = 0.5 * (x1 + x2);
  const double cy = 0.5 * (y1 + y2);
  const double dx = x2 - x1;
  const double dy = y2 - y1;
  const double dist = hypot(dx, dy);
  const double A = a / 2.0;          // semi-major
  const double c = dist / 2.0;       // linear eccentricity
  const double B = sqrt(max(0.0, A * A - c * c));  // semi-minor

  double cosTheta = 1.0;
  double sinTheta = 0.0;
  if (dist > 0) {
    cosTheta = dx / dist;
    sinTheta = dy / dist;
  }

  // Axis-aligned extents of a rotated ellipse.
  const double halfWidth = sqrt(A * A * cosTheta * cosTheta + B * B * sinTheta * sinTheta);
  const double halfHeight = sqrt(A * A * sinTheta * sinTheta + B * B * cosTheta * cosTheta);

  cout << fixed << setprecision(10)
       << (cx - halfWidth) << ' ' << (cy - halfHeight) << ' '
       << (cx + halfWidth) << ' ' << (cy + halfHeight) << '\n';
}
