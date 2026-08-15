#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string a, b;
  cin >> a >> b;
  string merged = a + b;
  sort(merged.begin(), merged.end());
  cout << merged << '\n';
}
