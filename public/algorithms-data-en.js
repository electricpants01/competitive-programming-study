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
      {
        title: "Master Theorem & Amortized Analysis",
        description: "Solve divide-and-conquer recurrences; understand amortized O(1)",
        codeSnippet: `// Master Theorem: T(n) = a·T(n/b) + f(n), a≥1, b>1
// Let c = log_b(a). Compare f(n) with n^c:
//
// Case 1: f(n) = O(n^(c-ε))   → T(n) = Θ(n^c)
// Case 2: f(n) = Θ(n^c)       → T(n) = Θ(n^c · log n)
// Case 3: f(n) = Ω(n^(c+ε))   → T(n) = Θ(f(n))
//
// Common examples:
// T(n) = T(n/2)   + O(1)  → O(log n)    [binary search]
// T(n) = 2T(n/2)  + O(n)  → O(n log n)  [merge sort]
// T(n) = 2T(n/2)  + O(1)  → O(n)        [tree traversal]
// T(n) = 4T(n/2)  + O(n²) → O(n²)       [some divide & conquer]
//
// Amortized Analysis — vector push_back:
// When vector doubles: copies 1+2+4+...+n/2 = n-1 elements total
// n push_backs → at most 2n copies → O(1) amortized per push_back`,
      },
    ],
    bestPractices: [
      "Always calculate complexity before submitting, not after TLE",
      "n ≤ 10⁵ allows O(n log n); n ≤ 10³ allows O(n²)",
      "Watch for hidden constants — 2×10⁸ may TLE on tight limits",
    ],
    problems: ["Leetcode 1 (Two Sum variants)", "Codeforces 4A", "USACO 2016 Jan (Div 2)"],
    quiz: [
      { q: "What does Big-O notation describe?", options: ["Exact runtime in seconds", "Upper bound on runtime growth", "Average-case performance", "Memory usage only"], answer: 1 },
      { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
      { q: "For n = 10⁶, which complexity would TLE at 1 second (10⁸ ops/sec limit)?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], answer: 2 },
      { q: "Which complexity is best for n = 10⁸?", options: ["O(n log n)", "O(n²)", "O(n)", "O(1)"], answer: 3 },
      { q: "What is the time complexity of two nested loops each running n times?", options: ["O(n)", "O(2n)", "O(n²)", "O(n log n)"], answer: 2 },
    ],
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
      {
        title: "2D Prefix Sum",
        description: "Rectangle range sum queries in O(1) after O(n×m) preprocessing",
        codeSnippet: `// Build 2D prefix sum: pre[i][j] = sum of grid[0..i-1][0..j-1]
vector<vector<int>> build2D(vector<vector<int>>& g) {
  int n = g.size(), m = g[0].size();
  vector<vector<int>> pre(n+1, vector<int>(m+1, 0));
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
      pre[i][j] = g[i-1][j-1]
                + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
  return pre;
}

// Query sum of rectangle (r1,c1) to (r2,c2) — 0-indexed inclusive
int query2D(vector<vector<int>>& pre, int r1, int c1, int r2, int c2) {
  return pre[r2+1][c2+1] - pre[r1][c2+1]
       - pre[r2+1][c1]   + pre[r1][c1];
}`,
      },
    ],
    bestPractices: [
      "Use 1-indexed prefix arrays to avoid off-by-one errors",
      "For 2D grids, build a 2D prefix sum",
      "Difference arrays are ideal for range add/subtract updates",
    ],
    problems: ["Leetcode 303 (Range Sum Query)", "Codeforces 816C", "Leetcode 1480"],
    quiz: [
      { q: "What is the time complexity of a prefix sum range query after O(n) preprocessing?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2 },
      { q: "Given prefix = [0, 3, 4, 8, 9, 14], what is the range sum for indices [1..3]?", options: ["4", "6", "8", "5"], answer: 1 },
      { q: "What does a difference array allow you to do efficiently?", options: ["Point queries in O(1)", "Range updates in O(1)", "Sort in O(n)", "Search in O(log n)"], answer: 1 },
      { q: "To build a 1D prefix sum of size n, what is the preprocessing time?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2 },
      { q: "Using 1-indexed prefix arrays helps avoid which type of errors?", options: ["Stack overflow", "Off-by-one errors", "Type errors", "Integer overflow"], answer: 1 },
    ],
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
      {
        title: "Bit Builtins & Useful STL Algorithms",
        description: "GCC bit intrinsics and next_permutation for CP",
        codeSnippet: `// GCC built-in bit functions (single CPU instruction, very fast):
int x = 12; // binary: 1100
__builtin_popcount(x);   // count set bits      → 2
__builtin_clz(x);        // leading zeros (32b) → 28
__builtin_ctz(x);        // trailing zeros      → 2
__builtin_parity(x);     // parity (odd 1s?)    → 0
// Use __builtin_popcountll(x) for long long

// next_permutation: iterate all permutations lexicographically
vector<int> p = {1, 2, 3};
do {
  // process permutation p
} while (next_permutation(p.begin(), p.end())); // n! total, use n ≤ 10

// nth_element: O(n) avg — place kth smallest at index k
nth_element(v.begin(), v.begin() + k, v.end());
// v[k] is now the kth smallest (0-indexed); rest unordered

// __gcd and lcm
int g = __gcd(a, b);
int l = a / g * b; // lcm without overflow`,
      },
    ],
    bestPractices: [
      "Use unordered_map/set for O(1) average, but beware worst-case hash collisions",
      "reserve() unordered containers upfront to avoid rehashing",
      "Prefer emplace_back over push_back for complex objects",
    ],
    problems: ["Leetcode 1 (Two Sum - use unordered_map)", "Codeforces 4C (Registration)", "Leetcode 347 (Top K)"],
    quiz: [
      { q: "What is the average time complexity of inserting into an unordered_map?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], answer: 2 },
      { q: "Which STL container maintains elements in sorted order without duplicates?", options: ["vector", "unordered_set", "set", "deque"], answer: 2 },
      { q: "What does lower_bound return on a sorted vector?", options: ["Iterator past the last element", "Iterator to first element ≥ target", "Iterator to last element < target", "Index of the element"], answer: 1 },
      { q: "Which container is a max-heap by default in C++ STL?", options: ["set", "deque", "priority_queue", "multiset"], answer: 2 },
      { q: "What is the time complexity of std::sort?", options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], answer: 2 },
    ],
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
      {
        title: "Floyd's Cycle Detection",
        description: "Detect cycle and find its start in O(n) time, O(1) space",
        codeSnippet: `// Phase 1: slow moves 1 step, fast moves 2 steps
// If they meet → cycle exists
// Phase 2: reset slow to head, advance both 1 step → meet at cycle start
ListNode* detectCycle(ListNode* head) {
  ListNode *slow = head, *fast = head;
  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) break;
  }
  if (!fast || !fast->next) return nullptr; // no cycle
  slow = head;
  while (slow != fast) { slow = slow->next; fast = fast->next; }
  return slow; // cycle start node
}
// Why: if head→cycle_start = a, cycle_length = c,
// at meeting point slow traveled a+x, fast traveled a+x+k*c.
// fast = 2*slow → k*c = a+x → after resetting slow, both reach start in a steps.`,
      },
    ],
    bestPractices: [
      "Sort first if the array is not already sorted",
      "For linked lists, use slow/fast pointer to find cycles or midpoints",
      "Check for edge cases: empty array, single element, all equal",
    ],
    problems: ["Leetcode 167 (Two Sum II)", "Leetcode 15 (3Sum)", "Codeforces 6C"],
    quiz: [
      { q: "What is the main requirement for the opposite-direction two pointers technique?", options: ["The array must be unsorted", "The array must be sorted", "The array must have no duplicates", "The array must be of even length"], answer: 1 },
      { q: "What is the time complexity of the two-pointer two-sum on a sorted array?", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], answer: 2 },
      { q: "In Floyd's cycle detection, the fast pointer moves how many steps per iteration?", options: ["1", "2", "3", "n/2"], answer: 1 },
      { q: "Which technique is used to remove duplicates in-place from a sorted array in O(n)?", options: ["Binary search", "Two pointers (slow/fast)", "Hashing", "Merge sort"], answer: 1 },
      { q: "Two pointers reduce the complexity of which type of brute-force search?", options: ["O(log n) → O(1)", "O(n²) → O(n)", "O(n³) → O(n²)", "O(n log n) → O(n)"], answer: 1 },
    ],
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
      {
        title: "Sliding Window Maximum (Monotonic Deque)",
        description: "Find the max in every window of size k in O(n) total",
        codeSnippet: `// Monotonic deque: front = index of max in current window
// Invariant: deque is decreasing (indices with decreasing values)
vector<int> maxSlidingWindow(vector<int>& a, int k) {
  deque<int> dq; // stores indices
  vector<int> result;
  for (int i = 0; i < (int)a.size(); i++) {
    // Remove index outside window
    while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
    // Remove smaller elements (they can never be max)
    while (!dq.empty() && a[dq.back()] < a[i]) dq.pop_back();
    dq.push_back(i);
    if (i >= k - 1) result.push_back(a[dq.front()]);
  }
  return result;
}
// Complexity: each element pushed and popped at most once → O(n)`,
      },
    ],
    bestPractices: [
      "Expand R first, then shrink L to restore the invariant",
      "Use a counter of 'matched' conditions rather than comparing entire maps",
      "For sliding window maximum, use a monotonic deque (deque of indices)",
    ],
    problems: ["Leetcode 76 (Min Window Substring)", "Leetcode 239 (Sliding Window Max)", "Codeforces 701C"],
    quiz: [
      { q: "In the sliding window technique, what is the overall time complexity for processing an array of size n?", options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], answer: 2 },
      { q: "Which data structure enables O(n) sliding window maximum queries?", options: ["Stack", "Monotonic deque", "Priority queue", "Sorted set"], answer: 1 },
      { q: "In a variable sliding window, when should you shrink the left pointer?", options: ["When the window is empty", "When the window invariant is violated", "When right reaches the end", "Every n steps"], answer: 1 },
      { q: "For finding the minimum window substring, which technique tracks character frequencies?", options: ["Prefix sum", "Hash map inside the window", "Sorting", "BFS"], answer: 1 },
      { q: "In a fixed-size window of size k over an array of size n, how many total windows are there?", options: ["k", "n", "n - k + 1", "n - k"], answer: 2 },
    ],
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
      {
        title: "Two Loop Templates & Ternary Search",
        description: "lo<=hi for exact match; lo<hi for leftmost valid; ternary for unimodal",
        codeSnippet: `// Template 1: lo <= hi — find exact value, return -1 if not found
int exactSearch(vector<int>& a, int target) {
  int lo = 0, hi = (int)a.size() - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    else if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Template 2: lo < hi — find leftmost position satisfying predicate
// Loop terminates when lo == hi, which IS the answer
int leftmost(vector<int>& a, int target) {
  int lo = 0, hi = a.size(); // hi can be past-the-end
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] >= target) hi = mid;  // valid: could be answer, shrink right
    else lo = mid + 1;               // invalid: definitely not answer
  }
  return lo; // lo == hi == first index with a[i] >= target
}

// Ternary search: find minimum of unimodal f on real interval [lo, hi]
double ternaryMin(double lo, double hi) {
  for (int it = 0; it < 200; it++) { // 200 iterations → ~10^-60 precision
    double m1 = lo + (hi - lo) / 3;
    double m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) hi = m2; else lo = m1;
  }
  return (lo + hi) / 2;
}`,
      },
    ],
    bestPractices: [
      "Use lo + (hi - lo) / 2 to avoid integer overflow",
      "Always verify the loop invariant: answer is always in [lo, hi]",
      "For lower_bound: use hi = mid when feasible; for upper_bound: lo = mid + 1",
    ],
    problems: ["Leetcode 1011 (Ship Packages)", "Codeforces 460C", "Leetcode 875 (Koko Eating Bananas)"],
    quiz: [
      { q: "What is the time complexity of binary search?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], answer: 2 },
      { q: "Why use lo + (hi - lo) / 2 instead of (lo + hi) / 2?", options: ["It's faster", "Prevents integer overflow", "Gives a different result", "Handles negatives"], answer: 1 },
      { q: "In 'binary search on the answer', what are you searching for?", options: ["An index in a sorted array", "A value satisfying a monotonic feasibility condition", "The minimum element", "A duplicate value"], answer: 1 },
      { q: "What does lower_bound return if the target is not in the sorted array?", options: ["Null pointer", "The first element greater than target", "-1", "The last element less than target"], answer: 1 },
      { q: "Binary search requires what property of the search space?", options: ["All elements are unique", "The array is sorted (or predicate is monotonic)", "Length is a power of 2", "Elements are positive"], answer: 1 },
      { q: "When binary searching with lo and hi, which condition avoids infinite loops on 2-element ranges?", options: ["while (lo <= hi)", "while (lo < hi)", "while (lo != hi)", "while (hi - lo > 1)"], answer: 0 },
      { q: "For a rotated sorted array binary search, what extra condition must you check at each step?", options: ["Whether mid equals the target", "Which half of the array is still sorted", "Whether lo and hi are adjacent", "Whether the pivot is at index 0"], answer: 1 },
      { q: "If lower_bound returns end(), what does that mean?", options: ["Target was found at the last index", "All elements are less than target", "The array is empty", "Target is at position 0"], answer: 1 },
    ],
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
      {
        title: "Sort + Greedy: Activity Selection",
        description: "Sort by end time → greedily pick non-overlapping intervals",
        codeSnippet: `// Activity Selection: maximum non-overlapping intervals
// Key insight: always pick the interval that ends earliest
int maxActivities(vector<pair<int,int>>& intervals) {
  // Sort by end time (the greedy choice)
  sort(intervals.begin(), intervals.end(),
       [](auto& a, auto& b){ return a.second < b.second; });
  int count = 0, lastEnd = INT_MIN;
  for (auto& [start, end] : intervals) {
    if (start >= lastEnd) { // no overlap with last chosen
      count++;
      lastEnd = end;
    }
  }
  return count;
}
// General "sort + greedy" pattern appears in:
// - Meeting rooms (sort by start time)
// - Fractional knapsack (sort by value/weight ratio)
// - Huffman coding (sort by frequency)
// - Job scheduling with deadlines (sort by deadline)
// Rule: identify the "correct" ordering criterion, then greedy scan.`,
      },
    ],
    bestPractices: [
      "Prefer std::sort for general use — it's O(n log n) worst case (introsort)",
      "Use stable_sort when equal elements must preserve relative order",
      "Counting sort when values ≤ 10⁶ and you need O(n)",
    ],
    problems: ["Leetcode 315 (Count Smaller)", "Codeforces 340E (inversions)", "Leetcode 179 (Largest Number)"],
    quiz: [
      { q: "What is the time complexity of C++ std::sort?", options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], answer: 2 },
      { q: "Which sorting algorithm is the standard method for counting inversions?", options: ["Quick sort", "Merge sort", "Counting sort", "Heap sort"], answer: 1 },
      { q: "When is counting sort O(n) instead of O(n log n)?", options: ["When the array is nearly sorted", "When values are bounded by a small constant k", "When n is a power of 2", "Always"], answer: 1 },
      { q: "Which C++ function should you use to sort while preserving the relative order of equal elements?", options: ["std::sort", "std::partial_sort", "std::stable_sort", "std::nth_element"], answer: 2 },
      { q: "What does sorting an array enable that directly reduces many O(n²) problems to O(n)?", options: ["Hashing", "Two pointers and binary search", "DFS", "Greedy greedy"], answer: 1 },
    ],
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
      {
        title: "0-1 BFS",
        description: "Shortest path with edge weights 0 or 1 — O(V+E) using deque",
        codeSnippet: `// 0-1 BFS: use deque instead of queue
// Free edges (w=0) → push_front (like same level)
// Cost edges (w=1) → push_back (like next level)
vector<int> bfs01(int src, vector<vector<pair<int,int>>>& adj, int n) {
  vector<int> dist(n, INT_MAX);
  deque<int> dq;
  dist[src] = 0;
  dq.push_back(src);
  while (!dq.empty()) {
    int u = dq.front(); dq.pop_front();
    for (auto [v, w] : adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        if (w == 0) dq.push_front(v);  // free: higher priority
        else        dq.push_back(v);   // cost: normal priority
      }
    }
  }
  return dist;
}
// Use case: grid where you can move normally (cost 1) or
// with a special pass (cost 0) — e.g., Leetcode 1368`,
      },
    ],
    bestPractices: [
      "Mark nodes visited when pushed to queue, not when popped",
      "For grids, use dx/dy arrays for 4 or 8 directions",
      "Multi-source BFS: push all sources with dist=0 before starting",
    ],
    problems: ["Leetcode 994 (Rotting Oranges)", "Codeforces 3D (Least Cost Bracket)", "Leetcode 1091 (Shortest Path Binary Matrix)"],
    quiz: [
      { q: "What data structure does BFS use to process nodes?", options: ["Stack", "Queue", "Priority queue", "Deque"], answer: 1 },
      { q: "What type of shortest path does BFS guarantee?", options: ["Shortest by weight", "Shortest by number of edges (unweighted)", "Shortest by time", "Shortest by cost"], answer: 1 },
      { q: "When should you mark nodes as visited in BFS?", options: ["When you pop them from the queue", "When you push them onto the queue", "After processing all neighbors", "Never"], answer: 1 },
      { q: "What is the time complexity of BFS for a graph with V vertices and E edges?", options: ["O(V²)", "O(V log V)", "O(V + E)", "O(E log V)"], answer: 2 },
      { q: "In multi-source BFS, how do you handle multiple starting nodes?", options: ["Run BFS from each source separately", "Push all sources with distance 0 before starting", "Sort sources first", "Pick the closest source"], answer: 1 },
    ],
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
      {
        title: "Tarjan's SCC & Bridge Detection",
        description: "Find SCCs and bridges in O(V+E) using disc[] and low[] arrays",
        codeSnippet: `// Tarjan's SCC: disc[u]=discovery time, low[u]=lowest disc reachable via subtree
int timer_t = 0, numSCC = 0;
vector<int> disc_t, low_t, comp;
vector<bool> onStack;
stack<int> st;

void tarjan(int u, vector<vector<int>>& adj) {
  disc_t[u] = low_t[u] = timer_t++;
  st.push(u); onStack[u] = true;
  for (int v : adj[u]) {
    if (disc_t[v] == -1) { tarjan(v, adj); low_t[u] = min(low_t[u], low_t[v]); }
    else if (onStack[v])  { low_t[u] = min(low_t[u], disc_t[v]); }
  }
  if (low_t[u] == disc_t[u]) { // u is root of an SCC
    while (true) { int v = st.top(); st.pop(); onStack[v]=false; comp[v]=numSCC; if(v==u)break; }
    numSCC++;
  }
}

// Bridge detection (undirected graph):
// Edge (u,v) is a bridge if low[v] > disc[u]
void bridge(int u, int par, vector<vector<int>>& adj,
            vector<int>& disc, vector<int>& low, vector<pair<int,int>>& bridges, int& t) {
  disc[u] = low[u] = t++;
  for (int v : adj[u]) {
    if (disc[v]==-1) {
      bridge(v, u, adj, disc, low, bridges, t);
      low[u] = min(low[u], low[v]);
      if (low[v] > disc[u]) bridges.push_back({u,v}); // it's a bridge!
    } else if (v != par) low[u] = min(low[u], disc[v]);
  }
}`,
      },
    ],
    bestPractices: [
      "Use iterative DFS with explicit stack for deep graphs (avoid stack overflow)",
      "Track in/out timestamps for ancestor queries and subtree problems",
      "DFS on undirected graph: a back edge means a cycle exists",
    ],
    problems: ["Leetcode 207 (Course Schedule)", "Codeforces 1385E", "Leetcode 802 (Safe States)"],
    quiz: [
      { q: "What data structure does DFS implicitly use via recursion?", options: ["Queue", "Stack", "Heap", "Deque"], answer: 1 },
      { q: "In directed graph DFS, a back edge indicates what?", options: ["A tree edge", "A cycle", "A cross edge", "An unvisited node"], answer: 1 },
      { q: "Topological order is the reverse of which DFS traversal order?", options: ["Pre-order", "In-order", "Post-order", "Level-order"], answer: 2 },
      { q: "When should you use iterative DFS instead of recursive?", options: ["When graph is small", "When graph is deep (to avoid stack overflow)", "When edges have weights", "When graph is undirected"], answer: 1 },
      { q: "DFS timestamps (entry/exit times) are useful for what query?", options: ["Shortest path", "Subtree ancestor queries", "Minimum spanning tree", "Counting connected components"], answer: 1 },
      { q: "Tarjan's SCC algorithm finds what using DFS?", options: ["Shortest paths", "Strongly Connected Components", "Minimum Spanning Tree", "Bipartite partitions"], answer: 1 },
      { q: "In undirected graph DFS, what distinguishes a back edge from a parent edge?", options: ["Back edge goes to the root", "Back edge goes to an ancestor other than the immediate parent", "Back edge goes to a leaf", "Back edge connects different components"], answer: 1 },
      { q: "A bridge in a graph is an edge whose removal does what?", options: ["Creates a cycle", "Increases the number of connected components", "Reduces the shortest path", "Makes the graph bipartite"], answer: 1 },
    ],
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
      {
        title: "Bellman-Ford & Algorithm Comparison",
        description: "O(V×E) shortest paths; handles negative weights and detects negative cycles",
        codeSnippet: `struct Edge { int u, v, w; };

vector<long long> bellmanFord(int src, vector<Edge>& edges, int n) {
  vector<long long> dist(n, LLONG_MAX);
  dist[src] = 0;
  for (int i = 0; i < n - 1; i++) // V-1 relaxations
    for (auto& [u, v, w] : edges)
      if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
        dist[v] = dist[u] + w;
  // Detect negative cycles: if still relaxable → negative cycle
  for (auto& [u, v, w] : edges)
    if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
      dist[v] = LLONG_MIN; // reachable via negative cycle
  return dist;
}

// Algorithm Selection Guide:
// Dijkstra       O((V+E) log V)  non-negative weights only  ← default choice
// Bellman-Ford   O(V × E)        negative weights, cycle detection
// Floyd-Warshall O(V³)           all-pairs shortest paths, V ≤ 400`,
      },
    ],
    bestPractices: [
      "Use long long for distances to avoid overflow",
      "Skip stale entries with the lazy deletion check",
      "For negative weights → Bellman-Ford instead",
    ],
    problems: ["Codeforces 20C (Shortest Path)", "Leetcode 743 (Network Delay)", "Codeforces 786C"],
    quiz: [
      { q: "What is the time complexity of Dijkstra with a binary heap?", options: ["O(V²)", "O(E log V)", "O((V+E) log V)", "O(V log E)"], answer: 2 },
      { q: "Dijkstra's algorithm does NOT work correctly when?", options: ["The graph is undirected", "Edge weights are negative", "The graph is dense", "The graph is disconnected"], answer: 1 },
      { q: "What is 'lazy deletion' in Dijkstra's priority queue?", options: ["Removing all stale entries eagerly", "Skipping outdated entries when popped from the heap", "Deleting visited nodes", "Removing edges after relaxation"], answer: 1 },
      { q: "Which data type should you use for Dijkstra distances to avoid overflow?", options: ["int", "short", "long long", "float"], answer: 2 },
      { q: "In Dijkstra, when do you skip processing a popped node?", options: ["When it has no neighbors", "When its stored distance is greater than the current shortest distance", "When it is the source node", "Never"], answer: 1 },
    ],
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
      {
        title: "Kruskal's MST using DSU",
        description: "Find Minimum Spanning Tree in O(E log E) — sort edges + DSU",
        codeSnippet: `struct Edge { int u, v, w; };

int kruskal(int n, vector<Edge>& edges) {
  // Sort edges by weight ascending
  sort(edges.begin(), edges.end(), [](auto& a, auto& b){ return a.w < b.w; });
  DSU dsu(n);
  int mstCost = 0, edgesUsed = 0;
  for (auto& [u, v, w] : edges) {
    if (dsu.unite(u, v)) {   // only add edge if it connects two components
      mstCost += w;
      if (++edgesUsed == n - 1) break; // MST has exactly n-1 edges
    }
  }
  return edgesUsed == n - 1 ? mstCost : -1; // -1 if graph disconnected
}
// MST properties:
// - Unique MST if all edge weights are distinct
// - n-1 edges in MST for n nodes
// - Minimum total weight connecting all nodes`,
      },
    ],
    bestPractices: [
      "Always use both path compression AND union by rank together",
      "Return bool from unite() to check if a cycle was formed",
      "Use DSU for Kruskal: sort edges, unite endpoints, skip same-component edges",
    ],
    problems: ["Leetcode 547 (Number of Provinces)", "Codeforces 1455C", "Leetcode 684"],
    quiz: [
      { q: "What does 'path compression' do in DSU?", options: ["Removes long paths from the tree", "Makes every node point directly to the root after find()", "Balances the tree by weight", "Compresses the parent array"], answer: 1 },
      { q: "What is the amortized complexity of find() with both path compression and union by rank?", options: ["O(log n)", "O(n)", "O(α(n)) ≈ O(1)", "O(log log n)"], answer: 2 },
      { q: "When unite(x, y) returns false, what does it mean?", options: ["x and y are in different components", "x and y are already in the same component (cycle formed)", "The DSU is full", "x or y is not in the DSU"], answer: 1 },
      { q: "DSU is the core data structure for which minimum spanning tree algorithm?", options: ["Prim's", "Dijkstra's", "Kruskal's", "Bellman-Ford"], answer: 2 },
      { q: "In union by rank, what happens when both nodes have the same rank?", options: ["Choose the smaller node", "The rank of the resulting root is incremented", "Neither rank changes", "Randomly pick the root"], answer: 1 },
    ],
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
        title: "Pull vs Push DP Transitions",
        description: "Two equivalent styles — choose whichever makes transitions clearest",
        codeSnippet: `// PULL style: dp[i] is computed FROM its dependencies
// "To fill state i, I look backward at states that feed into i"
for (int i = 1; i <= amount; i++) {
  dp[i] = INT_MAX;
  for (int c : coins)
    if (c <= i && dp[i-c] != INT_MAX)
      dp[i] = min(dp[i], dp[i-c] + 1); // PULL: read dp[i-c]
}

// PUSH style: each state CONTRIBUTES to future states
// "From state i, I update all states that i feeds into"
for (int i = 0; i <= amount; i++) {
  if (dp[i] == INT_MAX) continue;
  for (int c : coins)
    if (i + c <= amount)
      dp[i+c] = min(dp[i+c], dp[i] + 1); // PUSH: write dp[i+c]
}

// Both produce identical results for coin change.
// PULL: cleaner when reading transitions from problem statement.
// PUSH: natural for graph DP (BFS-style), when state i "generates" next states.`,
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
    quiz: [
      { q: "What is the key property of problems suited to dynamic programming?", options: ["Greedy property", "Overlapping subproblems and optimal substructure", "Divide and conquer", "Monotonic queue"], answer: 1 },
      { q: "In O(n log n) LIS, what does lower_bound do at each step?", options: ["Finds the position to append or replace in the tails array", "Sorts the tails array", "Finds the maximum element", "Removes a duplicate"], answer: 0 },
      { q: "What is the complexity of bottom-up coin change for amount W and n coins?", options: ["O(n)", "O(W)", "O(n × W)", "O(n log W)"], answer: 2 },
      { q: "Which DP approach avoids stack overflow for very large inputs?", options: ["Top-down memoization", "Bottom-up tabulation", "Recursive backtracking", "Divide and conquer"], answer: 1 },
      { q: "Space optimization in 1D DP reduces space from O(n²) to what?", options: ["O(n log n)", "O(n)", "O(1)", "O(sqrt(n))"], answer: 1 },
      { q: "In the House Robber problem dp[i] = max(dp[i-1], dp[i-2] + a[i]) — what does dp[i-1] represent?", options: ["Rob house i and skip i-1", "Skip house i and take the best up to i-1", "Rob both i and i-1", "The total stolen so far"], answer: 1 },
      { q: "A 'rolling array' optimization keeps only how many DP rows in memory?", options: ["log n rows", "sqrt(n) rows", "A fixed constant number of rows", "All rows"], answer: 2 },
      { q: "What is the DP recurrence for the number of ways to climb stairs with 1 or 2 steps?", options: ["dp[i] = dp[i-1] * dp[i-2]", "dp[i] = dp[i-1] + dp[i-2]", "dp[i] = dp[i-1] + 1", "dp[i] = 2 * dp[i-1]"], answer: 1 },
    ],
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
      {
        title: "Interval DP — Matrix Chain Multiplication",
        description: "Minimize scalar multiplications to chain n matrices in O(n³)",
        codeSnippet: `// dims[i] * dims[i+1] = dimensions of matrix i (n matrices total)
// Cost to multiply matrices i..j via split at k:
//   dp[i][j] = min over k of: dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]
int matrixChain(vector<int>& dims) {
  int n = dims.size() - 1; // number of matrices
  vector<vector<int>> dp(n, vector<int>(n, 0));
  for (int len = 2; len <= n; len++) {        // chain length
    for (int i = 0; i <= n - len; i++) {      // start index
      int j = i + len - 1;                   // end index
      dp[i][j] = INT_MAX;
      for (int k = i; k < j; k++)            // split point
        dp[i][j] = min(dp[i][j],
                       dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]);
    }
  }
  return dp[0][n-1];
}
// Pattern: for any interval DP, always:
// 1. Iterate length first (outer loop)
// 2. Iterate start index (middle loop)
// 3. Try all split points (inner loop)`,
      },
    ],
    bestPractices: [
      "Draw the DP table with small examples first",
      "Identify base cases (empty string, empty row/col)",
      "For interval DP: iterate length first, then start index",
    ],
    problems: ["Leetcode 1143 (LCS)", "Leetcode 72 (Edit Distance)", "Codeforces 149D"],
    quiz: [
      { q: "In LCS, what is dp[i][j] when a[i] == b[j]?", options: ["dp[i][j-1] + 1", "dp[i-1][j] + 1", "dp[i-1][j-1] + 1", "max(dp[i-1][j], dp[i][j-1])"], answer: 2 },
      { q: "What is the complexity of computing Edit Distance for strings of length n and m?", options: ["O(n + m)", "O(n × m)", "O(n log m)", "O(n²)"], answer: 1 },
      { q: "In interval DP, which dimension do you iterate first?", options: ["Start index", "End index", "Length of interval", "Midpoint of interval"], answer: 2 },
      { q: "For grid DP on an n×m grid, what is the state space size?", options: ["O(n + m)", "O(n × m)", "O(max(n, m)²)", "O(n log m)"], answer: 1 },
      { q: "What are the base cases dp[i][0] and dp[0][j] for edit distance?", options: ["0 for all i, j", "i and j respectively", "1 for all i, j", "undefined"], answer: 1 },
      { q: "How do you reconstruct the actual LCS sequence from the filled DP table?", options: ["Read dp[n][m] directly", "Trace back from dp[n][m] following match and max-direction choices", "Sort both strings first", "Use a stack to reverse dp[0][0]"], answer: 1 },
      { q: "The Palindrome Partitioning DP has what time complexity for a string of length n?", options: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"], answer: 1 },
      { q: "Matrix chain multiplication DP minimizes what?", options: ["Number of matrix additions", "Total number of scalar multiplications", "Memory used", "Depth of recursion"], answer: 1 },
    ],
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
      {
        title: "Bounded Knapsack with Binary Grouping",
        description: "Split k copies into 1,2,4,...,remainder bundles → O/1 knapsack in O(nW log k)",
        codeSnippet: `// Bounded knapsack: item i can be used cnt[i] times
// Binary grouping: split cnt[i] into groups of 1, 2, 4, ..., remainder
// Each group is a "virtual item" → then solve 0/1 knapsack
int boundedKnapsack(vector<int>& w, vector<int>& v, vector<int>& cnt, int W) {
  vector<int> nw, nv; // new item list after splitting
  for (int i = 0; i < (int)w.size(); i++) {
    int rem = cnt[i];
    for (int k = 1; k <= rem; k <<= 1) { // 1, 2, 4, 8, ...
      nw.push_back(k * w[i]); nv.push_back(k * v[i]);
      rem -= k;
    }
    if (rem > 0) { nw.push_back(rem * w[i]); nv.push_back(rem * v[i]); }
  }
  // Standard 0/1 knapsack on expanded item list
  vector<int> dp(W + 1, 0);
  for (int i = 0; i < (int)nw.size(); i++)
    for (int cap = W; cap >= nw[i]; cap--)
      dp[cap] = max(dp[cap], dp[cap - nw[i]] + nv[i]);
  return dp[W];
}
// Why binary grouping works: 1+2+4+...+2^(k-1) = 2^k - 1,
// so any count up to cnt[i] can be represented as a subset of groups.`,
      },
    ],
    bestPractices: [
      "0/1: iterate capacity BACKWARDS to avoid using an item twice",
      "Unbounded: iterate capacity FORWARDS to allow reuse",
      "For subset sum: dp[w] = true/false instead of max value",
    ],
    problems: ["Leetcode 416 (Partition Equal Subset)", "Codeforces 366C", "Leetcode 494 (Target Sum)"],
    quiz: [
      { q: "In 0/1 knapsack, why do we iterate capacity BACKWARDS in the 1D optimization?", options: ["For cache performance", "To prevent using an item more than once", "To handle negative weights", "To enable parallelization"], answer: 1 },
      { q: "In unbounded knapsack, why do we iterate capacity FORWARDS?", options: ["To keep order", "To allow using the same item multiple times", "To prevent overflow", "For cache efficiency"], answer: 1 },
      { q: "How is subset sum converted to a knapsack problem?", options: ["dp[w] = max(dp[w], dp[w-wi] + vi)", "dp[w] = dp[w] || dp[w - wi]", "dp[w] = dp[w] + dp[w - wi]", "dp[w] = min(dp[w], dp[w - wi] + 1)"], answer: 1 },
      { q: "What is the complexity of 0/1 knapsack with n items and capacity W?", options: ["O(n + W)", "O(n log W)", "O(n × W)", "O(2^n)"], answer: 2 },
      { q: "The partition into equal subsets problem reduces to which knapsack variant?", options: ["Unbounded knapsack", "Bounded knapsack", "0/1 knapsack / subset sum", "Fractional knapsack"], answer: 2 },
      { q: "For counting the number of ways to make change (not just minimum coins), what DP value type do you use?", options: ["bool (reachable or not)", "long long count of ways", "min cost", "max value"], answer: 1 },
      { q: "In bounded knapsack (each item has at most k copies), what technique reduces it to O(n W log k)?", options: ["Greedy sorting", "Binary grouping (1, 2, 4, ... bundles)", "Divide and conquer", "Sliding window"], answer: 1 },
      { q: "What should dp[0] be initialized to when computing minimum-cost knapsack?", options: ["0 (base case: cost 0 to fill capacity 0)", "INF", "1", "-1"], answer: 0 },
    ],
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
      {
        title: "SOS DP + Submask Enumeration",
        description: "Sum over Subsets DP in O(n×2ⁿ); enumerate all submasks of a mask in O(3ⁿ) total",
        codeSnippet: `// SOS DP: f[mask] = sum of a[sub] for all sub ⊆ mask
// Build in O(n × 2ⁿ) — for n=20: ~20 million ops
vector<long long> sos(vector<long long>& a, int n) {
  vector<long long> f = a;
  for (int i = 0; i < n; i++)           // iterate each bit position
    for (int mask = 0; mask < (1<<n); mask++)
      if (mask >> i & 1)                // bit i is set in mask
        f[mask] += f[mask ^ (1 << i)]; // add contribution from subset missing bit i
  return f;
}
// After SOS: f[mask] = sum of a[sub] for every sub ⊆ mask.
// Use case: "for each subset mask, sum values of all its subsets"

// Submask enumeration: all non-empty submasks of mask
// Total work across all masks = 3ⁿ (each element: in mask∩sub, in mask only, not in mask = 3 choices)
void enumerateSubmasks(int mask) {
  for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // process submask 'sub'
    // (sub-1)&mask removes lowest set bit of sub that is also in mask
  }
}
// Classic pattern: dp over all (mask, submask) pairs
// for (int mask = 0; mask < (1<<n); mask++)
//   for (int sub = mask; sub > 0; sub = (sub-1)&mask) { dp[mask] = ... }`,
      },
    ],
    bestPractices: [
      "Use (mask >> i) & 1 to check if city i is visited",
      "Use mask | (1 << i) to add city i to the set",
      "Enumerate submasks: for (int sub=mask; sub>0; sub=(sub-1)&mask)",
    ],
    problems: ["Leetcode 847 (Shortest Path Visiting All Nodes)", "Codeforces 327E", "Leetcode 1125 (Smallest Sufficient Team)"],
    quiz: [
      { q: "What is the maximum n for which bitmask DP is typically feasible?", options: ["n ≤ 10", "n ≤ 20", "n ≤ 50", "n ≤ 100"], answer: 1 },
      { q: "How do you check if bit i is set in a bitmask?", options: ["mask & i", "(mask >> i) & 1", "mask | i", "mask ^ i"], answer: 1 },
      { q: "How many total subsets does a set of n elements have?", options: ["n", "n²", "2ⁿ", "n!"], answer: 2 },
      { q: "In TSP with bitmask DP, what does dp[mask][i] represent?", options: ["Minimum cost to start at city i", "Minimum cost to visit all cities in mask and end at city i", "Number of cities visited", "Whether city i is in mask"], answer: 1 },
      { q: "What operation adds city i to an existing bitmask?", options: ["mask & (1 << i)", "mask | (1 << i)", "mask ^ (1 << i)", "mask - (1 << i)"], answer: 1 },
    ],
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
      {
        title: "Segment Tree with Lazy Propagation (Range Add + Range Sum)",
        description: "O(log n) range updates via deferred pushdown",
        codeSnippet: `// Each node stores: sum of range, lazy = pending add for entire range
struct LazySegTree {
  int n;
  vector<long long> tree, lazy;
  LazySegTree(int n) : n(n), tree(4*n, 0), lazy(4*n, 0) {}

  void push(int node, int l, int r) {
    if (lazy[node]) {
      int mid = (l + r) / 2;
      // push to left child
      tree[2*node]   += lazy[node] * (mid - l + 1);
      lazy[2*node]   += lazy[node];
      // push to right child
      tree[2*node+1] += lazy[node] * (r - mid);
      lazy[2*node+1] += lazy[node];
      lazy[node] = 0; // clear
    }
  }

  void update(int node, int l, int r, int ql, int qr, long long val) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) {
      tree[node] += val * (r - l + 1); // apply to whole range
      lazy[node] += val;               // defer to children
      return;
    }
    push(node, l, r);                  // push before descending
    int mid = (l + r) / 2;
    update(2*node, l, mid, ql, qr, val);
    update(2*node+1, mid+1, r, ql, qr, val);
    tree[node] = tree[2*node] + tree[2*node+1];
  }

  long long query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return tree[node];
    push(node, l, r);                  // push before descending
    int mid = (l + r) / 2;
    return query(2*node, l, mid, ql, qr)
         + query(2*node+1, mid+1, r, ql, qr);
  }
};
// Key rule: ALWAYS call push() before accessing children.
// Complexity: O(log n) per range update and range query.`,
      },
    ],
    bestPractices: [
      "Allocate 4×n nodes for the tree array",
      "Always pass l and r explicitly — avoid global state",
      "Use lazy propagation only when needed (range updates)",
    ],
    problems: ["Codeforces 339D", "Leetcode 315 (Count Smaller)", "Codeforces 380C"],
    quiz: [
      { q: "How many nodes should you allocate for a segment tree over n elements?", options: ["2n nodes", "n log n nodes", "4n nodes", "n² nodes"], answer: 2 },
      { q: "What is the complexity of a range query on a segment tree?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
      { q: "What feature of a segment tree enables O(log n) range updates?", options: ["Path compression", "Lazy propagation", "Union by rank", "Persistent nodes"], answer: 1 },
      { q: "In a segment tree with root=1, what are the children of node i?", options: ["i+1 and i+2", "2i and 2i+1", "i/2 and i/2+1", "2i-1 and 2i"], answer: 1 },
      { q: "Which query type does a segment tree NOT natively support in O(log n) without modification?", options: ["Range sum", "Range minimum", "Range GCD", "Range sort"], answer: 3 },
      { q: "When using lazy propagation, when is a lazy value pushed down to children?", options: ["Only during builds", "Before accessing or modifying a child node", "At the end of all queries", "Immediately when set"], answer: 1 },
      { q: "What is the time complexity of building a segment tree from an array of size n?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], answer: 2 },
      { q: "For a range-assign + range-sum segment tree, what extra value must each node store besides sum?", options: ["The minimum value", "The length of the segment", "The XOR of the range", "The maximum value"], answer: 1 },
    ],
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
    quiz: [
      { q: "What does lowbit(i) = i & (-i) compute?", options: ["The highest set bit of i", "The lowest set bit of i", "The number of set bits in i", "The complement of i"], answer: 1 },
      { q: "Why must Fenwick Tree arrays be 1-indexed?", options: ["0-indexed arrays cause integer overflow", "lowbit(0) = 0 causes an infinite loop in updates/queries", "The tree wastes space at index 0", "Sorting requires 1-indexing"], answer: 1 },
      { q: "What is the time complexity of a point update in a Fenwick Tree?", options: ["O(1)", "O(log n)", "O(n)", "O(log² n)"], answer: 1 },
      { q: "Compared to a Segment Tree, what is a Fenwick Tree's main advantage?", options: ["Supports range updates natively", "Simpler code and faster constant factor for prefix sums", "Works for non-associative functions", "Supports persistent queries"], answer: 1 },
      { q: "To compute a range sum [l, r] with a BIT, you compute:", options: ["query(l) - query(r)", "query(r) - query(l-1)", "query(r-l)", "query(r) + query(l)"], answer: 1 },
    ],
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
    quiz: [
      { q: "What is the time complexity of inserting a string of length L into a Trie?", options: ["O(log L)", "O(L log n)", "O(L)", "O(n)"], answer: 2 },
      { q: "In a binary XOR Trie, how many bits do you typically process per integer?", options: ["8", "16", "32", "64"], answer: 2 },
      { q: "To maximize XOR with a query value x, at each bit you should:", options: ["Go in the same direction as x's bit", "Go in the opposite direction of x's bit", "Always go left", "Always go right"], answer: 1 },
      { q: "Which data structure would you prefer for autocomplete with prefix matching?", options: ["Hash map", "Sorted array + binary search", "Trie", "B-tree"], answer: 2 },
      { q: "What marks the end of a valid word in a Trie node?", options: ["A null child pointer", "A boolean 'end' flag", "A special character node", "The node's index"], answer: 1 },
    ],
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
      {
        title: "Extended Euclidean + O(n) Linear Inverse Precomputation",
        description: "Inverse when mod is NOT prime; O(n) batch inverse for 1..n",
        codeSnippet: `// Extended Euclidean: finds x,y such that a*x + b*y = gcd(a,b)
// Returns gcd; sets x and y
long long extgcd(long long a, long long b, long long& x, long long& y) {
  if (b == 0) { x = 1; y = 0; return a; }
  long long x1, y1;
  long long g = extgcd(b, a % b, x1, y1);
  x = y1;
  y = x1 - (a / b) * y1;
  return g;
}

// Modular inverse via extgcd (works when gcd(a, mod) = 1, mod need NOT be prime)
long long modInv(long long a, long long mod) {
  long long x, y;
  long long g = extgcd(a, mod, x, y);
  if (g != 1) return -1; // no inverse exists
  return (x % mod + mod) % mod;
}

// O(n) linear inverse precomputation for 1..n (mod must be prime)
// Recurrence: inv[i] = -(mod/i) * inv[mod%i] (mod mod)
vector<long long> linearInv(int n, long long mod) {
  vector<long long> inv(n + 1);
  inv[1] = 1;
  for (int i = 2; i <= n; i++)
    inv[i] = (mod - (mod / i) * inv[mod % i] % mod) % mod;
  return inv;
}
// Use case: need modular inverses for all i in [1..n] — O(n) total vs O(n log mod) with power()`,
      },
    ],
    bestPractices: [
      "Always add MOD before taking mod to handle negatives: (a - b % MOD + MOD) % MOD",
      "Precompute factorials up to MAXN once, not per query",
      "Use __int128 if intermediate products can exceed long long",
    ],
    problems: ["Codeforces 509C", "Leetcode 1569 (Reorder Routes)", "Codeforces 543B"],
    quiz: [
      { q: "What is the most common modulus in competitive programming?", options: ["10⁶ + 3", "10⁹ + 7", "998244353", "2³¹ − 1"], answer: 1 },
      { q: "What is the complexity of fast binary exponentiation?", options: ["O(n)", "O(log n)", "O(sqrt(n))", "O(n log n)"], answer: 1 },
      { q: "Fermat's Little Theorem states that for prime p and a not divisible by p: a^(p-1) ≡ ?", options: ["0 (mod p)", "1 (mod p)", "a (mod p)", "p (mod a)"], answer: 1 },
      { q: "To correctly handle subtraction mod p (a - b), compute:", options: ["(a - b) % p", "(a - b + p) % p", "a % p - b % p", "(a % p) - (b % p) + p"], answer: 1 },
      { q: "Which theorem is used to compute modular inverse when the modulus is prime?", options: ["Chinese Remainder Theorem", "Fermat's Little Theorem", "Euler's Theorem", "Wilson's Theorem"], answer: 1 },
      { q: "When the modulus p is NOT prime, how do you compute the modular inverse of a?", options: ["Fermat's Little Theorem", "Extended Euclidean Algorithm (if gcd(a,p)=1)", "a^(p-1) mod p", "It cannot be computed"], answer: 1 },
      { q: "The Chinese Remainder Theorem (CRT) is used to solve systems of what?", options: ["Linear equations", "Simultaneous modular congruences", "Polynomial equations", "Matrix equations"], answer: 1 },
    ],
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
      {
        title: "Linear Sieve O(n) + Euler's Totient φ(n)",
        description: "Each composite is marked exactly once; totient computed alongside",
        codeSnippet: `// Linear Sieve: each number is crossed out by its SMALLEST prime factor exactly once
// → O(n) total, vs O(n log log n) for classic sieve
const int MAXN = 1e6 + 5;
vector<int> primes, spf2(MAXN, 0), phi(MAXN);
vector<bool> composite(MAXN, false);

void linearSieve() {
  phi[1] = 1;
  for (int i = 2; i < MAXN; i++) {
    if (!composite[i]) {           // i is prime
      primes.push_back(i);
      spf2[i] = i;
      phi[i] = i - 1;             // Euler totient of prime p = p-1
    }
    for (int p : primes) {
      if ((long long)i * p >= MAXN) break;
      composite[i * p] = true;
      spf2[i * p] = p;
      if (i % p == 0) {
        // p is already the smallest prime factor of i
        // phi[i*p] = phi[i] * p  (multiplicativity)
        phi[i * p] = phi[i] * p;
        break;                    // crucial: stop here to ensure each number marked once
      } else {
        // gcd(i, p) = 1 → phi[i*p] = phi[i] * phi[p] = phi[i] * (p-1)
        phi[i * p] = phi[i] * (p - 1);
      }
    }
  }
}
// phi[n] = number of integers in [1,n] that are coprime to n
// phi[p^k] = p^(k-1) * (p-1);  phi is multiplicative: gcd(a,b)=1 → phi[ab]=phi[a]*phi[b]`,
      },
    ],
    bestPractices: [
      "Start inner loop at i² (multiples below i² are already marked)",
      "Use bitset<MAXN> instead of vector<bool> for ~8x memory reduction",
      "SPF sieve: only update spf[j] if spf[j]==j (first time marked)",
    ],
    problems: ["Leetcode 204 (Count Primes)", "Codeforces 776C", "Codeforces 1217D"],
    quiz: [
      { q: "What is the time complexity of the Sieve of Eratosthenes for primes up to N?", options: ["O(N)", "O(N log N)", "O(N log log N)", "O(sqrt(N))"], answer: 2 },
      { q: "Why does the inner sieve loop start at i² instead of 2i?", options: ["For cache efficiency", "All multiples below i² are already marked by smaller primes", "To avoid marking i itself", "To save memory"], answer: 1 },
      { q: "The Smallest Prime Factor (SPF) sieve allows factorization of n in what time?", options: ["O(n)", "O(sqrt(n))", "O(log n)", "O(1)"], answer: 2 },
      { q: "What memory optimization can reduce sieve memory by ~8x?", options: ["Using int instead of long long", "Using bitset<N> instead of vector<bool>", "Using char instead of bool", "Using short instead of int"], answer: 1 },
      { q: "What is the smallest prime number?", options: ["1", "2", "3", "0"], answer: 1 },
    ],
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
      {
        title: "Catalan Numbers + Derangements",
        description: "Two essential counting sequences with DP recurrences",
        codeSnippet: `// Catalan numbers: C_n = C(2n, n) / (n+1)
// C_0=1, C_1=1, C_2=2, C_3=5, C_4=14, C_5=42, ...
// Counts: valid parenthesizations, BST shapes, non-crossing partitions, Dyck paths
// Recurrence: C_n = sum_{i=0}^{n-1} C_i * C_{n-1-i}
// Closed form: C_n = C(2n, n) / (n+1) = C(2n, n) - C(2n, n+1)
vector<long long> catalan(int n, long long mod) {
  vector<long long> cat(n + 1, 0);
  cat[0] = cat[1] = 1;
  for (int i = 2; i <= n; i++)
    for (int j = 0; j < i; j++)
      cat[i] = (cat[i] + cat[j] % mod * cat[i-1-j]) % mod;
  return cat;
  // Or: cat[n] = C(2n,n) * modInv(n+1, mod) % mod  (O(1) with precomputed factorials)
}

// Derangements D(n): permutations of n elements with no fixed point
// D(0)=1, D(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44
// Recurrence: D(n) = (n-1) * (D(n-1) + D(n-2))  for n >= 2
// Near-formula: D(n) = round(n! / e) for large n
vector<long long> derangements(int n, long long mod) {
  vector<long long> D(n + 1, 0);
  D[0] = 1; if (n >= 1) D[1] = 0;
  for (int i = 2; i <= n; i++)
    D[i] = (long long)(i - 1) % mod * ((D[i-1] + D[i-2]) % mod) % mod;
  return D;
}
// Problem type: "arrangements where element i is NOT in position i" → derangements`,
      },
    ],
    bestPractices: [
      "Precompute factorials up to 2×10⁶ to handle C(2n, n) type problems",
      "Lucas' theorem for C(n,k) mod p when n can be very large",
      "Derangements: D(n) = (n-1)(D(n-1)+D(n-2))",
    ],
    problems: ["Codeforces 1696D", "Leetcode 1220 (Count Vowels Permutations)", "Codeforces 559C"],
    quiz: [
      { q: "How many ways can you choose k items from n items (order doesn't matter)?", options: ["n! / k!", "n! / (k! × (n-k)!)", "n^k", "k^n"], answer: 1 },
      { q: "The Stars and Bars formula for distributing n identical items into k distinct groups is:", options: ["C(n, k)", "C(n+k, k)", "C(n+k-1, k-1)", "n^k"], answer: 2 },
      { q: "Inclusion-Exclusion for |A ∪ B| equals:", options: ["|A| + |B|", "|A| + |B| - |A ∩ B|", "|A| - |B| + |A ∩ B|", "|A| × |B|"], answer: 1 },
      { q: "To compute C(n, k) mod p efficiently when n is very large, which theorem is used?", options: ["Fermat's Little Theorem", "Wilson's Theorem", "Lucas' Theorem", "Chinese Remainder Theorem"], answer: 2 },
      { q: "What is C(5, 2)?", options: ["5", "10", "20", "15"], answer: 1 },
      { q: "The nth Catalan number counts which of the following?", options: ["Number of primes up to n", "Number of valid parenthesizations of n+1 factors", "Number of ways to sort n elements", "Number of subsets of size n"], answer: 1 },
      { q: "How many ways can n distinct objects be arranged in a line?", options: ["2ⁿ", "n²", "n!", "C(n, ⌊n/2⌋)"], answer: 2 },
      { q: "Burnside's Lemma (Cauchy-Frobenius) is used to count objects under what condition?", options: ["When objects have different weights", "When objects are considered equivalent under symmetry/rotation", "When the count exceeds 10⁹", "When elements are drawn without replacement"], answer: 1 },
    ],
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
  {
    label: "PRACTICE",
    items: [
      { id: "search-problems", title: "🔍 Search Problems", section: "search" },
    ],
  },
];
