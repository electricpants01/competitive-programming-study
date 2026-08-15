#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> count(51, 0);
  const int drawings = 10 * n;
  for (int i = 0; i < drawings; ++i) {
    for (int j = 0; j < 5; ++j) {
      int x;
      cin >> x;
      ++count[x];
    }
  }

  const int threshold = 2 * n;
  bool first = true;
  for (int x = 1; x <= 50; ++x) {
    if (count[x] > threshold) {
      if (!first) cout << ' ';
      cout << x;
      first = false;
    }
  }
  if (first) cout << -1;
  cout << '\n';
}
