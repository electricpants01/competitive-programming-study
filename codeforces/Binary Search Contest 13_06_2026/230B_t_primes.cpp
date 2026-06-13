// 230B — T-primes
// https://codeforces.com/problemset/problem/230/B
//
// Problem:
//   A number x is a "T-prime" if it has exactly 3 divisors.
//   Given n numbers, for each print "YES" if T-prime, "NO" otherwise.
//
// ─── ASCII ART ────────────────────────────────────────────────────────────────
//
//  Key insight: x has exactly 3 divisors  ⟺  x = p²  where p is prime
//
//  Why? Divisors of p²:  { 1,  p,  p² }  →  exactly 3
//
//  Examples:
//   x=4   → √4 = 2   → 2 is prime  ✓  → YES   (divisors: 1, 2, 4)
//   x=9   → √9 = 3   → 3 is prime  ✓  → YES   (divisors: 1, 3, 9)
//   x=25  → √25= 5   → 5 is prime  ✓  → YES   (divisors: 1, 5, 25)
//   x=6   → √6 ≈2.4  → not integer ✗  → NO
//   x=36  → √36= 6   → 6=2×3 composite ✗ → NO  (divisors: 1,2,3,4,6,9,12,18,36)
//   x=1   → √1 = 1   → 1 not prime ✗  → NO
//
//  Algorithm:
//   1. Sieve of Eratosthenes up to 10^6 (= √(10^12))
//
//      2  3  4  5  6  7  8  9  10  11  12  ...
//      ✓  ✓  ✗  ✓  ✗  ✓  ✗  ✗   ✗   ✓   ✗  ...
//     prime prime    prime    prime       prime
//
//   2. For each query x:
//      a) Compute sq = floor(√x)  [with float correction]
//      b) If sq*sq ≠ x  →  NO (not a perfect square)
//      c) If sq ≥ 10^6  →  NO (out of sieve range)
//      d) If is_prime[sq]  →  YES, else NO
//
// ─────────────────────────────────────────────────────────────────────────────
//
// Time:  O(M log log M + n)  where M = 10^6
// Space: O(M)

#include <bits/stdc++.h>
using namespace std;

const int MAXP = 1000001;
bool is_prime[MAXP];

void sieve() {
    fill(is_prime, is_prime + MAXP, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i < MAXP; i++) {
        if (is_prime[i]) {
            for (long long j = (long long)i * i; j < MAXP; j += i) {
                is_prime[j] = false;
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    sieve();

    int n;
    cin >> n;

    while (n--) {
        long long x;
        cin >> x;

        long long sq = (long long)sqrt((double)x);

        // Correct floating-point imprecision
        while (sq * sq > x) sq--;
        while ((sq + 1) * (sq + 1) <= x) sq++;

        bool perfect_square = (sq * sq == x);
        bool sq_in_range    = (sq < MAXP);
        bool sq_prime       = sq_in_range && is_prime[sq];

        cout << (perfect_square && sq_prime ? "YES" : "NO") << "\n";
    }

    return 0;
}