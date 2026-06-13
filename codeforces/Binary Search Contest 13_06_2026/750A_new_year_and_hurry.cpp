// 750A — New Year and Hurry
// https://codeforces.com/problemset/problem/750/A
//
// Problem:
//   Vasya has n unsolved problems. He solves them in order. Solving the i-th
//   problem (1-indexed) takes exactly 5*i minutes. He has exactly 300 minutes
//   (5 hours, 7pm→midnight) to train. How many problems can he solve?
//
// Approach: Binary search on k — find max k s.t. 5*(1+2+...+k) ≤ 300
//   Equivalently: k*(k+1) ≤ 120
//
// Time:  O(log n)
// Space: O(1)

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    // Binary search: find max k in [0, n] s.t. k*(k+1) <= 120
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if ((long long)mid * (mid + 1) <= 120) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }

    cout << lo << "\n";
    return 0;
}