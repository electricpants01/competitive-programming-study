#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, m;
  cin >> n >> m;
  vector<long long> colMax(m, 0);
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < m; ++j) {
      long long g;
      cin >> g;
      colMax[j] = max(colMax[j], g);
    }
  }

  long long answer = 0;
  for (long long value : colMax) answer += value;
  cout << answer << '\n';
}
