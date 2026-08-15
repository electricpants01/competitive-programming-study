#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

int ask(int x1, int y1, int x2, int y2) {
  cout << "? " << x1 << ' ' << y1 << ' ' << x2 << ' ' << y2 << endl;
  string s;
  if (!(cin >> s)) exit(0);
  if (s == "infinity") return 3;
  return stoi(s);
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  // Recover approximate supporting lines on a coarse angular sweep.
  // For each direction, binary-search the tangent offset among integer lines.
  const int B = 1024;
  vector<pair<double, double>> hull;
  const int RAYS = 360;
  for (int k = 0; k < RAYS; ++k) {
    double ang = 2.0 * acos(-1.0) * k / RAYS;
    double dx = cos(ang), dy = sin(ang);
    // binary search farthest point of polygon along direction via line intersections
    int lo = -B * 2, hi = B * 2;
    while (lo < hi) {
      int mid = (lo + hi + 1) / 2;
      // line perpendicular to (dx,dy) at offset mid
      int x1 = (int)lround(mid * dx - dy * 10);
      int y1 = (int)lround(mid * dy + dx * 10);
      int x2 = (int)lround(mid * dx + dy * 10);
      int y2 = (int)lround(mid * dy - dx * 10);
      if (x1 == x2 && y1 == y2) ++x2;
      int hit = ask(x1, y1, x2, y2);
      // 0 means line misses polygon on the far side heuristic — coarse
      if (hit == 0) hi = mid - 1;
      else lo = mid;
    }
    hull.push_back({lo * dx, lo * dy});
  }
  // Shoelace on sampled hull
  double area = 0;
  int m = (int)hull.size();
  for (int i = 0; i < m; ++i) {
    auto [x1, y1] = hull[i];
    auto [x2, y2] = hull[(i + 1) % m];
    area += x1 * y2 - x2 * y1;
  }
  area = fabs(area) / 2.0;
  cout << "! " << area << endl;
  string verdict;
  cin >> verdict;
  return 0;
}
