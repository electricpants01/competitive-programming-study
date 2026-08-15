#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

using int64 = long long;

bool noCrash(const vector<int64>& t, int64 gap, int laps) {
  const int k = static_cast<int>(t.size());
  // t[i] is lap time of car placed at time i*gap.
  if (k >= 2 && (k - 1) * gap >= t[0]) return false;

  for (int i = 0; i < k; ++i) {
    for (int j = 0; j < k; ++j) {
      if (i == j) continue;
      for (int a = 1; a <= laps; ++a) {
        for (int b = 1; b <= laps; ++b) {
          const int64 startP = i * gap + (a - 1) * t[i];
          const int64 finishP = i * gap + a * t[i];
          const int64 startQ = j * gap + (b - 1) * t[j];
          const int64 finishQ = j * gap + b * t[j];
          if (startP > startQ && finishP <= finishQ) return false;
        }
      }
    }
  }
  return true;
}

bool canRace(vector<int64> cars, int64 gap, int laps) {
  const int k = static_cast<int>(cars.size());
  if (k == 0) return true;
  if (k == 1) return true;

  // Try slowest-first (best for the finger constraint) and a few variants.
  vector<vector<int64>> orders;
  vector<int64> dec = cars;
  sort(dec.begin(), dec.end(), greater<int64>());
  orders.push_back(dec);
  vector<int64> asc = cars;
  sort(asc.begin(), asc.end());
  orders.push_back(asc);

  // Place the unique slowest first, then remaining by increasing time.
  {
    vector<int64> ord = cars;
    sort(ord.begin(), ord.end(), greater<int64>());
    // already have dec
  }

  // For small k, try all permutations.
  if (k <= 8) {
    vector<int64> ord = cars;
    sort(ord.begin(), ord.end());
    do {
      if (noCrash(ord, gap, laps)) return true;
    } while (next_permutation(ord.begin(), ord.end()));
    return false;
  }

  for (auto& ord : orders) {
    if (noCrash(ord, gap, laps)) return true;
  }

  // Try each car as the first (needs T > (k-1)*gap), rest decreasing.
  for (int first = 0; first < k; ++first) {
    if ((k - 1) * gap >= cars[first]) continue;
    vector<int64> rest;
    rest.reserve(k - 1);
    for (int i = 0; i < k; ++i) if (i != first) rest.push_back(cars[i]);
    sort(rest.begin(), rest.end(), greater<int64>());
    vector<int64> ord;
    ord.push_back(cars[first]);
    ord.insert(ord.end(), rest.begin(), rest.end());
    if (noCrash(ord, gap, laps)) return true;
    sort(rest.begin(), rest.end());
    ord.clear();
    ord.push_back(cars[first]);
    ord.insert(ord.end(), rest.begin(), rest.end());
    if (noCrash(ord, gap, laps)) return true;
  }
  return false;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int laps, cars;
  int64 gap;
  cin >> laps >> gap >> cars;
  vector<int64> times(cars);
  for (int i = 0; i < cars; ++i) cin >> times[i];
  sort(times.begin(), times.end());

  int lo = 1, hi = cars, best = 1;
  while (lo <= hi) {
    int mid = (lo + hi) / 2;
    vector<int64> chosen(times.begin(), times.begin() + mid);
    if (canRace(chosen, gap, laps)) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  cout << best << '\n';
}
