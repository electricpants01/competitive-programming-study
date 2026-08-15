#include <algorithm>
#include <cstdint>
#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

struct Point {
  int64 x;
  int64 y;
};

int half(const Point& point) {
  return point.y > 0 || (point.y == 0 && point.x > 0) ? 0 : 1;
}

int64 cross(const Point& a, const Point& b) {
  return a.x * b.y - a.y * b.x;
}

int64 maximumForCafe(const Point& cafe, const vector<Point>& landmarks) {
  int m = static_cast<int>(landmarks.size());
  vector<Point> direction(m);
  for (int i = 0; i < m; ++i) {
    direction[i] = {landmarks[i].x - cafe.x, landmarks[i].y - cafe.y};
  }

  sort(direction.begin(), direction.end(), [](const Point& a, const Point& b) {
    if (half(a) != half(b)) return half(a) < half(b);
    return cross(a, b) > 0;
  });

  vector<int64> constantDifference(2 * m + 1);
  vector<int64> slopeDifference(2 * m + 1);
  int right = 1;

  for (int left = 0; left < m; ++left) {
    right = max(right, left + 1);
    while (right < left + m &&
           cross(direction[left], direction[right % m]) > 0) {
      ++right;
    }

    int count = right - left - 1;
    if (count == 0) continue;
    int rangeLeft = left;
    int rangeRight = left + count - 1;
    int64 constant = count + left;

    constantDifference[rangeLeft] += constant;
    constantDifference[rangeRight + 1] -= constant;
    slopeDifference[rangeLeft] -= 1;
    slopeDifference[rangeRight + 1] += 1;
  }

  vector<int64> coverage(m);
  int64 constant = 0;
  int64 slope = 0;
  for (int position = 0; position < 2 * m; ++position) {
    constant += constantDifference[position];
    slope += slopeDifference[position];
    coverage[position % m] += constant + slope * position;
  }

  return *max_element(coverage.begin(), coverage.end());
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int testCases;
  cin >> testCases;
  while (testCases--) {
    int n, m;
    cin >> n >> m;
    vector<Point> cafes(n), landmarks(m);
    for (Point& cafe : cafes) cin >> cafe.x >> cafe.y;
    for (Point& landmark : landmarks) cin >> landmark.x >> landmark.y;

    int64 answer = 0;
    for (const Point& cafe : cafes) {
      answer = max(answer, maximumForCafe(cafe, landmarks));
    }
    cout << answer << '\n';
  }
}
