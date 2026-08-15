#include <iostream>
#include <string>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int c, g;
  cin >> c >> g;
  if (c == 1) {
    cout << "vivo e morto\n";
  } else if (g == 1) {
    cout << "vivo\n";
  } else {
    cout << "morto\n";
  }
  return 0;
}
