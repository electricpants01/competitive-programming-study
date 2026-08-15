#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  cin >> n;
  int rows = 2 * n - 1;
  vector<vector<int>> a(rows);
  for (int r = 0; r < rows; ++r) {
    int cnt = (r < n) ? (n + r) : (3 * n - 2 - r);
    a[r].resize(cnt);
    for (int c = 0; c < cnt; ++c) cin >> a[r][c];
  }

  // Hex neighbors in this pointy-top / flat storage:
  // For row r, neighbors: (r,c-1),(r,c+1),
  // (r-1, c-1 or c), (r-1, c or c+1), similarly r+1 depending on whether
  // row lengths increase or decrease.
  auto neighbors = [&](int r, int c) {
    vector<pair<int, int>> res;
    auto add = [&](int nr, int nc) {
      if (nr < 0 || nr >= rows) return;
      if (nc < 0 || nc >= (int)a[nr].size()) return;
      res.push_back({nr, nc});
    };
    add(r, c - 1);
    add(r, c + 1);
    // upper row
    if (r > 0) {
      if (r <= n - 1) {
        // lengths increase: upper is shorter by 1, aligned to the left+0.5
        add(r - 1, c - 1);
        add(r - 1, c);
      } else {
        // lengths decrease going down, so going up length increases
        add(r - 1, c);
        add(r - 1, c + 1);
      }
    }
    // lower row
    if (r + 1 < rows) {
      if (r < n - 1) {
        add(r + 1, c);
        add(r + 1, c + 1);
      } else {
        add(r + 1, c - 1);
        add(r + 1, c);
      }
    }
    return res;
  };

  // For center (r,c), largest s: all cells at hex distance < s same color.
  // Compute hex distance via BFS.
  for (int r = 0; r < rows; ++r) {
    for (int c = 0; c < (int)a[r].size(); ++c) {
      int color = a[r][c];
      vector<vector<int>> dist(rows);
      for (int i = 0; i < rows; ++i) dist[i].assign(a[i].size(), -1);
      queue<pair<int, int>> q;
      dist[r][c] = 0;
      q.push({r, c});
      int maxd = 0;
      bool broken = false;
      while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        maxd = max(maxd, dist[x][y]);
        for (auto [nx, ny] : neighbors(x, y)) {
          if (dist[nx][ny] != -1) continue;
          if (a[nx][ny] != color) {
            // cannot include this cell; radius limited to dist[x][y]
            continue;
          }
          dist[nx][ny] = dist[x][y] + 1;
          q.push({nx, ny});
        }
      }
      // Find max s such that every cell with graph-dist < s exists and matches.
      // Also every hex-ball cell must be present: verify by checking count.
      int best = 1;
      for (int s = 2; s <= n; ++s) {
        int need = 3 * s * (s - 1) + 1;
        int got = 0;
        bool ok = true;
        for (int i = 0; i < rows; ++i)
          for (int j = 0; j < (int)a[i].size(); ++j)
            if (dist[i][j] >= 0 && dist[i][j] < s) ++got;
        // Also ensure no missing: if a same-color cell is unreachable at dist<s due to
        // geometry holes, got < need.
        // Additionally, a different-color neighbor at dist s-1 blocks? already excluded.
        if (got == need) best = s;
        else break;
      }
      if (c) cout << ' ';
      cout << best;
    }
    cout << '\n';
  }
  return 0;
}
