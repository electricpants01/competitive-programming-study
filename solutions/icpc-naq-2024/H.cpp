#include <iostream>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int n;
vector<int> p1, p2;
vector<char> eye;
vector<string> alleles;  // two chars, sorted
bool found = false;
vector<string> best;

bool validRoot(char color, char a, char b) {
  if (a > b) swap(a, b);
  return a == color && b >= color;
}

bool inherits(const string& parentA, const string& parentB, char a, char b) {
  for (char x : parentA) {
    for (char y : parentB) {
      char u = x, v = y;
      if (u > v) swap(u, v);
      if (u == a && v == b) return true;
    }
  }
  return false;
}

void dfs(int idx) {
  if (found) return;
  if (idx > n) {
    best = alleles;
    found = true;
    return;
  }

  const char color = eye[idx];
  vector<pair<char, char>> candidates;
  for (char second = color; second <= 't'; ++second) {
    candidates.push_back({color, second});
  }

  if (p1[idx] == 0) {
    for (auto [a, b] : candidates) {
      alleles[idx] = string(1, a) + b;
      dfs(idx + 1);
      if (found) return;
    }
  } else {
    const string& A = alleles[p1[idx]];
    const string& B = alleles[p2[idx]];
    for (auto [a, b] : candidates) {
      if (!inherits(A, B, a, b)) continue;
      alleles[idx] = string(1, a) + b;
      dfs(idx + 1);
      if (found) return;
    }
  }
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  cin >> n;
  p1.assign(n + 1, 0);
  p2.assign(n + 1, 0);
  eye.assign(n + 1, '?');
  alleles.assign(n + 1, "");

  for (int i = 1; i <= n; ++i) {
    cin >> p1[i] >> p2[i] >> eye[i];
  }

  dfs(1);

  if (!found) {
    cout << -1 << '\n';
  } else {
    for (int i = 1; i <= n; ++i) cout << best[i] << '\n';
  }
}
