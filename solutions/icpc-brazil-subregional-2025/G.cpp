#include <climits>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  string s;
  cin >> s;
  vector<int> c(n);
  for (int i = 0; i < n; ++i) c[i] = s[i] - '0';

  int bestQ = INT_MAX;
  int bestB = 0;

  // Optimal B always has LSB b7 = 1.
  for (int b = 1; b < 256; b += 2) {
    int bits[8];
    for (int j = 0; j < 8; ++j) bits[j] = (b >> (7 - j)) & 1;

    int piv = -1;
    for (int j = 0; j < 8; ++j) {
      if (bits[j]) {
        piv = j;
        break;
      }
    }
    if (piv < 0) continue;

    for (int neg = 0; neg < (1 << 7); ++neg) {
      vector<int> cur = c;
      int ops = 0;

      auto applyAt = [&](int i) {
        for (int j = 0; j < 8; ++j) {
          int pos = i + j;
          if (0 <= pos && pos < n) cur[pos] ^= bits[j];
        }
      };

      for (int k = 0; k < 7; ++k) {
        if (neg & (1 << k)) {
          applyAt(-(k + 1));
          ++ops;
        }
      }

      bool ok = true;
      for (int p = 0; p < n; ++p) {
        if (!cur[p]) continue;
        int i = p - piv;
        if (i < 0 || i >= n) {
          ok = false;
          break;
        }
        applyAt(i);
        ++ops;
      }
      if (!ok) continue;
      for (int bit : cur) {
        if (bit) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      if (ops < bestQ || (ops == bestQ && b < bestB)) {
        bestQ = ops;
        bestB = b;
      }
    }
  }

  for (int j = 0; j < 8; ++j) cout << ((bestB >> (7 - j)) & 1);
  cout << ' ' << bestQ << '\n';
}
