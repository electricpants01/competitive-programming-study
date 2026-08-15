/**
 * Learning editorials for ICPC Asia Seoul Nationwide Internet Competition 2024.
 * Ordered from easiest to hardest by estimated difficulty.
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-seoul-nationwide-2024/.
 */
const seoul2024NationwideEditorial = {
  contestId: '2024-seoul-nationwide',
  title: 'ICPC Asia Seoul Nationwide Internet Competition 2024',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'E',
      title: 'Matrix Game',
      difficulty: 'Easy',
      rating: 1000,
      topics: ['greedy', 'absolute value', 'precomputation'],
      ascii: String.raw`Chan calls b each round.
Hoon picks a to max |H[a][b] - C[a][b]|.
Rounds are independent → sum of per-column maxima.`,
      insight:
        'There is no coupling between rounds, so for each of Chan’s calls b it is enough to precompute max over rows a of |H[a][b] − C[a][b]| and sum those values.',
      analysis: [
        'Read the two n×n matrices.',
        'For every column b, scan all rows and store the best absolute difference.',
        'For each of the m calls, add the precomputed value for that column.',
        'Constraints allow O(n² + m) easily.',
      ],
      complexity: 'O(n² + m) time and O(n) memory.',
    },
    {
      id: 'H',
      title: 'Number Allocation',
      difficulty: 'Easy',
      rating: 1200,
      topics: ['backtracking', 'constraints', 'pruning'],
      ascii: String.raw`0  A B C D
E  a b c d
F  e f g h
G  i j k 0
H  l m 0 0

A=a+e+i+l, …, H=l+m; {a..m}={1..13}`,
      insight:
        'Only thirteen cells are free and every first-row/column entry is a sum of a short contiguous block, so depth-first search with immediate sum checks is enough under the 0.1s limit.',
      analysis: [
        'Fill cells in order a,b,c,d,e,f,g,h,i,j,k,l,m with a used[] mask.',
        'As soon as a full row or column block is completed, reject assignments that miss the prescribed sum.',
        'Also reject globally when A+B+C+D ≠ E+F+G+H.',
        'Count leaves of the search tree.',
      ],
      complexity: 'O(13!) worst case with heavy pruning; tiny constant in practice.',
    },
    {
      id: 'C',
      title: 'Covers',
      difficulty: 'Easy–Medium',
      rating: 1400,
      topics: ['string DP', 'KMP', 'sliding window'],
      ascii: String.raw`Build T from S:
 append S (cost 0)
 append char (cost 1)
 delete k then append S (cost k)

dp[j] = min cost to make T[0..j)`,
      insight:
        'Every useful “put S” lands on an occurrence of S as a substring of T. After deletes, the transition cost is min_p (dp[p] + p) − (j − |S|) over p in the window ending at that occurrence.',
      analysis: [
        'Always allow dp[j] ← dp[j−1] + 1 (type a single character).',
        'Find all ends of S inside T with KMP.',
        'Maintain a sliding-window minimum of dp[p] + p over the last |S| positions.',
        'When an occurrence ends at j, apply the delete-and-put transition via that minimum.',
      ],
      complexity: 'O(|T| + |S|) time and O(|T|) memory.',
    },
    {
      id: 'D',
      title: 'Diagonal Flipping',
      difficulty: 'Easy–Medium',
      rating: 1500,
      topics: ['linear algebra', 'GF(2)', 'diagonals'],
      ascii: String.raw`Type A flips anti-diagonal i+j = const
Type B flips diagonal i−j = const
cell (i,j) ^= A[i+j] ⊕ B[i−j]`,
      insight:
        'Each diagonal family is one GF(2) variable. The constraint graph is bipartite between anti-diagonals and diagonals; every connected component has one free bit, so try both and keep the cheaper consistent assignment.',
      analysis: [
        'Build edges A[i+j] — B[i−j] labelled by the required cell value.',
        'BFS each component twice (start bit 0/1), rejecting conflicts.',
        'Sum the minimum Hamming weight over components; output −1 if any component fails.',
      ],
      complexity: 'O(RC) time and O(R + C) memory.',
    },
    {
      id: 'F',
      title: 'Mining Rights',
      difficulty: 'Medium',
      rating: 1600,
      topics: ['geometry', '2-coloring', 'chords'],
      ascii: String.raw`Chords split the disk.
Faces are 2-colored.
B picks a color class.
YES ⇔ both resources share a color.`,
      insight:
        'Adjacent faces across a chord get opposite owners. Company B may choose either color class, so both resource points are obtainable exactly when they lie in same-colored faces.',
      analysis: [
        'Map circumference indices to unit-circle points and resource (direction, radius) to Cartesian points.',
        'For each chord, XOR a bit according to which side of the supporting line the point lies on.',
        'Compare the two parity bits.',
      ],
      complexity: 'O(n) time and O(1) extra memory.',
    },
    {
      id: 'G',
      title: 'New Megacity',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['MST', 'Kruskal', 'bridges'],
      ascii: String.raw`Process edges by weight.
Candidates linking DSU parts:
  bridge in candidate graph → type 1
  otherwise → type 2
Non-candidates → type 3`,
      insight:
        'Within one weight class, an edge is in every MST iff it is a bridge among the edges that still connect different Kruskal components; it is in some MST iff it connects different components at all.',
      analysis: [
        'Sort edges and run Kruskal.',
        'For each equal-weight block, build the multigraph on compressed components.',
        'Mark bridges (type 1) and other cross edges (type 2); intra-component edges are type 3.',
        'Unite the block and continue.',
      ],
      complexity: 'O(m log m + m α(n)) time and O(n + m) memory.',
    },
    {
      id: 'B',
      title: 'Complexity Measure',
      difficulty: 'Medium–Hard',
      rating: 1900,
      topics: ['BST', 'suffixes', 'ordered set'],
      ascii: String.raw`Suffix BST parents for key a[j]:
parent = later(pred, succ) in a[L..j-1]
Critical = adjacent nonempty parent changes`,
      insight:
        'In the BST built by inserting a suffix left-to-right, the parent of a newly present key is the later-inserted of its current value-predecessor and value-successor. Critical changes are exactly the times that parent value flips while the suffix start advances.',
      analysis: [
        'For each column j, start with the ordered set of pairs (value, index) for indices < j.',
        'Read the parent, then delete a[0], a[1], … while counting flips between nonempty parents.',
        'Sum over columns. (Faster treap-merge views exist for the n ≤ 250000 limit.)',
      ],
      complexity: 'O(n² log n) educational; target O(n log n) with treap merges.',
    },
    {
      id: 'A',
      title: 'Cleaning Robot',
      difficulty: 'Hard',
      rating: 2200,
      topics: ['simulation', 'planar graphs', 'rectangles'],
      ascii: String.raw`UC → enter at crossing, clean CW
PC → resume at same point
turn costs 2, move costs 1`,
      insight:
        'The route is a deterministic depth-first traversal of rectangle boundaries that prioritizes never-visited rectangles at crossings and resumes partially cleaned ones, so the answer is a pure simulation on the arrangement.',
      analysis: [
        'Build the arrangement of axis-aligned rectangle edges; crossings lie in open edge interiors.',
        'Walk clockwise, branching into UC rectangles when a crossing is hit, with +2 time on every turn.',
        'Answer each query by walking the recorded timed polyline (or binary searching events).',
      ],
      complexity: 'O((n² + Q) · L) for arrangement size L; n ≤ 50 keeps it practical.',
    },
    {
      id: 'J',
      title: 'Two Rings',
      difficulty: 'Hard',
      rating: 2300,
      topics: ['geometry', 'binary search', 'rectangles'],
      ascii: String.raw`Two non-penetrating equal-margin
rectangular frames cover all points.
Minimize the larger width.`,
      insight:
        'Optimal rings tend to hug axis-aligned bounding boxes of complementary point subsets; binary-search the width and test separable covers.',
      analysis: [
        'Binary search the maximum allowed width w.',
        'For a fixed w, decide whether the point set can be covered by two non-crossing w-rings (often by trying splits by x or y order).',
        'Geometric predicates must respect the equal-margin definition of a rectangular ring.',
      ],
      complexity: 'O(n log n · log X) for sweep-based checks (implementation-sensitive).',
    },
    {
      id: 'I',
      title: 'Polygon Discovery',
      difficulty: 'Hard',
      rating: 2400,
      topics: ['interactive', 'convex geometry', 'binary search'],
      ascii: String.raw`Query line → #boundary hits
Recover area of unknown convex
polygon containing the origin.`,
      insight:
        'Supporting lines in enough directions reconstruct the convex body; each direction’s tangent offset can be located by binary searching query lines.',
      analysis: [
        'Sweep many directions around the origin.',
        'Binary-search the outward offset of a separating line until the hit count drops.',
        'Shoelace the sampled extreme points and output the area.',
      ],
      complexity: 'O(D log B) queries for D directions and coordinate bound B ≤ 1024.',
    },
    {
      id: 'K',
      title: 'WEB Machine',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['construction', 'esoteric VM', 'sorting'],
      ascii: String.raw`Wheel of W/B/E slots
Head: Pick/Drop/Left/Right/Stars/Jumps
Goal: WWW…EEE…BBB clockwise`,
      insight:
        'Empties form a movable buffer. A Dutch-national-flag style program that parks the head on the empty block and relocates B’s past the empties (and W’s before them) sorts any valid instance.',
      analysis: [
        'Rotate so the empty run sits under a stable reference.',
        'Scan the circle; whenever a blue ball sits in the white zone, Pick it and Drop it into the empty buffer, then restore the head.',
        'Symmetric handling for misplaced whites; terminate with Stop.',
      ],
      complexity: 'Program length O(1) or O(n) instructions; runtime O(n²) head moves.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.seoul2024NationwideEditorial = seoul2024NationwideEditorial;
