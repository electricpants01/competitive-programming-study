#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> sticks(n);
  for (int i = 0; i < n; ++i) cin >> sticks[i];

  sort(sticks.begin(), sticks.end());
  // Zigzag: swap each pair so every middle element is a local extremum.
  for (int i = 1; i < n; i += 2) {
    swap(sticks[i], sticks[i - 1]);
  }

  for (int i = 0; i < n; ++i) {
    if (i) cout << ' ';
    cout << sticks[i];
  }
  cout << '\n';
}
