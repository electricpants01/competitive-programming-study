#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

using int64 = long long;

struct Edge {
  int to;
  int64 capacity;
  int rev;
};

struct Dinic {
  int n;
  vector<vector<Edge>> graph;
  vector<int> level;
  vector<int> iter;

  explicit Dinic(int n) : n(n), graph(n), level(n), iter(n) {}

  void addEdge(int from, int to, int64 capacity) {
    graph[from].push_back({to, capacity, static_cast<int>(graph[to].size())});
    graph[to].push_back({from, 0, static_cast<int>(graph[from].size()) - 1});
  }

  void bfs(int s) {
    fill(level.begin(), level.end(), -1);
    queue<int> q;
    level[s] = 0;
    q.push(s);
    while (!q.empty()) {
      int v = q.front();
      q.pop();
      for (const Edge& e : graph[v]) {
        if (e.capacity > 0 && level[e.to] < 0) {
          level[e.to] = level[v] + 1;
          q.push(e.to);
        }
      }
    }
  }

  int64 dfs(int v, int t, int64 f) {
    if (v == t) return f;
    for (int& i = iter[v]; i < static_cast<int>(graph[v].size()); ++i) {
      Edge& e = graph[v][i];
      if (e.capacity > 0 && level[v] < level[e.to]) {
        int64 d = dfs(e.to, t, min(f, e.capacity));
        if (d > 0) {
          e.capacity -= d;
          graph[e.to][e.rev].capacity += d;
          return d;
        }
      }
    }
    return 0;
  }

  int64 maxFlow(int s, int t) {
    int64 flow = 0;
    const int64 INF = (1LL << 62);
    while (true) {
      bfs(s);
      if (level[t] < 0) return flow;
      fill(iter.begin(), iter.end(), 0);
      int64 f;
      while ((f = dfs(s, t, INF)) > 0) flow += f;
    }
  }
};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  int64 friendsLimit;
  cin >> n >> friendsLimit;

  vector<vector<int64>> original(n, vector<int64>(n, 0));
  Dinic dinic(n);
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < n; ++j) {
      cin >> original[i][j];
      if (original[i][j] > 0) dinic.addEdge(i, j, original[i][j]);
    }
  }

  int64 flow = dinic.maxFlow(0, n - 1);
  int64 removeNeeded = max(0LL, flow - friendsLimit);

  // Min-cut: nodes reachable from source in residual graph.
  vector<char> inSourceSide(n, 0);
  queue<int> q;
  q.push(0);
  inSourceSide[0] = 1;
  while (!q.empty()) {
    int v = q.front();
    q.pop();
    for (const Edge& e : dinic.graph[v]) {
      if (e.capacity > 0 && !inSourceSide[e.to]) {
        inSourceSide[e.to] = 1;
        q.push(e.to);
      }
    }
  }

  vector<vector<int64>> remaining = original;
  // Remove capacity only from cut edges (S -> T) until removeNeeded is spent.
  for (int i = 0; i < n && removeNeeded > 0; ++i) {
    if (!inSourceSide[i]) continue;
    for (int j = 0; j < n && removeNeeded > 0; ++j) {
      if (inSourceSide[j]) continue;
      int64 canRemove = min(remaining[i][j], removeNeeded);
      remaining[i][j] -= canRemove;
      removeNeeded -= canRemove;
    }
  }

  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < n; ++j) {
      if (j) cout << ' ';
      cout << remaining[i][j];
    }
    cout << '\n';
  }
}
