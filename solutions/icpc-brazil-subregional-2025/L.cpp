#include <climits>
#include <iostream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  unordered_map<string, pair<int, int>> dict;
  vector<string> order;
  dict.reserve(n * 2);
  for (int i = 0; i < n; ++i) {
    string word;
    int x, y;
    cin >> word >> x >> y;
    dict[word] = {x, y};
    order.push_back(word);
  }

  int m;
  cin >> m;
  vector<string> text(m);
  for (int i = 0; i < m; ++i) cin >> text[i];

  int q, kMax;
  cin >> q >> kMax;
  while (q--) {
    int f;
    cin >> f;
    vector<string> query(f);
    for (int i = 0; i < f; ++i) cin >> query[i];

    for (int i = 0; i < f; ++i) {
      if (i) cout << ' ';
      cout << query[i];
    }

    string answer = "*";
    for (int k = kMax; k >= 1; --k) {
      if (k > f) continue;
      vector<string> window(query.end() - k, query.end());
      vector<string> candidates;
      for (int i = 0; i + k < m; ++i) {
        bool match = true;
        for (int j = 0; j < k; ++j) {
          if (text[i + j] != window[j]) {
            match = false;
            break;
          }
        }
        if (match) candidates.push_back(text[i + k]);
      }
      if (candidates.empty()) continue;

      long long bestScore = LLONG_MIN;
      string bestWord;
      for (const string& word : order) {
        auto [dx, dy] = dict[word];
        long long score = 0;
        for (const string& cand : candidates) {
          auto it = dict.find(cand);
          int cx = 0, cy = 0;
          if (it != dict.end()) {
            cx = it->second.first;
            cy = it->second.second;
          }
          score += 1LL * dx * cx + 1LL * dy * cy;
        }
        if (score > bestScore) {
          bestScore = score;
          bestWord = word;
        }
      }
      answer = bestWord;
      break;
    }

    cout << ' ' << answer << '\n';
  }
}
