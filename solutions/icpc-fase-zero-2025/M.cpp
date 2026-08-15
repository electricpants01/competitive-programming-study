#include <iostream>
#include <vector>
using namespace std;

using ll = long long;

static constexpr int MOD = 998244353;
static constexpr int MAXA = 100000;

ll mod_pow(ll base, ll exp) {
  ll result = 1 % MOD;
  base %= MOD;
  while (exp > 0) {
    if (exp & 1) {
      result = result * base % MOD;
    }
    base = base * base % MOD;
    exp >>= 1;
  }
  return result;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  vector<vector<int>> divisors(MAXA + 1);
  vector<vector<int>> prime_divisors(MAXA + 1);
  vector<int> spf(MAXA + 1);
  for (int i = 1; i <= MAXA; ++i) {
    for (int j = i; j <= MAXA; j += i) {
      divisors[j].push_back(i);
    }
  }
  for (int i = 2; i <= MAXA; ++i) {
    if (spf[i] == 0) {
      for (int j = i; j <= MAXA; j += i) {
        if (spf[j] == 0) {
          spf[j] = i;
        }
      }
    }
  }
  for (int i = 1; i <= MAXA; ++i) {
    int x = i;
    while (x > 1) {
      int p = spf[x];
      prime_divisors[i].push_back(p);
      while (x % p == 0) {
        x /= p;
      }
    }
  }

  int n;
  cin >> n;
  vector<int> a(n + 1);
  for (int i = 1; i <= n; ++i) {
    cin >> a[i];
  }

  vector<int> cnt(MAXA + 1, 0);
  vector<ll> ans(MAXA + 1, 0);
  vector<ll> pow2(n + 1, 1);
  for (int i = 1; i <= n; ++i) {
    pow2[i] = pow2[i - 1] * 2 % MOD;
  }

  for (int i = 1; i <= n; ++i) {
    for (int d : divisors[a[i]]) {
      ++cnt[d];
    }
  }
  for (int x = 1; x <= MAXA; ++x) {
    if (cnt[x] > 0) {
      ans[x] = (pow2[cnt[x]] - 1 + MOD) % MOD;
    }
  }
  // Multiple Möbius transform
  vector<int> primes;
  for (int i = 2; i <= MAXA; ++i) {
    if (spf[i] == i) {
      primes.push_back(i);
    }
  }
  for (int p : primes) {
    for (int x = 1; x * p <= MAXA; ++x) {
      ans[x] -= ans[x * p];
      if (ans[x] < 0) {
        ans[x] += MOD;
      }
    }
  }

  auto upd = [&](int value, bool add) {
    vector<ll> to_upd(MAXA + 1, 0);
    for (int d : divisors[value]) {
      if (add) {
        to_upd[d] = pow2[cnt[d]];
        ++cnt[d];
      } else {
        --cnt[d];
        to_upd[d] = (MOD - pow2[cnt[d]]) % MOD;
      }
    }
    for (int p : prime_divisors[value]) {
      for (int d : divisors[value]) {
        if (static_cast<ll>(d) * p > value) {
          break;
        }
        to_upd[d] -= to_upd[d * p];
        if (to_upd[d] < 0) {
          to_upd[d] += MOD;
        }
      }
    }
    for (int d : divisors[value]) {
      ans[d] += to_upd[d];
      ans[d] %= MOD;
      if (ans[d] < 0) {
        ans[d] += MOD;
      }
    }
  };

  ll total = (pow2[n] - 1 + MOD) % MOD;
  ll inv_total = mod_pow(total, MOD - 2);

  int q;
  cin >> q;
  while (q--) {
    int type;
    cin >> type;
    if (type == 1) {
      int x;
      cin >> x;
      ll ways = ans[x];
      cout << ways * inv_total % MOD << '\n';
    } else {
      int idx, x;
      cin >> idx >> x;
      if (a[idx] == x) {
        continue;
      }
      upd(a[idx], false);
      a[idx] = x;
      upd(a[idx], true);
    }
  }
  return 0;
}
