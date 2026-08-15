#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  vector<string> g(n);
  for (int i = 0; i < n; ++i) cin >> g[i];
  vector<vector<char>> lit(n, vector<char>(m, 0));

  auto lightFrom = [&](int x, int y) {
    lit[x][y] = 1;
    for (int i = x - 1; i >= 0 && g[i][y] != '#'; --i) lit[i][y] = 1;
    for (int i = x + 1; i < n && g[i][y] != '#'; ++i) lit[i][y] = 1;
    for (int j = y - 1; j >= 0 && g[x][j] != '#'; --j) lit[x][j] = 1;
    for (int j = y + 1; j < m && g[x][j] != '#'; ++j) lit[x][j] = 1;
  };

  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < m; ++j) {
      if (g[i][j] == '.' && !lit[i][j]) {
        g[i][j] = 'L';
        lightFrom(i, j);
      }
    }
  }
  for (auto& row : g) cout << row << '\n';
  return 0;
}
