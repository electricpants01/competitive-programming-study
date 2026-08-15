#include <algorithm>
#include <iostream>
#include <set>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  // Answer = number of distinct (time + floor) diagonals.
  set<long long> diagonals;
  for (int i = 0; i < n; ++i) {
    long long time, floor;
    cin >> time >> floor;
    diagonals.insert(time + floor);
  }
  cout << diagonals.size() << '\n';
}
