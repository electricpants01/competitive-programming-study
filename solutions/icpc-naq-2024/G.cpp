#include <cmath>
#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  map<int, vector<int>> bySize;
  for (int i = 0; i < n; ++i) {
    int s, c;
    cin >> s >> c;
    bySize[s].push_back(c);
  }

  double logSpeed = 0.0;
  for (auto& [size, gears] : bySize) {
    (void)size;
    sort(gears.begin(), gears.end());
    const int m = static_cast<int>(gears.size());
    for (int i = 0; i < m / 2; ++i) {
      logSpeed += log(static_cast<double>(gears[m - 1 - i]) / gears[i]);
    }
  }

  cout.precision(16);
  cout << fixed << logSpeed << '\n';
}
