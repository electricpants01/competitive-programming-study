#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

using ll = long long;
constexpr ll LIMIT = 1'000'000'000LL;

ll egcd(ll a, ll b, ll& x, ll& y) {
  if (b == 0) {
    x = 1;
    y = 0;
    return a;
  }
  ll x1, y1;
  ll g = egcd(b, a % b, x1, y1);
  x = y1;
  y = x1 - (a / b) * y1;
  return g;
}

// Positions k where a[i] == b[(i+k) % L] for all i.
vector<int> findRotationK(const vector<ll>& a, const vector<ll>& b) {
  int L = (int)a.size();
  vector<ll> text = b;
  text.insert(text.end(), b.begin(), b.end());
  vector<int> pi(L);
  for (int i = 1; i < L; ++i) {
    int j = pi[i - 1];
    while (j > 0 && a[i] != a[j]) j = pi[j - 1];
    if (a[i] == a[j]) ++j;
    pi[i] = j;
  }
  vector<int> res;
  int j = 0;
  for (int i = 0; i < 2 * L - 1; ++i) {
    while (j > 0 && text[i] != a[j]) j = pi[j - 1];
    if (text[i] == a[j]) ++j;
    if (j == L) {
      int k = i - L + 1;
      if (k < L) res.push_back(k);
      j = pi[j - 1];
    }
  }
  return res;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<ll> a(n + 1), b(n + 1);
  vector<int> p(n + 1);
  for (int i = 1; i <= n; ++i) cin >> a[i];
  for (int i = 1; i <= n; ++i) cin >> b[i];
  for (int i = 1; i <= n; ++i) cin >> p[i];

  vector<char> vis(n + 1, 0);
  vector<pair<ll, ll>> congruences;

  for (int i = 1; i <= n; ++i) {
    if (vis[i]) continue;
    vector<int> cycle;
    int x = i;
    while (!vis[x]) {
      vis[x] = 1;
      cycle.push_back(x);
      x = p[x];
    }
    int L = (int)cycle.size();
    vector<ll> alongA(L), alongB(L);
    for (int j = 0; j < L; ++j) {
      alongA[j] = a[cycle[j]];
      alongB[j] = b[cycle[j]];
    }
    auto ks = findRotationK(alongA, alongB);
    if (ks.empty()) {
      cout << "IMPOSSIVEL\n";
      return 0;
    }
    sort(ks.begin(), ks.end());
    int step = (int)ks.size() >= 2 ? ks[1] - ks[0] : L;
    congruences.push_back({ks[0] % step, step});
  }

  for (int i = 0; i < (int)congruences.size(); ++i) {
    for (int j = i + 1; j < (int)congruences.size(); ++j) {
      ll a1 = congruences[i].first, m1 = congruences[i].second;
      ll a2 = congruences[j].first, m2 = congruences[j].second;
      if ((a1 - a2) % std::gcd(m1, m2) != 0) {
        cout << "IMPOSSIVEL\n";
        return 0;
      }
    }
  }

  ll rem = 0, modu = 1;
  for (auto [r, m] : congruences) {
    ll x, y;
    ll g = egcd(modu, m, x, y);
    if ((rem - r) % g != 0) {
      cout << "IMPOSSIVEL\n";
      return 0;
    }
    __int128 lcm = (__int128)(modu / g) * m;
    ll m1 = m / g;
    __int128 t = (__int128)((r - rem) / g) * x;
    t %= m1;
    if (t < 0) t += m1;
    __int128 next = (__int128)rem + t * modu;

    if (lcm > LIMIT) {
      next %= lcm;
      if (next < 0) next += lcm;
      if (next > LIMIT) {
        cout << "DEMAIS\n";
        return 0;
      }
      rem = (ll)next;
      for (auto [rr, mm] : congruences) {
        if ((rem - rr) % mm != 0) {
          cout << "DEMAIS\n";
          return 0;
        }
      }
      cout << rem << '\n';
      return 0;
    }

    next %= lcm;
    if (next < 0) next += lcm;
    rem = (ll)next;
    modu = (ll)lcm;
  }

  if (rem > LIMIT) cout << "DEMAIS\n";
  else cout << rem << '\n';
}
