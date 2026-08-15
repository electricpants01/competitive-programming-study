#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

static const int MOD = 9302023;

const vector<string> WORDS = {
    "zero", "one", "two", "three", "four",
    "five", "six", "seven", "eight", "nine"};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string s;
  cin >> s;
  const int n = static_cast<int>(s.size());

  vector<int> best(n + 1, n + 5);
  vector<int> ways(n + 1, 0);
  best[0] = 0;
  ways[0] = 1;

  for (int i = 0; i < n; ++i) {
    if (ways[i] == 0) continue;

    // keep letter s[i]
    if (best[i] + 1 < best[i + 1]) {
      best[i + 1] = best[i] + 1;
      ways[i + 1] = ways[i];
    } else if (best[i] + 1 == best[i + 1]) {
      ways[i + 1] += ways[i];
      if (ways[i + 1] >= MOD) ways[i + 1] -= MOD;
    }

    for (const string& w : WORDS) {
      const int len = static_cast<int>(w.size());
      if (i + len > n) continue;
      bool match = true;
      for (int j = 0; j < len; ++j) {
        if (s[i + j] != w[j]) {
          match = false;
          break;
        }
      }
      if (!match) continue;

      const int ni = i + len;
      if (best[i] + 1 < best[ni]) {
        best[ni] = best[i] + 1;
        ways[ni] = ways[i];
      } else if (best[i] + 1 == best[ni]) {
        ways[ni] += ways[i];
        if (ways[ni] >= MOD) ways[ni] -= MOD;
      }
    }
  }

  cout << best[n] << '\n' << ways[n] << '\n';
}
