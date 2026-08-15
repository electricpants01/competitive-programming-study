#include <algorithm>
#include <functional>
#include <iostream>
#include <numeric>
#include <utility>
#include <vector>
using namespace std;

struct DSU {
  vector<int> p, r;
  DSU(int n = 0) { init(n); }
  void init(int n) {
    p.resize(n);
    iota(p.begin(), p.end(), 0);
    r.assign(n, 0);
  }
  int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
  bool unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a == b) return false;
    if (r[a] < r[b]) swap(a, b);
    p[b] = a;
    if (r[a] == r[b]) ++r[a];
    return true;
  }
};

struct Edge {
  int u, v, w, id;
};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  vector<Edge> edges(m);
  for (int i = 0; i < m; ++i) {
    cin >> edges[i].u >> edges[i].v >> edges[i].w;
    --edges[i].u;
    --edges[i].v;
    edges[i].id = i;
  }
  sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
    return a.w < b.w;
  });

  vector<int> ans(m, 3);
  DSU dsu(n);
  int i = 0;
  while (i < m) {
    int j = i;
    while (j < m && edges[j].w == edges[i].w) ++j;

    // candidate edges connecting different components
    vector<pair<int, int>> cand;  // (compressed endpoints via temp)
    vector<int> nodes;
    for (int k = i; k < j; ++k) {
      int a = dsu.find(edges[k].u);
      int b = dsu.find(edges[k].v);
      if (a != b) {
        nodes.push_back(a);
        nodes.push_back(b);
      }
    }
    sort(nodes.begin(), nodes.end());
    nodes.erase(unique(nodes.begin(), nodes.end()), nodes.end());
    auto idx = [&](int x) {
      return (int)(lower_bound(nodes.begin(), nodes.end(), x) - nodes.begin());
    };

    int N = (int)nodes.size();
    vector<vector<pair<int, int>>> g(N);
    vector<int> candIds;
    for (int k = i; k < j; ++k) {
      int a = dsu.find(edges[k].u);
      int b = dsu.find(edges[k].v);
      if (a == b) {
        ans[edges[k].id] = 3;
      } else {
        int ua = idx(a), ub = idx(b);
        g[ua].push_back({ub, edges[k].id});
        g[ub].push_back({ua, edges[k].id});
        candIds.push_back(edges[k].id);
        ans[edges[k].id] = 2;  // default some MST
      }
    }

    // bridges in this multigraph are type 1
    vector<int> tin(N, -1), low(N, 0);
    vector<char> isBridgeEdge(m, 0);
    int timer = 0;
    function<void(int, int)> dfs = [&](int v, int pe) {
      tin[v] = low[v] = timer++;
      for (auto [to, eid] : g[v]) {
        if (eid == pe) continue;
        if (tin[to] != -1) {
          low[v] = min(low[v], tin[to]);
        } else {
          dfs(to, eid);
          low[v] = min(low[v], low[to]);
          if (low[to] > tin[v]) isBridgeEdge[eid] = 1;
        }
      }
    };
    for (int v = 0; v < N; ++v)
      if (tin[v] == -1) dfs(v, -1);
    for (int eid : candIds)
      if (isBridgeEdge[eid]) ans[eid] = 1;

    // unite for next weights
    for (int k = i; k < j; ++k) dsu.unite(edges[k].u, edges[k].v);
    i = j;
  }

  for (int x : ans) cout << x << '\n';
  return 0;
}
