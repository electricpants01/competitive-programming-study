#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

const int MOD = 1'000'000'007;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> to(n + 1);
  vector<vector<int>> parents(n + 1);
  for (int i = 1; i <= n; ++i) {
    cin >> to[i];
    parents[to[i]].push_back(i);
  }

  vector<int> state(n + 1, 0);
  vector<char> onCycle(n + 1, 0);
  vector<int> cycleId(n + 1, -1);
  vector<vector<int>> cycleNodes;

  for (int start = 1; start <= n; ++start) {
    if (state[start] != 0) continue;
    vector<int> path;
    int v = start;
    while (state[v] == 0) {
      state[v] = 1;
      path.push_back(v);
      v = to[v];
    }
    if (state[v] == 1) {
      vector<int> cycle;
      bool inCycle = false;
      for (int u : path) {
        if (u == v) inCycle = true;
        if (inCycle) {
          onCycle[u] = 1;
          cycleId[u] = static_cast<int>(cycleNodes.size());
          cycle.push_back(u);
        }
      }
      cycleNodes.push_back(cycle);
    }
    for (int u : path) state[u] = 2;
  }

  const int components = static_cast<int>(cycleNodes.size());

  // Topological order on reversed tree edges (leaves first): Kahn on in-trees.
  // A tree node u must be processed after all of its parents (nodes pointing to u).
  vector<int> indeg(n + 1, 0);
  for (int u = 1; u <= n; ++u) {
    if (onCycle[u]) continue;
    for (int p : parents[u]) {
      if (!onCycle[p]) ++indeg[u];
    }
  }

  vector<int> order;
  order.reserve(n);
  vector<int> stack;
  for (int u = 1; u <= n; ++u) {
    if (!onCycle[u] && indeg[u] == 0) stack.push_back(u);
  }
  while (!stack.empty()) {
    const int u = stack.back();
    stack.pop_back();
    order.push_back(u);
    // u points to to[u]; that increases "ready parents" for to[u] if tree node
    const int nxt = to[u];
    if (!onCycle[nxt]) {
      if (--indeg[nxt] == 0) stack.push_back(nxt);
    }
  }

  // Process leaves first: parents appear before children in this order? 
  // indeg[u] = number of tree parents. Leaves (no parents) first.
  // f[u] depends on f[parents], so parents must be computed first — leaves-first is correct.

  vector<int64> f(n + 1, 1);
  for (int u : order) {
    int64 ways = 1;
    for (int p : parents[u]) {
      if (onCycle[p]) continue;
      ways = ways * ((1 + f[p]) % MOD) % MOD;
    }
    f[u] = ways;
  }

  int64 answer = 1;
  for (int c = 0; c < components; ++c) {
    int64 nonempty = 1;
    for (int u : cycleNodes[c]) {
      for (int p : parents[u]) {
        if (onCycle[p]) continue;
        nonempty = nonempty * ((1 + f[p]) % MOD) % MOD;
      }
    }
    answer = answer * ((nonempty + 1) % MOD) % MOD;
  }

  answer = (answer - 1 + MOD) % MOD;
  cout << answer << '\n';
}
