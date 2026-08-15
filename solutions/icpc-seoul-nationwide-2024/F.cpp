#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

struct Pt {
  double x, y;
};

Pt onCircle(int idx) {
  const double ang = idx * (2.0 * acos(-1.0) / 3600.0);
  return {cos(ang), sin(ang)};
}

int side(Pt a, Pt b, Pt p) {
  double cross = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
  return cross > 0 ? 1 : 0;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<pair<int, int>> chords(n);
  for (int i = 0; i < n; ++i) cin >> chords[i].first >> chords[i].second;

  auto color = [&](int dir, int dist) {
    double r = dist / 1000.0;
    Pt p = onCircle(dir);
    p.x *= r;
    p.y *= r;
    int c = 0;
    for (auto [u, v] : chords) {
      Pt a = onCircle(u), b = onCircle(v);
      c ^= side(a, b, p);
    }
    return c;
  };

  int d1, r1, d2, r2;
  cin >> d1 >> r1 >> d2 >> r2;
  cout << (color(d1, r1) == color(d2, r2) ? "YES" : "NO") << '\n';
  return 0;
}
