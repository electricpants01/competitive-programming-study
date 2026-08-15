#include <algorithm>
#include <iomanip>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  double h;
  int n, m, limit;
  cin >> h >> n >> m >> limit;
  vector<int> potions(n), swords(m);
  for (int i = 0; i < n; ++i) cin >> potions[i];
  for (int i = 0; i < m; ++i) cin >> swords[i];

  sort(potions.begin(), potions.end(), greater<int>());
  sort(swords.begin(), swords.end(), greater<int>());

  double best = h;
  const int maxPotions = min(n, limit);
  for (int usePotions = 0; usePotions <= maxPotions; ++usePotions) {
    const int useSwords = min(m, limit - usePotions);
    double hp = h;
    for (int i = 0; i < usePotions; ++i) {
      if (hp > 0) hp *= (100.0 - potions[i]) / 100.0;
    }
    for (int i = 0; i < useSwords; ++i) {
      hp -= swords[i];
    }
    best = min(best, hp);
  }

  cout << fixed << setprecision(10) << best << '\n';
}
