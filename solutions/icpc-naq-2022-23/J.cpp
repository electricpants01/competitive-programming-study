#include <algorithm>
#include <iostream>
#include <queue>
#include <string>
#include <vector>
using namespace std;

struct Dinic {
  struct Edge {
    int to;
    int rev;
    int cap;
  };

  int n;
  vector<vector<Edge>> g;
  vector<int> level;
  vector<int> it;

  explicit Dinic(int n) : n(n), g(n), level(n), it(n) {}

  void addEdge(int from, int to, int cap) {
    g[from].push_back({to, static_cast<int>(g[to].size()), cap});
    g[to].push_back({from, static_cast<int>(g[from].size()) - 1, 0});
  }

  bool bfs(int s, int t) {
    fill(level.begin(), level.end(), -1);
    queue<int> q;
    level[s] = 0;
    q.push(s);
    while (!q.empty()) {
      const int v = q.front();
      q.pop();
      for (const Edge& e : g[v]) {
        if (e.cap > 0 && level[e.to] < 0) {
          level[e.to] = level[v] + 1;
          q.push(e.to);
        }
      }
    }
    return level[t] >= 0;
  }

  int dfs(int v, int t, int f) {
    if (v == t) return f;
    for (int& i = it[v]; i < static_cast<int>(g[v].size()); ++i) {
      Edge& e = g[v][i];
      if (e.cap <= 0 || level[v] >= level[e.to]) continue;
      const int got = dfs(e.to, t, min(f, e.cap));
      if (got > 0) {
        e.cap -= got;
        g[e.to][e.rev].cap += got;
        return got;
      }
    }
    return 0;
  }

  int maxFlow(int s, int t) {
    int flow = 0;
    while (bfs(s, t)) {
      fill(it.begin(), it.end(), 0);
      int f;
      while ((f = dfs(s, t, 1e9)) > 0) flow += f;
    }
    return flow;
  }
};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m, t;
  cin >> n >> m >> t;
  string sink;
  getline(cin, sink);

  vector<string> grid(n);
  for (int i = 0; i < n; ++i) getline(cin, grid[i]);

  auto passable = [&](int r, int c) {
    if (r < 0 || r >= n || c < 0 || c >= m) return false;
    return grid[r][c] != '#';
  };

  // Node layout for each time layer and cell: in = base, out = base + 1
  // index(time, cell, which): which 0=in, 1=out
  const int cells = n * m;
  auto cellId = [&](int r, int c) { return r * m + c; };
  auto nodeId = [&](int time, int cell, int which) {
    return time * (2 * cells) + cell * 2 + which;
  };

  const int source = (t + 1) * 2 * cells;
  const int sinkNode = source + 1;
  Dinic dinic(sinkNode + 1);

  const int dr[5] = {0, -1, 1, 0, 0};  // stay + 4 dirs
  const int dc[5] = {0, 0, 0, -1, 1};

  for (int time = 0; time <= t; ++time) {
    for (int r = 0; r < n; ++r) {
      for (int c = 0; c < m; ++c) {
        if (!passable(r, c)) continue;
        const int cell = cellId(r, c);
        // capacity 1 through the cell at this time
        dinic.addEdge(nodeId(time, cell, 0), nodeId(time, cell, 1), 1);

        if (grid[r][c] == 'E') {
          // From exit out-node, can go to sink at any time (person is safe in exit)
          dinic.addEdge(nodeId(time, cell, 1), sinkNode, 1);
        }

        if (time == t) continue;
        for (int k = 0; k < 5; ++k) {
          const int nr = r + dr[k];
          const int nc = c + dc[k];
          if (!passable(nr, nc)) continue;
          dinic.addEdge(
              nodeId(time, cell, 1),
              nodeId(time + 1, cellId(nr, nc), 0),
              1);
        }
      }
    }
  }

  for (int r = 0; r < n; ++r) {
    for (int c = 0; c < m; ++c) {
      if (grid[r][c] == 'P') {
        dinic.addEdge(source, nodeId(0, cellId(r, c), 0), 1);
      }
    }
  }

  cout << dinic.maxFlow(source, sinkNode) << '\n';
}
