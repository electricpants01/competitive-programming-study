// 706B — Interesting drink
// https://codeforces.com/problemset/problem/706/B
//
// Problem:
//   A shop sells n drinks with prices a[i]. Given m queries, each query has a
//   budget b — answer how many drinks cost at most b.
//
// ─── ASCII ART ────────────────────────────────────────────────────────────────
//
//  Prices sorted:  [ 10,  20,  30,  40,  50 ]
//  Indices:          [0]  [1]  [2]  [3]  [4]
//
//  Query: budget b = 35
//
//   upper_bound(35) returns iterator to first element > 35
//
//  [ 10,  20,  30,  40,  50 ]
//                    ↑
//               upper_bound(35)
//               points to 40 (index 3)
//               distance from begin = 3
//               → 3 drinks are affordable (10, 20, 30)
//
//  Query: budget b = 50
//  [ 10,  20,  30,  40,  50 ]
//                             ↑
//                        upper_bound(50)
//                        points to end (index 5)
//                        → 5 drinks affordable
//
//  Query: budget b = 5
//  [ 10,  20,  30,  40,  50 ]
//    ↑
//  upper_bound(5)
//  points to 10 (index 0)
//  → 0 drinks affordable
//
// ─────────────────────────────────────────────────────────────────────────────
//
// Time:  O(n log n + m log n)
// Space: O(n)

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a.begin(), a.end());

    int m;
    cin >> m;

    while (m--) {
        int b;
        cin >> b;

        // upper_bound returns iterator past last element <= b
        int count = (int)(upper_bound(a.begin(), a.end(), b) - a.begin());
        cout << count << "\n";
    }

    return 0;
}