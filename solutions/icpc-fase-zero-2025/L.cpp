#include <iostream>
using namespace std;

using ll = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  ll m;
  cin >> m;
  // Need 2^k >= m * 8_000_000
  unsigned long long need = static_cast<unsigned long long>(m) * 8000000ULL;
  int k = 0;
  unsigned long long pw = 1;
  while (pw < need) {
    ++k;
    if (k >= 63) {
      // 2^63 already > 8e16; m<=1e10 → need<=8e16, so k<=57
      break;
    }
    pw <<= 1;
  }
  cout << k << '\n';
  return 0;
}
