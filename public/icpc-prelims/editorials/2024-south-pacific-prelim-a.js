/**
 * Learning editorials for ICPC South Pacific Preliminaries 2024 (Level A).
 * Ordered from easiest to hardest by estimated difficulty (informed by solve counts).
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-south-pacific-2024-level-a/.
 */
const spp2024AEditorial = {
  contestId: '2024-south-pacific-prelim-a',
  title: 'ICPC South Pacific Preliminaries 2024 (Level A)',
  difficultyNote:
    'Difficulty is an educational estimate based on required observations, proof, and implementation, informed by contest solve counts.',
  problems: [
    {
      id: 'I',
      title: 'Iguana Gift',
      difficulty: 'Easy',
      rating: 800,
      topics: ['strings', 'palindromes', 'brute force'],
      ascii: String.raw`s = icpc   (n = 4)

Try append length k = 0,1,2,...
final length m = n+k

k=0: m=4  need s[i]=s[3-i]  → fails
k=1: m=5  pairs inside s: (1,3) both 'c' ✓
      result icpci

answer = 1`,
      insight:
        'The result must be a palindrome that starts with s. With n ≤ 20, try every append length k and only check pairs of positions that both land inside the original string.',
      analysis: [
        'For append length k, the final length is m = n+k.',
        'A palindrome requires character i to equal character m−1−i.',
        'Whenever both indices lie in [0,n), the original string already fixes both characters—they must match.',
        'Any index that falls into the appended suffix can always be filled with the mirrored character.',
        'The smallest feasible k is the answer (0 when s is already a palindrome).',
      ],
      complexity: 'O(n²) time and O(n) memory with n ≤ 20.',
    },
    {
      id: 'A',
      title: 'Arranging Sticks',
      difficulty: 'Easy',
      rating: 900,
      topics: ['construction', 'sorting', 'zigzag'],
      ascii: String.raw`sorted:  2 3 5 7 11 13 17
swap pairs: 3 2 7 5 13 11 17

triplet (3,2,7): middle 2 is min  ✓
triplet (2,7,5): middle 7 is max  ✓
triplet (7,5,13): middle 5 is min ✓
…`,
      insight:
        'The median of three distinct values is the middle element if and only if that element is neither the minimum nor the maximum. A zigzag (up-down) sequence forces every middle value to be a local extremum.',
      analysis: [
        'Sort the lengths in increasing order.',
        'Swap each pair (a[0],a[1]), (a[2],a[3]), … so the sequence alternates high/low.',
        'Every consecutive triple then has its middle entry as a peak or a valley, so it cannot be the median.',
        'A delightful order always exists; any valid construction is accepted.',
      ],
      complexity: 'O(n log n) time for sorting and O(n) memory.',
    },
    {
      id: 'B',
      title: 'Birthday Wizard',
      difficulty: 'Easy',
      rating: 1000,
      topics: ['number bases', 'digit sum'],
      ascii: String.raw`N = 5

base 2: 101      candles = 1+0+1 = 2
base 3: 12       candles = 1+2 = 3
base 5: 10       candles = 1+0 = 1  ← best
base 10: 5       candles = 5`,
      insight:
        'Candles equal the sum of digits of N in the chosen base. Digits of zero need no candles, so sparse representations win. Only bases 2 through 10 are allowed.',
      analysis: [
        'For each base b ∈ [2,10], repeatedly replace N with ⌊N/b⌋ and add N mod b to a running sum.',
        'Track the minimum digit sum over all nine bases.',
        'N fits in 64-bit integers (N ≤ 10^18).',
      ],
      complexity: 'O(log N) time per base (constant number of bases) and O(1) memory.',
    },
    {
      id: 'C',
      title: 'Crushing Monsters',
      difficulty: 'Easy–Medium',
      rating: 1400,
      topics: ['greedy', 'enumeration'],
      ascii: String.raw`HP=50, potion 30%, sword 20

potion then sword: 50→35→15
sword then potion: 50→30→21

Potions first is never worse while HP > 0.`,
      insight:
        'While HP is positive, using all chosen potions before all chosen swords minimizes remaining HP. Enumerate how many top potions versus top swords to use under the item limit.',
      analysis: [
        'Sort potions by potency descending and swords by strength descending.',
        'For each count p of potions in 0..min(n,L), use the top s = min(m, L−p) swords.',
        'Apply the p potions (multiply HP by (100−potency)/100 while HP > 0), then subtract the s sword strengths.',
        'Potions do nothing on non-positive HP; swords still subtract.',
        'Take the minimum remaining HP over all choices of p (including using fewer than L items).',
      ],
      complexity: 'O((n+m) log(n+m) + L·(n+m)) time and O(n+m) memory.',
    },
    {
      id: 'L',
      title: 'LLM',
      difficulty: 'Easy–Medium',
      rating: 1500,
      topics: ['probability', 'counting', 'bigrams'],
      ascii: String.raw`training: international, collegiate, programming, contest
target: test   (first 't' already generated)

P(e|t)=3/5, P(s|e)=1/4, P(t|s)=1/1, P(stop|t)=1/5
product = 0.03`,
      insight:
        'JanetBot is a first-order Markov model on letters plus a stop token at the end of every training word. The probability of emitting the rest of the target is the product of successive bigram transitions, ending with stop.',
      analysis: [
        'Count occurrences of each letter across all training words.',
        'Count transitions letter→letter inside words and letter→stop at every word end.',
        'Starting from the first letter of T, multiply P(T[i+1]|T[i]) for each step, then multiply P(stop|last).',
        'If a required previous letter never appears, the model always emits stop (probability 1 only when T has length 1; otherwise 0 for longer targets).',
      ],
      complexity: 'O(total training length + |T|) time and O(1) memory for the 26×27 tables.',
    },
    {
      id: 'G',
      title: 'Grouping Words',
      difficulty: 'Easy–Medium',
      rating: 1600,
      topics: ['graphs', 'cliques', 'enumeration'],
      ascii: String.raw`9 words → complete graph on related pairs

Need partition into 3 triangles (K3):

  PACIFIC—PROGRAMMING—SOUTH
  NEW—FIJI—ZEALAND
  CPLUSPLUS—PYTHON—JAVA`,
      insight:
        'A valid group is a triangle in the relatedness graph. With only nine vertices, enumerate all partitions into three unlabeled triples and test pairwise relatedness.',
      analysis: [
        'Map each word to an index 0..8 and build an undirected adjacency matrix from the m related pairs.',
        'Enumerate every triple (a,b,c); skip unless all three edges exist.',
        'Among the remaining six vertices, enumerate a second triangle; the last three must also form a triangle.',
        'Print any such partition, or Impossible if none exists.',
      ],
      complexity: 'O(1) time for fixed 9 vertices (a few thousand enumerations) and O(1) memory.',
    },
    {
      id: 'H',
      title: 'Human Resources',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['trees', 'greedy', 'covering'],
      ascii: String.raw`K=2, depth-3 leaves need help

Process deepest uncovered node u:
  place training at the K-th ancestor of u

Covers a whole chain of length K upward.`,
      insight:
        'Coverage only moves toward the CEO along the unique reporting chain. The optimal greedy processes nodes from deepest to shallowest and places the next training as high as allowed (exactly K steps up).',
      analysis: [
        'Build the tree from the parent list; compute depths with a BFS/DFS from the CEO.',
        'Binary-lift (or climb) to support K-th ancestor queries.',
        'Scan employees in decreasing depth. If the nearest trained ancestor is farther than K (or missing), train the K-th ancestor of that employee.',
        'Finally ensure the CEO themself is covered (train the CEO if needed).',
        'n ≤ 300, so recomputing nearest trained depths after each placement is acceptable.',
      ],
      complexity: 'O(n²) time with naive refresh (fine for n ≤ 300) and O(n log n) memory for lifting.',
    },
    {
      id: 'F',
      title: 'Flappy Bird',
      difficulty: 'Medium',
      rating: 1900,
      topics: ['intervals', 'parity', 'path reconstruction'],
      ascii: String.raw`column x constraints:
  D yD  ⇒  height ≥ yD+1
  U yU  ⇒  height ≤ yU−1

from reachable [L,R] at x
  → [L−1,R+1] at x+1, clipped + same parity as x+1`,
      insight:
        'After t moves the bird’s height has the same parity as t and lies in an interval that expands by 1 each step. Intersect that interval with each pipe column’s allowed band, then walk backward to recover flaps.',
      analysis: [
        'For every column, aggregate the strongest down-pipe lower bound and up-pipe upper bound.',
        'If the feasible band is empty at any pipe column, output Impossible.',
        'Propagate reachable height intervals from (0,0) to column xR+1, always restricting to the correct parity.',
        'If column xR+1 is unreachable, output Impossible.',
        'Otherwise pick any reachable height at the end and step backward: each previous height differs by exactly ±1 and must stay inside the stored interval; emit + or − accordingly.',
      ],
      complexity: 'O(n + xR) time and O(xR) memory with xR ≤ 200000.',
    },
    {
      id: 'K',
      title: 'Knowledgeable AI Startup',
      difficulty: 'Medium–Hard',
      rating: 2200,
      topics: ['simulation', 'connected components', 'game'],
      ascii: String.raw`W=2  blocks: 1,1,2,2

after 1st: h=[1,0] still linked (|dh|=1)
after 2nd: h=[2,0] SPLIT → forced onto column 2
after 3rd: falls on 1 (safe)
after 4th: falls on 2 → crushed  score=3`,
      insight:
        'Columns form contiguous components where every adjacent height difference is at most 1. Between falls Marizzo may move freely inside his component; he dies when a block hits the only cell of every component he could still occupy.',
      analysis: [
        'Track the set of components (intervals) that some surviving strategy could place Marizzo in; start with [1,W].',
        'When a block falls at c, discard any singleton component {c}. For every other component containing c, temporarily place the block and collect the new components of all safe cells.',
        'Components that do not contain c remain candidates (then re-expand with the updated heights).',
        'If no candidate component remains, the score is the current second index; if all N blocks are dodged, the score is N+1.',
        'Width 1 is an immediate loss on the first block.',
      ],
      complexity:
        'O(N · W) worst case from scanning intervals; fine for the sample scale and typical fragmented instances.',
    },
    {
      id: 'J',
      title: 'ja$on Playpen',
      difficulty: 'Hard',
      rating: 2400,
      topics: ['computational geometry', 'convex hull', 'shoelace'],
      ascii: String.raw`hull area (×2) = S
replace vertex H[i] by point P:

Δ uses only neighbors H[i−1], H[i+1]
newSigned = S − crosses(H[i]) + crosses(P)

minimize |newSigned| over i and P`,
      insight:
        'After one vertex replacement the fencing is the old hull with that vertex swapped for another post. The absolute shoelace value of that (possibly self-intersecting) polygon is the total enclosed area times two.',
      analysis: [
        'Build the convex hull of all posts (no three consecutive collinear on the hull).',
        'For each hull vertex i, replacing it changes only the two shoelace terms that touch i.',
        'The new signed double-area is an affine function A·x + B·y + C of the replacement point.',
        'Try every post P ≠ H[i], keep the minimum absolute value (often 0).',
        'Early-exit when a replacement yields exactly zero.',
      ],
      complexity: 'O(n log n) for the hull plus O(h·n) replacement trials (h = hull size).',
    },
    {
      id: 'E',
      title: 'Eliot’s Friends',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['max flow', 'min cut', 'edge-disjoint paths'],
      ascii: String.raw`friends = edge-disjoint 1↝N paths
max friends = max flow (multi-edges as capacity)

need flow ≤ F after deletions
min deletions = max(0, min-cut − F)

delete that many capacity from any min cut`,
      insight:
        'Surviving friends are edge-disjoint paths from clearing 1 to clearing N, so their maximum equals the max flow. To force at most F survivors, reduce a minimum cut down to capacity F.',
      analysis: [
        'Run a max-flow algorithm (Dinic) on the N×N multiplicity matrix; N ≤ 250.',
        'If flow ≤ F, output the original graph unchanged.',
        'Otherwise find the residual source-side of a min cut and delete exactly flow−F capacity from cut edges (S→T), preferring any order.',
        'The printed matrix is any graph whose max flow is at most F and whose total deleted multiplicity is minimal.',
      ],
      complexity: 'O(N² · F_flow) with Dinic on a dense graph; N ≤ 250 is comfortable.',
    },
    {
      id: 'D',
      title: 'Dr Carboi',
      difficulty: 'Hard',
      rating: 2700,
      topics: ['binary search', 'scheduling', 'permutations'],
      ascii: String.raw`place K cars at times 0,G,2G,…
need (K−1)·G < T_first   (finger rule)

crash if some lap of P starts after some lap of Q
but finishes no later:

  start_P > start_Q  AND  finish_P ≤ finish_Q`,
      insight:
        'Only the K fastest cars are candidates. Feasibility is monotone in K, so binary search. A race is legal when some start order respects the finger constraint and creates no cross-lap containment crashes over L laps.',
      analysis: [
        'Sort all lap times; the K fastest are the first K after sorting ascending.',
        'Binary search K. For a candidate set, try promising orders: slowest-first, fastest-first, and each legal car as opener with the rest sorted.',
        'For K ≤ 8, also brute-force all permutations.',
        'Validate an order by checking the finger rule and all pairs of lap intervals (L ≤ 10).',
        'The largest feasible K is the answer (at least 1).',
      ],
      complexity:
        'O(R log R + log R · P · K² L²) where P is the number of tried permutations/heuristics per check.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.spp2024AEditorial = spp2024AEditorial;
