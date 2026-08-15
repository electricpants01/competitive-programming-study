/**
 * Learning editorials for NTU ICPC Team Preliminary 2024 (CF gym 105292).
 * Ordered from easiest to hardest by estimated difficulty.
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-ntu-team-preli-2024/.
 */
const ntu2024Editorial = {
  contestId: '2024-ntu-team-preli',
  title: 'NTU ICPC Team Preliminary 2024',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'L',
      title: "Ltf's Board Game",
      difficulty: 'Easy',
      rating: 800,
      topics: ['game theory', 'independent set', 'parity'],
      ascii: String.raw`N×N grid, no orthogonal adjacency.
Max moves = ceil(N² / 2).
First wins iff that number is odd.`,
      insight:
        'Optimal play always fills a maximum independent set of the grid graph (checkerboard majority). The winner is completely determined by the parity of ⌈N²/2⌉.',
      analysis: [
        'On an N×N grid the largest set of cells with no two sharing a side has size ⌈N²/2⌉.',
        'The game is normal-play and essentially impartial with that length under optimal packing.',
        'Output Ltf when ⌈N²/2⌉ is odd, otherwise Ian.',
      ],
      complexity: 'O(1) time and memory.',
    },
    {
      id: 'A',
      title: 'Akari',
      difficulty: 'Easy',
      rating: 1000,
      topics: ['greedy', 'grid', 'construction'],
      ascii: String.raw`Place L on any still-dark '.' 
Lighting a bulb lights its row/col
until '#'. Dark ⇒ no bulb sees it.`,
      insight:
        'Without numeric clues, every unlit empty cell is a safe place for a new bulb: if it saw an existing bulb it would already be lit.',
      analysis: [
        'Scan cells in any order.',
        'When a ‘.’ is still dark, write ‘L’ and mark the whole orthogonal ray system as lit.',
        'Guaranteed solvability makes this complete.',
      ],
      complexity: 'O(NM · (N + M)) time worst case; fine for 2000 with few bulbs in practice.',
    },
    {
      id: 'D',
      title: 'Differencing',
      difficulty: 'Easy–Medium',
      rating: 1300,
      topics: ['primes', 'partition', 'greedy'],
      ascii: String.raw`Partition first N primes.
Target difference = sum mod 2 (N≥2).
Greedy large primes + DP on first ~25.`,
      insight:
        'For N ≥ 2 the first N primes can always be split with difference equal to the parity of their sum. Large primes are assigned greedily to the lighter side; a tiny subset-sum DP repairs the prefix.',
      analysis: [
        'Sieve the first 4·10⁵ primes once.',
        'Assign primes from largest down to index 25 onto the currently lighter part.',
        'Subset-sum DP the smallest 25 primes to finish as close as possible to the ideal balance.',
      ],
      complexity: 'O(P log log P + T · S) with S ≈ sum of first 25 primes.',
    },
    {
      id: 'H',
      title: 'HW0.514',
      difficulty: 'Easy–Medium',
      rating: 1500,
      topics: ['combinatorics', 'modular inverse', 'blocks'],
      ascii: String.raw`N black + M red in a random shuffle.
P(exactly k red blocks) =
  C(N+1,k)·C(M-1,k-1) / C(N+M,M)`,
      insight:
        'k nonempty red blocks are placed into the N+1 gaps created by N blacks (including ends), and M reds are split into k nonempty parts.',
      analysis: [
        'Precompute factorials and inverse factorials mod 998244353.',
        'For each k = 1..M output C(N+1,k)·C(M−1,k−1)·C(N+M,M)⁻¹.',
      ],
      complexity: 'O((N + M) + M) time after O(N + M) preprocessing.',
    },
    {
      id: 'J',
      title: 'Just Do it!',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['b-matching', 'degree constraints', 'graphs'],
      ascii: String.raw`Select max edges so deg(v) ≤ a_v.
Both endpoints of an edge pay 1.`,
      insight:
        'This is a degree-constrained subgraph problem (b-matching) on a general graph with m ≤ 150, which is small enough for multi-start greedy with local improvements to reach optimality on contest data.',
      analysis: [
        'Shuffle edges repeatedly; greedily take any edge that respects residual capacities.',
        'Keep the largest feasible set across thousands of trials.',
        'Exact blossom-based b-matching also works but is heavier to implement.',
      ],
      complexity: 'O(T · m · n) for T random trials.',
    },
    {
      id: 'G',
      title: 'Graph Problem',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['circular arcs', 'max clique', 'Helly'],
      ascii: String.raw`Vertices = circular arcs on 2N points
Edges = overlaps
Find any maximum clique`,
      insight:
        'Circular-arc overlap graphs are chordal-like enough that a maximum clique is either a maximum depth stabbing set or obtainable by growing a clique from each seed arc among its neighbors.',
      analysis: [
        'Mark pairwise overlaps (n ≤ 2000 ⇒ O(n²) is acceptable with care).',
        'Take the deepest point cover as a baseline clique.',
        'From each seed, greedily extend by vertices adjacent to the whole current clique.',
      ],
      complexity: 'O(n² + n · q) for clique growth.',
    },
    {
      id: 'I',
      title: 'Image Matching',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['SSD', 'brute force', 'images'],
      ascii: String.raw`SSD(x,y)=Σ (I−T)² over template
Return any minimizing (x,y)`,
      insight:
        'Constraints (W ≤ 1024, H ≤ 768) allow a direct convolution-style scan; FFT acceleration is optional.',
      analysis: [
        'Parse hex pixels into integers.',
        'For every top-left (x,y) compute the sum of squared differences.',
        'Track the minimum location.',
      ],
      complexity: 'O(WHNM) naive; FFT brings it near O(WH log(WH)).',
    },
    {
      id: 'C',
      title: 'Crystal Mining',
      difficulty: 'Medium–Hard',
      rating: 1900,
      topics: ['hex grid', 'expansion', 'geometry'],
      ascii: String.raw`Hex of side N.
For each center, largest pure
same-type hex radius.`,
      insight:
        'In cube/axial coordinates a hex of side s is the set of cells with hex distance < s from the center; expand s while the disk stays monochromatic and inside the crystal.',
      analysis: [
        'Parse the staggered row lengths of the large hex.',
        'Convert (row, index) to cube coordinates.',
        'For each center grow s = 1,2,… until a mismatch or boundary hit.',
      ],
      complexity: 'O(N⁴) worst case with N ≤ 999 needs pruning / BFS distance maps for full limits.',
    },
    {
      id: 'B',
      title: 'Beautiful Strings',
      difficulty: 'Hard',
      rating: 2100,
      topics: ['strings', 'DP', 'LCP'],
      ascii: String.raw`Piece P is better than rest R iff
P is not a prefix of R and P < R.
Max number of pieces in a chain.`,
      insight:
        'better(P,R) reduces to “first mismatch inside P favors P”. DP[i] = 1 + max DP[j] over valid cuts j > i, computed right-to-left.',
      analysis: [
        'Characterize valid (i,j) via LCP(i,j) < j−i and s[i+lcp] < s[j+lcp].',
        'Quadratic DP is correct; for Σ|s|=2·10⁵ replace the inner scan with suffix-array RMQ / sparse optimization.',
      ],
      complexity: 'O(n²) educational DP; intended O(n log n) with SA.',
    },
    {
      id: 'K',
      title: 'King Game',
      difficulty: 'Hard',
      rating: 2200,
      topics: ['game theory', 'poset game', 'Sprague–Grundy'],
      ascii: String.raw`Two tokens on a product of chains.
Move: decrease one token's coords
without colliding.`,
      insight:
        'The rules describe a dead-ending poset game on two incomparable points of the product order. Winning first moves are those to a zero-Grundy position of the sum.',
      analysis: [
        'Model each token’s solo game (moves inside its rectangle) with a Grundy number.',
        'XOR the two values for the combined state.',
        'Count moves of either token to a state whose XOR is 0, excluding collisions.',
      ],
      complexity: 'O(T · X · Y) per naive count with X,Y ≤ 300 after precomputation.',
    },
    {
      id: 'F',
      title: 'Forever on a Bicycle',
      difficulty: 'Hard',
      rating: 2300,
      topics: ['expected value', 'DP on subsets', 'shortest paths'],
      ascii: String.raw`n≤18 stations.
Mask = known-full set.
Minimize E[time] from station 1.`,
      insight:
        'After a failed observation a station becomes permanently “full” in the agent’s knowledge, so the state is (current vertex, bitset of known-full stations).',
      analysis: [
        'DP[mask][v] = min expected remaining time.',
        'Actions: wait, observe (branch on p_v), or travel an edge.',
        'Value-iterate the Bellman equations per mask (DAG on popcount helps).',
      ],
      complexity: 'O(2ⁿ · n · (n + iters)) with n ≤ 18.',
    },
    {
      id: 'E',
      title: 'Employees Selection',
      difficulty: 'Hard',
      rating: 2400,
      topics: ['tree DP', 'bounded loss', 'bitsets'],
      ascii: String.raw`Select a subset of a tree of employees.
Losses from pressure & capability gaps.
Only care if OPT ≥ T−20.`,
      insight:
        'Because the judge only needs the optimum when it lies in a window of length 20 below the trivial positive-sum T, one can restrict DP states to “loss ≤ 20” configurations.',
      analysis: [
        'T = Σ max(p_i,0) is a hard upper bound.',
        'Model pressure and capability-gap penalties as extra costs on subsets.',
        'Tree / capability-order DP exploring only states within 20 of T decides Fail! versus the exact optimum.',
      ],
      complexity: 'Near-linear in n with a 20-wide loss dimension (intended).',
    },
    {
      id: 'M',
      title: 'Melting',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['computational geometry', 'shortest paths', 'visibility'],
      ascii: String.raw`Min length outside convex shades
on a path S → T.`,
      insight:
        'Inside any shade the traveller pays zero unshaded length, so the optimum is a shortest path in the visibility graph of polygon vertices plus S,T with edge weights equal to the unshaded portion (often the full Euclidean length when the segment misses all interiors).',
      analysis: [
        'Build the arrangement/visibility graph on all polygon vertices and S,T.',
        'Weight each segment by the measure of its uncovered part.',
        'Dijkstra yields the minimum unshaded length.',
      ],
      complexity: 'O(V² log V) for V = Σ k_i ≤ 10⁵ needs careful pruning.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.ntu2024Editorial = ntu2024Editorial;
