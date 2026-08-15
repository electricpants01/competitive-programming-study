#include <iostream>
#include <set>
#include <utility>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> a(n);
  for (int i = 0; i < n; ++i) cin >> a[i];

  // O(n log n) expected via: for each j, walk L decreasing while tracking pred/succ in a set.
  // Parent changes at most O(n) total times amortized across structure; we still do O(n) per column.
  // Optimized: use that as L goes 0..j-1 deleting, only recompute when deleted key was pred/succ.
  long long ans = 0;
  for (int j = 1; j < n; ++j) {
    set<pair<int, int>> s;
    for (int i = 0; i < j; ++i) s.insert({a[i], i});
    auto parentOf = [&]() {
      auto it = s.lower_bound({a[j], 0});
      int pred = -1, succ = -1;
      if (it != s.begin()) pred = prev(it)->second;
      if (it != s.end()) succ = it->second;
      if (pred < 0) return succ < 0 ? -1 : a[succ];
      if (succ < 0) return a[pred];
      return a[pred > succ ? pred : succ];
    };
    int prevP = parentOf();
    for (int L = 0; L + 1 < j; ++L) {
      s.erase({a[L], L});
      int cur = parentOf();
      if (prevP >= 0 && cur >= 0 && prevP != cur) ++ans;
      prevP = cur;
    }
  }
  cout << ans << '\n';
  return 0;
}
