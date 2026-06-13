// 279B — Books
// https://codeforces.com/problemset/problem/279/B
//
// Problem:
//   Valera has t free minutes and n books with reading times a[i].
//   He picks ANY starting book i and reads i, i+1, i+2, … consecutively
//   until he runs out of time. He won't start a book if he can't finish it.
//   Find the maximum number of books he can read.
//
//   Input:  Line 1: n t   (1 ≤ n ≤ 10^5, 1 ≤ t ≤ 10^9)
//           Line 2: a[1..n]  (1 ≤ a[i] ≤ 10^4)
//   Output: max books read
//
// ─── ASCII ART ────────────────────────────────────────────────────────────────
//
//  Books:  [ 3,  1,  2,  1 ]    t = 5
//  Index:   [0] [1] [2] [3]
//
//  Try every starting position → find longest window with sum ≤ t:
//
//  Start=0:  [3] sum=3≤5 ✓  [3,1] sum=4≤5 ✓  [3,1,2] sum=6>5 ✗  → 2 books
//  Start=1:  [1] sum=1≤5 ✓  [1,2] sum=3≤5 ✓  [1,2,1] sum=4≤5 ✓  → 3 books ← MAX
//  Start=2:  [2] sum=2≤5 ✓  [2,1] sum=3≤5 ✓                      → 2 books
//  Start=3:  [1] sum=1≤5 ✓                                         → 1 book
//
//  Brute force is O(n²). Instead use a sliding window (two pointers):
//
//  Sliding window — maintain [left, right] with sum ≤ t:
//
//   Books: [ 3,  1,  2,  1 ]    t = 5
//          [L]                   sum=3  ans=1
//          [L────R]              sum=4  ans=2
//          [L──────────R]        sum=6 > 5  → shrink left
//               [L─────R]        sum=3  ans=2
//               [L──────────R]   sum=4  ans=3  ← new max
//
//  At each step: expand right by 1, shrink left while sum > t
//  Track max window size = right - left + 1
//
// ─────────────────────────────────────────────────────────────────────────────
//
// Time:  O(n)   — each element enters and leaves the window at most once
// Space: O(n)

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    long long t;
    cin >> n >> t;

    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int left = 0;
    long long sum = 0;
    int ans = 0;

    for (int right = 0; right < n; right++) {
        sum += a[right];

        // Shrink window from left while sum exceeds budget
        while (sum > t) {
            sum -= a[left++];
        }

        // Window [left, right] is valid — update answer
        ans = max(ans, right - left + 1);
    }

    cout << ans << "\n";
    return 0;
}