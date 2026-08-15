#include <iostream>
#include <set>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, w;
  cin >> n >> w;
  vector<int> blocks(n);
  for (int i = 0; i < n; ++i) cin >> blocks[i];

  if (w == 1) {
    cout << 1 << '\n';
    return 0;
  }

  vector<int> height(w + 2, 0);

  auto componentOf = [&](int x) -> pair<int, int> {
    int l = x, r = x;
    while (l > 1 && abs(height[l] - height[l - 1]) <= 1) --l;
    while (r < w && abs(height[r] - height[r + 1]) <= 1) ++r;
    return {l, r};
  };

  set<pair<int, int>> possible;
  possible.insert({1, w});

  for (int t = 0; t < n; ++t) {
    const int c = blocks[t];
    set<pair<int, int>> nextPossible;

    for (auto [l, r] : possible) {
      if (c < l || c > r) {
        nextPossible.insert({l, r});
        continue;
      }
      if (l == r && l == c) continue;

      // Stand on x != c inside [l, r], then the block lands.
      height[c]++;
      for (int x = l; x <= r; ++x) {
        if (x == c) continue;
        nextPossible.insert(componentOf(x));
      }
      height[c]--;
    }

    if (nextPossible.empty()) {
      cout << (t + 1) << '\n';
      return 0;
    }

    height[c]++;
    set<pair<int, int>> expanded;
    for (auto [l, r] : nextPossible) {
      expanded.insert(componentOf(l));
    }
    possible.swap(expanded);
  }

  cout << (n + 1) << '\n';
}
