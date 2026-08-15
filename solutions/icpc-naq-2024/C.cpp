#include <iostream>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  int excluded = 0;
  for (int i = 0; i < n; ++i) {
    int d;
    cin >> d;
    if (d % 2 != 0) ++excluded;
  }
  cout << excluded << '\n';
}
