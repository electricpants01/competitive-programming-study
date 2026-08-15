#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, lph;
  cin >> n >> lph;
  vector<int> loc(n);
  for (int i = 0; i < n; ++i) cin >> loc[i];
  sort(loc.begin(), loc.end());

  const int budget = 5 * lph;
  int used = 0;
  int count = 0;
  for (int x : loc) {
    if (used + x > budget) break;
    used += x;
    ++count;
  }
  cout << count << '\n';
}
