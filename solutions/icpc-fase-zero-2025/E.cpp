#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

using ll = long long;

vector<ll> divisors_of(ll y) {
  vector<ll> divs;
  for (ll d = 1; d * d <= y; ++d) {
    if (y % d == 0) {
      divs.push_back(d);
      if (d * d != y) {
        divs.push_back(y / d);
      }
    }
  }
  sort(divs.begin(), divs.end());
  return divs;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  ll y, k;
  cin >> y >> k;
  vector<ll> divs = divisors_of(y);

  ll x = 1;
  while (k > 0) {
    ll p = std::gcd(x, y);
    ll best = -1;
    for (ll d : divs) {
      if (d <= p) {
        continue;
      }
      ll step = std::lcm(p, d);
      ll candidate = ((x / step) + 1) * step;
      if (best == -1 || candidate < best) {
        best = candidate;
      }
    }

    if (best == -1) {
      x += k * p;
      break;
    }

    ll need = (best - x) / p;
    if (need > k) {
      x += k * p;
      break;
    }
    k -= need;
    x = best;
  }

  cout << x << '\n';
  return 0;
}
