/**
 * Learning editorials for Maratona SBC Fase Zero 2025.
 * Ordered from easiest to hardest by estimated difficulty
 * (informed by contest solve rates and required technique).
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-fase-zero-2025/.
 */
const faseZero2025Editorial = {
  contestId: '2025-fase-zero-br',
  title: 'Maratona SBC Fase Zero 2025',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'A',
      title: 'Ambiguous Schrödinger Cat',
      difficulty: 'Easy',
      rating: 800,
      topics: ['implementation', 'casework'],
      ascii: String.raw`C = box closed?   G = cat alive?

C = 1  →  superposition → "vivo e morto"
C = 0  →  observe G    → "vivo" or "morto"`,
      insight:
        'While the box is closed the cat is unobservable, so the answer is always the superposition phrase. Opening the box collapses the state to the given bit G.',
      analysis: [
        'Read two bits C and G.',
        'If C = 1, print "vivo e morto" regardless of G.',
        'If C = 0, print "vivo" when G = 1 and "morto" when G = 0.',
        'The privileged G value is only meaningful after the box opens.',
      ],
      complexity: 'O(1) time and O(1) memory.',
    },
    {
      id: 'D',
      title: 'Quantum Decoherence',
      difficulty: 'Easy',
      rating: 900,
      topics: ['strings', 'ratios'],
      ascii: String.raw`S (isolated):  0 * 1 * * 1 0 0 * 1
T (normal):    0 1 1 0 * 1 0 0 * 1
                 ^   ^ ^       ^
superpositions in S: 4
collapsed in T:      2
rate = 2/4 = 0.50`,
      insight:
        'Decoherence rate is the fraction of isolated superpositions that are no longer superpositions under normal conditions.',
      analysis: [
        'Count how many positions have S[i] = \'*\'. Call this total.',
        'Among those positions, count how many have T[i] ≠ \'*\'. Call this collapsed.',
        'Print collapsed / total with exactly two decimal places.',
        'Non-superposed bits of S are guaranteed identical in T, so they never affect the ratio.',
      ],
      complexity: 'O(n) time and O(1) extra memory.',
    },
    {
      id: 'L',
      title: 'qPhones Production Line',
      difficulty: 'Easy',
      rating: 1000,
      topics: ['bit tricks', 'logarithms'],
      ascii: String.raw`M megabytes → M · 8_000_000 classical bits

Need smallest k with  2^k  ≥  M · 8_000_000

M = 1  →  8e6  →  2^23 = 8388608  →  k = 23
M = 17 → 1.36e8 → 2^28           →  k = 28`,
      insight:
        'Simulating q qubits needs 2^q classical bits. Convert megabytes to bits, then take the ceiling of log₂.',
      analysis: [
        'One megabyte is defined as 10^6 bytes = 8·10^6 bits.',
        'Required bits = M · 8_000_000, which fits in 64-bit integers for M ≤ 10^10.',
        'Answer is the smallest k ≥ 0 with (1ULL << k) ≥ bits, or equivalently ceil(log2(bits)).',
        'Handle the edge carefully when bits is not a power of two: use bit_width / __lg style ceiling.',
      ],
      complexity: 'O(1) or O(log bits) time and O(1) memory.',
    },
    {
      id: 'C',
      title: 'Matrix Logic Circuits',
      difficulty: 'Easy–Medium',
      rating: 1400,
      topics: ['bitmasks', 'permutations', 'simulation'],
      ascii: String.raw`CCNOT / CNOT are permutation matrices

State i  --gate-->  i  or  i XOR (1<<t)
(only when control bits are set)

Compose M gates on all 2^N basis states:
  ans[i] := gate(ans[i])`,
      insight:
        'Every CNOT/CCNOT is a permutation of the 2^N computational-basis states. Multiplying gates is composition of permutations, not dense matrix multiplication.',
      analysis: [
        'N ≤ 8 so there are at most 256 basis states.',
        'Maintain array p[0..2^N−1] where p[i] is the image of basis state i under the circuit so far (initially identity).',
        'CNOT(c,t) is CCNOT(c,c,t). For each state, if both controls are on, flip bit t.',
        'Applying a gate replaces p[i] with gate(p[i]) for every i (composition in application order).',
        'Print the permutation matrix: row i has a single 1 in column p[i].',
      ],
      complexity: 'O(M · 2^N) time and O(2^N) memory.',
    },
    {
      id: 'H',
      title: 'Binary Palindromic Harmony',
      difficulty: 'Medium',
      rating: 1600,
      topics: ['bitmasks', 'greedy', 'binary representation'],
      ascii: String.raw`X = 11 = 1011_2  →  Y = 9 = 1001_2
X = 154 = 10011010_2 → Y = 153 = 10011001_2

If X is a power of two (>1): Y = X − 1 (all ones)
Else: same bit-length palindrome, greedily set mirrored bits`,
      insight:
        'The largest binary palindrome ≤ X either drops to the previous all-ones string (when X is a power of two) or keeps the same MSB and mirrors a greedily chosen lower half.',
      analysis: [
        'If X = 1 the answer is 1.',
        'If X is a power of two greater than 1, X itself is 1 followed by zeros (not a palindrome) while X−1 is all ones (a palindrome).',
        'Otherwise some number with the same most-significant bit is a palindrome (at least 2^msb + 1).',
        'Build Y bit by bit from high to low: whenever setting bit k (and its mirror) keeps Y ≤ X, set both.',
        'Mirroring enforces the palindrome constraint automatically.',
      ],
      complexity: 'O(log X) time and O(1) memory.',
    },
    {
      id: 'J',
      title: 'Journey of the Particles',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['stacks', 'circular arrays', 'monotonic stack'],
      ascii: String.raw`Start at i with phase = A_i
Each pass: if phase > A_j stop, else phase += K, go right

Linear rewrite:
  Y_p = A_p − K·p
  stop at first j with Y_i > Y_j

Circular: simulate length 2N on unfolded ring`,
      insight:
        'After rewriting thresholds as Y_p = A_p − K·p, the particle starting at i is caught by the next strictly smaller Y. The circle is handled by unfolding two laps.',
      analysis: [
        'On a line, after t = j−i steps the phase is A_i + K·t, and filtering at j means A_i + K(j−i) > A_j, i.e. Y_i > Y_j.',
        'Scan left to right with a monotonic stack of increasing Y values; when the current Y is smaller, it catches every larger Y on the stack.',
        'Because K > 0, after at most N steps the particle returns to its start with a strictly larger phase and must be filtered, so answers always exist.',
        'Unfold the circle to indices 0..2N−1, run the stack once, and map catch positions back modulo N.',
      ],
      complexity: 'O(n) time and O(n) memory.',
    },
    {
      id: 'I',
      title: 'Inspecting the Entanglement',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['dynamic programming', 'prefix sums'],
      ascii: String.raw`Time:  1  2  3  4  5
Use sensor i on a block [L,U] long,
then switch to a different sensor.

dp[i][t] = best starting sensor i at time t
         = max over len∈[L,U] of
             sum(i,t..t+len−1) + bestOther(t+len)`,
      insight:
        'Segment the timeline into contiguous sensor blocks of length in [L, U]. DP over (sensor, start time) with prefix sums and a “best other sensor” summary is enough.',
      analysis: [
        'Let f(i, t) be the maximum reliability of a schedule that starts at time t using sensor i (or 0 if t = T+1).',
        'Choose a block length ℓ ∈ [L, U] with t+ℓ−1 ≤ T, take the prefix sum of sensor i on that block, then continue from t+ℓ with any sensor ≠ i.',
        'Precompute prefix sums so each block sum is O(1).',
        'After computing all f(*, t′) for t′ > t, store the top two values at each time so “best other sensor” is O(1).',
        'If no full cover of [1, T] exists, answer −1; otherwise max over i of f(i, 1).',
      ],
      complexity: 'O(n · T²) time and O(n · T) memory.',
    },
    {
      id: 'F',
      title: 'Feynman Memorizing Numbers',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['dynamic programming', 'counting', 'knapsack'],
      ascii: String.raw`Choose 4 distinct indices, sum = q

0/1 knapsack on count of picks:
  dp[k][s] = ways to pick k numbers summing to s

k = 0..4, s shifted into [0..8000]
(|a_i| ≤ 1000 ⇒ |sum of 4| ≤ 4000)`,
      insight:
        'With only four elements in each tuple, a classic 0/1 knapsack on the number of chosen elements precomputes every attainable sum.',
      analysis: [
        'Shift sums by +4000 so indices are non-negative.',
        'Initialize dp[0][offset] = 1.',
        'For each array value, update layers from k = 3 down to 0 so each element is used at most once.',
        'After processing all n elements, answer query q as dp[4][q + offset].',
        'n ≤ 1000 and four layers keep the DP comfortably fast; maps also work but arrays are simpler.',
      ],
      complexity: 'O(n · 4 · Σ) time with Σ ≈ 8000, and O(Σ) memory.',
    },
    {
      id: 'E',
      title: 'Particle Energization',
      difficulty: 'Medium–Hard',
      rating: 1900,
      topics: ['number theory', 'GCD', 'divisors'],
      ascii: String.raw`X ← 1, step = gcd(X, Y)
X ← X + step, repeat K times

step always divides Y and only grows
(multiplies by ≥ 2 factors over time)

Jump to next position where gcd increases,
or finish remaining steps with constant step`,
      insight:
        'The moving GCD is always a divisor of Y and is non-decreasing. Between jumps the particle advances by a fixed step, so large K can be skipped in closed form.',
      analysis: [
        'Factor Y and list all positive divisors.',
        'While K > 0, let P = gcd(X, Y). Among divisors D > P, the earliest X′ > X that is a multiple of lcm(P, D) is the next place P can grow.',
        'Reaching X′ takes T = (X′ − X) / P steps. If T ≥ K, finish with X + K·P.',
        'Otherwise subtract T from K, move to X′, and repeat. P gains a new prime factor each jump, so there are O(log Y) phases.',
        'An equivalent view: P is multiplied by the smallest prime factor of Y/P after (p−1) steps of size P.',
      ],
      complexity: 'O(√Y + σ(Y) log Y) time and O(σ(Y)) memory.',
    },
    {
      id: 'B',
      title: 'Periodic Search',
      difficulty: 'Hard',
      rating: 2200,
      topics: ['KMP', 'prefix function', 'trees', 'automaton'],
      ascii: String.raw`Rooted tree, edge labels a..z
String at node = labels root → node

Minimal period P of s (|s|≥1):
  k = |s| − π_|s|−1
  if |s| % k == 0 and |s|/k ≥ 2 → P = k
  else P = 0

Answer = max P over all nodes`,
      insight:
        'Path strings form a tree of growing prefixes. Maintain the KMP prefix function along a DFS using a 26-letter automaton so each edge is processed in O(1) amortized O(alphabet) time.',
      analysis: [
        'Naive online KMP on a deep skewed tree can degrade because of the while-loop fail links.',
        'Build the KMP automaton transition aut[state][c] while descending, then π grows as π′ = aut[π][c].',
        'On DFS enter, append the edge character and update π; on exit, roll back the string/automaton state.',
        'Convert each node’s π into its minimal period with the standard compressibility criterion, tracking the global maximum.',
        'Root (empty string) contributes period 0.',
      ],
      complexity: 'O(26 · n) time and O(26 · n) memory.',
    },
    {
      id: 'G',
      title: 'Grover and His Special Paths',
      difficulty: 'Hard',
      rating: 2400,
      topics: ["Hall's theorem", 'backtracking', 'trees', 'construction'],
      ascii: String.raw`Values in {1..5}, exact counts cnt[x]
Special paths must be strictly increasing
⇒ path length ≤ 5, else impossible

Enumerate assignments on path vertices,
then check remaining vertices via Hall:
  for every nonempty S ⊆ {1..5}:
    cnt(S) ≤ #vertices that touch S`,
      insight:
        'Vertices on special paths are few and highly constrained; brute-force their values, then Hall’s marriage theorem decides whether the leftover count vector is realizable.',
      analysis: [
        'If any special path has more than 5 vertices, answer −1 immediately.',
        'Collect the ≤ 5·5 vertices that appear on special paths and backtrack over feasible labels consistent with path monotonicity and per-vertex option lists.',
        'Subtract used labels from cnt[]. For the remaining vertices, Hall’s condition on all 2^5−1 subsets of values is necessary and sufficient for a perfect assignment.',
        'If Hall passes, greedily assign remaining vertices any legal leftover values (or run a tiny matching).',
        'P ≤ 5 keeps the backtracking branching factor manageable.',
      ],
      complexity:
        'O(5^{|pathVerts|} · 2^5 · n) worst case, practical for the given limits.',
    },
    {
      id: 'M',
      title: 'Spooky Movement at a Distance',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['number theory', 'Möbius transform', 'updates'],
      ascii: String.raw`Nonempty subsequences of A (order fixed by indices)
Beauty = gcd of chosen values

#subseq with gcd == x  via:
  cnt[d] = # of A_i divisible by d
  f[d] = 2^{cnt[d]} − 1   (gcd divisible by d)
  Möbius / zeta inversion → exact gcd = x

Updates: add/remove one A_i on all its divisors`,
      insight:
        'Every nonempty subset of positions is a trajectory. Counting by gcd uses divisor zeta values 2^{cnt[d]}−1 and a multiple Möbius transform, maintained under point updates.',
      analysis: [
        'For each d, cnt[d] counts elements divisible by d. Exactly 2^{cnt[d]}−1 nonempty subsets have gcd divisible by d.',
        'Invert along multiples (multiple Möbius) to obtain the number of subsets whose gcd equals d exactly.',
        'Probability for query X is ans[X] / (2^n − 1) modulo 998244353.',
        'On update A_i : old → new, subtract old’s divisor contributions and add new’s, repairing ans[] only on divisors of the changed values.',
        'Precompute divisors and prime divisors up to 10^5; each update touches a small product of those lists.',
      ],
      complexity:
        'O(A_max log log A_max + (n+q) · D²) with D = number of divisors of the updated value.',
    },
    {
      id: 'K',
      title: 'K Missing Elements',
      difficulty: 'Very Hard',
      rating: 3200,
      topics: ['K shortest paths', 'DAG', 'Eppstein', 'LIS'],
      ascii: String.raw`Increasing index+value subsequences
Weight = sum of B on chosen positions

C = all such weights, sorted descending
Output first K entries (−1 if missing)

Model as longest paths S → … → T on a DAG,
then take the K heaviest paths (Eppstein)`,
      insight:
        'Every increasing subsequence is a path in the DAG of positions with edges i→j when i<j and A_i<A_j. The K largest weights are the K longest S–T paths.',
      analysis: [
        'Add source edges S→i of weight B_i and sink edges i→T of weight 0.',
        'A dense DAG has Θ(n²) edges; block/tensor decomposition on index and value reduces edges toward O(n^{4/3}) while preserving exactly the increasing transitions.',
        'Negate weights and run a DAG-optimized Eppstein K-shortest-paths algorithm (topo potentials instead of Dijkstra).',
        'Emit path weights in non-increasing order; pad with −1 when fewer than K subsequences exist (at most 2^n−1).',
        'A simpler educational fallback keeps the top K arrivals at each node in topo order (O(n² K) style) and is fine for small n.',
      ],
      complexity:
        'Intended O(n^{4/3} log n + K log K); simpler top-K DP is O(n² K) worst case.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.faseZero2025Editorial = faseZero2025Editorial;
