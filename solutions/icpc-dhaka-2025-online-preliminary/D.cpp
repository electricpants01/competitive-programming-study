#include <array>
#include <iostream>
#include <set>
#include <vector>
using namespace std;

using int64 = long long;

int64 sixTimesLengthSum(int64 length) {
  return length * (length + 1) * (length + 2);
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int testCases;
  cin >> testCases;
  while (testCases--) {
    int n, days;
    cin >> n >> days;

    vector<int> color(n + 1), saturation(n + 1);
    array<set<int>, 31> bySaturation;
    array<set<int>, 31> separators;
    array<int64, 31> gapContribution{};

    for (int level = 1; level <= 30; ++level) {
      separators[level].insert(0);
      separators[level].insert(n + 1);
      gapContribution[level] = sixTimesLengthSum(n);
    }

    auto insertSeparator = [&](int level, int position) {
      auto it = separators[level].insert(position).first;
      int left = *prev(it);
      int right = *next(it);
      gapContribution[level] -= sixTimesLengthSum(right - left - 1);
      gapContribution[level] += sixTimesLengthSum(position - left - 1);
      gapContribution[level] += sixTimesLengthSum(right - position - 1);
    };

    for (int i = 1; i <= n; ++i) {
      cin >> color[i];
      saturation[i] = __builtin_popcount(static_cast<unsigned>(color[i]));
      bySaturation[saturation[i]].insert(i);
      for (int level = 1; level <= saturation[i]; ++level) {
        insertSeparator(level, i);
      }
    }

    const int64 allLengthSumsTimesSix = sixTimesLengthSum(n);
    auto beauty = [&]() {
      int64 excludedTimesSix = 0;
      for (int level = 1; level <= 30; ++level) {
        excludedTimesSix += gapContribution[level];
      }
      return (30 * allLengthSumsTimesSix - excludedTimesSix) / 6;
    };

    while (days--) {
      int type;
      cin >> type;
      if (type == 2) {
        cout << beauty() << '\n';
        continue;
      }

      int requestedSaturation, dust;
      cin >> requestedSaturation >> dust;
      if (bySaturation[requestedSaturation].empty()) continue;

      int position = *bySaturation[requestedSaturation].begin();
      int oldSaturation = saturation[position];
      int newColor = color[position] | dust;
      int newSaturation = __builtin_popcount(static_cast<unsigned>(newColor));
      color[position] = newColor;

      if (newSaturation == oldSaturation) continue;
      bySaturation[oldSaturation].erase(position);
      bySaturation[newSaturation].insert(position);
      saturation[position] = newSaturation;
      for (int level = oldSaturation + 1; level <= newSaturation; ++level) {
        insertSeparator(level, position);
      }
    }
  }
}
