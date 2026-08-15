#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  // Map every double-six domino (a,b) with 1 <= a <= b <= 6 onto bits 0..20.
  auto pieceId = [](int a, int b) {
    int id = 0;
    for (int x = 1; x <= 6; ++x) {
      for (int y = x; y <= 6; ++y) {
        if (x == a && y == b) return id;
        ++id;
      }
    }
    return -1;
  };

  constexpr int P = 21;
  constexpr int FULL = 1 << P;
  vector<char> win(FULL, 0);
  vector<pair<int, int>> pieces(P);
  int idx = 0;
  for (int a = 1; a <= 6; ++a) {
    for (int b = a; b <= 6; ++b) pieces[idx++] = {a, b};
  }

  for (int mask = 1; mask < FULL; ++mask) {
    int deg[7] = {};
    int usedMask = 0;
    vector<vector<int>> adj(7);
    for (int i = 0; i < P; ++i) {
      if (!(mask & (1 << i))) continue;
      auto [a, b] = pieces[i];
      ++deg[a];
      ++deg[b];
      usedMask |= (1 << a) | (1 << b);
      adj[a].push_back(b);
      adj[b].push_back(a);
    }

    int odd = 0;
    for (int v = 1; v <= 6; ++v) {
      if (deg[v] & 1) ++odd;
    }
    if (odd != 0 && odd != 2) continue;

    int start = -1;
    for (int v = 1; v <= 6; ++v) {
      if (usedMask & (1 << v)) {
        start = v;
        break;
      }
    }
    if (start < 0) continue;

    vector<char> seen(7, 0);
    queue<int> q;
    q.push(start);
    seen[start] = 1;
    while (!q.empty()) {
      int u = q.front();
      q.pop();
      for (int v : adj[u]) {
        if (!seen[v]) {
          seen[v] = 1;
          q.push(v);
        }
      }
    }
    bool connected = true;
    for (int v = 1; v <= 6; ++v) {
      if ((usedMask & (1 << v)) && !seen[v]) connected = false;
    }
    if (connected) win[mask] = 1;
  }

  // SOS: sos[mask] = sum of win[sub] over sub ⊆ mask
  vector<int> sos(win.begin(), win.end());
  for (int bit = 0; bit < P; ++bit) {
    for (int mask = 0; mask < FULL; ++mask) {
      if (mask & (1 << bit)) sos[mask] += sos[mask ^ (1 << bit)];
    }
  }

  int t;
  cin >> t;
  while (t--) {
    int n;
    cin >> n;
    int mask = 0;
    for (int i = 0; i < n; ++i) {
      int a, b;
      cin >> a >> b;
      mask |= 1 << pieceId(a, b);
    }
    cout << sos[mask] << '\n';
  }
}
