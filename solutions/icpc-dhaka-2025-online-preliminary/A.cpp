#include <iostream>
#include <set>
#include <string>
#include <vector>
using namespace std;

using int64 = long long;
constexpr int MOD = 998244353;

int64 modPow(int64 base, int64 exponent) {
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

  int n;
  string value;
  cin >> n >> value;

  vector<int> digit(n + 1);
  set<int> nonzeroPositions;
  int64 digitSum = 0;
  for (int i = 0; i < n; ++i) {
    int positionFromRight = n - i;
    digit[positionFromRight] = value[i] - '0';
    digitSum += digit[positionFromRight];
    if (digit[positionFromRight] != 0) nonzeroPositions.insert(positionFromRight);
  }

  vector<int64> powerOfTen(n + 2, 1);
  for (int i = 1; i <= n + 1; ++i) {
    powerOfTen[i] = powerOfTen[i - 1] * 10 % MOD;
  }
  const int64 inverseNine = modPow(9, MOD - 2);

  auto answer = [&]() -> int64 {
    if (nonzeroPositions.empty()) return 0;

    int lowest = *nonzeroPositions.begin();
    int highest = *nonzeroPositions.rbegin();
    int trailingZeros = lowest - 1;
    int significantLength = highest - trailingZeros;
    int64 repunit = (powerOfTen[trailingZeros + 1] - 1 + MOD) % MOD;
    repunit = repunit * inverseNine % MOD;

    if (significantLength >= 2) {
      return repunit * (digitSum % 9 == 0 ? 2 : 1) % MOD;
    }

    int leadingDigit = digit[lowest];
    if (leadingDigit <= 8) return trailingZeros == 0 ? 0 : repunit;
    return trailingZeros == 0 ? 1 : 2 * repunit % MOD;
  };

  int q;
  cin >> q;
  while (q--) {
    int position, replacement;
    cin >> position >> replacement;

    if (digit[position] != 0) nonzeroPositions.erase(position);
    digitSum -= digit[position];
    digit[position] = replacement;
    digitSum += replacement;
    if (replacement != 0) nonzeroPositions.insert(position);

    cout << answer() << '\n';
  }
}
