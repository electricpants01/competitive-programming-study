#include <iostream>
#include <vector>
using namespace std;

const int MOD = 998244353;

long long modpow(long long a, long long e) {
  long long r = 1;
  while (e) {
    if (e & 1) r = r * a % MOD;
    a = a * a % MOD;
    e >>= 1;
  }
  return r;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int N, M;
  cin >> N >> M;
  // Number of ways for M specials to form exactly k blocks among N+M positions
  // = C(N+1, k) * C(M-1, k-1) for placing k non-empty M-blocks into N+1 gaps... 
  // actually classic: ways = C(N+1, k) * C(M-1, k-1)
  // total (N+M)! / (N! M!) for choosing positions, probability = ways * N! M! / (N+M)! 
  // = C(N+1,k)*C(M-1,k-1) / C(N+M, M)
  int LIM = N + M + 5;
  vector<long long> fact(LIM), invfact(LIM);
  fact[0] = 1;
  for (int i = 1; i < LIM; ++i) fact[i] = fact[i - 1] * i % MOD;
  invfact[LIM - 1] = modpow(fact[LIM - 1], MOD - 2);
  for (int i = LIM - 1; i > 0; --i) invfact[i - 1] = invfact[i] * i % MOD;
  auto C = [&](int n, int k) -> long long {
    if (k < 0 || k > n || n < 0) return 0;
    return fact[n] * invfact[k] % MOD * invfact[n - k] % MOD;
  };
  long long den = C(N + M, M);
  long long invDen = modpow(den, MOD - 2);
  for (int k = 1; k <= M; ++k) {
    long long ways = C(N + 1, k) * C(M - 1, k - 1) % MOD;
    long long ans = ways * invDen % MOD;
    if (k > 1) cout << ' ';
    cout << ans;
  }
  cout << '\n';
  return 0;
}
