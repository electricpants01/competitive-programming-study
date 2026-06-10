// Competitive Programming Study Guide — Algorithms Data
const algorithmsData = {
  "complexity-analysis": {
    title: "Complexity Analysis",
    category: "Fundamentals",
    difficulty: "Beginner",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Understanding time and space complexity is the foundation of competitive programming. Learn Big-O, Big-Ω, and Big-Θ notation to evaluate algorithm efficiency.",
    keyTechniques: [
      "Big-O Notation",
      "Space Complexity",
      "Amortized Analysis",
      "Recurrence Relations",
    ],
    benefits: [
      "Choose the right algorithm for constraints",
      "Predict TLE (Time Limit Exceeded) before submitting",
      "Understand trade-offs between time and memory",
    ],
    typicalConstraints: ["n ≤ 10^8 → O(n)", "n ≤ 10^6 → O(n log n)", "n ≤ 10^4 → O(n²)", "n ≤ 500 → O(n³)"],
    examples: [
      {
        title: "Complexity Cheat Sheet",
        description: "Common complexity classes and their practical limits",
        codeSnippet: `// O(1)   — Hash map lookup
// O(log n) — Binary search
// O(n)   — Linear scan
// O(n log n) — Merge sort, heap sort
// O(n²)  — Bubble/insertion sort, nested loops
// O(2^n) — Subsets enumeration
// O(n!)  — Permutations`,
      },
    ],
    bestPractices: [
      "Always check constraints before choosing an algorithm",
      "Assume ~10^8 operations per second as a safe estimate",
      "Count nested loops to estimate complexity quickly",
    ],
    problems: ["Leetcode 217 (Contains Duplicate)", "Codeforces 4A (Watermelon)"],
  },

  "arrays-strings": {
    title: "Arrays & Strings",
    category: "Fundamentals",
    difficulty: "Beginner",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Core data structures used in almost every competitive programming problem. Master prefix sums, difference arrays, and string manipulation.",
    keyTechniques: [
      "Prefix Sums",
      "Difference Arrays",
      "In-place Reversal",
      "String Hashing",
    ],
    benefits: [
      "O(1) range sum queries with prefix sums",
      "O(1) range updates with difference arrays",
      "Foundation for two pointers and sliding window",
    ],
    typicalConstraints: ["n ≤ 10^6 typical", "Range queries → prefix sums", "Range updates → difference array"],
    examples: [
      {
        title: "Prefix Sum",
        description: "Answer range sum queries in O(1) after O(n) preprocessing",
        codeSnippet: `// Build prefix sum array
vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + arr[i];

// Query sum [l, r] (0-indexed)
int rangeSum(int l, int r) {
    return prefix[r + 1] - prefix[l];
}`,
      },
      {
        title: "Difference Array",
        description: "Range update in O(1), reconstruct in O(n)",
        codeSnippet: `// Add val to [l, r]
void rangeAdd(vector<int>& diff, int l, int r, int val) {
    diff[l] += val;
    if (r + 1 < diff.size()) diff[r + 1] -= val;
}
// Reconstruct: partial sum of diff array`,
      },
    ],
    bestPractices: [
      "Use prefix sums for static range queries",
      "Use difference arrays for range update + point query",
      "0-index by default; be consistent",
    ],
    problems: ["Codeforces 381C (Sereja and Brackets)", "Leetcode 303 (Range Sum Query)"],
  },

  "two-pointers": {
    title: "Two Pointers",
    category: "Algorithms",
    difficulty: "Beginner to Intermediate",
    timeToLearn: "3-5 days",
    importance: "High",
    description:
      "A technique that uses two indices moving through an array to solve problems in O(n) that would otherwise require O(n²). Works best on sorted arrays.",
    keyTechniques: [
      "Opposite-end Pointers",
      "Fast & Slow Pointers",
      "Same-direction Pointers",
      "Three Sum Pattern",
    ],
    benefits: [
      "Reduces O(n²) brute force to O(n)",
      "Works naturally with sorted arrays",
      "Low memory overhead — O(1) extra space",
    ],
    typicalConstraints: ["Array must be sorted (or sortable)", "n ≤ 10^6"],
    examples: [
      {
        title: "Two Sum in Sorted Array",
        description: "Find a pair that sums to target using opposite-end pointers",
        codeSnippet: `bool twoSum(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) return true;
        else if (sum < target) l++;
        else r--;
    }
    return false;
}`,
      },
      {
        title: "Remove Duplicates (In-place)",
        description: "Same-direction two pointers pattern",
        codeSnippet: `int removeDuplicates(vector<int>& nums) {
    int slow = 0;
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow])
            nums[++slow] = nums[fast];
    }
    return slow + 1;
}`,
      },
    ],
    bestPractices: [
      "Sort the array first if not already sorted",
      "Clearly define what each pointer represents",
      "Verify loop termination condition (l < r vs l <= r)",
    ],
    problems: ["Leetcode 167 (Two Sum II)", "Leetcode 15 (3Sum)", "Codeforces 381B"],
  },

  "sliding-window": {
    title: "Sliding Window",
    category: "Algorithms",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "High",
    description:
      "Maintain a window of elements that satisfies a constraint. Expand the right pointer and shrink the left when the constraint is violated. Achieves O(n) for subarray/substring problems.",
    keyTechniques: [
      "Fixed-size Window",
      "Variable-size Window",
      "Window with Frequency Map",
      "Monotonic Deque Window",
    ],
    benefits: [
      "O(n) solution for many substring problems",
      "Works on arrays, strings, and linked lists",
      "Generalizes to monotonic deque for max/min queries",
    ],
    typicalConstraints: ["Contiguous subarrays/substrings", "n ≤ 10^6"],
    examples: [
      {
        title: "Maximum Sum Subarray of Size K",
        description: "Fixed-size sliding window",
        codeSnippet: `int maxSumK(vector<int>& arr, int k) {
    int windowSum = 0, maxSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;
    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`,
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description: "Variable-size sliding window with a set",
        codeSnippet: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> freq;
    int l = 0, maxLen = 0;
    for (int r = 0; r < s.size(); r++) {
        freq[s[r]]++;
        while (freq[s[r]] > 1) freq[s[l++]]--;
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
      },
    ],
    bestPractices: [
      "Identify what the window represents (sum, count, chars)",
      "Define exactly when to shrink the window",
      "Use a hash map to track window state efficiently",
    ],
    problems: ["Leetcode 3", "Leetcode 76 (Min Window Substring)", "Codeforces 676C"],
  },

  "binary-search": {
    title: "Binary Search",
    category: "Algorithms",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Reduce search space by half each step. Applies not just to sorted arrays but to any monotonic predicate — 'binary search on the answer' is a core CP technique.",
    keyTechniques: [
      "Classic Binary Search",
      "Lower/Upper Bound",
      "Binary Search on Answer",
      "Ternary Search",
    ],
    benefits: [
      "O(log n) search in sorted structures",
      "Solves optimization problems with 'binary search on answer'",
      "Works on any monotonic condition",
    ],
    typicalConstraints: ["Array must be sorted", "Answer space must be monotonic"],
    examples: [
      {
        title: "Binary Search on Answer",
        description: "Find minimum speed to finish reading books within D days",
        codeSnippet: `// Check if we can finish with given 'speed'
bool canFinish(vector<int>& books, int speed, int days) {
    int d = 0;
    for (int b : books) d += (b + speed - 1) / speed;
    return d <= days;
}

int minSpeed(vector<int>& books, int D) {
    int lo = 1, hi = *max_element(books.begin(), books.end());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (canFinish(books, mid, D)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}`,
      },
    ],
    bestPractices: [
      "Use lo + (hi - lo) / 2 to avoid integer overflow",
      "Clearly define: what does lo and hi represent?",
      "Template: find first index where predicate is true",
    ],
    problems: ["Leetcode 875 (Koko Eating Bananas)", "Codeforces 1201C", "Leetcode 410"],
  },

  "bfs": {
    title: "BFS (Breadth-First Search)",
    category: "Graph Theory",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Explore a graph level by level using a queue. BFS finds the shortest path in unweighted graphs. Fundamental for grid problems, multi-source shortest paths, and 0-1 BFS.",
    keyTechniques: [
      "Standard BFS",
      "Multi-source BFS",
      "0-1 BFS (deque)",
      "BFS on Implicit Graphs",
    ],
    benefits: [
      "Shortest path in unweighted/unit-weight graphs",
      "O(V + E) time complexity",
      "Multi-source BFS avoids repeated single-source runs",
    ],
    typicalConstraints: ["Unweighted or unit-weight edges", "Grid problems (4 or 8 directional)"],
    examples: [
      {
        title: "Shortest Path in Grid",
        description: "BFS on a 2D grid to find min steps",
        codeSnippet: `int shortestPath(vector<vector<int>>& grid, int sr, int sc, int tr, int tc) {
    int n = grid.size(), m = grid[0].size();
    queue<pair<int,int>> q;
    vector<vector<int>> dist(n, vector<int>(m, -1));
    q.push({sr, sc}); dist[sr][sc] = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        if (x == tr && y == tc) return dist[x][y];
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx>=0 && nx<n && ny>=0 && ny<m && grid[nx][ny]==0 && dist[nx][ny]==-1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    return -1;
}`,
      },
    ],
    bestPractices: [
      "Mark nodes as visited when enqueuing, not when dequeuing",
      "For multi-source BFS, push all sources at distance 0 initially",
      "Use 0-1 BFS (deque) when edges have weight 0 or 1",
    ],
    problems: ["Leetcode 994 (Rotting Oranges)", "Codeforces 1272E", "Leetcode 1926"],
  },

  "dfs": {
    title: "DFS (Depth-First Search)",
    category: "Graph Theory",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "Essential",
    description:
      "Explore as deep as possible before backtracking. DFS is the basis for topological sort, cycle detection, connected components, and tree traversals.",
    keyTechniques: [
      "Recursive DFS",
      "Iterative DFS (stack)",
      "Topological Sort (Kahn's / DFS)",
      "Cycle Detection",
    ],
    benefits: [
      "Detects cycles in directed/undirected graphs",
      "Finds connected components in O(V + E)",
      "Basis for many advanced algorithms (Tarjan, Kosaraju)",
    ],
    typicalConstraints: ["V, E ≤ 10^5 with recursive DFS (watch stack depth)", "Iterative for large graphs"],
    examples: [
      {
        title: "Topological Sort (DFS)",
        description: "Order nodes in a DAG such that edges go left to right",
        codeSnippet: `vector<int> order;
vector<bool> visited(n, false);

void dfs(int u, vector<vector<int>>& adj) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v, adj);
    order.push_back(u);
}

// Call for each unvisited node, then reverse order
for (int i = 0; i < n; i++)
    if (!visited[i]) dfs(i, adj);
reverse(order.begin(), order.end());`,
      },
    ],
    bestPractices: [
      "Use color states (WHITE/GRAY/BLACK) for cycle detection in directed graphs",
      "Prefer iterative DFS for graphs with n > 10^4 to avoid stack overflow",
      "DFS tree = back edges indicate cycles",
    ],
    problems: ["Leetcode 207 (Course Schedule)", "Codeforces 510C", "Leetcode 547"],
  },

  "dijkstra": {
    title: "Dijkstra's Algorithm",
    category: "Graph Theory",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "High",
    description:
      "Shortest path in a weighted graph with non-negative edge weights. Uses a min-heap (priority queue) for O((V + E) log V) complexity.",
    keyTechniques: [
      "Priority Queue (min-heap)",
      "Lazy Deletion",
      "Multi-source Dijkstra",
      "Dijkstra on Grid",
    ],
    benefits: [
      "O((V + E) log V) with binary heap",
      "Works on any graph with non-negative weights",
      "Easy to extend for multi-source or constrained paths",
    ],
    typicalConstraints: ["Non-negative edge weights only", "V ≤ 10^5, E ≤ 3×10^5 typically"],
    examples: [
      {
        title: "Standard Dijkstra",
        description: "Shortest path from source to all nodes",
        codeSnippet: `vector<long long> dijkstra(int src, vector<vector<pair<int,int>>>& adj, int n) {
    vector<long long> dist(n, LLONG_MAX);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;  // lazy deletion
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
    typicalConstraints: ["n, q ≤ 10^5 easily", "Dynamic connectivity queries"],
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
    typicalConstraints: ["n ≤ 10^6 for O(n) DP", "n ≤ 10^4 for O(n²) DP"],
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
    typicalConstraints: ["n, m ≤ 10^3 for O(n×m) DP", "n ≤ 500 for O(n³) interval DP"],
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

  "segment-tree": {
    title: "Segment Tree",
    category: "Trees & Advanced",
    difficulty: "Advanced",
    timeToLearn: "2 weeks",
    importance: "High",
    description:
      "A tree structure for range queries (sum, min, max) and range updates in O(log n). With lazy propagation, supports range updates in O(log n) too.",
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
    typicalConstraints: ["n, q ≤ 3×10^5", "Operations: sum, min, max, GCD, XOR"],
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

  "modular-arithmetic": {
    title: "Modular Arithmetic",
    category: "Mathematics",
    difficulty: "Intermediate",
    timeToLearn: "1 week",
    importance: "High",
    description:
      "Most CP problems with large outputs require answers modulo 10^9+7. Master mod operations, modular inverse, and fast exponentiation.",
    keyTechniques: [
      "Fast Exponentiation (Binary Exponentiation)",
      "Modular Inverse (Fermat's Little Theorem)",
      "Precomputed Factorials",
      "Chinese Remainder Theorem",
    ],
    benefits: [
      "Handle numbers up to 10^18 without overflow",
      "Compute combinations C(n,k) mod p efficiently",
      "Required in ~80% of counting problems",
    ],
    typicalConstraints: ["MOD = 10^9 + 7 (prime)", "MOD = 998244353 (NTT-friendly prime)"],
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