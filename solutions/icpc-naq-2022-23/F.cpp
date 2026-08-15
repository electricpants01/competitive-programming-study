#include <iomanip>
#include <iostream>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  double n;
  cin >> n;
  cout << fixed << setprecision(2) << (n / 4.0) << '\n';
}
