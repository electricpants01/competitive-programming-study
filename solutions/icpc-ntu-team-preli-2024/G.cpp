#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

bool cover(int l, int r, int x, int M) {
  if (l < r) return l <= x && x < r;
  return x >= l || x < r;
}

bool overlap(int l1, int r1, int l2, int r2, int M) {
  // two circular arcs overlap iff each contains an endpoint of the other or nested
  auto containsPt = [&](int l, int r, int x) {
    if (x == r) return false;  // half-open to avoid endpoint-only touch? problem: overlap at coord
    if (l < r) return l <= x && x <= r;  // closed for overlap of intervals on circle
    return x >= l || x <= r;
  };
  // Distinct endpoints guarantee proper structure.
  // Overlap iff there is a common covered coordinate.
  for (int x = 0; x < M; ++x) {
    bool a = (l1 < r1) ? (l1 <= x && x < r1) : (x >= l1 || x < r1);
    bool b = (l2 < r2) ? (l2 <= x && x < r2) : (x >= l2 || x < r2);
    if (a && b) return true;
  }
  return false;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  cin >> n;
  int M = 2 * n;
  vector<int> L(n), R(n);
  for (int i = 0; i < n; ++i) cin >> L[i] >> R[i];

  vector<vector<char>> ov(n, vector<char>(n, 0));
  for (int i = 0; i < n; ++i)
    for (int j = i + 1; j < n; ++j)
      ov[i][j] = ov[j][i] = overlap(L[i], R[i], L[j], R[j], M);

  vector<int> best = {0};
  // Max depth positions
  for (int x = 0; x < M; ++x) {
    vector<int> cur;
    for (int i = 0; i < n; ++i) {
      bool a = (L[i] < R[i]) ? (L[i] <= x && x < R[i]) : (x >= L[i] || x < R[i]);
      if (a) cur.push_back(i);
    }
    if (cur.size() > best.size()) best = cur;
  }
  // Bron-Kerbosch style since n<=2000 is heavy; use pivot on candidates that all
  // overlap a seed. For each seed vertex grow greedily by most neighbors.
  for (int seed = 0; seed < n; ++seed) {
    vector<int> cand;
    for (int j = 0; j < n; ++j)
      if (j == seed || ov[seed][j]) cand.push_back(j);
    vector<int> clique = {seed};
    vector<char> in(n, 0);
    in[seed] = 1;
    bool grew = true;
    while (grew) {
      grew = false;
      int pick = -1, bestDeg = -1;
      for (int v : cand) {
        if (in[v]) continue;
        bool ok = true;
        for (int u : clique)
          if (!ov[u][v]) {
            ok = false;
            break;
          }
        if (!ok) continue;
        int deg = 0;
        for (int w : cand)
          if (!in[w] && ov[v][w]) ++deg;
        if (deg > bestDeg) {
          bestDeg = deg;
          pick = v;
        }
      }
      if (pick >= 0) {
        clique.push_back(pick);
        in[pick] = 1;
        grew = true;
      }
    }
    if (clique.size() > best.size()) best = clique;
  }

  cout << best.size() << '\n';
  for (size_t i = 0; i < best.size(); ++i) {
    if (i) cout << ' ';
    cout << best[i];
  }
  cout << '\n';
  return 0;
}
