/**
 * Learning editorials for ICPC South Pacific Preliminaries 2024 (Level B).
 * Ordered from easiest to hardest by estimated difficulty (informed by solve counts).
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-south-pacific-2024-level-b/.
 */
const spp2024BEditorial = {
  contestId: '2024-south-pacific-prelim-b',
  title: 'ICPC South Pacific Preliminaries 2024 (Level B)',
  difficultyNote:
    'Difficulty is an educational estimate based on required observations, proof, and implementation, informed by contest solve counts.',
  problems: [
    {
      id: 'A',
      title: 'An Introduction',
      difficulty: 'Easy',
      rating: 600,
      topics: ['probability', 'implementation'],
      ascii: String.raw`100-sided die, fair faces 1..100
James rolled R

P(Janine > R) = (100 − R)% 
as an integer percentage`,
      insight:
        'Exactly the faces R+1 through 100 beat James. With one hundred equally likely faces, that is the integer 100−R.',
      analysis: [
        'Read R.',
        'Print 100−R.',
        'Edge cases: R=100 → 0, R=1 → 99.',
      ],
      complexity: 'O(1) time and O(1) memory.',
    },
    {
      id: 'C',
      title: 'Contest Strategy',
      difficulty: 'Easy',
      rating: 800,
      topics: ['implementation', 'classification'],
      ascii: String.raw`priority:
  1. easy   — solved > n/2
  2. hard   — solved < 20% of n
  3. tricky — incorrect > 2 · correct
  4. medium — otherwise

si>0: 1 correct + (si−1) incorrect
si<0: −si incorrect, 0 correct
si=0: no submissions`,
      insight:
        'Apply Jenna’s four rules in the stated priority order. Scoreboard integers encode both solves and wrong attempts directly.',
      analysis: [
        'Count solved teams (si > 0), total correct submissions (= solved), and total incorrect (sum of (si−1) for solves plus −si for failures).',
        'If 2·solved > n, print easy.',
        'Else if 5·solved < n, print hard.',
        'Else if incorrect > 2·correct, print tricky.',
        'Else print medium.',
      ],
      complexity: 'O(n) time and O(n) memory.',
    },
    {
      id: 'D',
      title: 'Delightful Stick Arrangements',
      difficulty: 'Easy',
      rating: 900,
      topics: ['construction', 'sorting', 'zigzag'],
      ascii: String.raw`sorted:  2 3 5 7 11 13 17
swap pairs: 3 2 7 5 13 11 17

every middle of a triple is a local min/max
⇒ never the median`,
      insight:
        'Same construction as Level A “Arranging Sticks”: sort, then swap adjacent pairs to force a zigzag.',
      analysis: [
        'Sort lengths ascending.',
        'For i = 1,3,5,… swap a[i] with a[i−1].',
        'Each consecutive triple then has an extreme middle value, so the median condition holds.',
      ],
      complexity: 'O(n log n) time and O(n) memory.',
    },
    {
      id: 'I',
      title: 'Iguana Gift',
      difficulty: 'Easy',
      rating: 1000,
      topics: ['strings', 'palindromes', 'brute force'],
      ascii: String.raw`s = icpc
k=1 → final icpci is a palindrome
answer 1

s = tacocat already palindrome → 0`,
      insight:
        'Try every append length k ≤ n. The only hard constraints are pairs of positions that both fall inside the original string—they must already agree.',
      analysis: [
        'For each k from 0 to n, set m = n+k.',
        'For every index i < n whose mirror m−1−i is also < n, require s[i] = s[m−1−i].',
        'The smallest k that passes is the number of characters to append.',
      ],
      complexity: 'O(n²) time with n ≤ 20 and O(n) memory.',
    },
    {
      id: 'K',
      title: 'King John IV the Builder',
      difficulty: 'Easy–Medium',
      rating: 1200,
      topics: ['brute force', 'prefix sums'],
      ascii: String.raw`K=10 bricks, costs [10,10,2,48,20]

height ℓ=3: width = ceil(10/3)=4
cost = 4·(10+10+2)=88  ← best`,
      insight:
        'A wall of height ℓ uses the same width on layers 1..ℓ. The cheapest width for that height is ceil(K/ℓ), and the cost is that width times the prefix sum of layer costs.',
      analysis: [
        'For each height ℓ from 1 to M, let width = ⌈K/ℓ⌉.',
        'Cost = width · (c1+…+cℓ).',
        'Take the minimum cost over all heights.',
      ],
      complexity: 'O(M) time and O(M) memory.',
    },
    {
      id: 'B',
      title: 'Birthday Wizard',
      difficulty: 'Easy–Medium',
      rating: 1300,
      topics: ['number bases', 'digit sum'],
      ascii: String.raw`N=51

base 2..10 digit sums; minimum is 3
(e.g. base 8: 63 → 6+3=9, base 7: 102 → 3, …)`,
      insight:
        'Candles equal the digit sum in a base between 2 and 10. Minimize that sum.',
      analysis: [
        'For each base b ∈ [2,10], compute the sum of digits of N in base b.',
        'Output the minimum.',
      ],
      complexity: 'O(log N) time and O(1) memory.',
    },
    {
      id: 'E',
      title: 'Efficient Elevators',
      difficulty: 'Medium',
      rating: 1600,
      topics: ['greedy', 'invariants'],
      ascii: String.raw`elevator descending: floor + time = constant S

Betty (t=5,f=4) and Charlie (t=6,f=3)
both have S = 9 → one elevator

distinct S values → distinct elevators`,
      insight:
        'An elevator that waits at floor W and starts down so that floor+time equals S picks up exactly the tenants with r+f = S. Different diagonals cannot share a descent.',
      analysis: [
        'For every tenant (r,f), compute the diagonal key r+f.',
        'The minimum number of elevators equals the number of distinct keys.',
        'Identical keys (even identical requests) share one elevator freely.',
      ],
      complexity: 'O(n log n) time with a set (or O(n) expected with hashing) and O(n) memory.',
    },
    {
      id: 'J',
      title: 'Jimothy the Monster Hunter',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['greedy', 'enumeration'],
      ascii: String.raw`same as Level A Crushing Monsters:

use best p potions then best (L−p) swords
potions first while HP > 0`,
      insight:
        'Identical to Level A problem C: enumerate potion/sword splits under the limit L, apply potions before swords.',
      analysis: [
        'Sort potions descending and swords descending.',
        'For each potion count p ≤ min(n,L), pair with s = min(m,L−p) swords.',
        'Multiply HP by surviving fractions, then subtract sword strengths; track the minimum.',
      ],
      complexity: 'O((n+m) log(n+m) + L·(n+m)) time and O(n+m) memory.',
    },
    {
      id: 'G',
      title: 'Grouping Words',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['graphs', 'cliques', 'enumeration'],
      ascii: String.raw`9 words, related pairs → graph
partition into 3 triangles or Impossible`,
      insight:
        'Same as Level A: enumerate partitions of nine vertices into three triangles in the relatedness graph.',
      analysis: [
        'Build the 9×9 relatedness matrix.',
        'Enumerate triples for the first group, then the second; verify the last three.',
        'Print Possible with the three groups, or Impossible.',
      ],
      complexity: 'O(1) for nine vertices.',
    },
    {
      id: 'H',
      title: 'Human Resources',
      difficulty: 'Medium–Hard',
      rating: 1900,
      topics: ['trees', 'greedy', 'covering'],
      ascii: String.raw`cover every node within distance K
along the path to the CEO

deepest-first: train the K-th ancestor
of each uncovered employee`,
      insight:
        'Same tree-covering greedy as Level A: only ancestors matter, so place trainings as high as the distance budget allows.',
      analysis: [
        'Process employees from largest depth to smallest.',
        'If uncovered, train the K-th ancestor (or the CEO).',
        'Ensure the CEO is trained if still uncovered.',
      ],
      complexity: 'O(n²) acceptable for n ≤ 300.',
    },
    {
      id: 'L',
      title: 'LLM',
      difficulty: 'Medium–Hard',
      rating: 2000,
      topics: ['probability', 'counting', 'bigrams'],
      ascii: String.raw`P(target | first letter) =
  Π P(next | prev)  ×  P(stop | last)

counts from training words + end-of-word stops`,
      insight:
        'Same Markov estimate as Level A: product of empirical bigram probabilities ending with stop.',
      analysis: [
        'Tally letter frequencies and letter→letter / letter→stop transitions.',
        'Multiply along the target, then multiply the final stop probability.',
      ],
      complexity: 'O(training length + |T|) time and O(1) memory.',
    },
    {
      id: 'F',
      title: 'Falling Blocks',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['simulation', 'connected components', 'game'],
      ascii: String.raw`same as Level A Knowledgeable AI Startup

components = contiguous runs with |Δh|≤1
die when every possible component is
crushed by the next block`,
      insight:
        'Marizzo’s reachable world splits into contiguous height-compatible intervals. Track every interval a surviving strategy could occupy; the first empty set yields the score.',
      analysis: [
        'Start with the single interval [1,W].',
        'On each falling block, update the set of possible intervals as in the Level A editorial for Knowledgeable AI Startup.',
        'Output the crushing second, or N+1 if Marizzo lasts the whole game.',
      ],
      complexity:
        'O(N · W) worst case from scanning candidate cells inside intervals.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.spp2024BEditorial = spp2024BEditorial;
