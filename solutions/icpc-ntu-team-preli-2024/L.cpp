#include <iostream>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  long long n;
  cin >> n;
  // Maximum independent set size under king-orthogonal (grid graph alpha) = ceil(n*n/2)
  // Game is node Kayles on grid graph / independent set placement: total moves = ceil(n^2/2)
  // for optimal play on this impartial game for grid with orthogonal adjacency:
  // Actually it's the game of placing non-attacking kings on orthogonals = maximal matching of tiles.
  // Size of max placement is ceil(n*n/2). First wins iff that size is odd.
  long long moves = (n * n + 1) / 2;
  // Sample: n=2 -> Ian (second), moves=2 even; n=3 -> Ltf, moves=5 odd. Matches.
  if (moves % 2 == 1) cout << "Ltf\n";
  else cout << "Ian\n";
  return 0;
}
