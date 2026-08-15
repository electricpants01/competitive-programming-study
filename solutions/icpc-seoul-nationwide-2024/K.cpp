#include <iostream>
#include <string>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  string s;
  cin >> n >> s;

  // Position head on the first empty of the empty block, then Dutch-flag style
  // rearrange using empties as buffer. Educational construction:
  cout << "LeftStar E\n";
  cout << "RightStar !E\n";
  cout << "Left\n";
  cout << "X = 0\n";
  cout << "X = X + 1\n";
  cout << "Jump 2 if E\n";
  cout << "Jump 2 if W\n";
  cout << "Pick\n";
  cout << "RightStar E\n";
  cout << "Drop\n";
  cout << "LeftStar !E\n";
  cout << "Right\n";
  cout << "Jump -10\n";
  cout << "Stop\n";
  return 0;
}
