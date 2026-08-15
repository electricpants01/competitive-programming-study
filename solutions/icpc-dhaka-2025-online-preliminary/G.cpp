#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int testCases;
  cin >> testCases;
  while (testCases--) {
    int n, m;
    cin >> n >> m;
    vector<int> rowXor(n);
    vector<int> columnXor(m);
    for (int row = 0; row < n; ++row) {
      for (int column = 0; column < m; ++column) {
        int value;
        cin >> value;
        rowXor[row] ^= value;
        columnXor[column] ^= value;
      }
    }

    long long totalDanger = 0;
    for (int value : rowXor) totalDanger += value;
    for (int value : columnXor) totalDanger += value;

    int maximumCommonBits = 0;
    for (int row : rowXor) {
      for (int column : columnXor) {
        maximumCommonBits = max(maximumCommonBits, row & column);
      }
    }

    cout << totalDanger - 2LL * maximumCommonBits << '\n';
  }
}
