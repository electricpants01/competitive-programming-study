#include <array>
#include <iostream>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  array<int, 5> seen{};
  for (int i = 0; i < 10; ++i) {
    int d;
    cin >> d;
    seen[d] = 1;
  }

  cout << 4 - (seen[1] + seen[2] + seen[3] + seen[4]) << '\n';
}
