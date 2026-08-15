#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<string> grid(n);
  for (int i = 0; i < n; ++i) cin >> grid[i];

  const int dr[4] = {-1, 1, 0, 0};
  const int dc[4] = {0, 0, -1, 1};

  auto blocked = [&](int r, int c) {
    char ch = grid[r][c];
    return ch == 'X' || (ch >= '0' && ch <= '4');
  };

  auto inBounds = [&](int r, int c) {
    return r >= 0 && r < n && c >= 0 && c < n;
  };

  vector<vector<char>> lit(n, vector<char>(n, 0));

  // Shine from every bulb; reject if two bulbs see each other.
  for (int r = 0; r < n; ++r) {
    for (int c = 0; c < n; ++c) {
      if (grid[r][c] != '?') continue;
      for (int d = 0; d < 4; ++d) {
        int nr = r + dr[d];
        int nc = c + dc[d];
        while (inBounds(nr, nc) && !blocked(nr, nc)) {
          if (grid[nr][nc] == '?') {
            cout << 0 << '\n';
            return 0;
          }
          lit[nr][nc] = 1;
          nr += dr[d];
          nc += dc[d];
        }
      }
      lit[r][c] = 1;  // bulb cell is lit
    }
  }

  // Every open cell must be lit.
  for (int r = 0; r < n; ++r) {
    for (int c = 0; c < n; ++c) {
      if (grid[r][c] == '.' && !lit[r][c]) {
        cout << 0 << '\n';
        return 0;
      }
    }
  }

  // Numbered walls must have the exact adjacent bulb count.
  for (int r = 0; r < n; ++r) {
    for (int c = 0; c < n; ++c) {
      if (grid[r][c] < '0' || grid[r][c] > '4') continue;
      int need = grid[r][c] - '0';
      int have = 0;
      for (int d = 0; d < 4; ++d) {
        int nr = r + dr[d];
        int nc = c + dc[d];
        if (inBounds(nr, nc) && grid[nr][nc] == '?') ++have;
      }
      if (have != need) {
        cout << 0 << '\n';
        return 0;
      }
    }
  }

  cout << 1 << '\n';
}
