#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<vector<pair<int, char>>> children(n + 1);
  vector<int> parent(n + 1);
  for (int i = 2; i <= n; ++i) {
    cin >> parent[i];
  }
  string labels;
  cin >> labels;
  for (int i = 2; i <= n; ++i) {
    children[parent[i]].push_back({i, labels[i - 2]});
  }

  string path;
  vector<int> pi(n + 1);
  vector<vector<int>> aut(n + 1, vector<int>(26));
  int answer = 0;

  auto period_of = [&](int len) {
    if (len <= 1) {
      return 0;
    }
    int k = len - pi[len - 1];
    if (len % k == 0 && len / k >= 2) {
      return k;
    }
    return 0;
  };

  auto append = [&](char ch) {
    int i = static_cast<int>(path.size());
    path.push_back(ch);
    int c = ch - 'a';
    for (int letter = 0; letter < 26; ++letter) {
      if (i > 0 && letter != c) {
        aut[i][letter] = aut[pi[i - 1]][letter];
      } else {
        aut[i][letter] = i + (letter == c ? 1 : 0);
      }
    }
    if (i == 0) {
      pi[i] = 0;
    } else {
      pi[i] = aut[pi[i - 1]][c];
    }
  };

  auto dfs = [&](auto&& self, int v) -> void {
    answer = max(answer, period_of(static_cast<int>(path.size())));
    for (auto [u, ch] : children[v]) {
      append(ch);
      self(self, u);
      path.pop_back();
    }
  };

  dfs(dfs, 1);
  cout << answer << '\n';
  return 0;
}
