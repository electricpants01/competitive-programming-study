#include <iostream>
#include <set>
#include <string>
#include <vector>
using namespace std;

// Parse s as concat(start .. b) with exactly `allowedMissing` values removed.
// On success, writes the missing values into `missingOut` and returns true.
bool parseWithStart(const string& s, int start, int allowedMissing, vector<int>& missingOut) {
  const int n = static_cast<int>(s.size());
  int i = 0;
  int cur = start;
  vector<int> missing;
  const int hardCap = 100000 + 10;

  while (i < n && cur <= hardCap) {
    const string curStr = to_string(cur);
    const int len = static_cast<int>(curStr.size());
    if (i + len <= n && s.compare(i, len, curStr) == 0) {
      i += len;
      ++cur;
      continue;
    }
    if (static_cast<int>(missing.size()) >= allowedMissing) return false;
    missing.push_back(cur);
    ++cur;
  }

  if (i != n) return false;

  // Optional trailing miss: the eaten number is b, after the written prefix.
  while (static_cast<int>(missing.size()) < allowedMissing && cur <= hardCap) {
    missing.push_back(cur);
    ++cur;
  }

  if (static_cast<int>(missing.size()) != allowedMissing) return false;

  // Original range is [start, cur - 1] and must satisfy start < cur - 1.
  if (start >= cur - 1) return false;

  for (int m : missing) {
    if (m < 1 || m > 99999) return false;
  }
  missingOut = missing;
  return true;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int t;
  cin >> t;
  while (t--) {
    string s;
    cin >> s;
    set<int> answers;
    const int n = static_cast<int>(s.size());

    for (int d = 1; d <= 5 && d <= n; ++d) {
      if (s[0] == '0') break;
      const string lead = s.substr(0, d);
      // Reject leading zeros (e.g. "01").
      if (to_string(stoll(lead)) != lead) continue;
      const int X = stoi(lead);
      if (X < 1 || X > 99999) continue;

      // Case A: leading value is a; exactly one miss somewhere in [a, b].
      {
        vector<int> missing;
        if (parseWithStart(s, X, 1, missing)) {
          for (int m : missing) answers.insert(m);
        }
      }

      // Case B: leading value is a+1; a was eaten; no further misses.
      if (X >= 2) {
        vector<int> missing;
        if (parseWithStart(s, X, 0, missing)) {
          const int a = X - 1;
          // b is the last number of the parse: we need a < b.
          // parseWithStart already ensures X < finalB, so a < b holds.
          answers.insert(a);
        }
      }
    }

    cout << answers.size() << '\n';
    bool first = true;
    for (int m : answers) {
      if (!first) cout << ' ';
      first = false;
      cout << m;
    }
    cout << '\n';
  }
}
