#include <iostream>
#include <string>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string s;
  cin >> s;
  const int n = static_cast<int>(s.size());

  // Append the fewest characters so the result is a palindrome starting with s.
  // With final length m = n+k, every pair (i, m-1-i) both inside s must already match.
  for (int k = 0; k <= n; ++k) {
    const int m = n + k;
    bool ok = true;
    for (int i = 0; i < n; ++i) {
      const int j = m - 1 - i;
      if (j < n && s[i] != s[j]) {
        ok = false;
        break;
      }
    }
    if (ok) {
      cout << k << '\n';
      return 0;
    }
  }
}
