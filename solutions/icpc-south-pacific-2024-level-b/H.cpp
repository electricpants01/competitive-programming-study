#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, k;
  cin >> n >> k;
  vector<int> parent(n + 1, 0);
  vector<vector<int>> children(n + 1);
  for (int i = 2; i <= n; ++i) {
    cin >> parent[i];
    children[parent[i]].push_back(i);
  }

  vector<int> depth(n + 1, 0);
  vector<int> order = {1};
  for (size_t i = 0; i < order.size(); ++i) {
    int u = order[i];
    for (int v : children[u]) {
      depth[v] = depth[u] + 1;
      order.push_back(v);
    }
  }

  // Binary lifting for k-th ancestor.
  int LOG = 1;
  while ((1 << LOG) <= n) ++LOG;
  vector<vector<int>> jump(LOG, vector<int>(n + 1, 0));
  for (int i = 1; i <= n; ++i) jump[0][i] = (i == 1 ? 1 : parent[i]);
  for (int j = 1; j < LOG; ++j) {
    for (int i = 1; i <= n; ++i) {
      jump[j][i] = jump[j - 1][jump[j - 1][i]];
    }
  }

  auto kthAncestor = [&](int u, int steps) {
    for (int j = 0; j < LOG; ++j) {
      if (steps & (1 << j)) u = jump[j][u];
    }
    return u;
  };

  vector<char> trained(n + 1, 0);
  int answer = 0;

  // nearest[u] = depth of nearest trained ancestor on the path to root
  // (including u). -1 if none yet.
  vector<int> nearestDepth(n + 1, -1);

  vector<int> nodes = order;
  sort(nodes.begin(), nodes.end(), [&](int a, int b) { return depth[a] > depth[b]; });

  auto recompute = [&]() {
    nearestDepth.assign(n + 1, -1);
    for (int u : order) {
      if (trained[u]) nearestDepth[u] = depth[u];
      else if (u != 1) nearestDepth[u] = nearestDepth[parent[u]];
    }
  };

  for (int u : nodes) {
    recompute();
    bool covered = nearestDepth[u] != -1 && depth[u] - nearestDepth[u] <= k;
    if (!covered) {
      int place = kthAncestor(u, k);
      if (!trained[place]) {
        trained[place] = 1;
        ++answer;
      }
    }
  }

  recompute();
  if (!(nearestDepth[1] != -1 && depth[1] - nearestDepth[1] <= k)) {
    if (!trained[1]) {
      trained[1] = 1;
      ++answer;
    }
  }

  cout << answer << '\n';
}
