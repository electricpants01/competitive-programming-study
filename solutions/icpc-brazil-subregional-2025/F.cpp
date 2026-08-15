#include <iostream>
#include <vector>
using namespace std;

constexpr int MOD = 1'000'000'007;

long long modPow(long long base, long long exp) {
  long long result = 1;
  while (exp > 0) {
    if (exp & 1) result = result * base % MOD;
    base = base * base % MOD;
    exp >>= 1;
  }
  return result;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, q;
  cin >> n >> q;
  vector<int> x(q + 1);
  for (int i = 1; i <= q; ++i) cin >> x[i];

  const long long inv2 = modPow(2, MOD - 2);
  vector<long long> invPow(q + 1);
  invPow[0] = 1;
  for (int i = 1; i <= q; ++i) invPow[i] = invPow[i - 1] * inv2 % MOD;

  vector<long long> t(q + 1);
  long long suffix = 0;
  for (int i = q; i >= 1; --i) {
    t[i] = suffix;
    suffix = (suffix + x[i] * invPow[i]) % MOD;
  }
  t[0] = suffix;

  vector<long long> ans(n + 1, 0);
  ans[1] = t[0];
  long long pow2 = 1;
  for (int k = 1; k <= q; ++k) {
    ans[x[k]] = (ans[x[k]] + pow2 * t[k]) % MOD;
    pow2 = pow2 * 2 % MOD;
  }

  for (int i = 1; i <= n; ++i) cout << ans[i] << '\n';
}
