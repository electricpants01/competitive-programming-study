// 750A — New Year and Hurry
// https://codeforces.com/problemset/problem/750/A
//
// Problem:
//   Limak participates in a contest from 20:00 to 00:00 (240 min).
//   There are n problems; problem i takes 5·i minutes to solve.
//   He needs k minutes to travel to the party and must leave by midnight.
//   How many problems can he solve?
//
//   Input:  n k   (1 ≤ n ≤ 10, 1 ≤ k ≤ 240)
//   Output: max problems solved
//
// ─── ASCII ART ────────────────────────────────────────────────────────────────
//
//  Timeline (20:00 → 00:00 = 240 min):
//
//  20:00 ──────────────[solve problems]──────[travel k min]──── 00:00
//         |←────────── available = 240 - k ──────────────→|
//
//  Solving first j problems takes: 5·1 + 5·2 + … + 5·j = 5·j·(j+1)/2
//
//  Condition: 5·j·(j+1)/2 ≤ 240 - k
//
//  Binary search on j (example: n=3, k=222):
//
//   available = 240 - 222 = 18 min
//
//   lo=0       hi=3
//    |___________|
//         mid=2
//    5·2·3/2 = 15 ≤ 18  ✓  →  lo=2
//          |__|
//         mid=3
//    5·3·4/2 = 30 > 18  ✗  →  hi=2
//          lo=hi=2  →  DONE
//   Answer: 2 problems
//
//  Example 2: n=4, k=190  →  available=50  →  5·4·5/2=50 ≤ 50  →  4
//  Example 3: n=7, k=1    →  available=239 →  5·7·8/2=140 ≤ 239 →  7
//
// ─────────────────────────────────────────────────────────────────────────────
//
// Time:  O(log n)
// Space: O(1)

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;

    int available = 240 - k;

    // Binary search: find max j in [0, n] s.t. 5*j*(j+1)/2 <= available
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (5 * mid * (mid + 1) / 2 <= available) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }

    cout << lo << "\n";
    return 0;
}