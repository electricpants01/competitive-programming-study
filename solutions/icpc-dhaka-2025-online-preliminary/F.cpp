#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

using int64 = long long;
constexpr int MOD = 998244353;
constexpr int MAX_N = 200000;

int64 modPow(int64 base, int exponent) {
  int64 result = 1;
  while (exponent > 0) {
    if (exponent & 1) result = result * base % MOD;
    base = base * base % MOD;
    exponent >>= 1;
  }
  return result;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  vector<int64> factorial(MAX_N + 1, 1);
  vector<int64> inverseFactorial(MAX_N + 1, 1);
  for (int i = 1; i <= MAX_N; ++i) factorial[i] = factorial[i - 1] * i % MOD;
  inverseFactorial[MAX_N] = modPow(factorial[MAX_N], MOD - 2);
  for (int i = MAX_N; i > 0; --i) {
    inverseFactorial[i - 1] = inverseFactorial[i] * i % MOD;
  }

  auto combinations = [&](int n, int k) -> int64 {
    if (k < 0 || k > n) return 0;
    return factorial[n] * inverseFactorial[k] % MOD * inverseFactorial[n - k] % MOD;
  };

  const int64 inverseTwo = (MOD + 1) / 2;
  int testCases;
  cin >> testCases;
  while (testCases--) {
    int n;
    string binary;
    cin >> n >> binary;
    int ones = count(binary.begin(), binary.end(), '1');
    int zeros = n - ones;

    if (ones < 2 || zeros == 0) {
      cout << 0 << '\n';
      continue;
    }

    int64 answer = combinations(n, ones);
    answer = answer * ones % MOD;
    answer = answer * zeros % MOD;
    answer = answer * (ones - 1) % MOD;
    answer = answer * inverseTwo % MOD;
    answer = answer * modPow(ones + 1, MOD - 2) % MOD;
    cout << answer << '\n';
  }
}
