#include <algorithm>
#include <iostream>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int testCases;
  cin >> testCases;
  while (testCases--) {
    int alphabetSize, vocabularySize, wordLength, incorrectLimit;
    cin >> alphabetSize >> vocabularySize >> wordLength >> incorrectLimit;
    cout << (min(alphabetSize, vocabularySize) > incorrectLimit ? "YES" : "NO") << '\n';
  }
}
