#include <algorithm>
#include <iostream>
#include <numeric>
#include <tuple>
#include <utility>
#include <vector>
using namespace std;

using int64 = long long;

struct KruskalDSU {
  vector<int> parent;
  explicit KruskalDSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }
  int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
  }
  bool unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a == b) return false;
    parent[a] = b;
    return true;
  }
};

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;

  struct Edge {
    int w, a, b, id;
  };
  vector<Edge> edges(m);
  for (int i = 0; i < m; ++i) {
    cin >> edges[i].a >> edges[i].b >> edges[i].w;
    edges[i].id = i;
  }

  sort(edges.begin(), edges.end(),
       [](const Edge& x, const Edge& y) { return x.w < y.w; });

  KruskalDSU dsu(n + 1);
  vector<char> inMst(m, 0);
  vector<vector<pair<int, int>>> tree(n + 1);
  int64 mstWeight = 0;
  int taken = 0;

  for (const Edge& e : edges) {
    if (dsu.unite(e.a, e.b)) {
      inMst[e.id] = 1;
      tree[e.a].push_back({e.b, e.w});
      tree[e.b].push_back({e.a, e.w});
      mstWeight += e.w;
      if (++taken == n - 1) break;
    }
  }

  vector<int> parent(n + 1, 0);
  vector<int> depth(n + 1, 0);
  vector<int> edgeToParent(n + 1, 0);
  vector<int> stack = {1};
  parent[1] = 0;

  while (!stack.empty()) {
    const int u = stack.back();
    stack.pop_back();
    for (auto [v, w] : tree[u]) {
      if (v == parent[u]) continue;
      parent[v] = u;
      depth[v] = depth[u] + 1;
      edgeToParent[v] = w;
      stack.push_back(v);
    }
  }

  // jump[u] skips past tree edges whose replacement is already known.
  vector<int> jump(n + 1);
  iota(jump.begin(), jump.end(), 0);
  const int INF = 2e9;
  vector<int> repl(n + 1, INF);

  auto findJump = [&](auto&& self, int x) -> int {
    if (jump[x] == x) return x;
    return jump[x] = self(self, jump[x]);
  };

  auto assignPath = [&](int u, int v, int w) {
    u = findJump(findJump, u);
    v = findJump(findJump, v);
    while (u != v) {
      if (depth[u] < depth[v]) swap(u, v);
      repl[u] = w;
      jump[u] = parent[u];
      u = findJump(findJump, u);
      v = findJump(findJump, v);
    }
  };

  vector<Edge> nonTree;
  for (const Edge& e : edges) {
    if (!inMst[e.id]) nonTree.push_back(e);
  }
  sort(nonTree.begin(), nonTree.end(),
       [](const Edge& x, const Edge& y) { return x.w < y.w; });

  for (const Edge& e : nonTree) {
    assignPath(e.a, e.b, e.w);
  }

  int64 best = mstWeight;
  for (int v = 2; v <= n; ++v) {
    if (repl[v] >= INF / 2) continue;
    best = max(best, mstWeight - static_cast<int64>(edgeToParent[v]) + repl[v]);
  }

  cout << best << '\n';
}
