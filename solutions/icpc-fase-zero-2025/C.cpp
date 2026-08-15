#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  const int states = 1 << n;
  vector<int> perm(states);
  for (int i = 0; i < states; ++i) {
    perm[i] = i;
  }

  auto apply_ccnot = [&](int c1, int c2, int t) {
    const int mask1 = 1 << c1;
    const int mask2 = 1 << c2;
    const int maskT = 1 << t;
    for (int i = 0; i < states; ++i) {
      int x = perm[i];
      if ((x & mask1) && (x & mask2)) {
        perm[i] = x ^ maskT;
      }
    }
  };

  for (int gate = 0; gate < m; ++gate) {
    int type;
    cin >> type;
    if (type == 1) {
      int c, t;
      cin >> c >> t;
      apply_ccnot(c, c, t);
    } else {
      int c1, c2, t;
      cin >> c1 >> c2 >> t;
      apply_ccnot(c1, c2, t);
    }
  }

  for (int i = 0; i < states; ++i) {
    string row(states, '0');
    row[perm[i]] = '1';
    cout << row << '\n';
  }
  return 0;
}
