#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int64 k;
  int m;
  cin >> k >> m;
  vector<int64> cost(m + 1);
  for (int i = 1; i <= m; ++i) cin >> cost[i];

  int64 best = (1LL << 62);
  int64 prefix = 0;
  for (int layers = 1; layers <= m; ++layers) {
    prefix += cost[layers];
    // Need layers * width >= k => width = ceil(k / layers)
    int64 width = (k + layers - 1) / layers;
    best = min(best, width * prefix);
  }
  cout << best << '\n';
}
