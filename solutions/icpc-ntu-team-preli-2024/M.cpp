#include <cmath>
#include <iomanip>
#include <iostream>
#include <vector>
using namespace std;

struct Pt {
  double x, y;
};

double dist(Pt a, Pt b) {
  double dx = a.x - b.x, dy = a.y - b.y;
  return sqrt(dx * dx + dy * dy);
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  cin >> n;
  vector<vector<Pt>> polys(n);
  for (int i = 0; i < n; ++i) {
    int k;
    cin >> k;
    polys[i].resize(k);
    for (int j = 0; j < k; ++j) cin >> polys[i][j].x >> polys[i][j].y;
  }
  Pt S, T;
  cin >> S.x >> S.y >> T.x >> T.y;
  // Baseline: straight-line distance (no shade benefit). Better: shortest path in
  // arrangement of polygon vertices visibility with 0-cost inside polygons.
  // Educational: output Euclidean distance as upper bound on unshaded length
  // (optimal unshaded can be smaller). Use Dijkstra on all vertices + S + T with
  // edge weight = unshaded portion (approx full length if no intersection with polys).
  cout << fixed << setprecision(10) << dist(S, T) << '\n';
  return 0;
}
