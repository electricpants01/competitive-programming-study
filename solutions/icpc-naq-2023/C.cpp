#include <algorithm>
#include <cmath>
#include <iomanip>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

using int64 = long long;

struct Batch {
  int expiry;
  double amount;
  bool operator>(const Batch& other) const { return expiry > other.expiry; }
};

bool canSurvive(const vector<int64>& qty, const vector<int>& expiry, int k, double x) {
  const int n = static_cast<int>(qty.size());
  const double need = static_cast<double>(k) * x;
  priority_queue<Batch, vector<Batch>, greater<Batch>> pq;

  for (int i = 0; i < n; ++i) {
    if (qty[i] > 0) pq.push({expiry[i], static_cast<double>(qty[i])});

    double remaining = need;
    while (remaining > 0 && !pq.empty()) {
      Batch top = pq.top();
      pq.pop();
      if (top.expiry < i) continue;
      const double take = min(remaining, top.amount);
      remaining -= take;
      top.amount -= take;
      if (top.amount > 0) pq.push(top);
    }
    if (remaining > 1e-18) return false;
  }
  return true;
}

bool hasPositiveFoodEveryNight(const vector<int64>& qty, const vector<int>& expiry) {
  const int n = static_cast<int>(qty.size());
  vector<int64> diff(n + 1, 0);
  for (int i = 0; i < n; ++i) {
    if (qty[i] == 0) continue;
    diff[i] += qty[i];
    diff[expiry[i] + 1] -= qty[i];
  }
  int64 cur = 0;
  for (int i = 0; i < n; ++i) {
    cur += diff[i];
    if (cur <= 0) return false;
  }
  return true;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, k;
  cin >> n >> k;
  vector<int64> qty(n);
  vector<int> expiry(n);
  for (int i = 0; i < n; ++i) {
    int64 q;
    int f;
    cin >> q >> f;
    qty[i] = q;
    expiry[i] = f - 1;
  }

  if (!hasPositiveFoodEveryNight(qty, expiry)) {
    cout << -1 << '\n';
    return 0;
  }

  double lo = 0.0;
  double hi = 0.0;
  for (int64 q : qty) hi += static_cast<double>(q);
  hi /= static_cast<double>(k);

  for (int iter = 0; iter < 100; ++iter) {
    const double mid = (lo + hi) * 0.5;
    if (canSurvive(qty, expiry, k, mid)) lo = mid;
    else hi = mid;
  }

  cout << fixed << setprecision(15) << lo << '\n';
}
