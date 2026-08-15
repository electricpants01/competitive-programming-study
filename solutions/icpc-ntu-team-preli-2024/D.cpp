#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  const int NMAX = 400000;
  vector<int> primes;
  primes.reserve(NMAX);
  int LIMIT = 7000000;
  vector<char> sieve(LIMIT, true);
  sieve[0] = sieve[1] = false;
  for (int i = 2; i < LIMIT && (int)primes.size() < NMAX; ++i) {
    if (!sieve[i]) continue;
    primes.push_back(i);
    if ((long long)i * i < LIMIT)
      for (long long j = 1LL * i * i; j < LIMIT; j += i) sieve[(int)j] = false;
  }

  int T;
  cin >> T;
  while (T--) {
    int n;
    cin >> n;
    if (n == 1) {
      cout << "A\n";
      continue;
    }
    vector<char> out(n, 'B');
    long long A = 0, B = 0;
    const int K = min(25, n);
    for (int i = n - 1; i >= K; --i) {
      if (A <= B) {
        A += primes[i];
        out[i] = 'A';
      } else {
        B += primes[i];
        out[i] = 'B';
      }
    }
    long long sumK = 0;
    for (int i = 0; i < K; ++i) sumK += primes[i];
    long long want = (B + sumK - A) / 2;
    const int MAXS = 20000;
    vector<int> possible(MAXS, -2);
    possible[0] = -1;
    int curMax = 0;
    for (int i = 0; i < K; ++i) {
      for (int s = curMax; s >= 0; --s) {
        if (possible[s] != -2) {
          int ns = s + primes[i];
          if (ns < MAXS && possible[ns] == -2) possible[ns] = i;
        }
      }
      curMax = min(MAXS - 1, curMax + primes[i]);
    }
    int best = 0;
    for (int s = 0; s <= curMax; ++s) {
      if (possible[s] != -2 && llabs(s - want) < llabs(best - want)) best = s;
    }
    int s = best;
    while (s > 0) {
      int i = possible[s];
      out[i] = 'A';
      s -= primes[i];
    }
    for (int i = 0; i < K; ++i)
      if (out[i] != 'A') out[i] = 'B';
    cout << string(out.begin(), out.end()) << '\n';
  }
  return 0;
}
