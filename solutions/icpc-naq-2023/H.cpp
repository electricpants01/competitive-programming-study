#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int64 n, k, p;
  cin >> n >> k >> p;

  vector<int64> doses;
  for (int64 d = 1; d * d <= n; ++d) {
    if (n % d != 0) continue;
    const int64 other = n / d;
    // dosage d with other pills
    if (d <= k && other <= p) doses.push_back(d);
    // dosage other with d pills
    if (other != d && other <= k && d <= p) doses.push_back(other);
  }

  sort(doses.begin(), doses.end());
  cout << doses.size() << '\n';
  for (int64 d : doses) cout << d << '\n';
}
