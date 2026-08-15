#include <algorithm>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

using int64 = long long;

int n, k;
vector<char> type;
vector<int> value;
vector<int> multiplyPositions;
vector<vector<int>> positionsByValue(1001);
vector<int> distinctValues;
vector<vector<int>> rangeAdds;
vector<int> rangeRightBoundary;
vector<char> active;
vector<int64> bestExact;

void evaluate(int usedMultiplies) {
  using Node = pair<int64, int>;
  priority_queue<Node> heap;
  const int rangeCount = static_cast<int>(rangeAdds.size());
  vector<int64> rangeMult(rangeCount, 1);

  for (int r = 0; r < rangeCount; ++r) {
    int64 mult = 1;
    const int boundary = rangeRightBoundary[r];
    for (int p : multiplyPositions) {
      if (p >= boundary && active[p]) mult *= value[p];
    }
    rangeMult[r] = mult;
    if (!rangeAdds[r].empty()) {
      heap.push({mult * rangeAdds[r][0], r << 20});
    }
  }

  int64 sum = 0;
  int takenAdds = 0;
  while (!heap.empty()) {
    auto [contrib, packed] = heap.top();
    heap.pop();
    const int r = packed >> 20;
    const int offset = packed & ((1 << 20) - 1);
    sum += contrib;
    ++takenAdds;
    const int length = usedMultiplies + takenAdds;
    if (length <= n) bestExact[length] = max(bestExact[length], sum);
    if (offset + 1 < static_cast<int>(rangeAdds[r].size())) {
      heap.push({rangeMult[r] * rangeAdds[r][offset + 1], (r << 20) | (offset + 1)});
    }
  }

  if (usedMultiplies <= n) {
    bestExact[usedMultiplies] = max(bestExact[usedMultiplies], 0LL);
  }
}

void search(int level, int used) {
  if (level == static_cast<int>(distinctValues.size())) {
    evaluate(used);
    return;
  }
  const int v = distinctValues[level];
  const auto& pos = positionsByValue[v];
  search(level + 1, used);
  const int limit = min(static_cast<int>(pos.size()), k - used);
  for (int t = 1; t <= limit; ++t) {
    active[pos[static_cast<int>(pos.size()) - t]] = 1;
    search(level + 1, used + t);
  }
  for (int t = 1; t <= limit; ++t) {
    active[pos[static_cast<int>(pos.size()) - t]] = 0;
  }
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  cin >> n >> k;
  type.resize(n);
  value.resize(n);

  for (int i = 0; i < n; ++i) {
    cin >> type[i] >> value[i];
    if (type[i] == 'm') {
      multiplyPositions.push_back(i);
      positionsByValue[value[i]].push_back(i);
    }
  }

  for (int v = 2; v <= 1000; ++v) {
    if (!positionsByValue[v].empty()) distinctValues.push_back(v);
  }

  vector<char> isMultiply(n, 0);
  for (int p : multiplyPositions) isMultiply[p] = 1;

  int start = 0;
  for (int i = 0; i <= n; ++i) {
    if (i == n || isMultiply[i]) {
      vector<int> adds;
      for (int j = start; j <= i - 1; ++j) {
        if (type[j] == 'a') adds.push_back(value[j]);
      }
      if (!adds.empty()) {
        sort(adds.begin(), adds.end(), greater<int>());
        rangeAdds.push_back(std::move(adds));
        rangeRightBoundary.push_back(i);
      }
      start = i + 1;
    }
  }

  active.assign(n, 0);
  bestExact.assign(n + 1, 0);
  search(0, 0);

  int64 running = 0;
  for (int len = 1; len <= n; ++len) {
    running = max(running, bestExact[len]);
    cout << running << '\n';
  }
}
