#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  vector<vector<int>> H(n, vector<int>(n)), C(n, vector<int>(n));
  for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j) cin >> H[i][j];
  for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j) cin >> C[i][j];

  vector<long long> best(n, 0);
  for (int b = 0; b < n; ++b) {
    long long mx = 0;
    for (int a = 0; a < n; ++a) {
      mx = max(mx, (long long)abs(H[a][b] - C[a][b]));
    }
    best[b] = mx;
  }

  long long ans = 0;
  for (int i = 0; i < m; ++i) {
    int b;
    cin >> b;
    ans += best[b - 1];
  }
  cout << ans << '\n';
  return 0;
}
