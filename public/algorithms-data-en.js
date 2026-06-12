// Competitive Programming Study Guide — Algorithms Data (EN)
const algorithmsData = {
  "complexity-analysis": {
    title: "Complexity Analysis",
    category: "Fundamentals",
    difficulty: "Beginner",
    timeToLearn: "3-5 days",
    importance: "Essential",
    description:
      "Big-O notation describes how runtime or memory scales as input grows. Mastering complexity analysis is the foundation of all algorithm design decisions.",
    asciiArt: `Growth rate comparison (smaller = faster):

 n = 10⁶      O(1)  O(log n) O(n)    O(n log n) O(n²)
 Operations:    1       20   10⁶       2×10⁷     10¹²
                ✓        ✓     ✓           ✓        ✗

 O(1) ────────────────────────────────── constant
 O(log n) ─────────────────────────╮    very fast
 O(n) ───────────────────────╮          linear
 O(n log n) ───────────╮               acceptable
 O(n²) ──────╮                          slow
 O(2ⁿ) ─╮                              avoid!`,
    keyTechniques: [
      "Big-O / Big-Θ / Big-Ω notation",
      "Amortized analysis",
      "Recurrence relations (Master theorem)",
      "Space complexity",
    ],
    benefits: [
      "Instantly identify if a solution is fast enough before coding",
      "Choose the right data structure for each operation",
      "Communicate algorithm efficiency clearly in interviews",
    ],
    typicalConstraints: [
      "n ≤ 10⁸ → O(n) or O(n log n)",
      "n ≤ 10⁴ → O(n²) OK",
      "n ≤ 500 → O(n³) OK",
    ],
    examples: [
      {
        title: "Determining Complexity from Constraints",
        description: "Rule of thumb: 10⁸ ops per second",
        codeSnippet: `// Time limit 1 sec, n = 10^5:
// O(n²) = 10^10 ops → TLE ✗
// O(n log n) = ~1.7×10^6 → OK ✓

// Nested loops → O(n²)
for (int i = 0; i < n; i++)      // n
  for (int j = i; j < n; j++)   // ~n/2
    // O(1) body                 // total: O(n²)

// Binary search → O(log n)
int lo = 0, hi = n - 1;
while (lo <= hi) {
  int mid = (lo + hi) / 2;      // splits in half each time
  // O(log n) iterations
}`,
      },
    ],
    bestPractices: [
      "Always calculate complexity before submitting, not after TLE",
      "n ≤ 10⁵ allows O(n log n); n ≤ 10³ allows O(n²)",
      "Watch for hidden constants — 2×10⁸ may TLE on tight limits",
    ],
    problems: ["Leetcode 1 (Two Sum variants)", "Codeforces 4A", "USACO 2016 Jan (Div 2)"],
  },

  "arrays-strings": {
    title: "Arrays & Strings",
    category: "Fundamentals",
    difficulty: "Beginner",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Arrays are the backbone of CP. Prefix sums, difference arrays, and two-pointer patterns solve many problems in O(n) that would otherwise need O(n²).",
    asciiArt: `Prefix Sum:

 Index:   0    1    2    3    4
 Array:  [3,   1,   4,   1,   5]
 Prefix: [0,   3,   4,   8,   9,  14]

 Range sum [1..3] = prefix[4] - prefix[1]
                  = 9 - 3 = 6  ✓

Difference Array (range update +2 on [1..3]):

 Before: [0, 0, 0, 0, 0]
 diff:   [0,+2, 0, 0,-2]
 After prefix-sum: [0, 2, 2, 2, 0]`,
    keyTechniques: [
      "Prefix Sums",
      "Difference Arrays",
      "Two Pointers",
      "Sliding Window",
    ],
    benefits: [
      "O(1) range sum queries after O(n) preprocessing",
      "O(n) range updates with difference arrays",
      "Foundation for Segment Trees and BIT",
    ],
    typicalConstraints: ["n ≤ 10⁶ for O(n) approaches", "q range queries after O(n) prefix build"],
    examples: [
      {
        title: "Prefix Sum + Range Query",
        description: "Build once, query in O(1)",
        codeSnippet: `vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; i++)
  prefix[i + 1] = prefix[i] + a[i];

// Range sum [l, r] (0-indexed, inclusive):
auto rangeSum = [&](int l, int r) {
  return prefix[r + 1] - prefix[l];
};`,
      },
    ],
    bestPractices: [
      "Use 1-indexed prefix arrays to avoid off-by-one errors",
      "For 2D grids, build a 2D prefix sum",
      "Difference arrays are ideal for range add/subtract updates",
    ],
    problems: ["Leetcode 303 (Range Sum Query)", "Codeforces 816C", "Leetcode 1480"],
  },

  "stl-guide": {
    title: "STL Essentials",
    category: "Fundamentals",
    difficulty: "Beginner",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "The C++ Standard Template Library provides ready-made containers and algorithms. Mastering vector, map, set, priority_queue, and algorithms like sort/lower_bound is mandatory for CP.",
    asciiArt: `Container Complexity Cheatsheet:

 vector    push_back O(1)*  access O(1)  search O(n)
 deque     push/pop  O(1)   access O(1)  search O(n)
 set       insert    O(logn) find O(logn) ordered
 map       insert    O(logn) find O(logn) key→value
 unordered_set/map   O(1) avg (hash)
 priority_queue (max-heap):
            push O(logn)  top O(1)  pop O(logn)

 Heap structure (max-heap):
        9
       / \\
      7   5
     / \\
    3   4`,
    keyTechniques: [
      "vector / deque / array",
      "set / multiset / unordered_set",
      "map / unordered_map",
      "priority_queue (heap)",
      "sort / lower_bound / upper_bound",
    ],
    benefits: [
      "Avoid reimplementing sorted sets, heaps, and hash maps from scratch",
      "lower_bound / upper_bound provide binary search on sorted containers",
      "priority_queue replaces manual heap implementation",
    ],
    typicalConstraints: ["n ≤ 10⁵ for sorted containers O(n log n)", "Use unordered_map for O(1) avg lookups"],
    examples: [
      {
        title: "Core STL Patterns",
        description: "Most common STL idioms in competitive programming",
        codeSnippet: `#include <bits/stdc++.h>
using namespace std;

// Sorted set — no duplicates, O(log n) ops
set<int> s;
s.insert(5); s.insert(3); s.insert(7);
auto it = s.lower_bound(4); // points to 5

// Map — key→value, O(log n)
map<string, int> freq;
freq["hello"]++;

// Max-heap
priority_queue<int> pq;
pq.push(3); pq.push(7); pq.push(1);
cout << pq.top(); // 7

// Min-heap
priority_queue<int, vector<int>, greater<int>> minpq;

// Sort + binary search
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
bool found = binary_search(v.begin(), v.end(), 8);
int pos = lower_bound(v.begin(), v.end(), 8) - v.begin();`,
      },
    ],
    bestPractices: [
      "Use unordered_map/set for O(1) average, but beware worst-case hash collisions",
      "reserve() unordered containers upfront to avoid rehashing",
      "Prefer emplace_back over push_back for complex objects",
    ],
    problems: ["Leetcode 1 (Two Sum - use unordered_map)", "Codeforces 4C (Registration)", "Leetcode 347 (Top K)"],
  },

  "two-pointers": {
    title: "Two Pointers",
    category: "Algorithms",
    difficulty: "Beginner",
    timeToLearn: "3-5 days",
    importance: "High",
    description:
      "Two pointers maintain two indices that move toward or away from each other, solving sorted-array problems in O(n) instead of O(n²).",
    asciiArt: `Two-sum on sorted array, target = 10:

 [1,  3,  5,  7,  9,  11]
  L                    R    1+11=12 > 10 → move R left
  
 [1,  3,  5,  7,  9,  11]
  L               R         1+9=10  ✓  FOUND!

Remove duplicates in-place:

 [1, 1, 2, 3, 3, 4]
  W  R                W=write, R=read
 [1, _, 2, 3, 3, 4]  arr[R]≠arr[W-1] → write
     W     R
 Result: [1, 2, 3, 4, _, _]`,
    keyTechniques: [
      "Opposite direction (sorted array)",
      "Same direction (slow/fast pointer)",
      "Floyd's cycle detection",
      "Merge of two sorted arrays",
    ],
    benefits: [
      "Reduces O(n²) brute force to O(n) on sorted data",
      "In-place — O(1) extra space",
      "Fundamental to sliding window and merge step of merge sort",
    ],
    typicalConstraints: ["Array must be sorted (for opposite-direction)", "n ≤ 10⁶"],
    examples: [
      {
        title: "Two Sum on Sorted Array",
        description: "O(n) instead of O(n²)",
        codeSnippet: `// Returns indices such that a[l] + a[r] == target
pair<int,int> twoSum(vector<int>& a, int target) {
  int l = 0, r = a.size() - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return {l, r};
    else if (s < target) l++;
    else r--;
  }
  return {-1, -1};
}`,
      },
    ],
    bestPractices: [
      "Sort first if the array is not already sorted",
      "For linked lists, use slow/fast pointer to find cycles or midpoints",
      "Check for edge cases: empty array, single element, all equal",
    ],
    problems: ["Leetcode 167 (Two Sum II)", "Leetcode 15 (3Sum)", "Codeforces 6C"],
  },

  "sliding-window": {
    title: "Sliding Window",
    category: "Algorithms",
    difficulty: "Beginner",
    timeToLearn: "3-5 days",
    importance: "High",
    description:
      "A window of fixed or variable size slides across an array. By adding the new element and removing the old, each element is processed at most twice — O(n) total.",
    asciiArt: `Fixed window (k=3), find max sum:

 [2,  1,  5,  1,  3,  2]
 [2   1   5]  1   3   2    sum=8
  2  [1   5   1]  3   2    sum=7
  2   1  [5   1   3]  2    sum=9  ← max!
  2   1   5  [1   3   2]   sum=6

Variable window (longest subarray sum ≤ k):

  L                         expand R until sum > k
  L→                        then shrink L until valid
  Window always maintains the invariant`,
    keyTechniques: [
      "Fixed-size window",
      "Variable-size window (shrink when invalid)",
      "Monotonic deque (sliding window maximum)",
      "Hash map inside window (character frequency)",
    ],
    benefits: [
      "O(n) for problems that look like O(n²) nested loops",
      "Works for strings (substring problems) and arrays",
      "Monotonic deque extends it to O(n) range max/min queries",
    ],
    typicalConstraints: ["n ≤ 10⁶", "Substring / subarray problems with a length or sum constraint"],
    examples: [
      {
        title: "Minimum Window Substring",
        description: "Classic variable-window with frequency map",
        codeSnippet: `string minWindow(string s, string t) {
  unordered_map<char, int> need, window;
  for (char c : t) need[c]++;
  int l = 0, matched = 0;
  int resL = 0, resLen = INT_MAX;
  for (int r = 0; r < s.size(); r++) {
    char c = s[r];
    if (need.count(c)) {
      window[c]++;
      if (window[c] == need[c]) matched++;
    }
    while (matched == need.size()) {
      if (r - l + 1 < resLen) { resL = l; resLen = r - l + 1; }
      char lc = s[l++];
      if (need.count(lc)) {
        if (window[lc] == need[lc]) matched--;
        window[lc]--;
      }
    }
  }
  return resLen == INT_MAX ? "" : s.substr(resL, resLen);
}`,
      },
    ],
    bestPractices: [
      "Expand R first, then shrink L to restore the invariant",
      "Use a counter of 'matched' conditions rather than comparing entire maps",
      "For sliding window maximum, use a monotonic deque (deque of indices)",
    ],
    problems: ["Leetcode 76 (Min Window Substring)", "Leetcode 239 (Sliding Window Max)", "Codeforces 701C"],
  },

  "binary-search": {
    title: "Binary Search",
    category: "Algorithms",
    difficulty: "Beginner to Intermediate",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Binary search eliminates half the search space each step, achieving O(log n). Beyond arrays, it applies to monotone functions — 'binary search on the answer'.",
    asciiArt: `Search target=11 in sorted array:

 [1,  3,  5,  7,  9,  11,  13,  15]
  lo=0                          hi=7
              mid=3  arr[3]=7 < 11 → lo=4

 [1,  3,  5,  7,  9,  11,  13,  15]
                   lo=4       hi=7
                       mid=5  arr[5]=11 ✓ FOUND!

Binary search on answer (minimize max load):
 lo=1  hi=sum  →  check(mid) feasible?
      yes → hi=mid     no → lo=mid+1`,
    keyTechniques: [
      "Classic binary search (find value)",
      "lower_bound / upper_bound",
      "Binary search on answer",
      "Ternary search (unimodal functions)",
    ],
    benefits: [
      "O(log n) vs O(n) linear scan — essential for large n",
      "'Binary search on answer' converts optimization to feasibility check",
      "Works on any monotone predicate, not just sorted arrays",
    ],
    typicalConstraints: ["n ≤ 10⁹ for O(log n)", "Feasibility check must be O(n) or O(n log n)"],
    examples: [
      {
        title: "Binary Search on Answer",
        description: "Find minimum capacity such that we can ship in D days",
        codeSnippet: `// Minimize the capacity to ship all weights within D days
int shipWithinDays(vector<int>& w, int D) {
  int lo = *max_element(w.begin(), w.end());
  int hi = accumulate(w.begin(), w.end(), 0);
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    // Can we ship in D days with capacity = mid?
    int days = 1, cur = 0;
    for (int x : w) {
      if (cur + x > mid) { days++; cur = 0; }
      cur += x;
    }
    if (days <= D) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    bestPractices: [
      "Use lo + (hi - lo) / 2 to avoid integer overflow",
      "Always verify the loop invariant: answer is always in [lo, hi]",
      "For lower_bound: use hi = mid when feasible; for upper_bound: lo = mid + 1",
    ],
    problems: ["Leetcode 1011 (Ship Packages)", "Codeforces 460C", "Leetcode 875 (Koko Eating Bananas)"],
  },

  "sorting": {
    title: "Sorting Techniques",
    category: "Algorithms",
    difficulty: "Beginner to Intermediate",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Sorting unlocks O(n log n) solutions to many problems. Beyond std::sort, understanding merge sort (inversions), counting sort, and custom comparators is crucial.",
    asciiArt: `Merge Sort [5, 3, 8, 1, 4, 2]:

 [5, 3, 8, 1, 4, 2]       divide
 [5, 3, 8]  [1, 4, 2]
 [5,3][8]   [1,4][2]
 [3,5][8]   [1,4][2]       sort halves
 [3,5,8]    [1,2,4]        merge
 [1,2,3,4,5,8]             O(n log n) ✓

Quick Sort partition (pivot=4):

 [3, 1, 4, 1, 5, 9, 2, 6]
 [3, 1, 1, 2] 4 [5, 9, 6]  partitioned
  recurse left  recurse right`,
    keyTechniques: [
      "std::sort (introsort, O(n log n))",
      "Merge sort (counting inversions)",
      "Counting / Radix sort (O(n+k))",
      "Custom comparator / stable_sort",
    ],
    benefits: [
      "Sorted arrays enable binary search, two pointers, and sweep line",
      "Counting sort achieves O(n) for small value ranges",
      "Merge sort is the standard algorithm for counting inversions",
    ],
    typicalConstraints: ["n ≤ 10⁶ for O(n log n)", "values ≤ 10⁶ for counting sort"],
    examples: [
      {
        title: "Custom Sort + Merge Sort Inversions",
        description: "Sort by custom key; count inversions via merge sort",
        codeSnippet: `// Custom comparator
sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
  return a.second < b.second; // sort by second element
});

// Count inversions using merge sort
long long mergeCount(vector<int>& a, int l, int r) {
  if (r - l <= 1) return 0;
  int mid = (l + r) / 2;
  long long cnt = mergeCount(a, l, mid) + mergeCount(a, mid, r);
  vector<int> tmp;
  int i = l, j = mid;
  while (i < mid && j < r) {
    if (a[i] <= a[j]) tmp.push_back(a[i++]);
    else { cnt += mid - i; tmp.push_back(a[j++]); }
  }
  while (i < mid) tmp.push_back(a[i++]);
  while (j < r) tmp.push_back(a[j++]);
  copy(tmp.begin(), tmp.end(), a.begin() + l);
  return cnt;
}`,
      },
    ],
    bestPractices: [
      "Prefer std::sort for general use — it's O(n log n) worst case (introsort)",
      "Use stable_sort when equal elements must preserve relative order",
      "Counting sort when values ≤ 10⁶ and you need O(n)",
    ],
    problems: ["Leetcode 315 (Count Smaller)", "Codeforces 340E (inversions)", "Leetcode 179 (Largest Number)"],
  },

  "bfs": {
    title: "BFS (Breadth-First Search)",
    category: "Graph Theory",
    difficulty: "Beginner to Intermediate",
    timeToLearn: "3-5 days",
    importance: "Essential",
    description:
      "BFS explores nodes level by level using a queue. It finds shortest paths in unweighted graphs and is the basis of many graph algorithms.",
    asciiArt: `Graph BFS from node 1:

        1          Level 0
       / \\
      2   3        Level 1
     / \\   \\
    4   5   6      Level 2

 Queue: [1] → [2,3] → [3,4,5] → [4,5,6] → [5,6] → []
 Visit:  1  →  2,3  →   4,5   →    6

 Shortest path 1→6 = 2 edges (1→3→6)

 Grid BFS (0=open, 1=wall):
 S . . 1      S=start, E=end
 . 1 . .      BFS guarantees shortest path
 . . 1 E      in unweighted grid`,
    keyTechniques: [
      "Standard BFS (queue + visited array)",
      "Multi-source BFS",
      "0-1 BFS (deque for 0/1 weights)",
      "BFS on implicit graph (states)",
    ],
    benefits: [
      "Guaranteed shortest path in unweighted/unit-weight graphs",
      "Multi-source BFS processes all sources simultaneously",
      "0-1 BFS handles two-weight edges in O(V+E)",
    ],
    typicalConstraints: ["V, E ≤ 10⁵", "Grid up to 10³ × 10³"],
    examples: [
      {
        title: "BFS Shortest Path",
        description: "Standard BFS with distance tracking",
        codeSnippet: `vector<int> bfs(int start, vector<vector<int>>& adj, int n) {
  vector<int> dist(n, -1);
  queue<int> q;
  dist[start] = 0;
  q.push(start);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  return dist; // dist[i] = shortest path from start to i
}`,
      },
    ],
    bestPractices: [
      "Mark nodes visited when pushed to queue, not when popped",
      "For grids, use dx/dy arrays for 4 or 8 directions",
      "Multi-source BFS: push all sources with dist=0 before starting",
    ],
    problems: ["Leetcode 994 (Rotting Oranges)", "Codeforces 3D (Least Cost Bracket)", "Leetcode 1091 (Shortest Path Binary Matrix)"],
  },

  "dfs": {
    title: "DFS (Depth-First Search)",
    category: "Graph Theory",
    difficulty: "Beginner to Intermediate",
    timeToLearn: "3-5 days",
    importance: "Essential",
    description:
      "DFS dives as deep as possible before backtracking. It's the foundation for cycle detection, topological sort, connected components, and tree algorithms.",
    asciiArt: `DFS from node 1 (pre-order):

        1
       / \\
      2   5
     / \\
    3   4

 Call stack: dfs(1)→dfs(2)→dfs(3)→back→dfs(4)→back→back→dfs(5)
 Visit order: 1 → 2 → 3 → 4 → 5

 DFS tree edges & back edges (cycle detection):

 1→2 (tree)  2→3 (tree)  3→1 (back edge → CYCLE!)

 Timestamps (discovery / finish):
 Node 1: in=1, out=8   Node 2: in=2, out=7
 Node 3: in=3, out=4   (subtree of node u: in[u]..out[u])`,
    keyTechniques: [
      "Recursive DFS with visited array",
      "Iterative DFS with explicit stack",
      "DFS timestamps (in/out time)",
      "Topological sort (reverse post-order)",
    ],
    benefits: [
      "Detects cycles in directed/undirected graphs",
      "Topological sort in O(V+E)",
      "Finds strongly connected components (Kosaraju/Tarjan)",
    ],
    typicalConstraints: ["V, E ≤ 10⁵", "Stack depth ≤ recursion limit — use iterative for deep graphs"],
    examples: [
      {
        title: "DFS + Cycle Detection + Topological Sort",
        description: "White/Grey/Black coloring for directed graphs",
        codeSnippet: `// 0=unvisited, 1=in-stack, 2=done
vector<int> color, topo;
bool hasCycle = false;

void dfs(int u, vector<vector<int>>& adj) {
  color[u] = 1;
  for (int v : adj[u]) {
    if (color[v] == 1) { hasCycle = true; return; }
    if (color[v] == 0) dfs(v, adj);
  }
  color[u] = 2;
  topo.push_back(u);  // reverse post-order = topological order
}

// Call for all nodes:
for (int i = 0; i < n; i++)
  if (color[i] == 0) dfs(i, adj);
reverse(topo.begin(), topo.end());`,
      },
    ],
    bestPractices: [
      "Use iterative DFS with explicit stack for deep graphs (avoid stack overflow)",
      "Track in/out timestamps for ancestor queries and subtree problems",
      "DFS on undirected graph: a back edge means a cycle exists",
    ],
    problems: ["Leetcode 207 (Course Schedule)", "Codeforces 1385E", "Leetcode 802 (Safe States)"],
  },

  "dijkstra": {
    title: "Dijkstra's Algorithm",
    category: "Graph Theory",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "High",
    description:
      "Dijkstra finds shortest paths from a source in graphs with non-negative edge weights. Uses a min-heap priority queue for O((V+E) log V) complexity.",
    asciiArt: `Weighted graph, shortest path from node 1:

     1 ──4── 2
     |       |
     2       1
     |       |
     3 ──1── 4

 dist = [∞, ∞, ∞, ∞]  (1-indexed)
 Push (0,1):  dist[1]=0

 Pop (0,1):   relax 1→2 (dist=4), 1→3 (dist=2)
 Pop (2,3):   relax 3→4 (dist=3)
 Pop (3,4):   relax 4→2 (dist=4, no improve)
 Pop (4,2):   done

 Final: dist = [-, 0, 4, 2, 3]`,
    keyTechniques: [
      "Priority queue (min-heap) based",
      "Lazy deletion of stale entries",
      "Multi-source Dijkstra",
      "Dijkstra on DAG (use topo sort instead)",
    ],
    benefits: [
      "O((V+E) log V) — fast enough for V,E ≤ 10⁵",
      "Works for any non-negative weighted graph",
      "Multi-source variant: add virtual source with 0-weight edges",
    ],
    typicalConstraints: ["V, E ≤ 10⁵", "Edge weights ≥ 0 (use Bellman-Ford for negative weights)"],
    examples: [
      {
        title: "Dijkstra with Min-Heap",
        description: "Standard implementation using priority_queue",
        codeSnippet: `vector<long long> dijkstra(int src, vector<vector<pair<int,int>>>& adj, int n) {
  vector<long long> dist(n, LLONG_MAX);
  priority_queue<pair<long long,int>,
                 vector<pair<long long,int>>,
                 greater<>> pq;
  dist[src] = 0;
  pq.push({0, src});
  while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;  // stale entry
    for (auto [v, w] : adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push({dist[v], v});
      }
    }
  }
  return dist;
}`,
      },
    ],
    bestPractices: [
      "Use long long for distances to avoid overflow",
      "Skip stale entries with the lazy deletion check",
      "For negative weights → Bellman-Ford instead",
    ],
    problems: ["Codeforces 20C (Shortest Path)", "Leetcode 743 (Network Delay)", "Codeforces 786C"],
  },

  "union-find": {
    title: "Union-Find (DSU)",
    category: "Graph Theory",
    difficulty: "Intermediate",
    timeToLearn: "3-5 days",
    importance: "High",
    description:
      "Disjoint Set Union supports near-O(1) union and find operations. Essential for dynamic connectivity, Kruskal's MST, and offline LCA.",
    asciiArt: `DSU operations on {1,2,3,4,5}:

 Initially:  1  2  3  4  5   (each own root)

 unite(1,2):     2            unite(3,4): 4
                 |                        |
                 1                        3

 unite(2,4):     2
                / \\
               1   4
                   |
                   3

 find(3) with path compression:
 3→4→2  →  compress: 3,4 both point to 2 directly
 Result: O(α(n)) ≈ O(1) amortized`,
    keyTechniques: [
      "Path Compression",
      "Union by Rank / Size",
      "Weighted DSU",
      "Rollback DSU (offline)",
    ],
    benefits: [
      "Nearly O(1) amortized with path compression + union by rank",
      "Simplifies connectivity problems enormously",
      "Core component of Kruskal's MST algorithm",
    ],
    typicalConstraints: ["n, q ≤ 10⁵ easily", "Dynamic connectivity queries"],
    examples: [
      {
        title: "DSU with Path Compression",
        description: "Template used in 90% of DSU problems",
        codeSnippet: `struct DSU {
    vector<int> parent, rank_;
    DSU(int n) : parent(n), rank_(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;
        if (rank_[x] < rank_[y]) swap(x, y);
        parent[y] = x;
        if (rank_[x] == rank_[y]) rank_[x]++;
        return true;
    }
    bool connected(int x, int y) { return find(x) == find(y); }
};`,
      },
    ],
    bestPractices: [
      "Always use both path compression AND union by rank together",
      "Return bool from unite() to check if a cycle was formed",
      "Use DSU for Kruskal: sort edges, unite endpoints, skip same-component edges",
    ],
    problems: ["Leetcode 547 (Number of Provinces)", "Codeforces 1455C", "Leetcode 684"],
  },

  "dp-1d": {
    title: "1D Dynamic Programming",
    category: "Dynamic Programming",
    difficulty: "Intermediate",
    timeToLearn: "2 weeks",
    importance: "Essential",
    description:
      "Solve problems by breaking them into overlapping subproblems. 1D DP uses a single array of states. Covers Fibonacci, coin change, house robber, and LIS.",
    asciiArt: `Coin Change — minimum coins for amount=6, coins=[1,3,4]:

 dp[0]=0  dp[1]=1  dp[2]=2  dp[3]=1  dp[4]=1  dp[5]=2  dp[6]=2
          (1)      (1+1)    (3)      (4)      (4+1)    (3+3)

LIS — Longest Increasing Subsequence of [3,1,8,2,5]:

 tails: [3]          insert 3
 tails: [1]          replace: 1 < 3
 tails: [1,8]        append: 8 > all
 tails: [1,2]        replace: 2 replaces 8
 tails: [1,2,5]      append: 5 > all
 LIS length = 3  (e.g. 1,2,5)`,
    keyTechniques: [
      "Top-down Memoization",
      "Bottom-up Tabulation",
      "Space Optimization",
      "State Transition Design",
    ],
    benefits: [
      "Turns exponential brute force into polynomial time",
      "Space can often be reduced from O(n²) to O(n) or O(1)",
      "Most CP problems have a DP component",
    ],
    typicalConstraints: ["n ≤ 10⁶ for O(n) DP", "n ≤ 10⁴ for O(n²) DP"],
    examples: [
      {
        title: "Longest Increasing Subsequence (O(n log n))",
        description: "Classic LIS using patience sorting / binary search",
        codeSnippet: `int lis(vector<int>& nums) {
    vector<int> tails; // tails[i] = smallest tail of IS of length i+1
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
      },
      {
        title: "Coin Change (Minimum Coins)",
        description: "Bottom-up 1D DP",
        codeSnippet: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int c : coins)
            if (c <= i && dp[i - c] != INT_MAX)
                dp[i] = min(dp[i], dp[i - c] + 1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
      },
    ],
    bestPractices: [
      "Always clearly define what dp[i] represents",
      "Start with top-down, optimize to bottom-up if needed",
      "Look for opportunities to reduce space (rolling array)",
    ],
    problems: ["Leetcode 322 (Coin Change)", "Leetcode 300 (LIS)", "Codeforces 455A"],
  },

  "dp-2d": {
    title: "2D Dynamic Programming",
    category: "Dynamic Programming",
    difficulty: "Intermediate to Advanced",
    timeToLearn: "2 weeks",
    importance: "High",
    description:
      "DP over two dimensions — grids, string pairs (LCS, edit distance), or interval DP. States are O(n²) with transitions typically O(1) or O(n).",
    asciiArt: `LCS of "ABCB" and "BCB":

       ""  B   C   B
    ""  0   0   0   0
    A   0   0   0   0
    B   0   1   1   1
    C   0   1   2   2
    B   0   1   2   3   ← LCS = 3 ("BCB")

 dp[i][j] = dp[i-1][j-1]+1  if a[i]==b[j]
           = max(dp[i-1][j], dp[i][j-1])  otherwise

Edit Distance "cat" → "cut":

       ""  c   u   t
    ""  0   1   2   3
    c   1   0   1   2
    a   2   1   1   2
    t   3   2   2   1   ← 1 substitution (a→u)`,
    keyTechniques: [
      "Grid DP",
      "LCS / Edit Distance",
      "Interval DP",
      "Bitmask DP",
    ],
    benefits: [
      "Handles grid pathfinding with constraints",
      "Solves string alignment problems exactly",
      "Interval DP handles parenthesization and matrix chain problems",
    ],
    typicalConstraints: ["n, m ≤ 10³ for O(n×m) DP", "n ≤ 500 for O(n³) interval DP"],
    examples: [
      {
        title: "Longest Common Subsequence",
        description: "Classic 2D DP on two strings",
        codeSnippet: `int lcs(string& a, string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}`,
      },
    ],
    bestPractices: [
      "Draw the DP table with small examples first",
      "Identify base cases (empty string, empty row/col)",
      "For interval DP: iterate length first, then start index",
    ],
    problems: ["Leetcode 1143 (LCS)", "Leetcode 72 (Edit Distance)", "Codeforces 149D"],
  },

  "knapsack": {
    title: "Knapsack DP",
    category: "Dynamic Programming",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "High",
    description:
      "The 0/1 knapsack problem and its variants (unbounded, bounded, multiple) are classic DP patterns. Understanding the state definition is key to solving all variants.",
    asciiArt: `0/1 Knapsack: capacity=5
Items: (w=2,v=6) (w=2,v=10) (w=3,v=12)

     cap:  0   1   2   3   4   5
 item 1:   0   0   6   6   6   6
 item 2:   0   0  10  10  16  16
 item 3:   0   0  10  12  16  22  ← max=22

 dp[i][w] = max(dp[i-1][w],          ← skip item i
                dp[i-1][w-wi] + vi)  ← take item i

Space optimization (1D array, iterate w backwards):
 dp[w] = max(dp[w], dp[w-wi] + vi)   // iterate w: W..wi`,
    keyTechniques: [
      "0/1 Knapsack (each item once)",
      "Unbounded Knapsack (unlimited copies)",
      "Bounded Knapsack (limited copies)",
      "Subset Sum (knapsack variant)",
    ],
    benefits: [
      "1D space optimization reduces O(n×W) space to O(W)",
      "Subset sum and partition problems reduce to knapsack",
      "Foundation for more complex DP on sets",
    ],
    typicalConstraints: ["n ≤ 10³, W ≤ 10⁴ for O(nW)", "W ≤ 10⁶ for unbounded"],
    examples: [
      {
        title: "0/1 Knapsack (Space Optimized)",
        description: "Classic 1D knapsack — iterate weights in reverse",
        codeSnippet: `int knapsack(vector<int>& w, vector<int>& v, int W) {
    int n = w.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++)
        for (int cap = W; cap >= w[i]; cap--)  // reverse!
            dp[cap] = max(dp[cap], dp[cap - w[i]] + v[i]);
    return dp[W];
}

// Unbounded knapsack: iterate cap forward
for (int i = 0; i < n; i++)
    for (int cap = w[i]; cap <= W; cap++)  // forward
        dp[cap] = max(dp[cap], dp[cap - w[i]] + v[i]);`,
      },
    ],
    bestPractices: [
      "0/1: iterate capacity BACKWARDS to avoid using an item twice",
      "Unbounded: iterate capacity FORWARDS to allow reuse",
      "For subset sum: dp[w] = true/false instead of max value",
    ],
    problems: ["Leetcode 416 (Partition Equal Subset)", "Codeforces 366C", "Leetcode 494 (Target Sum)"],
  },

  "bitmask-dp": {
    title: "Bitmask DP",
    category: "Dynamic Programming",
    difficulty: "Advanced",
    timeToLearn: "1-2 weeks",
    importance: "Intermediate",
    description:
      "Bitmask DP encodes subsets as integers, enabling DP over all 2ⁿ subsets. Classic for TSP, assignment problems, and problems where n ≤ 20.",
    asciiArt: `TSP with 4 cities {0,1,2,3}, start=0:
Mask bits represent visited cities.

 mask=0001 (city 0 visited):   dp[0001][0] = 0
 mask=0011 (0,1 visited):      dp[0011][1] = dist(0,1)
 mask=0101 (0,2 visited):      dp[0101][2] = dist(0,2)
 ...
 mask=1111 (all visited):
   dp[1111][1] = dp[0111][?] + dist(?→1) + dist(1→0) min

Subset enumeration:
 for (int mask=0; mask<(1<<n); mask++)
   for (int bit=0; bit<n; bit++)
     if (mask >> bit & 1)  // bit is set in mask
       // bit is in this subset`,
    keyTechniques: [
      "DP over subsets (2ⁿ states)",
      "TSP (Traveling Salesman Problem)",
      "Assignment DP (matching)",
      "Subset sum over all subsets",
    ],
    benefits: [
      "Exact solution for NP-hard problems with small n (≤20)",
      "Bit operations make subset enumeration extremely fast",
      "Encodes exponential state space compactly",
    ],
    typicalConstraints: ["n ≤ 20 for O(2ⁿ × n)", "n ≤ 25 with meet-in-the-middle"],
    examples: [
      {
        title: "TSP with Bitmask DP",
        description: "Find shortest Hamiltonian cycle",
        codeSnippet: `int tsp(vector<vector<int>>& dist) {
    int n = dist.size();
    int FULL = (1 << n) - 1;
    // dp[mask][i] = min cost to visit cities in mask, ending at i
    vector<vector<int>> dp(1<<n, vector<int>(n, INT_MAX/2));
    dp[1][0] = 0;  // start at city 0
    for (int mask = 1; mask <= FULL; mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask >> u & 1) || dp[mask][u] == INT_MAX/2) continue;
            for (int v = 0; v < n; v++) {
                if (mask >> v & 1) continue;  // already visited
                int nmask = mask | (1 << v);
                dp[nmask][v] = min(dp[nmask][v], dp[mask][u] + dist[u][v]);
            }
        }
    }
    int ans = INT_MAX;
    for (int u = 1; u < n; u++)
        ans = min(ans, dp[FULL][u] + dist[u][0]);
    return ans;
}`,
      },
    ],
    bestPractices: [
      "Use (mask >> i) & 1 to check if city i is visited",
      "Use mask | (1 << i) to add city i to the set",
      "Enumerate submasks: for (int sub=mask; sub>0; sub=(sub-1)&mask)",
    ],
    problems: ["Leetcode 847 (Shortest Path Visiting All Nodes)", "Codeforces 327E", "Leetcode 1125 (Smallest Sufficient Team)"],
  },

  "segment-tree": {
    title: "Segment Tree",
    category: "Trees & Advanced",
    difficulty: "Advanced",
    timeToLearn: "2 weeks",
    importance: "High",
    description:
      "A tree structure for range queries (sum, min, max) and range updates in O(log n). With lazy propagation, supports range updates in O(log n) too.",
    asciiArt: `Segment tree for [1,2,3,4,5,6,7,8]:

          [1..8] sum=36
         /              \\
    [1..4]=10        [5..8]=26
    /       \\          /       \\
 [1..2]=3 [3..4]=7 [5..6]=11 [7..8]=15
  / \\       / \\      / \\        / \\
 1   2     3   4    5   6      7   8

 Query sum[2..6]:
 [2..2]=2, [3..4]=7, [5..6]=11  →  total=20

 Node index: root=1, left=2i, right=2i+1
 Leaf for position p: at depth log₂(n)`,
    keyTechniques: [
      "Point Update + Range Query",
      "Lazy Propagation",
      "Segment Tree Beats",
      "Persistent Segment Tree",
    ],
    benefits: [
      "O(log n) range query and point update",
      "O(log n) range update with lazy propagation",
      "Generalizes to any associative function",
    ],
    typicalConstraints: ["n, q ≤ 3×10⁵", "Operations: sum, min, max, GCD, XOR"],
    examples: [
      {
        title: "Segment Tree (Sum, Point Update)",
        description: "Classic segment tree implementation",
        codeSnippet: `struct SegTree {
    int n;
    vector<long long> tree;
    SegTree(int n) : n(n), tree(4 * n, 0) {}

    void update(int node, int l, int r, int pos, long long val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (pos <= mid) update(2*node, l, mid, pos, val);
        else update(2*node+1, mid+1, r, pos, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }

    long long query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return query(2*node, l, mid, ql, qr)
             + query(2*node+1, mid+1, r, ql, qr);
    }
};`,
      },
    ],
    bestPractices: [
      "Allocate 4×n nodes for the tree array",
      "Always pass l and r explicitly — avoid global state",
      "Use lazy propagation only when needed (range updates)",
    ],
    problems: ["Codeforces 339D", "Leetcode 315 (Count Smaller)", "Codeforces 380C"],
  },

  "fenwick-tree": {
    title: "Fenwick Tree (BIT)",
    category: "Trees & Advanced",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "High",
    description:
      "A Binary Indexed Tree (BIT/Fenwick tree) supports prefix sum queries and point updates in O(log n) with a very simple implementation. Lighter than a segment tree for sum queries.",
    asciiArt: `BIT for array [1,2,3,4,5,6,7,8]:

 idx:   1   2   3   4   5   6   7   8
 val:   1   2   3   4   5   6   7   8
 BIT:  [1] [3] [3][10] [5][11] [7][36]

 BIT[i] stores sum of a range ending at i.
 Range = [i - lowbit(i) + 1 .. i]

 lowbit(6) = 6 & (-6) = 010₂ = 2  → BIT[6]=a[5]+a[6]
 lowbit(4) = 4 & (-4) = 100₂ = 4  → BIT[4]=a[1..4]

 prefix_sum(6):  6→4→0: BIT[6]+BIT[4] = 11+10 = 21 ✓
 update(3, +5):  3→4→8: BIT[3]+=5, BIT[4]+=5, BIT[8]+=5`,
    keyTechniques: [
      "Point update, prefix query",
      "Range update, point query (difference array BIT)",
      "Range update, range query (two BITs)",
      "2D BIT (for 2D prefix sums)",
    ],
    benefits: [
      "Simpler and faster constant than segment tree for prefix sums",
      "O(log n) update and query with minimal code",
      "Easily extended to 2D for matrix prefix sums",
    ],
    typicalConstraints: ["n, q ≤ 10⁶", "Point updates + prefix/range sum queries"],
    examples: [
      {
        title: "Fenwick Tree — Point Update, Prefix Sum",
        description: "Classic BIT implementation",
        codeSnippet: `struct BIT {
    int n;
    vector<long long> tree;
    BIT(int n) : n(n), tree(n + 1, 0) {}

    void update(int i, long long delta) {
        for (; i <= n; i += i & (-i))
            tree[i] += delta;
    }

    long long query(int i) {
        long long s = 0;
        for (; i > 0; i -= i & (-i))
            s += tree[i];
        return s;
    }

    // Range sum [l, r] (1-indexed)
    long long query(int l, int r) {
        return query(r) - query(l - 1);
    }
};`,
      },
    ],
    bestPractices: [
      "Use 1-indexed arrays — BIT does not work with index 0",
      "lowbit(i) = i & (-i) isolates the lowest set bit",
      "For range updates + range queries, use two BITs simultaneously",
    ],
    problems: ["Leetcode 315 (Count Smaller — BIT solution)", "Codeforces 701E", "Leetcode 307 (Range Sum Query Mutable)"],
  },

  "trie": {
    title: "Trie",
    category: "Trees & Advanced",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "Intermediate",
    description:
      "A trie (prefix tree) stores strings so that prefix searches and insertions run in O(L) where L is the string length. Used for autocomplete, XOR maximization, and IP routing.",
    asciiArt: `Insert: "cat", "car", "card", "dog"

          root
         /    \\
        c      d
        |      |
        a      o
       / \\     |
      t   r    g
     (*)  |   (*)  ← end of word
          |
          d
         (*)  "card"

(*) marks end of word.

XOR Trie (binary trie for max XOR):
 Insert numbers in binary (MSB first)
 To maximize XOR with x: at each bit,
 try to go opposite direction of x's bit`,
    keyTechniques: [
      "Prefix search in O(L)",
      "Word insertion / deletion",
      "XOR trie (max XOR pair)",
      "Compressed trie (Patricia tree)",
    ],
    benefits: [
      "O(L) insert and search vs O(L log n) with sorted set",
      "Naturally groups words by common prefix",
      "XOR trie solves max XOR problems in O(n × 32)",
    ],
    typicalConstraints: ["Total string length ≤ 10⁶", "Alphabet size ≤ 26 (or 2 for binary trie)"],
    examples: [
      {
        title: "Trie — Insert and Search",
        description: "Array-based trie for lowercase letters",
        codeSnippet: `struct Trie {
    struct Node {
        int ch[26];
        bool end;
        Node() : end(false) { fill(ch, ch+26, -1); }
    };
    vector<Node> nodes;
    Trie() { nodes.emplace_back(); }

    void insert(const string& s) {
        int cur = 0;
        for (char c : s) {
            int x = c - 'a';
            if (nodes[cur].ch[x] == -1) {
                nodes[cur].ch[x] = nodes.size();
                nodes.emplace_back();
            }
            cur = nodes[cur].ch[x];
        }
        nodes[cur].end = true;
    }

    bool search(const string& s) {
        int cur = 0;
        for (char c : s) {
            int x = c - 'a';
            if (nodes[cur].ch[x] == -1) return false;
            cur = nodes[cur].ch[x];
        }
        return nodes[cur].end;
    }
};`,
      },
    ],
    bestPractices: [
      "Use array-based nodes (faster) instead of map<char, Node*> (cleaner but slower)",
      "For XOR trie, use a binary trie with alphabet {0, 1}",
      "Track count of words passing through each node for prefix counting",
    ],
    problems: ["Leetcode 208 (Implement Trie)", "Leetcode 421 (Max XOR — binary trie)", "Codeforces 514C"],
  },

  "modular-arithmetic": {
    title: "Modular Arithmetic",
    category: "Mathematics",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "High",
    description:
      "Most CP problems with large outputs require answers modulo 10⁹+7. Master mod operations, modular inverse, and fast exponentiation.",
    asciiArt: `Modular clock (mod 7):

 ...21 → 14 → 7 → 0
 ...22 → 15 → 8 → 1
 ...23 → 16 → 9 → 2

Fast power: 3^13 mod 7
13 = 1101₂  →  3^1 · 3^4 · 3^8

 exp  val (mod 7)
  1     3
  2     2   (3²=9≡2)
  4     4   (2²=4)
  8     2   (4²=16≡2)

3^13 = 3^8 · 3^4 · 3^1 = 2·4·3 = 24 ≡ 3 (mod 7) ✓`,
    keyTechniques: [
      "Fast Exponentiation (Binary Exponentiation)",
      "Modular Inverse (Fermat's Little Theorem)",
      "Precomputed Factorials",
      "Chinese Remainder Theorem",
    ],
    benefits: [
      "Handle numbers up to 10¹⁸ without overflow",
      "Compute combinations C(n,k) mod p efficiently",
      "Required in ~80% of counting problems",
    ],
    typicalConstraints: ["MOD = 10⁹ + 7 (prime)", "MOD = 998244353 (NTT-friendly prime)"],
    examples: [
      {
        title: "Fast Exponentiation + Modular Inverse",
        description: "Core math utilities for competitive programming",
        codeSnippet: `const long long MOD = 1e9 + 7;

long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}

// Modular inverse (mod must be prime)
long long inv(long long a, long long mod = MOD) {
    return power(a, mod - 2, mod);
}

// Precompute factorials for C(n, k) mod p
vector<long long> fact(MAXN), inv_fact(MAXN);
void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = inv(fact[MAXN-1]);
    for (int i = MAXN-2; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}
long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}`,
      },
    ],
    bestPractices: [
      "Always add MOD before taking mod to handle negatives: (a - b % MOD + MOD) % MOD",
      "Precompute factorials up to MAXN once, not per query",
      "Use __int128 if intermediate products can exceed long long",
    ],
    problems: ["Codeforces 509C", "Leetcode 1569 (Reorder Routes)", "Codeforces 543B"],
  },

  "sieve": {
    title: "Sieve of Eratosthenes",
    category: "Mathematics",
    difficulty: "Beginner",
    timeToLearn: "2-3 days",
    importance: "High",
    description:
      "The sieve finds all primes up to N in O(N log log N). Linear sieve achieves O(N). Essential for number theory problems involving prime factorization and divisibility.",
    asciiArt: `Sieve up to 30:

 2  3  4  5  6  7  8  9 10 11 12 13 14 ...
 ✓  ✓  ✗  ✓  ✗  ✓  ✗  ✗  ✗  ✓  ✗  ✓  ✗

 Mark multiples of 2: 4, 6, 8, 10, 12, 14 ...
 Mark multiples of 3: 9, 15, 21, 27 ...
 Mark multiples of 5: 25 ...
 Stop at ⌊√30⌋ = 5

 Primes ≤ 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29

 Smallest prime factor (SPF) sieve:
 spf[12] = 2  →  12 = 2 × 6 = 2 × 2 × 3
 Factorize any n in O(log n) using SPF`,
    keyTechniques: [
      "Classic Sieve — O(N log log N)",
      "Linear Sieve — O(N)",
      "Smallest Prime Factor (SPF) sieve",
      "Sieve of prime factorizations",
    ],
    benefits: [
      "Precompute all primes ≤ 10⁷ in ~0.1 seconds",
      "SPF sieve enables O(log n) factorization per number",
      "Euler's totient function can be computed alongside the sieve",
    ],
    typicalConstraints: ["N ≤ 10⁶ easily; N ≤ 10⁷ with ~40 MB memory"],
    examples: [
      {
        title: "Classic Sieve + Smallest Prime Factor",
        description: "Two sieves in one pass",
        codeSnippet: `const int MAXN = 1e6 + 5;
vector<bool> is_prime(MAXN, true);
vector<int> spf(MAXN); // smallest prime factor

void sieve() {
    iota(spf.begin(), spf.end(), 0); // spf[i] = i initially
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i < MAXN; i++) {
        if (is_prime[i]) {
            for (long long j = (long long)i*i; j < MAXN; j += i) {
                is_prime[j] = false;
                if (spf[j] == j) spf[j] = i; // set smallest prime factor
            }
        }
    }
}

// Factorize n in O(log n) using SPF
vector<int> factorize(int n) {
    vector<int> factors;
    while (n > 1) {
        factors.push_back(spf[n]);
        n /= spf[n];
    }
    return factors;
}`,
      },
    ],
    bestPractices: [
      "Start inner loop at i² (multiples below i² are already marked)",
      "Use bitset<MAXN> instead of vector<bool> for ~8x memory reduction",
      "SPF sieve: only update spf[j] if spf[j]==j (first time marked)",
    ],
    problems: ["Leetcode 204 (Count Primes)", "Codeforces 776C", "Codeforces 1217D"],
  },

  "combinatorics": {
    title: "Combinatorics",
    category: "Mathematics",
    difficulty: "Intermediate",
    timeToLearn: "1-2 weeks",
    importance: "High",
    description:
      "Combinatorics counts arrangements and selections. In CP, this means computing C(n,k) mod p, applying inclusion-exclusion, Pigeonhole principle, and generating functions.",
    asciiArt: `Pascal's Triangle — C(n,k):

 n=0:           1
 n=1:         1   1
 n=2:       1   2   1
 n=3:     1   3   3   1
 n=4:   1   4   6   4   1
 n=5: 1   5  10  10   5   1

 C(n,k) = C(n-1,k-1) + C(n-1,k)

 C(5,2) = 10  ways to choose 2 from 5

Stars and Bars (distribute n items into k bins):
 C(n+k-1, k-1)

Inclusion-Exclusion (|A∪B∪C|):
 |A|+|B|+|C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|`,
    keyTechniques: [
      "Binomial coefficients C(n,k) mod p",
      "Stars and Bars",
      "Inclusion-Exclusion Principle",
      "Pigeonhole Principle",
    ],
    benefits: [
      "Counts arrangements without brute force enumeration",
      "Inclusion-exclusion handles complex constraint counting",
      "Lucas' theorem extends C(n,k) mod p to large n",
    ],
    typicalConstraints: ["n ≤ 10⁶ with precomputed factorials", "n ≤ 10¹⁸ with Lucas' theorem"],
    examples: [
      {
        title: "Precomputed Factorials for C(n,k) mod p",
        description: "Standard combinatorics template",
        codeSnippet: `const int MOD = 1e9 + 7;
const int MAXN = 2e6 + 5;
long long fact[MAXN], inv_fact[MAXN];

long long power(long long b, long long e, long long m) {
    long long r = 1; b %= m;
    for (; e > 0; e >>= 1) {
        if (e & 1) r = r * b % m;
        b = b * b % m;
    }
    return r;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = power(fact[MAXN-1], MOD-2, MOD);
    for (int i = MAXN-2; i >= 0; i--)
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}

// Stars and bars: n identical items into k distinct bins
long long distribute(int n, int k) { return C(n + k - 1, k - 1); }`,
      },
    ],
    bestPractices: [
      "Precompute factorials up to 2×10⁶ to handle C(2n, n) type problems",
      "Lucas' theorem for C(n,k) mod p when n can be very large",
      "Derangements: D(n) = (n-1)(D(n-1)+D(n-2))",
    ],
    problems: ["Codeforces 1696D", "Leetcode 1220 (Count Vowels Permutations)", "Codeforces 559C"],
  },
};

// Sidebar navigation structure
const sidebarSections = [
  {
    label: "OVERVIEW",
    items: [
      { id: "introduction", title: "Introduction" },
      { id: "learning-path", title: "Learning Path" },
      { id: "assessment", title: "Skill Assessment" },
    ],
  },
  {
    label: "FUNDAMENTALS",
    items: [
      { id: "complexity-analysis", title: "Complexity Analysis" },
      { id: "arrays-strings", title: "Arrays & Strings" },
      { id: "stl-guide", title: "STL Essentials" },
    ],
  },
  {
    label: "ALGORITHMS",
    items: [
      { id: "two-pointers", title: "Two Pointers" },
      { id: "sliding-window", title: "Sliding Window" },
      { id: "binary-search", title: "Binary Search" },
      { id: "sorting", title: "Sorting Techniques" },
    ],
  },
  {
    label: "GRAPH THEORY",
    items: [
      { id: "bfs", title: "BFS" },
      { id: "dfs", title: "DFS" },
      { id: "dijkstra", title: "Dijkstra" },
      { id: "union-find", title: "Union-Find (DSU)" },
    ],
  },
  {
    label: "DYNAMIC PROGRAMMING",
    items: [
      { id: "dp-1d", title: "1D DP" },
      { id: "dp-2d", title: "2D DP" },
      { id: "knapsack", title: "Knapsack" },
      { id: "bitmask-dp", title: "Bitmask DP" },
    ],
  },
  {
    label: "TREES & ADVANCED",
    items: [
      { id: "segment-tree", title: "Segment Tree" },
      { id: "fenwick-tree", title: "Fenwick Tree (BIT)" },
      { id: "trie", title: "Trie" },
    ],
  },
  {
    label: "MATHEMATICS",
    items: [
      { id: "modular-arithmetic", title: "Modular Arithmetic" },
      { id: "sieve", title: "Sieve of Eratosthenes" },
      { id: "combinatorics", title: "Combinatorics" },
    ],
  },
];