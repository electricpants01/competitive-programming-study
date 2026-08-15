#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, a, b;
  cin >> n >> a >> b;

  bool hasMin = false;
  bool hasMax = false;
  for (int i = 0; i < n - 1; ++i) {
    int w;
    cin >> w;
    if (w == a) hasMin = true;
    if (w == b) hasMax = true;
  }

  vector<int> ans;
  if (!hasMin && !hasMax) {
    if (a == b) ans.push_back(a);
  } else if (!hasMin) {
    ans.push_back(a);
  } else if (!hasMax) {
    ans.push_back(b);
  } else {
    for (int x = a; x <= b; ++x) ans.push_back(x);
  }

  if (ans.empty()) {
    cout << -1 << '\n';
  } else {
    for (size_t i = 0; i < ans.size(); ++i) {
      if (i) cout << ' ';
      cout << ans[i];
    }
    cout << '\n';
  }
}
