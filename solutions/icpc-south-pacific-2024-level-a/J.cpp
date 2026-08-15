#include <algorithm>
#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

struct Point {
  int64 x, y;
  bool operator<(const Point& other) const {
    return x < other.x || (x == other.x && y < other.y);
  }
  bool operator==(const Point& other) const { return x == other.x && y == other.y; }
};

int64 cross(const Point& a, const Point& b, const Point& c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

int64 cross2(const Point& a, const Point& b) { return a.x * b.y - a.y * b.x; }

vector<Point> convexHull(vector<Point> pts) {
  sort(pts.begin(), pts.end());
  pts.erase(unique(pts.begin(), pts.end()), pts.end());
  const int n = static_cast<int>(pts.size());
  if (n <= 1) return pts;
  vector<Point> lower, upper;
  for (int i = 0; i < n; ++i) {
    while (lower.size() >= 2 &&
           cross(lower[lower.size() - 2], lower.back(), pts[i]) <= 0) {
      lower.pop_back();
    }
    lower.push_back(pts[i]);
  }
  for (int i = n - 1; i >= 0; --i) {
    while (upper.size() >= 2 &&
           cross(upper[upper.size() - 2], upper.back(), pts[i]) <= 0) {
      upper.pop_back();
    }
    upper.push_back(pts[i]);
  }
  lower.pop_back();
  upper.pop_back();
  lower.insert(lower.end(), upper.begin(), upper.end());
  return lower;
}

int64 shoelace2(const vector<Point>& poly) {
  int64 sum = 0;
  const int n = static_cast<int>(poly.size());
  for (int i = 0; i < n; ++i) {
    sum += cross2(poly[i], poly[(i + 1) % n]);
  }
  return sum;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<Point> pts(n);
  for (int i = 0; i < n; ++i) cin >> pts[i].x >> pts[i].y;

  vector<Point> hull = convexHull(pts);
  const int h = static_cast<int>(hull.size());
  const int64 oldSigned = shoelace2(hull);
  int64 best = abs(oldSigned);

  for (int i = 0; i < h; ++i) {
    const Point& prev = hull[(i - 1 + h) % h];
    const Point& cur = hull[i];
    const Point& next = hull[(i + 1) % h];
    const int64 removed = cross2(prev, cur) + cross2(cur, next);
    const int64 base = oldSigned - removed;
    // newSigned = base + cross2(prev, p) + cross2(p, next)
    //           = base + prev.x*p.y - prev.y*p.x + p.x*next.y - p.y*next.x
    //           = base + p.x*(next.y - prev.y) + p.y*(prev.x - next.x)
    const int64 ax = next.y - prev.y;
    const int64 ay = prev.x - next.x;

    for (const Point& p : pts) {
      if (p == cur) continue;
      const int64 signedArea = base + p.x * ax + p.y * ay;
      best = min(best, abs(signedArea));
      if (best == 0) {
        cout << 0 << '\n';
        return 0;
      }
    }
  }

  cout << best << '\n';
}
