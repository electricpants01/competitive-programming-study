/**
 * Learning editorials for ICPC Asia Dhaka Online Preliminary 2025.
 * Ordered from easiest to hardest by estimated difficulty.
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-dhaka-2025-online-preliminary/.
 */
const dhaka2025Editorial = {
  contestId: '2025-dhaka-online-preli',
  title: 'ICPC Asia Dhaka Online Preliminary 2025',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'H',
      title: 'Chemical Reaction',
      difficulty: 'Easy–Medium',
      rating: 1400,
      topics: ['graph closure', 'BFS', 'coordinate compression'],
      ascii: String.raw`Initially: {1, 4}
       1 + 4 -> 2
              |
              v
          {1, 2, 4}
       2 + 4 -> 3
              |
              v
       {1, 2, 3, 4}
       1 + 3 -> 6
              |
              v
     {1, 2, 3, 4, 6}`,
      insight:
        'Reactants are never consumed, so the set of available chemicals only grows. After an enormous number of seconds, the chamber contains exactly the closure of the initial set under all reaction rules.',
      analysis: [
        'Compress every chemical ID appearing initially or in a rule because IDs reach 10^9.',
        'For each rule x + y -> z, attach (y, z) to x and (x, z) to y.',
        'Mark all initial chemicals and place them in a queue.',
        'When chemical u is processed, every adjacent rule whose other reactant is already present can produce z. Add each new z once.',
        'The later of two reachable reactants always discovers their rule, so every possible reaction eventually fires. Conversely, the algorithm only adds products of valid rules.',
      ],
      complexity: 'O((n + m) log(n + m)) time for compression and O(n + m) memory.',
    },
    {
      id: 'B',
      title: 'Your Next Line Is, “What A Cool Problem!”',
      difficulty: 'Easy–Medium',
      rating: 1500,
      topics: ['game theory', 'construction', 'pigeonhole principle'],
      ascii: String.raw`Vocabulary core (a >= 3, v >= 3):

  aaaa    bbbb    cccc
    X       |       |    guess 'a' -> report MISS
            X       |    guess 'b' -> report MISS
                    |
                 one word remains

Maximum forced misses = min(a, v) - 1`,
      insight:
        'Each miss must eliminate at least one still-possible word, and no more than a−1 alphabet letters can be misses. Both bounds are simultaneously achievable with words supported by different letters.',
      analysis: [
        'An optimal guesser only chooses a letter occurring in some consistent word.',
        'After a miss, every word containing that letter disappears. Therefore at most v−1 misses occur before only one word remains.',
        'The final word contains at least one alphabet letter, so at most a−1 letters can be absent and reported as misses.',
        'Use min(a, v) core words: letter i repeated l times. Any guessed core letter can be rejected while another core word remains.',
        'Joseph can force min(a, v)−1 misses, so he plays exactly when min(a, v) > n.',
      ],
      complexity: 'O(1) per test case and O(1) extra memory.',
    },
    {
      id: 'G',
      title: 'The Matrix',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['bitwise XOR', 'bitwise AND', 'greedy'],
      ascii: String.raw`Row XORs:    [28, 4]
Column XORs: [ 6, 29, 3]

Choose row 28 and column 29:
  28 & 29 = 28

Old total S = 70
Best total = S - 2 * 28 = 14`,
      insight:
        'Changing one cell XORs exactly one row total and one column total by the same mask. The best possible saving for row XOR r and column XOR c is 2·(r AND c).',
      analysis: [
        'If a cell changes from a to b, define d = a XOR b. Its row XOR becomes r XOR d and its column XOR becomes c XOR d.',
        'For each bit where r and c agree, choose d to clear both resulting bits. Where they differ, exactly one resulting value must retain that bit.',
        'Thus min_d ((r XOR d) + (c XOR d)) = r XOR c.',
        'The new total is S − r − c + (r XOR c) = S − 2·(r AND c).',
        'Compute all row and column XORs, then maximize r AND c over all row/column pairs.',
      ],
      complexity: 'O(nm) time and O(n + m) memory.',
    },
    {
      id: 'F',
      title: 'Over Counting',
      difficulty: 'Medium',
      rating: 1900,
      topics: ['combinatorics', 'inversions', 'binomial coefficients'],
      ascii: String.raw`b:       1  0  0  1
f(b):    0  1  1  0
                   ^
The final 0 has two earlier values greater than it.

g counts pairs (zero, later one) where
that zero already has a one before it.`,
      insight:
        'For a binary string, f(b) is zero at every 1 and equals the number of earlier ones at every 0. An inversion in f(b) therefore has a simple three-position interpretation.',
      analysis: [
        'A pair p < q contributes to g only when b[p] = 0, b[q] = 1, and at least one 1 occurs before p.',
        'Sum this indicator over all distinct strings with o ones and z zeros rather than over strings one by one.',
        'Counting marked positions and applying the hockey-stick identity gives C(n,o)·o·z·(o−1)/(2(o+1)).',
        'Evaluate the division modulo 998244353 using modular inverses.',
        'If there are fewer than two ones or no zeros, the answer is zero.',
      ],
      complexity: 'O(max n) factorial precomputation, then O(n) input reading and O(1) arithmetic per case.',
    },
    {
      id: 'E',
      title: 'The Perfect View',
      difficulty: 'Medium–Hard',
      rating: 2100,
      topics: ['computational geometry', 'angular sweep', 'two pointers'],
      ascii: String.raw`              L2
              *
             /|\
            / | \
           /  P  \    P is very close to C
          /   |   \   along an angular gap.
        L1----C----L3

Each landmark pair contributes when its
open cone around C contains the chosen ray.`,
      insight:
        'Along any ray starting at the cafe, moving away can only leave landmark triangles. Therefore an optimal point may be taken arbitrarily close to the cafe, reducing the problem to maximum overlap of angular cones.',
      analysis: [
        'Translate landmarks so the current cafe is the origin and sort their direction vectors by angle.',
        'Every landmark pair defines one open positive cone of aperture below π. A near-cafe point is inside the triangle exactly when its ray lies in that cone.',
        'Coverage is constant inside each angular gap between consecutive landmark rays.',
        'Use two pointers to find, for each starting ray i, the next R rays within a counterclockwise half-turn.',
        'That start contributes R, R−1, …, 1 to consecutive gaps. Accumulate these arithmetic range additions with two difference arrays and fold the doubled circle.',
        'Take the maximum gap coverage over all cafes.',
      ],
      complexity: 'O(N·M log M) time and O(M) memory per test case.',
    },
    {
      id: 'A',
      title: 'Delete, Deduct, and Destroy',
      difficulty: 'Hard',
      rating: 2200,
      topics: ['number theory', 'decimal representation', 'dynamic updates'],
      ascii: String.raw`x = [ prefix A | digit d | suffix B ]
                   delete d
y = [ prefix A | suffix B ]

x - y = 10^(k-1) * (9A + d)

z = m0 * 10^t
    ^^^^       ^ trailing-zero count`,
      insight:
        'Deleting a digit yields a factorization where the free suffix contributes a power-of-ten number of choices. The answer depends only on trailing zeros, the nonzero span, and divisibility by 9—all maintainable under digit updates.',
      analysis: [
        'For p = k−1, write x = A·10^(p+1) + d·10^p + B. After deleting d, f(x,k) = 10^p(9A+d).',
        'For every p with 10^p dividing z, suffix B gives 10^p choices.',
        'The equation m = 9A+d has one representation normally and two when positive m is divisible by 9.',
        'Special handling is needed when A=0 because x must contain at least two digits.',
        'Maintain a set of nonzero digit positions, the digit sum modulo 9, and precomputed repunits. Each update changes these in logarithmic time.',
      ],
      complexity: 'O((n + q) log n) time and O(n) memory.',
    },
    {
      id: 'C',
      title: 'Least Compatible Ancestor',
      difficulty: 'Hard',
      rating: 2300,
      topics: ['tree DP', 'bitmask DP', 'LCA'],
      ascii: String.raw`Original tree:            Assigned values:
       u                         a[u]
      / \                       /   \
     v   w                  forbidden subtree
    /
   x

For every ancestor u of v:
  a[v] must NOT lie inside subtree(a[u]).`,
      insight:
        'The all-pairs LCA condition is equivalent to a local rule on every ancestor–descendant pair. Along a root-to-leaf path, each chosen image forbids its entire subtree for all descendants.',
      analysis: [
        'For ancestor u of v, lca(u,v)=u. The condition says a[u] cannot be an ancestor of a[v].',
        'This ancestor rule is also sufficient: for nodes in different child subtrees, an image LCA equal to a[u] would force both images into subtree(a[u]), contradicting the rule.',
        'Represent forbidden values by an n-bit mask. Choosing image x adds subtree(x) to the mask.',
        'For dp[u][mask], try each x outside mask and multiply child results using mask OR subtree(x).',
        'Compute nodes bottom-up; the answer is dp[root][0].',
      ],
      complexity: 'O(n²·2^n) time and O(n·2^n) memory for n ≤ 20.',
    },
    {
      id: 'D',
      title: 'Magical Flower Garden',
      difficulty: 'Hard',
      rating: 2400,
      topics: ['data structures', 'threshold decomposition', 'ordered sets'],
      ascii: String.raw`Saturation:  1  1  2  1  3  1
Level k=2:   .  .  #  .  #  .
Gaps:       [--2--] [1]   [1]

Insert a new # after an OR update:
  one old gap  --->  left gap + right gap

Beauty = sum over threshold levels.`,
      insight:
        'Replace every maximum saturation by a sum of threshold indicators. At each threshold, valid subarrays are all subarrays minus those contained in gaps with no qualifying position.',
      analysis: [
        'Use max = Σ[k≥1] [max≥k], so beauty is the sum of 30 independent threshold contributions.',
        'At threshold k, positions with popcount at least k are separators. A gap of length g contributes g(g+1)(g+2)/6 total subarray length to the excluded set.',
        'Bitwise OR never decreases popcount. When one position rises from old to new, it becomes a separator only for thresholds old+1 through new.',
        'For each threshold maintain an ordered set of separator indices and the sum of gap cubic terms. Inserting one index splits one gap into two.',
        'Maintain separate ordered sets by exact popcount to select the leftmost flower for update queries.',
      ],
      complexity: 'O(30·(n + d) log n) time, O(30n) memory, and O(1) per beauty query.',
    },
  ],
};
