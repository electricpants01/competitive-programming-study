/**
 * Learning editorials for Maratona SBC / LatAm Sub-Regional 2025.
 * Shared by the EN and PT PDF catalog entries.
 * Ordered from easiest to hardest by estimated difficulty.
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-brazil-subregional-2025/.
 */
const brazil2025SubregionalEditorial = {
  contestId: '2025-brazil-subregional-en',
  title: 'Maratona SBC / LatAm Sub-Regional 2025',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'J',
      title: 'João João',
      difficulty: 'Easy',
      rating: 800,
      topics: ['implementation', 'counting'],
      ascii: String.raw`Difficulties seen: 1 3 4 1 3 4 1 3 4 1
Present: {1, 3, 4}
Missing: {2}
Answer = 4 - 3 = 1`,
      insight:
        'An exam needs one task of each difficulty 1–4. The answer is exactly how many of those four levels are still absent from the ten existing tasks.',
      analysis: [
        'Mark which difficulty values appear among the ten integers.',
        'Count how many of {1, 2, 3, 4} never appear.',
        'That missing count is the minimum number of new tasks to create.',
        'If every level already exists, the answer is zero.',
      ],
      complexity: 'O(1) time and O(1) memory.',
    },
    {
      id: 'A',
      title: 'A healthy menu',
      difficulty: 'Easy',
      rating: 900,
      topics: ['greedy', 'pigeonhole'],
      ascii: String.raw`Class j likes of fruits:
  fruit 1: 20
  fruit 2: 12
  fruit 3: 18
Minimum students in class j = max(20, 12, 18) = 20
School total = sum of column maxima`,
      insight:
        'Inside one class, every preference count can be explained by subsets of the students who like the most popular fruit. Therefore the class size is the column maximum, and the school size is the sum of those maxima.',
      analysis: [
        'Each student likes at least one fruit, and one student may like many fruits.',
        'In class j, if M_j students like the most popular fruit, every other fruit count is at most M_j, so those preferences can be covered by the same M_j students.',
        'M_j is also necessary because that fruit alone requires M_j distinct students.',
        'Classes are disjoint, so sum the per-class maxima.',
      ],
      complexity: 'O(NM) time and O(M) memory.',
    },
    {
      id: 'C',
      title: 'Collatz polynomial',
      difficulty: 'Easy',
      rating: 1200,
      topics: ['simulation', 'bitmasks'],
      ascii: String.raw`P = x^3 + 1   → bits [1,0,0,1]

has constant → (P·(x+1) + 1) mod 2
             → x^4 + x^3 + x
no constant  → divide by x
… after 11 steps → 1`,
      insight:
        'Coefficients live in GF(2), so multiply-by-(x+1) is XOR with a one-bit left shift. The longest chain for degree ≤ 20 is only about 101 steps, so plain simulation is enough.',
      analysis: [
        'Store the polynomial as a bitmask: bit i means coefficient of x^i.',
        'If the constant bit is set, replace the mask by mask XOR (mask<<1) XOR 1.',
        'Otherwise shift right by one (divide by x).',
        'Stop when the mask equals 1 and count the operations.',
        'Degree never grows beyond a small constant for these inputs, so a fixed-width integer or short array works.',
      ],
      complexity: 'O(steps · degree) time with a tiny constant; O(1) memory.',
    },
    {
      id: 'L',
      title: 'LLMs',
      difficulty: 'Easy–Medium',
      rating: 1400,
      topics: ['simulation', 'strings'],
      ascii: String.raw`window = last K query words
scan knowledge base for exact matches
candidates = words that follow each match

S(d) = Σ d · c_i   (dot product)
pick max S(d), tie → earlier dictionary word
if no candidates: K ← K-1`,
      insight:
        'The statement already is the algorithm: shrink the context window until some knowledge-base occurrence appears, then score dictionary words by summed inner products with the candidate successors.',
      analysis: [
        'For each query, try context lengths K, K−1, …, 1.',
        'Slide over the knowledge text and collect every word that immediately follows a match of the current window.',
        'If the candidate list is empty, decrease the window and retry; if K reaches 0, output “*”.',
        'Otherwise score every dictionary word by Σ v(d)·v(c_i), treating unknown candidates as (0,0).',
        'Choose the maximum score; break ties by dictionary order (most common first).',
      ],
      complexity: 'O(Q · K · (M·K + N·r)) time with tiny Q, K, N, M ≤ 10^3.',
    },
    {
      id: 'I',
      title: 'Cosmic Investigation',
      difficulty: 'Medium',
      rating: 1600,
      topics: ['math', 'constraints', 'alternating sums'],
      ascii: String.raw`R1 + R2 = d1
R2 + R3 = d2
R3 + R4 = d3
…

Ri = C_i + (−1)^{i−1} R1
R1 ∈ [L, R] from Ri ≥ 1
answer = max feasible R1 = R`,
      insight:
        'Touching orbits force R_i + R_{i+1} = d_i. Expressing every radius as an alternating function of R1 turns the constraints R_i ≥ 1 into a single integer interval for R1.',
      analysis: [
        'Axis-aligned consecutive stars give distances d_i = |Δx| + |Δy|.',
        'The recurrence R_{i+1} = d_i − R_i yields R_i = C_i + (−1)^{i−1} R1 with C_1 = 0 and C_{i+1} = d_i − C_i.',
        'Odd indices give lower bounds on R1; even indices give upper bounds.',
        'Take L = max lower bounds and R = min upper bounds; if L ≤ R the answer is R, else −1.',
        'The strict inequalities R_i < d_i follow automatically from R_{i+1} ≥ 1.',
      ],
      complexity: 'O(N) time and O(N) memory.',
    },
    {
      id: 'M',
      title: 'Reinforced Walls',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['binary search', 'greedy'],
      ascii: String.raw`heights: 3 4 7 8 7   K=5
reinforce index 2 (1-based):
  add 4,5,0,0,0?  staircase ends at chosen segment

Chosen i gets +K, i−1 gets +K−1, …
Need max possible minimum after one reinforcement`,
      insight:
        'Monotonicity of “can every segment reach height ≥ X?” lets us binary-search the answer. For a candidate X it is optimal to reinforce at the rightmost segment still below X.',
      analysis: [
        'Binary-search the target minimum X.',
        'To test X, find the rightmost index with current height < X and apply the staircase reinforcement ending there.',
        'If after that operation every height is ≥ X, X is feasible.',
        'Any useful reinforcement must cover the rightmost deficit; choosing farther right wastes blocks on already-tall segments.',
        'Search range is between the current minimum and that minimum plus K.',
      ],
      complexity: 'O(N log A) time and O(N) memory.',
    },
    {
      id: 'F',
      title: 'Frangolino',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['expected value', 'probability', 'modular inverse'],
      ascii: String.raw`Before command i (arg X_i):
  P(at table j) = 1_{j=1}/2^{i−1}
                 + Σ_{k<i, X_k=j} 1/2^{i−k}

Contribution: (1/2)·X_i·P(at j)
Answer mod 10^9+7 via 2^{−i}`,
      insight:
        'Each command is independently a move or an order with probability 1/2. The position before command i is the argument of the last earlier move (or table 1 if none), which has an explicit geometric probability.',
      analysis: [
        'P(last move among the first i−1 commands is k) = 2^{-(i−k)}; P(no move) = 2^{-(i−1)}.',
        'Therefore P(at j before i) expands into a sum of inverse powers of two.',
        'Linearity: ans[j] = Σ_i (X_i/2) P_i(j).',
        'Rewrite with suffix sums T_k = Σ_{i>k} X_i 2^{-i} to update each table in O(1) per command.',
        'All divisions by two become multiplications by the modular inverse of 2.',
      ],
      complexity: 'O(N + Q) time and O(N + Q) memory.',
    },
    {
      id: 'D',
      title: 'Dominoes',
      difficulty: 'Medium–Hard',
      rating: 1900,
      topics: ['Eulerian paths', 'SOS DP', 'bitmasks'],
      ascii: String.raw`Domino (a,b) = edge a—b on vertices {1..6}
Subset is winnable ⇔ the multigraph has an Eulerian path
  (0 or 2 odd degrees, connected on used vertices)

Answer for set S = #{T ⊆ S : T is winnable}
→ SOS over all 21 standard pieces`,
      insight:
        'A shuffle is winnable exactly when the tiles form a single domino chain, i.e. the number-graph has an Eulerian path. There are only 21 double-six tiles, so precompute all subsets once.',
      analysis: [
        'Map each input tile to one of the 21 possible (a,b) with a ≤ b.',
        'For every bitmask of pieces, build degrees on vertices 1…6 and test connectivity plus 0/2 odd degrees.',
        'Let win[mask] ∈ {0,1}. Use sum-over-subsets so sos[S] = Σ_{T⊆S} win[T].',
        'Each test case answers sos[mask(S)] in O(1) after O(21·2^{21}) preprocessing.',
        'The empty set contributes 0, matching the samples.',
      ],
      complexity: 'O(21·2^{21} + T·N) time and O(2^{21}) memory.',
    },
    {
      id: 'K',
      title: 'Knockout tournament',
      difficulty: 'Medium–Hard',
      rating: 2000,
      topics: ['combinatorics', '2-adic valuation', 'bit tricks'],
      ascii: String.raw`cnt(i,j) = X / 2^{i+j} · C(i+j, i)
need cnt(i,j) even for all 0≤i<A, 0≤j<B

v2(cnt) = v2(X) − (i+j) + v2((i+j)!) − v2(i!) − v2(j!)
         = v2(X) − G(i,j)
G = i+j + popcount(i+j) − popcount(i) − popcount(j)

min X = 2^{Y+1},  Y = max G`,
      insight:
        'Feasibility of an (A,B)-elimination tournament is a pure 2-adic condition on binomial counts of score pairs. The minimal player count is the least power of two whose valuation beats every G(i,j).',
      analysis: [
        'Players that ever reach score (i,j) number cnt(i,j) = X·C(i+j,i)/2^{i+j}.',
        'Every such count must be even, so v2(cnt(i,j)) ≥ 1.',
        'Legendre’s formula gives v2(n!) = n − popcount(n), which simplifies the inequality to v2(X) > G(i,j).',
        'Only pairs (i,j) near (A−1,B−1) can maximize G; a 61×61 window suffices for 64-bit A,B.',
        'Answer 2^{Y+1} modulo 10^9+7.',
      ],
      complexity: 'O(log^2 (A+B)) time and O(1) memory.',
    },
    {
      id: 'G',
      title: 'Universal Generator',
      difficulty: 'Medium–Hard',
      rating: 2100,
      topics: ['bitmasks', 'linear algebra over GF(2)', 'greedy'],
      ascii: String.raw`B = b0..b7   (b0 = MSB of the printed integer)
ops: XOR B onto C starting at offset i ∈ [−7, N−1]

piv = first 1-bit of B
enumerate subsets of i ∈ [−7,−1]
then greedy: each remaining 1 at p → apply at p−piv`,
      insight:
        'For a fixed pattern B, non-negative placements are linearly independent and uniquely determined by a pivot greedy once the finitely many negative placements are chosen. The optimal B always has LSB equal to 1.',
      analysis: [
        'XOR operations commute and are involutions, so each offset is used at most once.',
        'Enumerate all 2^7 subsets of starts in [−7,−1].',
        'Let piv be the leftmost 1 in B. Scanning left to right, every remaining 1 at position p must be cleared by the unique op that maps bit piv onto p.',
        'That forces start i = p − piv ≥ 0 after the negative choices; otherwise this subset fails.',
        'Track the minimum operation count and, on ties, the lexicographically smallest 8-bit string interpreted with b0 as MSB.',
      ],
      complexity: 'O(2^{14} · N) time and O(N) memory.',
    },
    {
      id: 'H',
      title: 'Special Skills',
      difficulty: 'Hard',
      rating: 2200,
      topics: ['SOS DP', 'bitmasks', 'combinatorics'],
      ascii: String.raw`f[mask] = #{students with exact skills mask}
F[mask] = Σ_{sub⊆mask} f[sub]     (SOS)

G[mask] = C(F[mask], 3)
        = #{triples whose union ⊆ mask}

g[mask] = exact-union count via inverse SOS
answer for query E = g[E]`,
      insight:
        'A team’s skill union is exactly mask iff all three members lie inside mask and not all three lie inside any proper submask. SOS DP converts subset counts into exact-union triple counts in O(K·2^K).',
      analysis: [
        'Count students per exact bitmask f.',
        'SOS-transform to F[mask] = number of students whose skills are ⊆ mask.',
        'Any triple inside that pool has union ⊆ mask, so G[mask] = C(F[mask], 3).',
        'Inverse SOS (inclusion–exclusion) recovers g[mask] = number of triples with union exactly mask.',
        'Answer each of the M special subsets by a direct lookup of g.',
      ],
      complexity: 'O(K(N + M + 2^K)) time and O(2^K) memory.',
    },
    {
      id: 'B',
      title: 'Baralho Alho',
      difficulty: 'Hard',
      rating: 2300,
      topics: ['permutations', 'cycles', 'KMP', 'CRT'],
      ascii: String.raw`P decomposes into cycles
On a cycle of length L:
  A[c_i] must equal B[c_{(i+k) mod L}]
→ k ≡ r (mod step) via cyclic string match

Combine congruences with CRT
if LCM > 10^9 → DEMAIS / check residue`,
      insight:
        'Shuffling is iterating a fixed permutation. Each cycle independently constrains the number of shuffles k by a modular condition obtained from cyclic matching of the card values; CRT merges them.',
      analysis: [
        'After k shuffles, A[i] must equal B[P^k(i)] for every position i.',
        'Break P into cycles. On a cycle, the arrays of A-values and B-values must be rotations of each other; find all valid offsets with KMP on the doubled string.',
        'Those offsets form an arithmetic progression, i.e. one congruence k ≡ r (mod step).',
        'If any cycle has no rotation match, print IMPOSSIVEL.',
        'Merge congruences with non-coprime CRT. If the combined modulus exceeds 10^9, only the current residue ≤ 10^9 can be reported; otherwise print DEMAIS.',
      ],
      complexity: 'O(N) matching plus near-O(ω) CRT work; O(N) memory.',
    },
    {
      id: 'E',
      title: 'Road expansion',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['trees', 'graph square', 'leaf peeling'],
      ascii: String.raw`G should equal T^2 for some tree T
leaf of T ⇔ neighborhood in G is a clique

Peel leaves:
  N(f) = F ∪ I
  F = same-degree clique neighbors (sibling leaves)
  I = internal neighbors → parent rules by |I|

Finally verify every closed T-ball of radius 2
matches the closed G-neighborhood`,
      insight:
        'Squares of trees are chordal graphs whose leaves are exactly the vertices with clique neighborhoods. Peeling those leaves reconstructs parent pointers; any candidate tree must then be verified against G.',
      analysis: [
        'If G is complete, any star works because every distance-2 pair is already edged.',
        'Otherwise repeatedly find alive vertices whose neighborhood is a clique.',
        'Split neighbors into sibling-leaf set F and internal set I and infer the parent from the |I| cases in the official editorial (star center when |I|≥3, unique internal when |I|=1, tie-break when |I|=2).',
        'Connect the whole leaf group to that parent and delete the leaves.',
        'When two vertices remain, connect them. Accept the edge list only if for every vertex the radius-2 ball in T equals its closed neighborhood in G; otherwise output “*”.',
      ],
      complexity: 'O(Σ deg^2) clique tests in the worst case, O(N+M) verification; O(N+M) memory.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.brazil2025SubregionalEditorial = brazil2025SubregionalEditorial;
