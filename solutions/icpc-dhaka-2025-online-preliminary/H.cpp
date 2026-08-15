#include <algorithm>
#include <array>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int testCases;
  cin >> testCases;
  while (testCases--) {
    int n, m;
    cin >> n >> m;
    vector<int> initial(n);
    vector<int> values;
    for (int& chemical : initial) {
      cin >> chemical;
      values.push_back(chemical);
    }

    vector<array<int, 3>> rules(m);
    for (auto& [x, y, z] : rules) {
      cin >> x >> y >> z;
      values.push_back(x);
      values.push_back(y);
      values.push_back(z);
    }

    sort(values.begin(), values.end());
    values.erase(unique(values.begin(), values.end()), values.end());
    auto compressed = [&](int value) {
      return static_cast<int>(lower_bound(values.begin(), values.end(), value) - values.begin());
    };

    vector<vector<pair<int, int>>> reactions(values.size());
    for (auto [x, y, z] : rules) {
      int first = compressed(x);
      int second = compressed(y);
      int product = compressed(z);
      reactions[first].push_back({second, product});
      reactions[second].push_back({first, product});
    }

    vector<char> present(values.size());
    queue<int> pending;
    for (int chemical : initial) {
      int id = compressed(chemical);
      present[id] = true;
      pending.push(id);
    }

    int answer = 0;
    while (!pending.empty()) {
      int chemical = pending.front();
      pending.pop();
      ++answer;

      for (auto [other, product] : reactions[chemical]) {
        if (present[other] && !present[product]) {
          present[product] = true;
          pending.push(product);
        }
      }
    }

    cout << answer << '\n';
  }
}
