#include <algorithm>
#include <cstdint>
#include <iostream>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

struct EdgeHash {
  size_t operator()(const uint64_t& x) const { return x; }
};

uint64_t ek(int u, int v) {
  if (u > v) swap(u, v);
  return (uint64_t)u << 32 | (uint32_t)v;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  vector<vector<int>> g(n + 1);
  unordered_set<uint64_t, EdgeHash> edges;
  edges.reserve(m * 2);
  for (int i = 0; i < m; ++i) {
    int u, v;
    cin >> u >> v;
    g[u].push_back(v);
    g[v].push_back(u);
    edges.insert(ek(u, v));
  }

  auto hasEdge = [&](int u, int v) {
    if (u == v) return true;
    return edges.count(ek(u, v)) > 0;
  };

  long long complete = 1LL * n * (n - 1) / 2;
  if (m == complete) {
    for (int i = 2; i <= n; ++i) cout << 1 << ' ' << i << '\n';
    return 0;
  }

  auto isClique = [&](const vector<int>& nodes) {
    for (int i = 0; i < (int)nodes.size(); ++i) {
      for (int j = i + 1; j < (int)nodes.size(); ++j) {
        if (!hasEdge(nodes[i], nodes[j])) return false;
      }
    }
    return true;
  };

  auto neighborhoodIsClique = [&](int v, const vector<char>& alive) {
    vector<int> nb;
    for (int u : g[v]) {
      if (alive[u]) nb.push_back(u);
    }
    return isClique(nb);
  };

  // Reconstruct via leaf peeling (Lex-BFS editorial approach, simplified).
  vector<char> alive(n + 1, 1);
  vector<pair<int, int>> tree;
  vector<int> remaining;
  remaining.reserve(n);
  for (int i = 1; i <= n; ++i) remaining.push_back(i);

  auto degreeAlive = [&](int v) {
    int d = 0;
    for (int u : g[v]) {
      if (alive[u]) ++d;
    }
    return d;
  };

  auto aliveNeighbors = [&](int v) {
    vector<int> nb;
    for (int u : g[v]) {
      if (alive[u]) nb.push_back(u);
    }
    return nb;
  };

  // Special-case small remaining stars at the end.
  while ((int)remaining.size() > 2) {
    vector<int> leaves;
    for (int v : remaining) {
      if (neighborhoodIsClique(v, alive)) leaves.push_back(v);
    }
    if (leaves.empty()) {
      cout << "*\n";
      return 0;
    }

    // Process one leaf group: pick leaf f with maximum degree among leaves.
    sort(leaves.begin(), leaves.end(), [&](int x, int y) {
      return degreeAlive(x) > degreeAlive(y);
    });
    int f = leaves[0];
    vector<int> nb = aliveNeighbors(f);
    int degF = (int)nb.size();
    vector<int> F, I;
    for (int u : nb) {
      if (degreeAlive(u) == degF && neighborhoodIsClique(u, alive)) F.push_back(u);
      else I.push_back(u);
    }

    int parent = -1;
    if (I.empty()) {
      cout << "*\n";
      return 0;
    }
    if ((int)I.size() == 1) {
      parent = I[0];
    } else if ((int)I.size() >= 3) {
      // Parent is the unique vertex in I adjacent to all other vertices in I
      // (star center among I).
      for (int cand : I) {
        bool ok = true;
        for (int o : I) {
          if (o != cand && !hasEdge(cand, o)) {
            ok = false;
            break;
          }
        }
        if (ok) {
          parent = cand;
          break;
        }
      }
      if (parent < 0) {
        cout << "*\n";
        return 0;
      }
    } else {
      // |I| == 2: choose the endpoint already connected in reconstructed tree if any;
      // otherwise prefer the higher-degree vertex.
      int u = I[0], v = I[1];
      bool uUsed = false, vUsed = false;
      for (auto [a, b] : tree) {
        if (a == u || b == u) uUsed = true;
        if (a == v || b == v) vUsed = true;
      }
      if (uUsed && !vUsed) parent = u;
      else if (vUsed && !uUsed) parent = v;
      else parent = degreeAlive(u) >= degreeAlive(v) ? u : v;
    }

    vector<int> group = F;
    group.push_back(f);
    for (int leaf : group) {
      tree.push_back({leaf, parent});
      alive[leaf] = 0;
    }
    vector<int> nextRem;
    for (int v : remaining) {
      if (alive[v]) nextRem.push_back(v);
    }
    remaining.swap(nextRem);
  }

  if ((int)remaining.size() == 2) {
    tree.push_back({remaining[0], remaining[1]});
  } else if ((int)remaining.size() == 1) {
    // Star already fully connected through leaves; nothing to add.
  } else if (remaining.empty()) {
    // ok
  }

  if ((int)tree.size() != n - 1) {
    cout << "*\n";
    return 0;
  }

  // Verify T^2 == G.
  vector<vector<int>> tadj(n + 1);
  for (auto [u, v] : tree) {
    tadj[u].push_back(v);
    tadj[v].push_back(u);
  }

  vector<char> mark(n + 1, 0);
  int stamp = 1;
  vector<int> seenStamp(n + 1, 0);
  for (int v = 1; v <= n; ++v) {
    vector<int> close;
    seenStamp[v] = stamp;
    close.push_back(v);
    for (int u : tadj[v]) {
      if (seenStamp[u] != stamp) {
        seenStamp[u] = stamp;
        close.push_back(u);
      }
      for (int w : tadj[u]) {
        if (seenStamp[w] != stamp) {
          seenStamp[w] = stamp;
          close.push_back(w);
        }
      }
    }
    ++stamp;
    // close must equal {v} ∪ N_G(v)
    unordered_set<int> expect;
    expect.insert(v);
    for (int u : g[v]) expect.insert(u);
    if (close.size() != expect.size()) {
      cout << "*\n";
      return 0;
    }
    for (int u : close) {
      if (!expect.count(u)) {
        cout << "*\n";
        return 0;
      }
    }
  }

  for (auto [u, v] : tree) cout << u << ' ' << v << '\n';
}
