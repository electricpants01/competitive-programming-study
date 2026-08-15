/**
 * Learning editorials for ICPC North America Qualifier 2023.
 * Ordered from easiest to hardest by estimated difficulty.
 * C++ implementations intentionally live outside public/ in
 * solutions/icpc-naq-2023/.
 */
const naq2023Editorial = {
  contestId: '2023-naq',
  title: 'ICPC North America Qualifier 2023',
  difficultyNote:
    'Difficulty is an educational estimate based on the required observations, proof, and implementation.',
  problems: [
    {
      id: 'F',
      title: 'Is Y a Vowel?',
      difficulty: 'Easy',
      rating: 800,
      topics: ['implementation', 'counting'],
      ascii: String.raw`word:  a s d f i y
aeiou: ^       ^     -> 2
+ y:   ^       ^   ^ -> 3`,
      insight:
        'Count letters in {a,e,i,o,u} once, then add the number of y characters for the second answer.',
      analysis: [
        'Scan the string once.',
        'Increment the first counter on a, e, i, o, or u.',
        'The second counter is the first counter plus the number of y letters.',
      ],
      complexity: 'O(|s|) time and O(1) memory.',
    },
    {
      id: 'G',
      title: 'Lines Per Hour',
      difficulty: 'Easy',
      rating: 900,
      topics: ['greedy', 'sorting'],
      ascii: String.raw`budget = 5 * lph = 500
sorted loc: 19 20 30 35 84 98 117 ...
prefix:     19 39 69 104 188 286 403
403 <= 500, next exceeds -> 7 problems`,
      insight:
        'The team can write a fixed number of lines in five hours, so the optimal set is the cheapest problems by line count.',
      analysis: [
        'The total line budget is 5 · lph.',
        'Sort candidate problems by required lines ascending.',
        'Take problems in that order until the next one would exceed the budget.',
      ],
      complexity: 'O(n log n) time and O(n) memory.',
    },
    {
      id: 'L',
      title: 'Water Journal',
      difficulty: 'Easy',
      rating: 1000,
      topics: ['casework', 'implementation'],
      ascii: String.raw`known: 1 2 3 4    claimed min=1 max=5
has min? yes
has max? no  -> missing day must be 5

known: 1 2 4 5    claimed min=1 max=5
has both extremes -> missing day can be any of 1..5`,
      insight:
        'The forgotten day must restore any missing extreme among {a, b}, and otherwise may be any value in [a, b].',
      analysis: [
        'Scan the n−1 known entries and record whether a and b already appear.',
        'If neither extreme appears, the only hope is a = b, and the missing value is a.',
        'If exactly one extreme is missing, the forgotten day must equal that extreme.',
        'If both extremes already appear, every integer in [a, b] is valid.',
        'Otherwise Eugene’s memory is inconsistent and the answer is −1.',
      ],
      complexity: 'O(n + (b − a)) time and O(b − a) memory for the output list.',
    },
    {
      id: 'H',
      title: 'Magnesium Supplementation',
      difficulty: 'Easy',
      rating: 1200,
      topics: ['number theory', 'divisors'],
      ascii: String.raw`n = 6, k = 6, p = 4

dose d | n, d <= k, pills = n/d <= p
  d=1 pills=6 > 4  reject
  d=2 pills=3 <= 4  accept
  d=3 pills=2 <= 4  accept
  d=6 pills=1 <= 4  accept`,
      insight:
        'Every legal prescription is a divisor d of n used as the common pill dose, with d ≤ k and n/d ≤ p.',
      analysis: [
        'Enumerate all positive divisors of n in O(√n) time.',
        'Keep divisor d when d ≤ k and the required pill count n/d is at most p.',
        'Sort the surviving doses and print them.',
        'Constraints reach 10^11, so use 64-bit integers throughout.',
      ],
      complexity: 'O(√n) time and O(number of divisors) memory.',
    },
    {
      id: 'A',
      title: 'Contest Advancement',
      difficulty: 'Easy–Medium',
      rating: 1300,
      topics: ['greedy', 'simulation'],
      ascii: String.raw`rank order, school limit c = 3, advance k = 7

school 9: take 3,1,4   (5 overflows)
school 7: take 9,2,6   (7 overflows)
school 5: take 8,10

first-pass list has 8 teams -> keep first 7`,
      insight:
        'Prefer higher-ranked teams while respecting the per-school soft cap, then fill any remaining slots from the overflow list in rank order.',
      analysis: [
        'Scan teams from best rank to worst.',
        'If the team’s school still has fewer than c selected teams, select it; otherwise park it in an overflow list.',
        'If more than k teams were selected under the soft cap, keep only the best k.',
        'If fewer than k were selected, append overflow teams in the order they appeared until k teams are chosen.',
      ],
      complexity: 'O(n) time and O(n) memory.',
    },
    {
      id: 'I',
      title: 'Missing Number',
      difficulty: 'Medium',
      rating: 1600,
      topics: ['strings', 'parsing', 'brute force'],
      ascii: String.raw`string: 8 9 11 12
         ^ ^  ^  ^
written range [8,12] with 10 removed

Try leading length d=1..5
  leading value X = a      -> allow exactly one gap
  leading value X = a+1    -> a is missing, no further gaps`,
      insight:
        'The string begins with either a or a+1, so every plausible leading integer determines a unique parse with exactly one gap.',
      analysis: [
        'Try every leading digit length from 1 to 5 that forms a valid integer X without leading zeros.',
        'Parse the whole string as consecutive integers starting at X while skipping exactly one value; record that value if the parse consumes the string and a < b.',
        'Also try the interpretation where X = a+1: force a = X−1 to be missing and parse the remainder with no additional gaps.',
        'Collect all valid missing values in a set and print them sorted.',
      ],
      complexity: 'O(|s|) time per test after a constant number of leading-length tries; total O(Σ|s|) over all tests.',
    },
    {
      id: 'B',
      title: 'Digit Translation',
      difficulty: 'Medium',
      rating: 1700,
      topics: ['string DP', 'shortest path counting'],
      ascii: String.raw`t w o n e
├─two─┤n e  -> "2ne"
t w ├─one─┤  -> "tw1"

both length 3; two distinct strings`,
      insight:
        'Each operation replaces a digit-word by one character, so an optimal result is a partition of the string into digit-words and single letters minimizing the number of parts.',
      analysis: [
        'Let best[i] be the shortest result length for the prefix of length i, and ways[i] the number of distinct results of that length modulo 9302023.',
        'From position i, either keep s[i] as one character, or match any of the ten English digit words starting at i and pay one character for the digit.',
        'Digit characters never recreate letter-words, so every minimal partition corresponds to exactly one distinct output string.',
        'Transitions run in O(1) per digit word, and the longest word has length five.',
      ],
      complexity: 'O(|s|) time and O(|s|) memory.',
    },
    {
      id: 'D',
      title: 'Garden of Thorns',
      difficulty: 'Medium',
      rating: 1800,
      topics: ['computational geometry', 'expected value'],
      ascii: String.raw`garden [0,w]×[0,h]
plant at P, radius r

P(protected) = area( garden ∩ disk(P,r) ) / (w·h)
E[value] = Σ v_i · P_i`,
      insight:
        'Linearity of expectation reduces the problem to, for each plant, the area of the garden rectangle clipped to an open disk of radius r.',
      analysis: [
        'The boundary of the disk has measure zero, so open and closed disks give the same area.',
        'Translate each plant to the origin; the garden becomes a shifted axis-aligned rectangle.',
        'Integrate chord heights of the circle over the clipped x-range using the antiderivative ½(x√(r²−x²)+r² arcsin(x/r)).',
        'Split the x-range at breakpoints where the chord hits the rectangle’s horizontal edges so each piece has a constant clipping configuration.',
        'Sum v_i · area_i / (w·h).',
      ],
      complexity: 'O(n) time with a constant number of breakpoints per plant, and O(1) memory.',
    },
    {
      id: 'E',
      title: 'ICPC Team Generation',
      difficulty: 'Medium',
      rating: 1900,
      topics: ['dynamic programming', 'matching'],
      ascii: String.raw`ranks: 1 2 3 4 5 6
prefs: [1,2][1,2][2,5][2,6][2,6][5,6]

valid triple example: (3,4,5)
dp[i] = max teams among ranks 1..i`,
      insight:
        'With n ≤ 50, maximum disjoint valid triples can be computed by DP on the highest-ranked member of each team.',
      analysis: [
        'A triple (i,j,k) with i < j < k is legal when each person’s interval contains the other two ranks.',
        'Let dp[i] be the maximum number of teams using only people with ranks ≤ i.',
        'Either leave i unused (dp[i] = dp[i−1]), or form a team (x,y,i) and take dp[x−1] + 1.',
        'Monotonicity of the preference intervals is not required for correctness of this DP, but it reduces the number of valid triples in practice.',
      ],
      complexity: 'O(n³) time and O(n) memory.',
    },
    {
      id: 'C',
      title: 'Don’t Hunger Together',
      difficulty: 'Medium–Hard',
      rating: 2100,
      topics: ['binary search', 'greedy', 'priority queue'],
      ascii: String.raw`day1: q=4 expires night2
day2: q=3 expires night2
k=1 players

nights need x each
best split: 3.5 + 3.5 = 7`,
      insight:
        'Feasibility is monotone in the per-player nightly demand x, so binary search works; each check greedily spends soonest-expiring food.',
      analysis: [
        'If any night is covered by zero total scavenged food, no positive x works and the answer is −1.',
        'Otherwise binary search the maximum x.',
        'For a candidate x, process turns in order: add that day’s food batch tagged by its expiry night, then feed k·x units using a min-heap ordered by expiry.',
        'Discard expired batches before eating; fail if the night cannot be fully fed.',
        'Floating answers are accepted within absolute or relative error 10⁻⁹.',
      ],
      complexity: 'O(n log n · I) time for I binary-search iterations (I ≈ 100) and O(n) memory.',
    },
    {
      id: 'J',
      title: 'Tip of Your Tongue',
      difficulty: 'Hard',
      rating: 2300,
      topics: ['trie', 'hashing', 'strings'],
      ascii: String.raw`AND p s = both
OR  p s = pref + suf − both
XOR p s = pref + suf − 2·both

|p| = |s| = L
store, for every word and every L ≤ |w|,
the pair (prefix_L, suffix_L)`,
      insight:
        'Prefix counts and suffix counts come from two tries; the AND count is a frequency map over (prefix, suffix) pairs of equal length.',
      analysis: [
        'Insert every dictionary word into a forward trie and its reverse into a suffix trie; each node stores how many words pass through it.',
        'For every word and every length L ≤ |w|, increment a hash map entry keyed by the double hash of (prefix L, suffix L). Total map entries equal the sum of word lengths.',
        'A query reads pref = trie(p), suf = trie(reverse(s)), and both from the map.',
        'Combine them with inclusion-exclusion according to AND / OR / XOR.',
      ],
      complexity: 'O(total characters) time and memory to build; O(|p|) time per query.',
    },
    {
      id: 'K',
      title: 'Very Important Edge',
      difficulty: 'Hard',
      rating: 2500,
      topics: ['MST', 'DSU on tree', 'graphs'],
      ascii: String.raw`MST weight W
delete non-tree edge -> still W
delete tree edge e:
  W' = W − w(e) + repl(e)

repl(e) = lightest edge across the cut
answer = max W'`,
      insight:
        'Only deleting an MST edge can increase the MST weight, and the increase equals the gap to that edge’s cheapest replacement across its fundamental cut.',
      analysis: [
        'Compute any MST and its total weight W.',
        'Root the MST and, for every non-tree edge in increasing weight order, assign that weight as the replacement for every still-unassigned tree edge on the unique tree path (DSU / jump pointers toward the root).',
        'The first assignment each tree edge receives is its minimum replacement.',
        'The answer is the maximum of W and W − w(e) + repl(e) over MST edges e.',
        'The input graph is 2-edge-connected, so every tree edge has a finite replacement.',
      ],
      complexity: 'O(m log m) time and O(n + m) memory.',
    },
  ],
};

window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.naq2023Editorial = naq2023Editorial;
