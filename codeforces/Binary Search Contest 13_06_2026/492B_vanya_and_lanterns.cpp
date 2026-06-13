// 492B — Vanya and Lanterns
// https://codeforces.com/problemset/problem/492/B
//
// Problem:
//   n lanterns placed at given positions on a street [0, d]. Each lantern
//   illuminates radius r. Find minimum r to cover every point in [0, d].
//
// ─── ASCII ART ────────────────────────────────────────────────────────────────
//
//  Street:  0 ─────────────────────────────────── d
//  Lanterns at sorted positions: p[0], p[1], p[2], p[3]
//
//   0      p[0]       p[1]        p[2]        p[3]    d
//   |═══════|══════════|═══════════|════════════|═══════|
//   |←r_L  →|          |           |            |←r_R  →|
//            |←─ gap1 ─→|           |            |
//                        |←── gap2 ──→|
//                                    |←─── gap3 ───→|
//
//   r_left  = p[0]           (cover from 0 to first lantern)
//   r_right = d - p[n-1]     (cover from last lantern to d)
//   r_gap   = max(gap_i) / 2 (each lantern covers half the gap on each side)
//
//   answer  = max(r_left, r_right, r_gap)
//
//  Example: n=4, d=10, positions=[1, 4, 7, 9]
//
//   0   1        4        7    9   10
//   |───|────────|────────|────|───|
//       ←──3──→  ←──3──→  ←2→  ←1→
//
//   r_left  = 1
//   r_right = 10 - 9 = 1
//   r_gap   = max(3, 3, 2) / 2 = 1.5
//   answer  = max(1, 1, 1.5) = 1.5
//
// ─────────────────────────────────────────────────────────────────────────────
//
// Time:  O(n log n)
// Space: O(n)

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, d;
    cin >> n >> d;

    vector<int> pos(n);
    for (int i = 0; i < n; i++) cin >> pos[i];

    sort(pos.begin(), pos.end());

    double ans = 0.0;

    double r_left  = pos[0];
    double r_right = d - pos[n - 1];
    ans = max(r_left, r_right);

    for (int i = 1; i < n; i++) {
        double gap = (pos[i] - pos[i - 1]) / 2.0;
        ans = max(ans, gap);
    }

    cout << fixed << setprecision(10) << ans << "\n";
    return 0;
}