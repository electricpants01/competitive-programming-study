#include <algorithm>
#include <cstdint>
#include <iostream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>
using namespace std;

struct HashPair {
  size_t operator()(const pair<uint64_t, uint64_t>& p) const {
    return p.first * 31 + p.second;
  }
};

struct TrieNode {
  int next[26];
  int count = 0;
  TrieNode() {
    fill(begin(next), end(next), -1);
  }
};

struct Trie {
  vector<TrieNode> nodes;
  Trie() { nodes.emplace_back(); }

  void insert(const string& s) {
    int v = 0;
    for (char ch : s) {
      const int c = ch - 'a';
      if (nodes[v].next[c] == -1) {
        nodes[v].next[c] = static_cast<int>(nodes.size());
        nodes.emplace_back();
      }
      v = nodes[v].next[c];
      ++nodes[v].count;
    }
  }

  int query(const string& s) const {
    int v = 0;
    for (char ch : s) {
      const int c = ch - 'a';
      if (nodes[v].next[c] == -1) return 0;
      v = nodes[v].next[c];
    }
    return nodes[v].count;
  }
};

uint64_t rollHash(const string& s, int l, int r, uint64_t base, uint64_t mod) {
  // hash of s[l..r)
  uint64_t h = 0;
  for (int i = l; i < r; ++i) {
    h = (h * base + static_cast<uint64_t>(s[i] - 'a' + 1)) % mod;
  }
  return h;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, q;
  cin >> n >> q;

  vector<string> words(n);
  Trie prefTrie;
  Trie sufTrie;
  unordered_map<pair<uint64_t, uint64_t>, int, HashPair> both;

  const uint64_t BASE1 = 911382323ULL;
  const uint64_t MOD1 = 1000000007ULL;
  const uint64_t BASE2 = 972663749ULL;
  const uint64_t MOD2 = 1000000009ULL;

  auto pairHash = [&](const string& s, int L) -> pair<uint64_t, uint64_t> {
    const int m = static_cast<int>(s.size());
    const uint64_t p1 = rollHash(s, 0, L, BASE1, MOD1);
    const uint64_t s1 = rollHash(s, m - L, m, BASE1, MOD1);
    const uint64_t p2 = rollHash(s, 0, L, BASE2, MOD2);
    const uint64_t s2 = rollHash(s, m - L, m, BASE2, MOD2);
    // Pack double hashes into two 64-bit keys.
    const uint64_t prefKey = p1 * MOD2 + p2;
    const uint64_t sufKey = s1 * MOD2 + s2;
    return {prefKey, sufKey};
  };

  auto singleHash = [&](const string& t) -> uint64_t {
    const uint64_t h1 = rollHash(t, 0, static_cast<int>(t.size()), BASE1, MOD1);
    const uint64_t h2 = rollHash(t, 0, static_cast<int>(t.size()), BASE2, MOD2);
    return h1 * MOD2 + h2;
  };

  for (int i = 0; i < n; ++i) {
    cin >> words[i];
    prefTrie.insert(words[i]);
    string rev = words[i];
    reverse(rev.begin(), rev.end());
    sufTrie.insert(rev);

    const int len = static_cast<int>(words[i].size());
    for (int L = 1; L <= len; ++L) {
      ++both[pairHash(words[i], L)];
    }
  }

  for (int qi = 0; qi < q; ++qi) {
    string op, p, s;
    cin >> op >> p >> s;
    const int prefCount = prefTrie.query(p);
    string sRev = s;
    reverse(sRev.begin(), sRev.end());
    const int sufCount = sufTrie.query(sRev);

    const uint64_t prefKey = singleHash(p);
    const uint64_t sufKey = singleHash(s);
    int bothCount = 0;
    auto it = both.find({prefKey, sufKey});
    if (it != both.end()) bothCount = it->second;

    long long ans = 0;
    if (op == "AND") ans = bothCount;
    else if (op == "OR") ans = prefCount + sufCount - bothCount;
    else ans = prefCount + sufCount - 2LL * bothCount;  // XOR

    cout << ans << '\n';
  }
}
