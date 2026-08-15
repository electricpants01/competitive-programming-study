#include <iomanip>
#include <iostream>
#include <string>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  string s, t;
  cin >> n >> s >> t;

  int total = 0;
  int collapsed = 0;
  for (int i = 0; i < n; ++i) {
    if (s[i] == '*') {
      ++total;
      if (t[i] != '*') {
        ++collapsed;
      }
    }
  }

  cout << fixed << setprecision(2) << static_cast<double>(collapsed) / total << '\n';
  return 0;
}
