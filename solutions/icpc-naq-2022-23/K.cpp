#include <algorithm>
#include <iostream>
#include <limits>
#include <vector>
using namespace std;

using int64 = long long;

vector<int64> applyOps(int64 x, int64 y) {
  vector<int64> result;
  result.push_back(x + y);
  result.push_back(x - y);
  result.push_back(x * y);
  if (y != 0 && x % y == 0) result.push_back(x / y);
  return result;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int64 a, b, c;
  cin >> a >> b >> c;

  int64 best = numeric_limits<int64>::max();
  for (int64 mid : applyOps(a, b)) {
    for (int64 val : applyOps(mid, c)) {
      if (val >= 0) best = min(best, val);
    }
  }
  cout << best << '\n';
}
