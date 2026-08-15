#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  vector<string> words(9);
  map<string, int> index;
  for (int i = 0; i < 9; ++i) {
    cin >> words[i];
    index[words[i]] = i;
  }

  int m;
  cin >> m;
  vector<vector<char>> related(9, vector<char>(9, 0));
  for (int i = 0; i < m; ++i) {
    string a, b;
    cin >> a >> b;
    int u = index[a];
    int v = index[b];
    related[u][v] = related[v][u] = 1;
  }

  auto isClique = [&](int a, int b, int c) {
    return related[a][b] && related[a][c] && related[b][c];
  };

  // Enumerate partitions of 9 elements into three unlabeled triples.
  for (int a = 0; a < 9; ++a) {
    for (int b = a + 1; b < 9; ++b) {
      for (int c = b + 1; c < 9; ++c) {
        if (!isClique(a, b, c)) continue;
        vector<int> rest;
        for (int i = 0; i < 9; ++i) {
          if (i != a && i != b && i != c) rest.push_back(i);
        }
        for (int i = 0; i < 6; ++i) {
          for (int j = i + 1; j < 6; ++j) {
            for (int k = j + 1; k < 6; ++k) {
              if (!isClique(rest[i], rest[j], rest[k])) continue;
              vector<int> last;
              for (int t = 0; t < 6; ++t) {
                if (t != i && t != j && t != k) last.push_back(rest[t]);
              }
              if (!isClique(last[0], last[1], last[2])) continue;

              cout << "Possible\n";
              cout << words[a] << ' ' << words[b] << ' ' << words[c] << '\n';
              cout << words[rest[i]] << ' ' << words[rest[j]] << ' ' << words[rest[k]]
                   << '\n';
              cout << words[last[0]] << ' ' << words[last[1]] << ' ' << words[last[2]]
                   << '\n';
              return 0;
            }
          }
        }
      }
    }
  }

  cout << "Impossible\n";
}
