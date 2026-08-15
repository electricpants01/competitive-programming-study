/**
 * Learning editorials for ICPC North America Qualifier 2024.
 * Ordered from easiest to hardest by estimated difficulty.
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-naq-2024/.
 */
const naq2024Editorial = {
  contestId: '2024-naq',
  title: 'ICPC North America Qualifier 2024',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'C',
      title: 'Call for Problems',
      difficulty: 'Easy',
      rating: 800,
      topics: ['implementation', 'parity'],
      ascii: String.raw`difficulties:  2  3  4  7  10
parity:        E  O  E  O   E
excluded (odd):   ^     ^
answer = 2`,
      insight:
        'The contest refuses every problem whose difficulty rating is odd. Count how many input values are not divisible by two.',
      analysis: [
        'Read n and the n difficulty ratings.',
        'Increment a counter whenever a rating is odd.',
        'Print the counter. Zero is even, so difficulty 0 is allowed.',
      ],
      complexity: 'O(n) time and O(1) memory.',
    },
    {
      id: 'E',
      title: 'Dishonest Lottery',
      difficulty: 'Easy',
      rating: 900,
      topics: ['counting', 'frequency'],
      ascii: String.raw`10 drawings, n = 1  =>  threshold = 2n = 2
number 45 appears 3 times  (> 2)  -> flag
number 50 appears 3 times  (> 2)  -> flag
output: 45 50`,
      insight:
        'With 10n drawings of five numbers each, a number is suspicious exactly when it appears strictly more than 2n times (more than 20% of drawing slots).',
      analysis: [
        'Maintain a frequency array of size 51 while reading all 10n lines.',
        'Collect every value x in 1..50 with count[x] > 2n.',
        'Print them in increasing order, or -1 if the list is empty.',
      ],
      complexity: 'O(n) time and O(1) memory.',
    },
    {
      id: 'B',
      title: 'Bikes and Barricades',
      difficulty: 'Easy',
      rating: 1100,
      topics: ['computational geometry', 'line intersection'],
      ascii: String.raw`        Y
        |   / barricade
        |  /
        | /
        +/---- hit at (0, y)
       /|
      / |
   Scott starts at origin, rides +Y.`,
      insight:
        'Scott’s path is the open ray x = 0, y > 0. A barricade blocks him only if the segment crosses that ray; the answer is the smallest positive crossing height.',
      analysis: [
        'A segment with endpoints of the same x-sign never meets the Y-axis.',
        'When x1 and x2 have opposite signs, the unique axis intersection has parameter t = -x1/(x2-x1) in (0,1).',
        'The height is y = y1 + t(y2-y1). Keep the minimum among all y > 0.',
        'If no barricade crosses the positive ray, output -1.',
      ],
      complexity: 'O(n) time and O(1) memory.',
    },
    {
      id: 'I',
      title: 'Light Up',
      difficulty: 'Easy–Medium',
      rating: 1200,
      topics: ['simulation', 'grid', 'validation'],
      ascii: String.raw`. ? . 0 .
. X . 1 ?
? 3 ? . .

Bulb rays stop at walls.
No two bulbs may see each other.
Numbered walls need exact neighbor bulbs.`,
      insight:
        'The task is not to solve the puzzle—only to verify a completed grid against the three Light Up constraints.',
      analysis: [
        'From every bulb, cast rays in four orthogonal directions until a blocked cell or the border.',
        'If another bulb appears on a ray, the solution is invalid. Mark every open cell reached as lit.',
        'Every ‘.’ cell must be lit (bulb cells count as lit).',
        'For each digit wall, count orthogonally adjacent bulbs and compare to the required number.',
      ],
      complexity: 'O(n^3) time for an n×n grid (n ≤ 30) and O(n^2) memory.',
    },
    {
      id: 'G',
      title: 'Gears and Axles',
      difficulty: 'Easy–Medium',
      rating: 1300,
      topics: ['greedy', 'logarithms', 'grouping'],
      ascii: String.raw`tooth size s=33:   10 ----mesh---- 27
                         |
                    same axle
                         |
tooth size s=44:   10 ----mesh---- 27

speed = (27/10)*(27/10)`,
      insight:
        'Only equal tooth-size gears can mesh. Different sizes interact only by sharing an axle, so each size class contributes an independent speed factor that multiplies across the chain.',
      analysis: [
        'Group gears by tooth size and sort each group by tooth count.',
        'Meshing a larger gear into a smaller one multiplies angular speed by c_large/c_small.',
        'For a sorted group c0 ≤ … ≤ c_{m-1}, the optimal pairing is c_{m-1}/c0 · c_{m-2}/c1 · … for floor(m/2) pairs; leftover gears do not improve the product.',
        'Sum log(ratio) over all pairs and all groups. An empty collection leaves speed 1, so the answer is 0.',
      ],
      complexity: 'O(n log n) time for sorting within groups and O(n) memory.',
    },
    {
      id: 'J',
      title: 'Menger Sponge',
      difficulty: 'Medium',
      rating: 1500,
      topics: ['fractals', 'ternary digits', 'fractions'],
      ascii: String.raw`3x3x3 subcubes; delete the 7 that miss every edge:
   face centers (6) + very center (1)

kept  <=>  at most one ternary digit equals 1
boundary points may choose the non-1 expansion`,
      insight:
        'A point survives a refinement step unless at least two coordinates fall strictly into the open middle third. Ternary boundary points can always prefer a non-middle digit, so they never count as strict middle.',
      analysis: [
        'Deleted subcubes are exactly those whose ternary indices have at least two coordinates equal to 1.',
        'For each level and each coordinate, test whether den < 3·num < 2·den (strict middle).',
        'If two or more coordinates are strict middle, output 0.',
        'Otherwise map each coordinate into its chosen third. On an exact boundary 1/3 or 2/3, mark that axis forever safe (it stays on an edge of every future cube).',
        'Iterate up to L ≤ 10^5 using 64-bit integers; denominators never grow.',
      ],
      complexity: 'O(L) time and O(1) memory.',
    },
    {
      id: 'K',
      title: 'Rhythm Flow',
      difficulty: 'Medium',
      rating: 1600,
      topics: ['dynamic programming', 'matching'],
      ascii: String.raw`expected:  100  200  300
actual:     99  201  240  323
             |    |          |
             7    7          6   => 20

Matching must respect time order.`,
      insight:
        'Order-preserving matching of two sorted sequences with additive pair scores is classic DP identical in structure to edit distance / LCS.',
      analysis: [
        'Define dp[i][j] as the best score using the first i expected presses and first j actual presses.',
        'Transitions: skip an expected press, skip an actual press, or pair them when |e_i - a_j| ≤ 102 and add the tiered score.',
        'Score tiers are [0,15]→7, (15,23]→6, (23,43]→4, (43,102]→2.',
        'Answer is dp[n][m]. Constraints n,m ≤ 2000 make O(nm) comfortable.',
      ],
      complexity: 'O(nm) time and O(nm) memory (or O(m) with rolling arrays).',
    },
    {
      id: 'F',
      title: 'Ellipse Eclipse',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['computational geometry', 'ellipse', 'bounding box'],
      ascii: String.raw`F1 -------- center -------- F2
         <--- 2c --->
semi-major A = a/2
semi-minor B = sqrt(A^2 - c^2)

axis-aligned half-width =
  sqrt( (A cos θ)^2 + (B sin θ)^2 )`,
      insight:
        'The foci fix the center and rotation; the major-axis length fixes both semi-axes. The axis-aligned bounding box of a rotated ellipse has a closed form.',
      analysis: [
        'Center is the midpoint of the foci. Linear eccentricity c is half the interfocal distance, and A = a/2.',
        'Semi-minor length is B = sqrt(A^2 - c^2).',
        'Rotation angle θ is the direction of the major axis (the vector between foci).',
        'Half-width = sqrt(A^2 cos^2 θ + B^2 sin^2 θ) and half-height = sqrt(A^2 sin^2 θ + B^2 cos^2 θ).',
        'Emit [cx ± halfWidth] × [cy ± halfHeight].',
      ],
      complexity: 'O(1) time and O(1) memory.',
    },
    {
      id: 'D',
      title: 'Colorful Trees',
      difficulty: 'Medium–Hard',
      rating: 1900,
      topics: ['trees', 'small-to-large merging', 'DSU on tree'],
      ascii: String.raw`edge to child v splits color c as
   a = count in subtree(v)
   T = total count of c
pairs through the edge: a * (T - a)

merge child maps into parent (small-to-large)
while maintaining f = Σ a(T-a)`,
      insight:
        'For the edge into a subtree, each color contributes (subtree count)·(global count − subtree count). Maintain that sum while merging color maps with small-to-large.',
      analysis: [
        'Root the tree arbitrarily and store each edge’s input index on the adjacency list.',
        'For a finished child subtree, the answer on the parent edge is exactly the maintained value f[child].',
        'When inserting or merging count a → a+δ for color c, update f by subtracting a(T-a) and adding (a+δ)(T-a-δ).',
        'Always merge the smaller map into the larger one so each color occurrence moves O(log n) times.',
        'Output answers in the original edge order.',
      ],
      complexity: 'O(n log^2 n) time with tree maps and O(n) memory.',
    },
    {
      id: 'L',
      title: 'Snake',
      difficulty: 'Medium–Hard',
      rating: 2000,
      topics: ['BFS', 'state search', 'grid'],
      ascii: String.raw`head 0 moves; body follows
 ......01
 ....98.2
 ...A.7.3
 .....654

head may enter the cell the tail vacates
cannot reverse into the neck`,
      insight:
        'The grid is tiny (≤ 10×10) and the snake has length ≤ 16, so BFS over full body configurations decides reachability of the apple.',
      analysis: [
        'Parse hexadecimal body segments into an ordered list head→tail and locate the apple.',
        'A state is the full sequence of body coordinates. Hash it to avoid revisits.',
        'From the head, try four neighbors: stay in bounds, do not step onto the neck (no reverse), and do not hit any body cell except the current tail.',
        'The next body is newHead followed by the previous body without the old tail.',
        'Succeed when the head occupies the apple cell; otherwise the search exhausts and the answer is 0.',
      ],
      complexity: 'O(S · 4) time where S is the number of reachable snake shapes, practical for r·c ≤ 100.',
    },
    {
      id: 'H',
      title: 'Genetic Reconstruction',
      difficulty: 'Hard',
      rating: 2200,
      topics: ['backtracking', 'constraints', 'genetics'],
      ascii: String.raw`parent ak (eye a)   parent em (eye e)
        \             /
         child alleles in {ae, am, ek, km}
         eye color = alphabetically smaller allele

output lex-smallest consistent genotype list`,
      insight:
        'Creatures are already numbered in ancestral order, so assigning genotypes from 1 to n with backtracking explores a tiny search space (n ≤ 20, ≤ 20 genotypes per eye color).',
      analysis: [
        'Store every genotype as a sorted pair (x,y) with x ≤ y. Eye color c forces x = c and y ∈ [c..t].',
        'Roots (parents 0 0) may take any genotype producing their eye color.',
        'A child must be one allele from each parent, then sorted; reject pairs that violate that or the eye color.',
        'Try candidates in lexicographic order and stop at the first complete assignment.',
        'If the search fails, output -1.',
      ],
      complexity: 'O(20^n) worst case but heavily pruned; n ≤ 20 and parent constraints make it fast in practice.',
    },
    {
      id: 'A',
      title: 'Balatro',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['brute force', 'greedy', 'priority queue'],
      ascii: String.raw`score = Σ (add value × product of later chosen multiplies)

product of ALL multiplies ≤ 1e9  =>  ≤ 29 multiplies
and ≤ 11 distinct values

for each value, take 0..cnt of the rightmost copies
then greedily pick highest add contributions`,
      insight:
        'Because the global product of multiply cards is at most 10^9, there are few multiplies and few distinct values. Enumerate how many copies of each value to keep (always the rightmost), then greedily select add cards by contribution.',
      analysis: [
        'Leading multiplies before any add contribute nothing; an add at position i is worth value[i] times the product of chosen multiplies strictly after i.',
        'For equal multiply values, later positions dominate earlier ones for the same count, so only the rightmost t copies of each value need consideration.',
        'The product of (count[v]+1) over distinct values is tiny under the product constraint, so the enumeration is feasible.',
        'Multiply cards partition the array into O(1) add ranges; sort each range once. For a fixed choice, merge ranges with a heap scaled by the range multiplier.',
        'Track the best score for each exact length (#multiplies + #adds), then take prefix maxima for the “length at most s” answers.',
      ],
      complexity:
        'O(S · n log R) where S is the number of enumerated multiply choices and R ≤ 30 is the number of add ranges; fits the 12s limit.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.naq2024Editorial = naq2024Editorial;
