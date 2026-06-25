/** Shape of a single slide item (icon + title + optional desc/tag) */
export interface SlideItem {
  icon: string;
  title: string;
  desc?: string;
  tag?: string;
}

/** Shape of a stat shown on the title slide */
export interface SlideStat {
  number: string;
  label: string;
}

/** A single slide in the presentation */
export interface Slide {
  type: 'title' | 'definition' | 'grid' | 'list' | 'timeline' | 'cta';
  title: string;
  subtitle?: string;
  quote?: string;
  body?: string;
  stats?: SlideStat[];
  items?: SlideItem[];
  cta?: string;
  ctaHref?: string;
}

/** Shape of a learning-path step */
export interface LearningPathStep {
  step: number;
  title: string;
  desc: string;
  color: string;
  textColor: string;
}

/** Shape of a roadmap phase */
export interface RoadmapPhase {
  number: number;
  title: string;
  duration: string;
  topics: string[];
}

/** Full translations interface */
export interface Translations {
  lang: string;

  nav: {
    brand: string;
    overview: string;
    algorithms: string;
    roadmap: string;
    tools: string;
    searchPlaceholder: string;
    toggleTheme: string;
    langLabel: string;
  };

  sidebar: {
    title: string;
    progress: (pct: number) => string;
    sections: {
      OVERVIEW: string;
      FUNDAMENTALS: string;
      ALGORITHMS: string;
      GRAPH_THEORY: string;
      DYNAMIC_PROGRAMMING: string;
      TREES_ADVANCED: string;
      MATHEMATICS: string;
      PRACTICE: string;
    };
    items: Record<string, string>;
  };

  overview: {
    heroTitle: string;
    heroSubtitle: string;
    stats: {
      algorithms: string;
      categories: string;
      problems: string;
      stateOfTheArt: string;
    };
    quickNav: {
      title: string;
      assess: { title: string; desc: string };
      explore: { title: string; desc: string };
      roadmap: { title: string; desc: string };
      tools: { title: string; desc: string };
    };
    introTitle: string;
    introBody: string[];
    learningPathTitle: string;
    learningPath: LearningPathStep[];
  };

  algorithms: {
    title: string;
    subtitle: string;
  };

  modal: {
    description: string;
    keyTechniques: string;
    constraints: string;
    whyLearn: string;
    codeExamples: string;
    bestPractices: string;
    practiceProblems: string;
    copy: string;
    copied: string;
    close: string;
  };

  roadmap: {
    title: string;
    subtitle: string;
    phases: RoadmapPhase[];
  };

  tools: {
    title: string;
    subtitle: string;
    sections: {
      judges: string;
      learning: string;
      dev: string;
    };
    visitLabel: string;
    downloadLabel: string;
    githubLabel: string;
    viewLabel: string;
    docsLabel: string;
    items: Record<string, { title: string; desc: string }>;
  };

  search: {
    title: string;
    subtitle: string;
    searchTab: string;
    favoritesTab: string;
    tagsLabel: string;
    difficultyLabel: string;
    minRating: string;
    maxRating: string;
    combineModeAnd: string;
    combineModeOr: string;
    searchBtn: string;
    clearTags: string;
    sortByRating: string;
    sortByRatingDesc: string;
    sortById: string;
    problemsFound: (n: number) => string;
    noResults: string;
    noFavorites: string;
    loading: string;
    errorMsg: string;
    openProblem: string;
    markSolved: string;
    favorite: string;
    unfavorite: string;
    solvedLabel: string;
    pageOf: (cur: number, total: number) => string;
    prevPage: string;
    nextPage: string;
    ratingLabel: string;
  };

  videos: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    channelAll: string;
    tagsLabel: string;
    clearTags: string;
    noResults: string;
    noTranscript: string;
    watchAt: (ts: string) => string;
    viewsLabel: string;
    durationLabel: string;
    matchesFound: (n: number) => string;
    openVideo: string;
    langEs: string;
    langEn: string;
  };

  quiz: {
    tab: string;
    learnTab: string;
    submitBtn: string;
    tryAgainBtn: string;
    score: (correct: number, total: number) => string;
    noQuiz: string;
    selectAll: string;
  };

  slides: {
    brand: string;
    prev: string;
    next: string;
    fullscreenEnter: string;
    fullscreenExit: string;
    slideOf: string;
    guideLink: string;
    items: Slide[];
  };
}
