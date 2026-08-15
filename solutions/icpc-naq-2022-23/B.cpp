#include <array>
#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

const int MOD = 1'000'000'007;
const int STATES = 90;  // last digit * 9 + rem_mod_9

int stateId(int last, int rem) { return last * 9 + rem; }

using Matrix = array<array<int, STATES>, STATES>;
using Vector = array<int, STATES>;

Matrix matMul(const Matrix& a, const Matrix& b) {
  Matrix c{};
  for (int i = 0; i < STATES; ++i) {
    for (int k = 0; k < STATES; ++k) {
      if (!a[i][k]) continue;
      for (int j = 0; j < STATES; ++j) {
        c[i][j] = static_cast<int>((c[i][j] + static_cast<int64>(a[i][k]) * b[k][j]) % MOD);
      }
    }
  }
  return c;
}

Vector matVecMul(const Matrix& a, const Vector& v) {
  Vector r{};
  for (int i = 0; i < STATES; ++i) {
    int64 sum = 0;
    for (int j = 0; j < STATES; ++j) {
      sum += static_cast<int64>(a[i][j]) * v[j];
    }
    r[i] = static_cast<int>(sum % MOD);
  }
  return r;
}

Matrix matPow(Matrix base, int64 exp) {
  Matrix result{};
  for (int i = 0; i < STATES; ++i) result[i][i] = 1;
  while (exp > 0) {
    if (exp & 1) result = matMul(result, base);
    base = matMul(base, base);
    exp >>= 1;
  }
  return result;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int64 a;
  int b;
  cin >> a >> b;

  if (a == 1) {
    cout << (b >= 0 && b <= 9 ? 1 : 0) << '\n';
    return 0;
  }

  // Transition: append one digit.
  Matrix trans{};
  for (int last = 0; last <= 9; ++last) {
    for (int rem = 0; rem < 9; ++rem) {
      const int from = stateId(last, rem);
      for (int d = 0; d <= 9; ++d) {
        if (d == last) continue;
        const int to = stateId(d, (rem * 10 + d) % 9);
        trans[to][from] = (trans[to][from] + 1) % MOD;
      }
    }
  }

  auto waysLength = [&](int64 len) -> Vector {
    Vector init{};
    if (len <= 0) return init;
    for (int d = 1; d <= 9; ++d) {
      init[stateId(d, d % 9)] = 1;
    }
    if (len == 1) return init;
    return matVecMul(matPow(trans, len - 1), init);
  };

  int64 answer = 0;

  if (a == 2) {
    for (int p = 1; p <= 9; ++p) {
      for (int q = 0; q <= 9; ++q) {
        if (p == q) continue;
        if ((10 * p + q) % 225 == b) ++answer;
      }
    }
    cout << answer % MOD << '\n';
    return 0;
  }

  const Vector prefixWays = waysLength(a - 2);

  for (int p = 0; p <= 9; ++p) {
    for (int q = 0; q <= 9; ++q) {
      if (p == q) continue;
      if ((10 * p + q) % 25 != b % 25) continue;

      // prefix * 100 + 10p + q ≡ b (mod 9)
      // 100 ≡ 1, 10 ≡ 1 => prefix + p + q ≡ b (mod 9)
      const int need = ((b % 9) - (p % 9) - (q % 9)) % 9;
      const int needRem = (need + 9) % 9;

      for (int e = 0; e <= 9; ++e) {
        if (e == p) continue;  // adjacent to first of last-two
        answer += prefixWays[stateId(e, needRem)];
        if (answer >= MOD) answer -= MOD;
      }
    }
  }

  cout << answer << '\n';
}
