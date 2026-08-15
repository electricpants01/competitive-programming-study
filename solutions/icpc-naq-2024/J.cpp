#include <iostream>
using namespace std;

using int64 = long long;

bool strictlyMiddle(int64 num, int64 den) {
  return 3 * num > den && 3 * num < 2 * den;
}

void advanceCoordinate(int64& num, int64 den, bool& safe) {
  if (safe) return;
  if (3 * num < den) {
    num *= 3;
  } else if (3 * num > 2 * den) {
    num = 3 * num - 2 * den;
  } else if (3 * num == den || 3 * num == 2 * den) {
    // On a ternary boundary: attribute to a kept edge cube forever.
    safe = true;
  } else {
    num = 3 * num - den;
  }
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int L;
  int64 xn, xd, yn, yd, zn, zd;
  cin >> L >> xn >> xd >> yn >> yd >> zn >> zd;

  bool sx = false, sy = false, sz = false;
  for (int level = 0; level < L; ++level) {
    int strict = 0;
    if (!sx && strictlyMiddle(xn, xd)) ++strict;
    if (!sy && strictlyMiddle(yn, yd)) ++strict;
    if (!sz && strictlyMiddle(zn, zd)) ++strict;
    if (strict >= 2) {
      cout << 0 << '\n';
      return 0;
    }
    advanceCoordinate(xn, xd, sx);
    advanceCoordinate(yn, yd, sy);
    advanceCoordinate(zn, zd, sz);
  }

  cout << 1 << '\n';
}
