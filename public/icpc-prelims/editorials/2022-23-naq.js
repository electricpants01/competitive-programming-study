/**
 * Learning editorials for ICPC North America Qualifier 2022–23.
 * Ordered from easiest to hardest by estimated difficulty.
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-naq-2022-23/.
 */
const naq2022Editorial = {
  contestId: '2022-23-naq',
  title: 'ICPC North America Qualifier 2022–23',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'F',
      title: 'Metronome',
      difficulty: 'Easy',
      rating: 800,
      topics: ['arithmetic', 'floating point'],
      ascii: String.raw`4 ticks = 1 revolution

song length n ticks
revolutions = n / 4

16 -> 4.00
99 -> 24.75`,
      insight:
        'Each full turn of the key produces exactly four ticks, so the required winding is simply the song length divided by four.',
      analysis: [
        'Read the integer song length n.',
        'Output n/4 as a real number with at least two digits after the decimal point.',
        'Use floating-point division rather than integer division.',
      ],
      complexity: 'O(1) time and O(1) memory.',
    },
    {
      id: 'C',
      title: 'Class Field Trip',
      difficulty: 'Easy',
      rating: 900,
      topics: ['sorting', 'strings'],
      ascii: String.raw`ann:  a h j m n o y
ben:  a c i j j k l l
merge + sort:
a a c h i j j j k l l m n o y`,
      insight:
        'Ann and Ben already keep letters sorted inside each list, but the combined field-trip roster is just the multiset union of both strings in alphabetical order.',
      analysis: [
        'Concatenate the two input strings.',
        'Sort the combined characters (or merge the two already-sorted strings).',
        'Print the resulting string with no separators.',
      ],
      complexity: 'O(L log L) time for total length L ≤ 200, or O(L) with counting sort / two-pointer merge.',
    },
    {
      id: 'D',
      title: 'Ghost Leg',
      difficulty: 'Easy',
      rating: 1000,
      topics: ['permutation', 'simulation'],
      ascii: String.raw`1  2  3  4
|--|  |  |
|  |--|  |
|--|  |  |
|  |  |--|
|  |--|  |
v  v  v  v
3  4  2  1`,
      insight:
        'Each rung is an adjacent transposition. Applying the rungs from top to bottom permutes the labels sitting on the vertical lines.',
      analysis: [
        'Initialize an array P with P[i] = i for i = 1..n.',
        'For each rung a (top to bottom), swap P[a] with P[a+1].',
        'Print P[1], …, P[n] one per line — the element that ends in each left-to-right position.',
      ],
      complexity: 'O(n + m) time and O(n) memory.',
    },
    {
      id: 'K',
      title: 'Smallest Calculated Value',
      difficulty: 'Easy',
      rating: 1100,
      topics: ['brute force', 'arithmetic'],
      ascii: String.raw`a □ b □ c    (left to right, no precedence)

ops: +  -  *  /   (/ only if divisible)

2 + 3 - 5 = 0
9 - 9 / 9 = 0
5 - 7 + 3 = 1`,
      insight:
        'Only two operator slots exist and the evaluation order is fixed left-to-right, so every candidate value can be enumerated.',
      analysis: [
        'Try all four operators between a and b (skipping illegal division).',
        'For each intermediate result, try all four operators with c.',
        'Keep the minimum non-negative final value.',
      ],
      complexity: 'O(1) time (at most 16 candidates) and O(1) memory.',
    },
    {
      id: 'I',
      title: 'Problem Pool',
      difficulty: 'Easy–Medium',
      rating: 1200,
      topics: ['math', 'construction'],
      ascii: String.raw`r regionals, pairwise |A \\ B| >= d

private:  d each   shared: the rest
size k = d + (n - r·d)
       = n - (r-1)·d

n=5,r=2,d=2 -> k=3
n=10,r=4,d=3 -> k=1`,
      insight:
        'An optimal balanced design gives every regional d private problems and puts every remaining problem into a shared core. The resulting common size is n − (r−1)·d.',
      analysis: [
        'Give each regional d exclusive problems so any two sets differ by at least those d problems.',
        'Distribute all leftover problems into every set (the shared core).',
        'The common cardinality becomes n − (r−1)·d.',
        'If that value is less than 1, no legal collection of nonempty sets exists and the answer is −1.',
        'Note: this problem appeared in the PDF set but was not used in the live Kattis contest.',
      ],
      complexity: 'O(1) time and O(1) memory.',
    },
    {
      id: 'E',
      title: 'MazeMan',
      difficulty: 'Easy–Medium',
      rating: 1400,
      topics: ['BFS', 'grid', 'greedy'],
      ascii: String.raw`Entrances A..W on the border
Walk on '.' and ' ' only
Doors are not walkable corridors

Greedy: for A, then B, ...
  BFS from that letter
  if it reaches unused dots, hire one player
  mark those dots eaten

Leftover dots = unreachable`,
      insight:
        'Dots form regions reachable from border entrances. Hiring players in alphabetical entrance order and claiming newly reachable dots yields the minimum number of players.',
      analysis: [
        'Treat ‘.’ and spaces as walkable; walls and other entrance letters block movement.',
        'For each entrance letter A..W that appears, BFS from all of its door cells.',
        'If the search reaches at least one uneaten dot, increment the player count and convert those dots to spaces.',
        'After every entrance is considered, count remaining ‘.’ cells as unreachable.',
      ],
      complexity: 'O(n·m·|entrances|) time and O(n·m) memory with n, m ≤ 100.',
    },
    {
      id: 'H',
      title: 'Platform Placing',
      difficulty: 'Medium',
      rating: 1600,
      topics: ['greedy', 'geometry'],
      ascii: String.raw`platform length y at x:
   [x - y/2 , x + y/2]

adjacent: y_i + y_{i+1} <= 2·gap
s <= y_i <= k

start all y_i = s
sweep left→right, raise each y_i maximally`,
      insight:
        'Feasibility depends only on consecutive gaps being at least s. Maximizing total length is achieved by starting at the minimum length and pushing each platform upward as soon as the previous choice is fixed.',
      analysis: [
        'Sort foundation points on the line.',
        'If any consecutive gap is smaller than s, output −1.',
        'Initialize every platform length to s.',
        'For i from left to right, set y_i to the largest value ≤ k that still respects the gap constraints with the already-chosen left neighbor and the still-minimum right neighbor.',
        'Sum the resulting lengths.',
      ],
      complexity: 'O(n log n) time for sorting and O(n) memory.',
    },
    {
      id: 'A',
      title: 'Beast Bullies',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['greedy', 'sorting'],
      ascii: String.raw`strengths desc: 9 8 4 3

stable = {9}          sum 9
cand   = {8}          sum 8 < 9
cand   = {8,4}        sum 12 >= 9  → merge
stable = {9,8,4}      sum 21
cand   = {3}          sum 3 < 21

answer = 3`,
      insight:
        'Optimal survivors are a prefix of the animals ordered from strongest to weakest. A weaker batch can join the stable set only when its total strength meets or exceeds the current stable sum.',
      analysis: [
        'Sort strengths in decreasing order.',
        'Start with the strongest animal as the stable set.',
        'Scan remaining animals while accumulating a candidate batch.',
        'Whenever the candidate strength sum is at least the stable sum, merge the batch into the stable set and clear the candidate.',
        'Animals left in an unfinished candidate are eliminated; the answer is the final stable size.',
      ],
      complexity: 'O(n log n) time for sorting and O(n) memory (n ≤ 5·10^5).',
    },
    {
      id: 'L',
      title: 'Spidey Distance',
      difficulty: 'Medium–Hard',
      rating: 2000,
      topics: ['geometry', 'counting', 'number theory'],
      ascii: String.raw`Taxi:   |x| + |y| <= t
Spidey: orth=1, diag=1.5
        ⇔ 2·max + min <= 2s

For each x in [-s,s]:
  yMax = max y with spidey
  Sp += 2·yMax + 1
  Both += 2·min(yMax, t-|x|) + 1

Reduce Both/Sp by gcd`,
      insight:
        'The Spidey ball is a stretched diamond. Sweeping vertical lines x ∈ [−s, s] reduces both area counts to independent one-dimensional range lengths.',
      analysis: [
        'A lattice point lies inside Spidey distance s iff 2·max(|x|,|y|) + min(|x|,|y|) ≤ 2s.',
        'For each fixed x with |x| ≤ s, binary-search (or closed-form) the largest admissible |y|.',
        'That column contributes 2·yMax+1 Spidey points.',
        'Intersect with the taxi constraint |y| ≤ t−|x| to count points in both metrics.',
        'Output the reduced fraction both/spidey, or a bare integer when the denominator is 1.',
      ],
      complexity: 'O(s log s) time and O(1) memory (s ≤ 10^6).',
    },
    {
      id: 'G',
      title: 'Movie Night',
      difficulty: 'Hard',
      rating: 2200,
      topics: ['functional graph', 'tree DP', 'combinatorics'],
      ascii: String.raw`each friend x → unique y
= functional graph (1 out-edge)

component = trees into one cycle

cycle must be taken as a block
hanging tree at u:
  f(u) = Π (1 + f(parent))

g(C) = 1 + Π (1 + f(v)) over
       tree roots attached to cycle

answer = Π g(C) − 1`,
      insight:
        'Friendship forms a functional graph. In each weakly connected component the unique cycle is atomic, while every in-tree hanging off that cycle contributes an independent product of optional subtrees.',
      analysis: [
        'Find every cycle and mark its vertices.',
        'For a non-cycle vertex u, let f(u) be the number of nonempty valid subsets of u’s in-tree that include u: the product over direct dependents p of (1 + f(p)).',
        'Compute f bottom-up from the leaves of each in-tree.',
        'For a component, the number of nonempty valid subsets is the product of (1 + f(v)) over vertices that point into the cycle from outside; add one for the empty subset of that component.',
        'Multiply these component totals and subtract one to exclude the globally empty invitation.',
      ],
      complexity: 'O(n) time and O(n) memory.',
    },
    {
      id: 'J',
      title: 'Room Evacuation',
      difficulty: 'Hard',
      rating: 2400,
      topics: ['max flow', 'time-expanded graph'],
      ascii: String.raw`layers 0..t   (time snapshots)

each cell @ time:
  in ──1──> out     (vertex cap)

out @ time τ → in @ τ+1
  for stay / N / S / E / W

source → people at time 0
every exit out → sink

max flow = evacuees`,
      insight:
        'Disjoint paths through space-time are exactly an integral max flow on a time-expanded grid with unit vertex capacities.',
      analysis: [
        'Create t+1 copies of the grid. Split every cell into an in-node and an out-node joined by a capacity-1 edge.',
        'From each out-node at time τ, add edges to the in-nodes of the same cell and its four neighbors at time τ+1.',
        'Connect the source to every person cell’s in-node at time 0.',
        'Connect every exit cell’s out-node at every time to the sink (occupying an exit counts as safe).',
        'The maximum flow equals the maximum number of people that can leave within t seconds.',
      ],
      complexity:
        'O(V²E) worst-case Dinic on V = O(t·n·m) vertices; with n, m ≤ 20 and t ≤ 200 this is practical.',
    },
    {
      id: 'M',
      title: 'Toll Roads',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['MST', 'LCA', 'DSU', 'offline queries'],
      ascii: String.raw`w(a,b) = max edge on unique
         MST path a — b
         (= minimax bottleneck)

k = size of DSU component of a
    after adding all MST edges
    with weight <= w

offline: sort queries by w
         add edges in order`,
      insight:
        'The minimax bottleneck between two cities is the maximum edge weight on their MST path, and the reachable set under that threshold is exactly the MST-component created by edges of weight ≤ w.',
      analysis: [
        'Build a minimum spanning tree of the road network.',
        'With binary lifting, answer for every query the maximum edge weight on the tree path (this is w).',
        'Sort queries by increasing w and scan MST edges in sorted order, uniting endpoints in a DSU that tracks component sizes.',
        'When a query’s threshold is reached, report w together with the DSU size of the starting city.',
      ],
      complexity: 'O((n + m + q) log n) time and O(n log n) memory.',
    },
    {
      id: 'B',
      title: 'Birthday Gift',
      difficulty: 'Hard',
      rating: 2600,
      topics: ['digit DP', 'matrix exponentiation', 'CRT'],
      ascii: String.raw`a digits, no adjacent equals,
value ≡ b (mod 225), no leading 0

225 = 25 × 9

last two digits fix mod 25
prefix length a-2 tracked by
  state (last digit, mod 9)
  — only 90 states

matrix^(a-2) counts prefixes`,
      insight:
        'Chinese Remainder Theorem splits the modulus. The last two digits control the condition modulo 25, while a 90-state digit automaton raised to the (a−2)-nd power counts compatible prefixes modulo 9.',
      analysis: [
        'Handle lengths 1 and 2 by direct enumeration.',
        'For a ≥ 3, enumerate pairs (p, q) of final digits with p ≠ q and 10p+q ≡ b (mod 25).',
        'Build the transition matrix on states (last digit, residue mod 9) for appending a different digit.',
        'Raise the matrix to power a−2 (starting from a length-1 nonzero digit) to obtain all prefix counts.',
        'A prefix ending in e ≠ p is compatible when its residue satisfies the CRT condition for b with the chosen ending pair; sum those ways modulo 10^9+7.',
      ],
      complexity: 'O(90³ log a) time and O(90²) memory.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.naq2022Editorial = naq2022Editorial;
