#include <iostream>
using namespace std;

using int64 = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int64 n, r, d;
  cin >> n >> r >> d;

  // Optimal construction: d private problems per regional (when possible)
  // plus a shared pool. Then each set has size n - (r - 1) * d.
  // (Problem I was withdrawn from the live contest; this matches the PDF samples.)
  const int64 ans = n - (r - 1) * d;
  if (ans < 1) {
    cout << -1 << '\n';
  } else {
    cout << ans << '\n';
  }
}
