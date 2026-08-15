#include <iostream>
using namespace std;

int A, B, C, D, E, F, G, Hsum;
int cells[13];
bool used[14];
long long ways = 0;

void rec(int pos) {
  if (pos == 13) {
    ++ways;
    return;
  }
  for (int v = 1; v <= 13; ++v) {
    if (used[v]) continue;
    cells[pos] = v;
    used[v] = true;
    bool ok = true;
    if (pos == 3) {
      if (cells[0] + cells[1] + cells[2] + cells[3] != E) ok = false;
    } else if (pos == 7) {
      if (cells[4] + cells[5] + cells[6] + cells[7] != F) ok = false;
      if (cells[3] + cells[7] != D) ok = false;
    } else if (pos == 10) {
      if (cells[8] + cells[9] + cells[10] != G) ok = false;
      if (cells[2] + cells[6] + cells[10] != C) ok = false;
    } else if (pos == 12) {
      if (cells[11] + cells[12] != Hsum) ok = false;
      if (cells[1] + cells[5] + cells[9] + cells[12] != B) ok = false;
      if (cells[0] + cells[4] + cells[8] + cells[11] != A) ok = false;
    }
    if (ok) rec(pos + 1);
    used[v] = false;
  }
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  cin >> A >> B >> C >> D >> E >> F >> G >> Hsum;
  if (A + B + C + D != E + F + G + Hsum) {
    cout << 0 << '\n';
    return 0;
  }
  rec(0);
  cout << ways << '\n';
  return 0;
}
