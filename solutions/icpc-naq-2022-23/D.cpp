#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  vector<int> p(n + 1);
  for (int i = 1; i <= n; ++i) p[i] = i;

  for (int i = 0; i < m; ++i) {
    int a;
    cin >> a;
    swap(p[a], p[a + 1]);
  }

  for (int i = 1; i <= n; ++i) cout << p[i] << '\n';
}
