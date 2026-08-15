#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int W, H;
  cin >> W >> H;
  vector<vector<int>> I(H, vector<int>(W));
  for (int y = 0; y < H; ++y)
    for (int x = 0; x < W; ++x) {
      string tok;
      cin >> tok;
      I[y][x] = stoi(tok, nullptr, 16);
    }
  int N, M;
  cin >> N >> M;
  vector<vector<int>> T(M, vector<int>(N));
  for (int y = 0; y < M; ++y)
    for (int x = 0; x < N; ++x) {
      string tok;
      cin >> tok;
      T[y][x] = stoi(tok, nullptr, 16);
    }
  long long best = (1LL << 62);
  int bx = 0, by = 0;
  for (int y = 0; y + M <= H; ++y) {
    for (int x = 0; x + N <= W; ++x) {
      long long ssd = 0;
      for (int j = 0; j < M; ++j)
        for (int i = 0; i < N; ++i) {
          long long d = I[y + j][x + i] - T[j][i];
          ssd += d * d;
        }
      if (ssd < best) {
        best = ssd;
        bx = x;
        by = y;
      }
    }
  }
  cout << bx << ' ' << by << '\n';
  return 0;
}
