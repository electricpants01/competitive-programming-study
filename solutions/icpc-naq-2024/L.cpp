#include <iostream>
#include <queue>
#include <string>
#include <unordered_set>
#include <vector>
using namespace std;

struct SnakeState {
  vector<pair<int, int>> body;  // head at index 0, tail at back
};

string encode(const vector<pair<int, int>>& body) {
  string key;
  key.reserve(body.size() * 2);
  for (auto [r, c] : body) {
    key.push_back(static_cast<char>(r + 1));
    key.push_back(static_cast<char>(c + 1));
  }
  return key;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int rows, cols;
  cin >> rows >> cols;
  vector<string> grid(rows);
  for (int i = 0; i < rows; ++i) cin >> grid[i];

  vector<pair<int, int>> initial(16, {-1, -1});
  int appleR = -1, appleC = -1;
  int length = 0;

  auto hexValue = [](char ch) -> int {
    if (ch >= '0' && ch <= '9') return ch - '0';
    if (ch >= 'a' && ch <= 'f') return 10 + (ch - 'a');
    return -1;
  };

  for (int r = 0; r < rows; ++r) {
    for (int c = 0; c < cols; ++c) {
      char ch = grid[r][c];
      if (ch == 'A') {
        appleR = r;
        appleC = c;
      } else {
        int hv = hexValue(ch);
        if (hv >= 0) {
          initial[hv] = {r, c};
          length = max(length, hv + 1);
        }
      }
    }
  }

  vector<pair<int, int>> startBody(length);
  for (int i = 0; i < length; ++i) startBody[i] = initial[i];

  const int dr[4] = {-1, 1, 0, 0};
  const int dc[4] = {0, 0, -1, 1};

  queue<vector<pair<int, int>>> q;
  unordered_set<string> visited;
  q.push(startBody);
  visited.insert(encode(startBody));

  while (!q.empty()) {
    auto body = q.front();
    q.pop();
    const auto [hr, hc] = body[0];
    if (hr == appleR && hc == appleC) {
      cout << 1 << '\n';
      return 0;
    }

    for (int d = 0; d < 4; ++d) {
      const int nr = hr + dr[d];
      const int nc = hc + dc[d];
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

      // Cannot reverse into the neck (unless length 1).
      if (length >= 2 && nr == body[1].first && nc == body[1].second) continue;

      // Collision with body, except the vacating tail cell.
      bool hit = false;
      for (int i = 0; i < length - 1; ++i) {
        if (body[i].first == nr && body[i].second == nc) {
          hit = true;
          break;
        }
      }
      if (hit) continue;

      vector<pair<int, int>> nextBody(length);
      nextBody[0] = {nr, nc};
      for (int i = 1; i < length; ++i) nextBody[i] = body[i - 1];

      string key = encode(nextBody);
      if (visited.insert(key).second) q.push(std::move(nextBody));
    }
  }

  cout << 0 << '\n';
}
