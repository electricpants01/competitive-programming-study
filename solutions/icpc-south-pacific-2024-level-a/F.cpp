#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;

  // For each column: lower bound (exclusive down-pipe) and upper bound (exclusive up-pipe).
  // Must have lo < y < hi, i.e. y in [lo+1, hi-1].
  const int INF = 1e9;
  int maxX = 0;
  vector<int> downBound;  // max yD at column; bird needs y >= downBound+1
  vector<int> upBound;    // min yU at column; bird needs y <= upBound-1
  // We'll use maps via compression: store pipes then build.

  struct Pipe {
    char type;
    int x, y;
  };
  vector<Pipe> pipes(n);
  for (int i = 0; i < n; ++i) {
    cin >> pipes[i].type >> pipes[i].x >> pipes[i].y;
    maxX = max(maxX, pipes[i].x);
  }

  vector<int> lo(maxX + 2, -INF);  // y must be > lo[x]
  vector<int> hi(maxX + 2, INF);   // y must be < hi[x]
  for (const auto& p : pipes) {
    if (p.type == 'D') lo[p.x] = max(lo[p.x], p.y);
    else hi[p.x] = min(hi[p.x], p.y);
  }

  // Feasible y at column x: [lo[x]+1, hi[x]-1]
  auto lowAt = [&](int x) { return lo[x] + 1; };
  auto highAt = [&](int x) { return hi[x] - 1; };

  for (int x = 1; x <= maxX; ++x) {
    if (lowAt(x) > highAt(x)) {
      cout << "Impossible\n";
      return 0;
    }
  }

  // Propagate reachable height intervals from x=0 to x=maxX+1.
  // At column 0, height is 0. Each step: y' = y+1 or y-1.
  // Between columns we move exactly 1 step per column advance.
  vector<int> reachLo(maxX + 2, INF);
  vector<int> reachHi(maxX + 2, -INF);
  reachLo[0] = reachHi[0] = 0;

  for (int x = 0; x <= maxX; ++x) {
    if (reachLo[x] > reachHi[x]) continue;
    // After one move to x+1, heights become odd/even shifted by ±1.
    int nextLo = reachLo[x] - 1;
    int nextHi = reachHi[x] + 1;
    // All heights with correct parity in [nextLo, nextHi] that are reachable:
    // from an interval of consecutive same-parity heights, ±1 fills all opposite parity
    // in [lo-1, hi+1]. Since start is single point and we always expand by 1,
    // reachable set at x is all y with y≡x (mod 2) in [reachLo, reachHi].
    int flo = lowAt(x + 1);
    int fhi = highAt(x + 1);
    if (x + 1 == maxX + 1) {
      flo = -INF;
      fhi = INF;
    }
    int lo2 = max(nextLo, flo);
    int hi2 = min(nextHi, fhi);
    // Restrict to correct parity: (x+1) % 2.
    if (lo2 <= hi2) {
      if ((lo2 + x + 1) % 2 != 0) ++lo2;
      if ((hi2 + x + 1) % 2 != 0) --hi2;
      if (lo2 <= hi2) {
        reachLo[x + 1] = min(reachLo[x + 1], lo2);
        reachHi[x + 1] = max(reachHi[x + 1], hi2);
      }
    }
  }

  if (reachLo[maxX + 1] > reachHi[maxX + 1]) {
    cout << "Impossible\n";
    return 0;
  }

  // Reconstruct any path: pick any height at maxX+1, walk backward.
  vector<int> height(maxX + 2, 0);
  height[maxX + 1] = reachLo[maxX + 1];
  for (int x = maxX; x >= 0; --x) {
    // Prefer continuing from height[x+1]-1 or +1 that is reachable at x.
    bool found = false;
    for (int prev : {height[x + 1] - 1, height[x + 1] + 1}) {
      if (prev >= reachLo[x] && prev <= reachHi[x] && (prev + x) % 2 == 0) {
        // Also need prev to have been valid at column x (already in reach).
        height[x] = prev;
        found = true;
        break;
      }
    }
    if (!found) {
      cout << "Impossible\n";
      return 0;
    }
  }

  string strategy;
  strategy.reserve(maxX + 1);
  for (int x = 0; x <= maxX; ++x) {
    if (height[x + 1] == height[x] + 1) strategy.push_back('+');
    else strategy.push_back('-');
  }

  cout << "Possible\n";
  cout << strategy << '\n';
}
