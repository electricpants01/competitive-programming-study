#include <array>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  if (!(cin >> n)) {
    return 0;
  }
  array<int, 6> cnt{};
  for (int v = 1; v <= 5; ++v) {
    cin >> cnt[v];
  }

  vector<int> options(n + 1, 0);
  for (int i = 1; i <= n; ++i) {
    int m;
    cin >> m;
    for (int j = 0; j < m; ++j) {
      int value;
      cin >> value;
      options[i] |= 1 << (value - 1);
    }
  }

  vector<vector<int>> adj(n + 1);
  for (int e = 0; e < n - 1; ++e) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }

  int p;
  cin >> p;
  vector<pair<int, int>> special(p);
  for (auto& edge : special) {
    cin >> edge.first >> edge.second;
  }

  vector<int> parent(n + 1, 0), depth(n + 1, 0);
  auto dfs = [&](auto&& self, int v, int par) -> void {
    parent[v] = par;
    for (int u : adj[v]) {
      if (u == par) {
        continue;
      }
      depth[u] = depth[v] + 1;
      self(self, u, v);
    }
  };
  if (n >= 1) {
    dfs(dfs, 1, 0);
  }

  auto path_of = [&](int x, int y) {
    vector<int> up_x, up_y;
    while (depth[x] > depth[y]) {
      up_x.push_back(x);
      x = parent[x];
    }
    while (depth[y] > depth[x]) {
      up_y.push_back(y);
      y = parent[y];
    }
    while (x != y) {
      up_x.push_back(x);
      up_y.push_back(y);
      x = parent[x];
      y = parent[y];
    }
    up_x.push_back(x);
    for (int i = static_cast<int>(up_y.size()) - 1; i >= 0; --i) {
      up_x.push_back(up_y[i]);
    }
    return up_x;
  };

  vector<vector<int>> paths;
  vector<char> marked(n + 1, false);
  for (auto [x, y] : special) {
    auto path = path_of(x, y);
    if (static_cast<int>(path.size()) > 5) {
      cout << -1 << '\n';
      return 0;
    }
    for (int v : path) {
      marked[v] = true;
    }
    paths.push_back(move(path));
  }

  vector<int> important;
  for (int i = 1; i <= n; ++i) {
    if (marked[i]) {
      important.push_back(i);
    }
  }

  auto hall_ok = [&](const array<int, 6>& rem, const vector<int>& verts) {
    for (int mask = 1; mask < 32; ++mask) {
      int need = 0;
      for (int bit = 0; bit < 5; ++bit) {
        if (mask & (1 << bit)) {
          need += rem[bit + 1];
        }
      }
      int have = 0;
      for (int v : verts) {
        if (options[v] & mask) {
          ++have;
        }
      }
      if (need > have) {
        return false;
      }
    }
    return true;
  };

  auto assign_free = [&](array<int, 6> rem, vector<int> verts, vector<int>& out) -> bool {
    if (!hall_ok(rem, verts)) {
      return false;
    }
    for (size_t i = 0; i < verts.size(); ++i) {
      int v = verts[i];
      bool placed = false;
      for (int value = 1; value <= 5; ++value) {
        if (rem[value] == 0 || ((options[v] & (1 << (value - 1))) == 0)) {
          continue;
        }
        --rem[value];
        vector<int> rest(verts.begin() + static_cast<long>(i) + 1, verts.end());
        if (hall_ok(rem, rest)) {
          out[v] = value;
          placed = true;
          break;
        }
        ++rem[value];
      }
      if (!placed) {
        return false;
      }
    }
    return true;
  };

  vector<int> assign(n + 1, 0);
  array<int, 6> rem_counts = cnt;
  vector<int> answer;
  bool solved = false;

  auto valid_paths = [&]() {
    for (const auto& path : paths) {
      for (size_t i = 1; i < path.size(); ++i) {
        if (assign[path[i - 1]] >= assign[path[i]]) {
          return false;
        }
      }
    }
    return true;
  };

  auto finish = [&]() {
    if (!valid_paths()) {
      return;
    }
    array<int, 6> rem = cnt;
    for (int v = 1; v <= n; ++v) {
      if (assign[v]) {
        --rem[assign[v]];
        if (rem[assign[v]] < 0) {
          return;
        }
      }
    }
    vector<int> free_verts;
    for (int v = 1; v <= n; ++v) {
      if (!assign[v]) {
        free_verts.push_back(v);
      }
    }
    vector<int> out = assign;
    if (!assign_free(rem, free_verts, out)) {
      return;
    }
    answer = out;
    solved = true;
  };

  auto rec = [&](auto&& self, size_t idx) -> void {
    if (solved) {
      return;
    }
    if (idx == important.size()) {
      finish();
      return;
    }
    int v = important[idx];
    for (int value = 1; value <= 5; ++value) {
      if (rem_counts[value] == 0) {
        continue;
      }
      if ((options[v] & (1 << (value - 1))) == 0) {
        continue;
      }
      assign[v] = value;
      --rem_counts[value];
      self(self, idx + 1);
      ++rem_counts[value];
      assign[v] = 0;
      if (solved) {
        return;
      }
    }
  };

  if (important.empty()) {
    finish();
  } else {
    rec(rec, 0);
  }

  if (!solved) {
    cout << -1 << '\n';
    return 0;
  }
  for (int i = 1; i <= n; ++i) {
    if (i > 1) {
      cout << ' ';
    }
    cout << answer[i];
  }
  cout << '\n';
  return 0;
}
