#include <iostream>
#include <string>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string s;
  cin >> s;

  int withoutY = 0;
  int withY = 0;
  for (char c : s) {
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
      ++withoutY;
      ++withY;
    } else if (c == 'y') {
      ++withY;
    }
  }

  cout << withoutY << ' ' << withY << '\n';
}
