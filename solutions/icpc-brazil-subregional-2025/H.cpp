#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, k;
  cin >> n >> k;
  const int SZ = 1 << k;
  vector<long long> f(SZ, 0);
  for (int i = 0; i < n; ++i) {
    string s;
    cin >> s;
    int mask = 0;
    for (int j = 0; j < k; ++j) {
      if (s[j] == '1') mask |= 1 << j;
    }
    ++f[mask];
  }

  vector<long long> F = f;
  for (int bit = 0; bit < k; ++bit) {
    for (int mask = 0; mask < SZ; ++mask) {
      if (mask & (1 << bit)) F[mask] += F[mask ^ (1 << bit)];
    }
  }

  vector<long long> g(SZ, 0);
  for (int mask = 0; mask < SZ; ++mask) {
    long long v = F[mask];
    if (v >= 3) g[mask] = v * (v - 1) * (v - 2) / 6;
  }

  // Inverse SOS to get exact-union counts.
  for (int bit = 0; bit < k; ++bit) {
    for (int mask = 0; mask < SZ; ++mask) {
      if (mask & (1 << bit)) g[mask] -= g[mask ^ (1 << bit)];
    }
  }

  int m;
  cin >> m;
  while (m--) {
    string s;
    cin >> s;
    int mask = 0;
    for (int j = 0; j < k; ++j) {
      if (s[j] == '1') mask |= 1 << j;
    }
    cout << g[mask] << '\n';
  }
}
