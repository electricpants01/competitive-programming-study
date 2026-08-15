#include <iostream>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<int> score(n);
  for (int i = 0; i < n; ++i) cin >> score[i];

  int solved = 0;
  int incorrect = 0;
  int correct = 0;
  for (int s : score) {
    if (s > 0) {
      ++solved;
      ++correct;
      incorrect += s - 1;
    } else if (s < 0) {
      incorrect += -s;
    }
  }

  if (solved * 2 > n) {
    cout << "easy\n";
  } else if (solved * 5 < n) {
    cout << "hard\n";
  } else if (incorrect > 2 * correct) {
    cout << "tricky\n";
  } else {
    cout << "medium\n";
  }
}
