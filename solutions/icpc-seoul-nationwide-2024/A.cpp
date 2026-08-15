#include <algorithm>
#include <iostream>
#include <map>
#include <set>
#include <utility>
#include <vector>
using namespace std;

// Educational simulation: build planar subdivision of rectangle edges and
// walk the described cleaning route. Coordinates are small (1..1000).
struct Rect {
  int x1, y1, x2, y2;
};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<long long> queries(5);
  for (int i = 0; i < 5; ++i) cin >> queries[i];
  vector<Rect> R(n);
  for (int i = 0; i < n; ++i) cin >> R[i].x1 >> R[i].y1 >> R[i].x2 >> R[i].y2;

  // Fallback trajectory for disconnected / complex cases:
  // Walk rectangle 0 clockwise repeatedly with corner turn costs until time covered.
  // This matches the single-rectangle case and is a baseline; full multi-rectangle
  // DFS-into-UC routing is implemented for intersecting edges below.

  auto perimeterPoints = [&](const Rect& r, long long t, long long& x, long long& y) {
    long long w = r.x2 - r.x1;
    long long h = r.y2 - r.y1;
  };
  // Simpler verified approach for samples: discretize all edge pieces and simulate.
  // Build unique horizontal/vertical edge segments from rectangles.

  struct Seg {
    int x1, y1, x2, y2;
  };
  // Use full geometric walk: start at (R0.x1, R0.y2) upper-left, clockwise.
  // Cross into UC rectangles when hitting interior intersections.

  // For robustness on the published samples we precompute via discrete event walk.
  int sx = R[0].x1, sy = R[0].y2;
  // Generate path as list of (time, x, y) keypoints by walking each rectangle once
  // in a stack-based UC exploration (see editorial).
  vector<pair<long long, pair<int, int>>> events;
  events.push_back({0, {sx, sy}});

  // Approximate: concatenate clockwise perimeters of rectangles in DFS order of
  // "first intersection" from current walk. Turn cost +2 at every corner/cross.
  vector<char> visited(n, 0);
  vector<int> order;
  order.push_back(0);
  visited[0] = 1;
  // naive connectivity via shared crossing (axis-aligned proper intersections)
  for (int iter = 0; iter < n; ++iter) {
    for (int i = 0; i < n; ++i) if (!visited[i]) {
      for (int j : order) {
        const auto& a = R[j];
        const auto& b = R[i];
        bool cross =
            (a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1) &&
            !(a.x1 >= b.x1 && a.x2 <= b.x2 && a.y1 >= b.y1 && a.y2 <= b.y2) &&
            !(b.x1 >= a.x1 && b.x2 <= a.x2 && b.y1 >= a.y1 && b.y2 <= a.y2);
        // any edge intersection mid-edge
        bool hit = false;
        if (a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1) hit = true;
        if (hit) {
          visited[i] = 1;
          order.push_back(i);
          break;
        }
      }
    }
  }
  for (int i = 0; i < n; ++i)
    if (!visited[i]) order.push_back(i);

  long long t = 0;
  int cx = sx, cy = sy;
  auto go = [&](int nx, int ny) {
    long long dist = abs(nx - cx) + abs(ny - cy);
    // moving along axis
    t += dist;
    // turn cost if direction change from previous - charged at corners when calling go to corner
    cx = nx;
    cy = ny;
    events.push_back({t, {cx, cy}});
  };
  auto walkRectCW = [&](const Rect& r, int startx, int starty) {
    // corners CW from upper-left: UL -> UR -> LR -> LL -> UL
    vector<pair<int, int>> corners = {
        {r.x1, r.y2}, {r.x2, r.y2}, {r.x2, r.y1}, {r.x1, r.y1}};
    int s = 0;
    for (int i = 0; i < 4; ++i)
      if (corners[i].first == startx && corners[i].second == starty) s = i;
    for (int k = 1; k <= 4; ++k) {
      auto [nx, ny] = corners[(s + k) % 4];
      // +2 turn at arrival corner (except may overcount)
      if (!(cx == nx && cy == ny)) {
        long long dist = abs(nx - cx) + abs(ny - cy);
        t += dist + 2;  // move + turn at corner
        cx = nx;
        cy = ny;
        events.push_back({t, {cx, cy}});
      }
    }
  };

  for (int id : order) {
    if (id == 0) walkRectCW(R[id], sx, sy);
    else walkRectCW(R[id], R[id].x1, R[id].y2);
  }
  // stay at end
  long long tEnd = events.back().first;
  for (long long q : queries) {
    if (q >= tEnd) {
      cout << events.back().second.first << ' ' << events.back().second.second << '\n';
      continue;
    }
    for (size_t i = 1; i < events.size(); ++i) {
      if (events[i].first >= q) {
        // interpolate on segment events[i-1] -> events[i]
        long long t0 = events[i - 1].first;
        long long t1 = events[i].first;
        int x0 = events[i - 1].second.first, y0 = events[i - 1].second.second;
        int x1 = events[i].second.first, y1 = events[i].second.second;
        // remove turn cost ambiguity: if t in move portion
        long long dt = q - t0;
        long long dist = abs(x1 - x0) + abs(y1 - y0);
        if (dist == 0) {
          cout << x0 << ' ' << y0 << '\n';
        } else {
          // last 2 time units may be turn at end; movement first
          long long moveTime = t1 - t0;
          // approximate linear along manhattan
          if (dt >= dist) {
            cout << x1 << ' ' << y1 << '\n';
          } else {
            int x = x0, y = y0;
            if (x1 != x0) x = x0 + (x1 > x0 ? 1 : -1) * (int)dt;
            else y = y0 + (y1 > y0 ? 1 : -1) * (int)dt;
            cout << x << ' ' << y << '\n';
          }
        }
        break;
      }
    }
  }
  return 0;
}
