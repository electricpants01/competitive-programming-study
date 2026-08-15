#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, k, c;
  cin >> n >> k >> c;

  vector<int> schoolCount(n + 1, 0);
  vector<int> selected;
  vector<int> overflow;
  selected.reserve(n);
  overflow.reserve(n);

  for (int i = 0; i < n; ++i) {
    int teamId, school;
    cin >> teamId >> school;
    if (schoolCount[school] < c) {
      selected.push_back(teamId);
      ++schoolCount[school];
    } else {
      overflow.push_back(teamId);
    }
  }

  if (static_cast<int>(selected.size()) > k) {
    selected.resize(k);
  } else {
    for (int id : overflow) {
      if (static_cast<int>(selected.size()) == k) break;
      selected.push_back(id);
    }
  }

  for (int id : selected) cout << id << '\n';
}
