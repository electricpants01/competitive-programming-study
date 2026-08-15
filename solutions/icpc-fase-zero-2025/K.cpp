#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

using ll = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, k;
  cin >> n >> k;
  vector<int> a(n), b(n);
  for (int& value : a) {
    cin >> value;
  }
  for (int& value : b) {
    cin >> value;
  }

  // best[i] = up to K best path weights ending at i (descending)
  vector<vector<ll>> best(n);
  for (int i = 0; i < n; ++i) {
    priority_queue<ll, vector<ll>, greater<ll>> top;
    auto push = [&](ll w) {
      if (static_cast<int>(top.size()) < k) {
        top.push(w);
      } else if (w > top.top()) {
        top.pop();
        top.push(w);
      }
    };

    push(b[i]);
    for (int j = 0; j < i; ++j) {
      if (a[j] >= a[i]) {
        continue;
      }
      for (ll prev : best[j]) {
        push(prev + b[i]);
      }
    }

    vector<ll> cur;
    while (!top.empty()) {
      cur.push_back(top.top());
      top.pop();
    }
    reverse(cur.begin(), cur.end());
    best[i] = move(cur);
  }

  priority_queue<ll, vector<ll>, greater<ll>> global;
  auto push_global = [&](ll w) {
    if (static_cast<int>(global.size()) < k) {
      global.push(w);
    } else if (w > global.top()) {
      global.pop();
      global.push(w);
    }
  };
  for (int i = 0; i < n; ++i) {
    for (ll w : best[i]) {
      push_global(w);
    }
  }

  vector<ll> answer;
  while (!global.empty()) {
    answer.push_back(global.top());
    global.pop();
  }
  reverse(answer.begin(), answer.end());

  for (int i = 0; i < k; ++i) {
    if (i > 0) {
      cout << ' ';
    }
    if (i < static_cast<int>(answer.size())) {
      cout << answer[i];
    } else {
      cout << -1;
    }
  }
  cout << '\n';
  return 0;
}
