#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, k;
  cin >> n >> k;
  vector<long long> h(n);
  for (int i = 0; i < n; ++i) cin >> h[i];

  auto ok = [&](long long target) -> bool {
    int pivot = -1;
    for (int i = 0; i < n; ++i) {
      if (h[i] < target) pivot = i;
    }
    if (pivot < 0) return true;

    vector<long long> cur = h;
    long long add = k;
    for (int i = pivot; i >= 0 && add >= 1; --i, --add) {
      cur[i] += add;
    }
    for (long long value : cur) {
      if (value < target) return false;
    }
    return true;
  };

  long long left = *min_element(h.begin(), h.end());
  long long right = left + k;
  long long answer = left;
  while (left <= right) {
    long long mid = (left + right) / 2;
    if (ok(mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  cout << answer << '\n';
}
