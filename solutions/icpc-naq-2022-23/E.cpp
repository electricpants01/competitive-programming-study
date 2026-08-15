#include <iostream>
#include <queue>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  string sink;
  getline(cin, sink);  // end of first line

  vector<string> grid(n);
  for (int i = 0; i < n; ++i) getline(cin, grid[i]);

  const int dr[4] = {-1, 1, 0, 0};
  const int dc[4] = {0, 0, -1, 1};

  auto inside = [&](int r, int c) {
    return r >= 0 && r < n && c >= 0 && c < m;
  };
  auto isWalkable = [&](int r, int c) {
    const char ch = grid[r][c];
    return ch == '.' || ch == ' ';
  };

  int players = 0;
  for (char entrance = 'A'; entrance <= 'W'; ++entrance) {
    queue<pair<int, int>> q;
    vector<vector<char>> vis(n, vector<char>(m, 0));
    int dots = 0;
    bool found = false;

    for (int r = 0; r < n; ++r) {
      for (int c = 0; c < m; ++c) {
        if (grid[r][c] == entrance) {
          found = true;
          q.push({r, c});
          vis[r][c] = 1;
        }
      }
    }
    if (!found) continue;

    while (!q.empty()) {
      auto [r, c] = q.front();
      q.pop();
      for (int k = 0; k < 4; ++k) {
        const int nr = r + dr[k];
        const int nc = c + dc[k];
        if (!inside(nr, nc) || vis[nr][nc] || !isWalkable(nr, nc)) continue;
        vis[nr][nc] = 1;
        if (grid[nr][nc] == '.') ++dots;
        q.push({nr, nc});
      }
    }

    if (dots > 0) {
      ++players;
      for (int r = 0; r < n; ++r) {
        for (int c = 0; c < m; ++c) {
          if (vis[r][c] && grid[r][c] == '.') grid[r][c] = ' ';
        }
      }
    }
  }

  int unreachable = 0;
  for (int r = 0; r < n; ++r) {
    for (int c = 0; c < m; ++c) {
      if (grid[r][c] == '.') ++unreachable;
    }
  }

  cout << players << ' ' << unreachable << '\n';
}
