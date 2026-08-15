#include <iomanip>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string target;
  int n;
  cin >> target >> n;

  // count[c] = occurrences of letter c in training (including as non-final chars
  // and ... actually every char in each word counts; stop after each word).
  // transition[a][b] for b=0..25 letter, transition[a][26] = stop.
  vector<long long> count(26, 0);
  vector<vector<long long>> transition(26, vector<long long>(27, 0));

  for (int i = 0; i < n; ++i) {
    string word;
    cin >> word;
    for (char ch : word) {
      ++count[ch - 'a'];
    }
    for (size_t j = 0; j + 1 < word.size(); ++j) {
      ++transition[word[j] - 'a'][word[j + 1] - 'a'];
    }
    ++transition[word.back() - 'a'][26];
  }

  // Already generated first letter. Need to generate remaining letters then stop.
  double probability = 1.0;
  for (size_t i = 0; i + 1 < target.size(); ++i) {
    int from = target[i] - 'a';
    int to = target[i + 1] - 'a';
    if (count[from] == 0) {
      probability = 0.0;
      break;
    }
    probability *= static_cast<double>(transition[from][to]) / static_cast<double>(count[from]);
  }

  if (probability > 0.0) {
    int last = target.back() - 'a';
    if (count[last] == 0) {
      // Always emit stop when letter unseen — but then we only succeed if target
      // length is 1 (already done). For length 1, P(stop)=1.
      probability = (target.size() == 1) ? 1.0 : 0.0;
    } else {
      probability *= static_cast<double>(transition[last][26]) / static_cast<double>(count[last]);
    }
  }

  cout << fixed << setprecision(12) << probability << '\n';
}
