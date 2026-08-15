#include <iostream>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  unsigned mask = 0;
  for (int i = n; i >= 0; --i) {
    int bit;
    cin >> bit;
    if (bit) mask |= 1u << i;
  }

  int steps = 0;
  while (mask != 1u) {
    if (mask & 1u) {
      // Multiply by (x + 1) and add 1, coefficients mod 2.
      mask = (mask ^ (mask << 1) ^ 1u);
    } else {
      mask >>= 1;
    }
    ++steps;
  }
  cout << steps << '\n';
}
