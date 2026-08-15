#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

struct DSU {
  vector<int> parent;
  vector<int> size;

  explicit DSU(int n) : parent(n + 1), size(n + 1, 1) {
    for (int i = 1; i <= n; ++i) parent[i] = i;
  }

  int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
  }

  void unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a == b) return;
    if (size[a] < size[b]) swap(a, b);
    parent[b] = a;
    size[a] += size[b];
  }
};

struct Edge {
  int u;
  int v;
  int w;
};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m, q;
  cin >> n >> m >> q;
  vector<Edge> edges(m);
  for (int i = 0; i < m; ++i) cin >> edges[i].u >> edges[i].v >> edges[i].w;
  sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
    return a.w < b.w;
  });

  // Build MST.
  DSU mstDsu(n);
  vector<Edge> mst;
  mst.reserve(n - 1);
  for (const Edge& e : edges) {
    if (mstDsu.find(e.u) == mstDsu.find(e.v)) continue;
    mstDsu.unite(e.u, e.v);
    mst.push_back(e);
  }

  vector<vector<pair<int, int>>> adj(n + 1);
  for (const Edge& e : mst) {
    adj[e.u].push_back({e.v, e.w});
    adj[e.v].push_back({e.u, e.w});
  }

  const int LOG = 18;
  vector<int> depth(n + 1, 0);
  vector<vector<int>> up(LOG, vector<int>(n + 1, 0));
  vector<vector<int>> mx(LOG, vector<int>(n + 1, 0));

  auto dfs = [&](auto&& self, int v, int p, int wToParent) -> void {
    up[0][v] = p;
    mx[0][v] = wToParent;
    for (auto [to, w] : adj[v]) {
      if (to == p) continue;
      depth[to] = depth[v] + 1;
      self(self, to, v, w);
    }
  };
  dfs(dfs, 1, 0, 0);

  for (int j = 1; j < LOG; ++j) {
    for (int v = 1; v <= n; ++v) {
      const int mid = up[j - 1][v];
      up[j][v] = up[j - 1][mid];
      mx[j][v] = max(mx[j - 1][v], mx[j - 1][mid]);
    }
  }

  auto maxOnPath = [&](int a, int b) {
    if (depth[a] < depth[b]) swap(a, b);
    int best = 0;
    int diff = depth[a] - depth[b];
    for (int j = 0; j < LOG; ++j) {
      if (diff & (1 << j)) {
        best = max(best, mx[j][a]);
        a = up[j][a];
      }
    }
    if (a == b) return best;
    for (int j = LOG - 1; j >= 0; --j) {
      if (up[j][a] != up[j][b]) {
        best = max(best, max(mx[j][a], mx[j][b]));
        a = up[j][a];
        b = up[j][b];
      }
    }
    best = max(best, max(mx[0][a], mx[0][b]));
    return best;
  };

  struct Query {
    int a;
    int b;
    int idx;
    int w;
  };
  vector<Query> queries(q);
  for (int i = 0; i < q; ++i) {
    cin >> queries[i].a >> queries[i].b;
    queries[i].idx = i;
    queries[i].w = maxOnPath(queries[i].a, queries[i].b);
  }

  sort(queries.begin(), queries.end(), [](const Query& x, const Query& y) {
    return x.w < y.w;
  });
  sort(mst.begin(), mst.end(), [](const Edge& a, const Edge& b) {
    return a.w < b.w;
  });

  DSU dsu(n);
  vector<pair<int, int>> answers(q);
  int ei = 0;
  for (const Query& query : queries) {
    while (ei < static_cast<int>(mst.size()) && mst[ei].w <= query.w) {
      dsu.unite(mst[ei].u, mst[ei].v);
      ++ei;
    }
    const int root = dsu.find(query.a);
    answers[query.idx] = {query.w, dsu.size[root]};
  }

  for (auto [w, k] : answers) cout << w << ' ' << k << '\n';
}
