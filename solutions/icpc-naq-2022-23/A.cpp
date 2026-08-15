#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

using int64 = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int64> s(n);
  for (int i = 0; i < n; ++i) cin >> s[i];
  sort(s.rbegin(), s.rend());

  int64 stableSum = s[0];
  int stableCnt = 1;
  int64 candSum = 0;
  int candCnt = 0;

  for (int i = 1; i < n; ++i) {
    candSum += s[i];
    ++candCnt;
    if (candSum >= stableSum) {
      stableSum += candSum;
      stableCnt += candCnt;
      candSum = 0;
      candCnt = 0;
    }
  }

  cout << stableCnt << '\n';
}
