import type { Translations } from './types';

export const en: Translations = {
  lang: 'en',

  nav: {
    brand: 'CP Study Guide',
    overview: 'Overview',
    algorithms: 'Algorithms',
    roadmap: 'Roadmap',
    tools: 'Tools',
    searchPlaceholder: 'Search algorithms… (⌘K)',
    toggleTheme: 'Toggle light/dark mode',
    langLabel: 'EN',
  },

  sidebar: {
    title: 'Navigation',
    progress: (pct) => `${pct}% Complete`,
    sections: {
      OVERVIEW: 'OVERVIEW',
      FUNDAMENTALS: 'FUNDAMENTALS',
      ALGORITHMS: 'ALGORITHMS',
      GRAPH_THEORY: 'GRAPH THEORY',
      DYNAMIC_PROGRAMMING: 'DYNAMIC PROGRAMMING',
      TREES_ADVANCED: 'TREES & ADVANCED',
      MATHEMATICS: 'MATHEMATICS',
    },
    items: {
      introduction: 'Introduction',
      'learning-path': 'Learning Path',
      assessment: 'Skill Assessment',
      'complexity-analysis': 'Complexity Analysis',
      'arrays-strings': 'Arrays & Strings',
      'stl-guide': 'STL Essentials',
      'two-pointers': 'Two Pointers',
      'sliding-window': 'Sliding Window',
      'binary-search': 'Binary Search',
      sorting: 'Sorting Techniques',
      bfs: 'BFS',
      dfs: 'DFS',
      dijkstra: 'Dijkstra',
      'union-find': 'Union-Find (DSU)',
      'dp-1d': '1D DP',
      'dp-2d': '2D DP',
      knapsack: 'Knapsack',
      'bitmask-dp': 'Bitmask DP',
      'segment-tree': 'Segment Tree',
      'fenwick-tree': 'Fenwick Tree (BIT)',
      trie: 'Trie',
      'modular-arithmetic': 'Modular Arithmetic',
      sieve: 'Sieve of Eratosthenes',
      combinatorics: 'Combinatorics',
    },
  },

  overview: {
    heroTitle: 'Competitive Programming\nStudy Guide',
    heroSubtitle:
      'A structured guide to the most essential algorithms, data structures, and techniques used in competitive programming competitions.',
    stats: {
      algorithms: 'Core Algorithms',
      categories: 'Topic Categories',
      problems: 'Practice Problems',
      stateOfTheArt: 'State of the Art',
    },
    quickNav: {
      title: 'Quick Navigation',
      assess: {
        title: 'Assess Your Level',
        desc: 'Determine your current competitive programming skills',
      },
      explore: {
        title: 'Explore Algorithms',
        desc: 'Browse all algorithm categories and topics',
      },
      roadmap: {
        title: 'Learning Roadmap',
        desc: 'Get a structured, phased learning plan',
      },
      tools: {
        title: 'Tools & Resources',
        desc: 'Find judges, editors, and cheatsheets',
      },
    },
    introTitle: 'Introduction',
    introBody: [
      'Competitive programming (CP) is the practice of solving well-defined algorithmic problems within strict time and memory limits. Mastering CP requires a deep understanding of algorithms, data structures, and mathematical reasoning.',
      'This guide covers the essential topics you need to go from beginner to competitive in platforms like Codeforces, LeetCode, AtCoder, and ICPC.',
      'Each topic includes a clear description, complexity analysis, C++ implementations, best practices, and curated practice problems.',
    ],
    learningPathTitle: 'Learning Path',
    learningPath: [
      {
        step: 1,
        title: 'Fundamentals (2–4 weeks)',
        desc: 'Complexity, arrays, prefix sums, STL, sorting',
        color: '#d1fae5',
        textColor: '#065f46',
      },
      {
        step: 2,
        title: 'Core Algorithms (4–6 weeks)',
        desc: 'Two pointers, sliding window, binary search, BFS/DFS',
        color: '#fef3c7',
        textColor: '#92400e',
      },
      {
        step: 3,
        title: 'Advanced Topics (8+ weeks)',
        desc: 'DP, graph theory, segment trees, math',
        color: '#fee2e2',
        textColor: '#991b1b',
      },
    ],
  },

  algorithms: {
    title: 'Algorithm Library',
    subtitle: 'Click any card to see the full explanation, C++ code, and practice problems.',
  },

  modal: {
    description: 'Description',
    keyTechniques: 'Key Techniques',
    constraints: 'Typical Constraints',
    whyLearn: 'Why Learn This',
    codeExamples: 'Code Examples (C++)',
    bestPractices: 'Best Practices',
    practiceProblems: 'Practice Problems',
    copy: 'Copy',
    copied: 'Copied!',
    close: 'Close',
  },

  roadmap: {
    title: 'Learning Roadmap',
    subtitle: 'A phased plan to go from beginner to competitive programmer.',
    phases: [
      {
        number: 1,
        title: 'Foundations',
        duration: 'Weeks 1–4 · Codeforces Div. 4 / LeetCode Easy',
        topics: [
          'Complexity Analysis (Big-O)',
          'Arrays & Prefix Sums',
          'Strings & Hashing',
          'STL Essentials (vector, map, set)',
          'Sorting Algorithms',
          'Basic Math & Number Theory',
        ],
      },
      {
        number: 2,
        title: 'Core Algorithms',
        duration: 'Weeks 5–10 · Codeforces Div. 3 / LeetCode Medium',
        topics: [
          'Two Pointers',
          'Sliding Window',
          'Binary Search on Answer',
          'BFS / DFS',
          'Union-Find (DSU)',
          'Greedy Techniques',
        ],
      },
      {
        number: 3,
        title: 'Dynamic Programming',
        duration: 'Weeks 11–16 · Codeforces Div. 2 / LeetCode Hard',
        topics: [
          '1D DP (Coin Change, LIS)',
          '2D DP (LCS, Grid DP)',
          'Knapsack Variants',
          'Interval DP',
          'Bitmask DP',
          'DP on Trees',
        ],
      },
      {
        number: 4,
        title: 'Graph Theory',
        duration: 'Weeks 17–22 · Codeforces Div. 2–1',
        topics: [
          "Dijkstra's Algorithm",
          'Bellman-Ford / SPFA',
          'Floyd-Warshall',
          'Minimum Spanning Tree',
          'Topological Sort',
          'Strongly Connected Components',
        ],
      },
      {
        number: 5,
        title: 'Advanced Data Structures & Math',
        duration: 'Weeks 23+ · Codeforces Div. 1 / ICPC level',
        topics: [
          'Segment Tree + Lazy Prop',
          'Fenwick Tree (BIT)',
          'Trie',
          'Modular Arithmetic',
          'Combinatorics',
          'FFT / NTT',
        ],
      },
    ],
  },

  tools: {
    title: 'Tools & Resources',
    subtitle: 'Everything you need to practice, compete, and improve.',
    sections: {
      judges: 'Online Judges',
      learning: 'Learning Resources',
      dev: 'Development Tools',
    },
    visitLabel: 'Visit →',
    downloadLabel: 'Download PDF →',
    githubLabel: 'GitHub →',
    viewLabel: 'View →',
    docsLabel: 'Docs →',
    items: {
      codeforces: {
        title: 'Codeforces',
        desc: 'The premier competitive programming platform with regular rated contests (Div. 1–4) and a huge problem archive.',
      },
      leetcode: {
        title: 'LeetCode',
        desc: 'Industry-focused problems categorized by topic and difficulty. Great for interview prep and structured practice.',
      },
      atcoder: {
        title: 'AtCoder',
        desc: 'Japanese platform with high-quality problems and weekly contests. Known for clean problem statements.',
      },
      cses: {
        title: 'CSES Problem Set',
        desc: 'A curated set of ~300 classic CP problems organized by topic. Ideal for systematic learning.',
      },
      cpAlgorithms: {
        title: 'CP-Algorithms',
        desc: 'Comprehensive algorithm reference with proofs, complexities, and implementations in C++.',
      },
      usacoGuide: {
        title: 'USACO Guide',
        desc: 'Structured curriculum from Bronze to Platinum level, used by top competitive programmers.',
      },
      errichto: {
        title: 'Errichto (YouTube)',
        desc: 'Educational CP videos covering problem-solving strategies, algorithm explanations, and contest upsolving.',
      },
      cpHandbook: {
        title: "Competitive Programmer's Handbook",
        desc: 'Free book by Antti Laaksonen — a complete guide to algorithms used in competitive programming.',
      },
      vscode: {
        title: 'VS Code + Competitive Companion',
        desc: 'Set up a local CP environment with auto-fetching of test cases from Codeforces/LeetCode.',
      },
      gdb: {
        title: 'GDB + AddressSanitizer',
        desc: 'Essential debugging tools for C++. ASan catches memory errors; GDB for step-by-step debugging.',
      },
      stlCheatsheet: {
        title: 'C++ STL Cheatsheet',
        desc: 'Quick reference for vector, map, set, priority_queue, and algorithm functions used in CP.',
      },
      cfTracker: {
        title: 'Codeforces Rating Tracker',
        desc: 'Track your rating progress, problem statistics, and performance across contests over time.',
      },
    },
  },
};