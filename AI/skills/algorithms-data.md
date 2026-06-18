# Skill: Algorithms Data Format & Content Conventions

How the algorithm topic data is structured in `public/algorithms-data-en.js` and
`public/algorithms-data-es.js`, and rules for adding or editing topics.

---

## File Structure

The data files are **language-specific plain JS** files, one per locale:

```
public/
  algorithms-data-en.js   ← English topics
  algorithms-data-es.js   ← Spanish topics
```

Each file exports a global `algorithmsData` object and a `sidebarSections` array.
They are loaded in the guide page with `is:inline` + `BASE_URL` prefix:

```astro
<script is:inline src={`${base}algorithms-data-${lang}.js`}></script>
```

---

## Topic Object Schema

```js
const algorithmsData = {
  "topic-id": {
    title: string,                  // display name
    category: string,               // sidebar section label
    difficulty: string,             // e.g. "Beginner", "Intermediate to Advanced"
    timeToLearn: string,            // e.g. "1 week", "3-5 days"
    importance: string,             // "Essential" | "High" | "Intermediate"
    description: string,            // 2-4 sentence summary of the topic
    asciiArt: string,               // visual diagram using ASCII (template literal)
    keyTechniques: string[],        // 4-6 bullet techniques
    benefits: string[],             // 3 bullets: why this topic matters
    typicalConstraints: string[],   // n bounds, edge cases
    examples: [                     // 1-3 code examples
      {
        title: string,
        description: string,
        codeSnippet: string,        // C++ code (template literal)
      },
    ],
    bestPractices: string[],        // 3 actionable tips
    problems: string[],             // 3 practice problems (Leetcode / Codeforces)
    quiz: [                         // 5-8 multiple-choice questions
      {
        q: string,                  // question text
        options: string[],          // 4 answer choices
        answer: number,             // 0-indexed correct answer index
      },
    ],
  },
};
```

---

## Sidebar Navigation Structure

```js
const sidebarSections = [
  {
    label: "SECTION LABEL",        // uppercase, matches category field
    items: [
      { id: "topic-id", title: "Display Title" },
    ],
  },
];
```

**Rule:** Every topic ID in `algorithmsData` must appear in exactly one `sidebarSections`
item. Orphaned topics will not appear in the sidebar.

---

## Topic ID Convention

- Use `kebab-case` matching the sidebar item `id`
- Stable across EN and ES files (same keys in both files)
- Examples: `"complexity-analysis"`, `"dp-1d"`, `"bitmask-dp"`, `"union-find"`

---

## Code Example Conventions

- Language: **C++** (preferred) or Python if explicitly noted
- Template literals use backtick delimiters — escape any backticks inside with `\``
- Each topic should have **at least 2 code examples** covering:
  1. The core template / canonical implementation
  2. A more advanced variant or a common problem pattern
- Comments in code should explain *why*, not just *what*
- Include complexity analysis in a comment at the bottom if not obvious

### Example structure template:

```js
{
  title: "Descriptive Title",
  description: "One-line summary of what this example demonstrates",
  codeSnippet: `// Comments explain key decisions
struct MyDS {
  // ...
};`,
},
```

---

## Quiz Conventions

- 5 questions minimum, 8 maximum per topic
- Each question has exactly 4 answer options
- `answer` is the **0-indexed** position of the correct option
- Questions should test understanding, not just recall:
  - ✅ "Why do we iterate capacity backwards in 0/1 knapsack?"
  - ❌ "What is the definition of a knapsack?"
- Cover a mix of: complexity, correctness, edge cases, comparisons

---

## Content Quality Checklist for Each Topic

When adding or editing a topic, verify:

- [ ] `description` explains the core idea in 2-4 sentences
- [ ] `asciiArt` has a visual that would help a student understand the concept
- [ ] `keyTechniques` lists the most important variants (not just the basics)
- [ ] At least 2 `examples` with working, compilable C++ code
- [ ] `bestPractices` includes at least one common pitfall to avoid
- [ ] `problems` includes at least one Codeforces and one Leetcode problem
- [ ] `quiz` has ≥ 5 questions covering complexity, correctness, and edge cases
- [ ] **Both EN and ES files are updated together** — never update one without the other

---

## Adding a New Topic

1. Add the topic object to `algorithms-data-en.js`
2. Translate and add to `algorithms-data-es.js` (same structure, translated strings)
3. Add a sidebar entry to `sidebarSections` in **both** files
4. Assign the correct `category` matching an existing sidebar section label
5. The topic ID must match between both files and the sidebar entry

---

## Translation Rules (EN → ES)

Translate:
- `title`, `category`, `description`, `asciiArt` (labels only, keep code as-is)
- `keyTechniques`, `benefits`, `typicalConstraints`, `bestPractices`
- `problems` (keep problem names/links, translate descriptions if present)
- `quiz` — all `q` and `options` strings

Do NOT translate:
- Topic IDs (object keys)
- Code inside `codeSnippet` (C++ code stays in English)
- Variable names, function names, or technical terms inside code comments
- Complexity notation (O(n log n), etc.)

---

## Known Issue: Bitmask DP Examples Array

The `bitmask-dp` topic in `algorithms-data-en.js` currently has a **duplicate `examples` key**
that was introduced during an incremental edit. The second `examples: [...]` array (containing
an empty inline IIFE) overwrites the first one containing the TSP code example.

**Fix:** Merge both into a single `examples` array with two entries:
1. TSP with Bitmask DP (existing)
2. SOS DP + Submask Enumeration (to be added)

This also needs to be applied to `algorithms-data-es.js`.

---

## Topics Currently Missing Advanced Examples

The following topics have only one code example and need a second:

| Topic | Missing Example |
|-------|----------------|
| `bitmask-dp` | SOS DP + submask enumeration O(3ⁿ) |
| `segment-tree` | Lazy propagation (range add + range sum) |
| `modular-arithmetic` | Extended Euclidean + O(n) linear inverse precomputation |
| `sieve` | Linear sieve O(n) + Euler's totient φ(n) |
| `combinatorics` | Catalan numbers + Derangements recurrence |

---

## Sections Currently in Sidebar

| Label | Topics |
|-------|--------|
| OVERVIEW | introduction, learning-path, assessment |
| FUNDAMENTALS | complexity-analysis, arrays-strings, stl-guide |
| ALGORITHMS | two-pointers, sliding-window, binary-search, sorting |
| GRAPH THEORY | bfs, dfs, dijkstra, union-find |
| DYNAMIC PROGRAMMING | dp-1d, dp-2d, knapsack, bitmask-dp |
| TREES & ADVANCED | segment-tree, fenwick-tree, trie |
| MATHEMATICS | modular-arithmetic, sieve, combinatorics |