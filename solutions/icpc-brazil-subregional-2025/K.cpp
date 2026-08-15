#include <algorithm>
#include <climits>
#include <iostream>
using namespace std;

constexpr int MOD = 1'000'000'007;

long long modPow(long long base, long long exp) {
  long long result = 1 % MOD;
  base %= MOD;
  while (exp > 0) {
    if (exp & 1) result = result * base % MOD;
    base = base * base % MOD;
    exp >>= 1;
  }
  return result;
}

long long G(long long i, long long j) {
  return i + j + __builtin_popcountll(i + j) - __builtin_popcountll(i) -
         __builtin_popcountll(j);
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  long long a, b;
  cin >> a >> b;

  long long y = LLONG_MIN;
  constexpr long long WINDOW = 61;
  long long iStart = max(0LL, a - 1 - WINDOW);
  long long jStart = max(0LL, b - 1 - WINDOW);
  for (long long i = iStart; i < a; ++i) {
    for (long long j = jStart; j < b; ++j) {
      y = max(y, G(i, j));
    }
  }

  cout << modPow(2, y + 1) << '\n';
}
