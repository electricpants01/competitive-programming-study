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
}