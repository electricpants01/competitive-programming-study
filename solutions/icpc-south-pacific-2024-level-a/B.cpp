#include <algorithm>
#include <iostream>
using namespace std;

using int64 = long long;

int digitSumInBase(int64 value, int base) {
  int sum = 0;
  while (value > 0) {
    sum += static_cast<int>(value % base);
    value /= base;
  }
  return sum;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int64 n;
  cin >> n;

  int best = digitSumInBase(n, 2);
  for (int base = 3; base <= 10; ++base) {
    best = min(best, digitSumInBase(n, base));
  }
  cout << best << '\n';
}
