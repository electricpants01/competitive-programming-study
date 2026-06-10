import type { Translations } from './types';

export const es: Translations = {
  lang: 'es',

  nav: {
    brand: 'Guía CP',
    overview: 'Inicio',
    algorithms: 'Algoritmos',
    roadmap: 'Hoja de Ruta',
    tools: 'Herramientas',
    searchPlaceholder: 'Buscar algoritmos… (⌘K)',
    toggleTheme: 'Cambiar modo claro/oscuro',
    langLabel: 'ES',
  },

  sidebar: {
    title: 'Navegación',
    progress: (pct: number) => `${pct}% Completado`,
    sections: {
      OVERVIEW: 'INICIO',
      FUNDAMENTALS: 'FUNDAMENTOS',
      ALGORITHMS: 'ALGORITMOS',
      GRAPH_THEORY: 'TEORÍA DE GRAFOS',
      DYNAMIC_PROGRAMMING: 'PROGRAMACIÓN DINÁMICA',
      TREES_ADVANCED: 'ÁRBOLES Y AVANZADO',
      MATHEMATICS: 'MATEMÁTICAS',
    },
    items: {
      introduction: 'Introducción',
      'learning-path': 'Plan de Aprendizaje',
      assessment: 'Evaluación de Nivel',
      'complexity-analysis': 'Análisis de Complejidad',
      'arrays-strings': 'Arreglos y Strings',
      'stl-guide': 'STL Esencial',
      'two-pointers': 'Dos Punteros',
      'sliding-window': 'Ventana Deslizante',
      'binary-search': 'Búsqueda Binaria',
      sorting: 'Técnicas de Ordenamiento',
      bfs: 'BFS',
      dfs: 'DFS',
      dijkstra: 'Dijkstra',
      'union-find': 'Union-Find (DSU)',
      'dp-1d': 'PD en 1D',
      'dp-2d': 'PD en 2D',
      knapsack: 'Mochila (Knapsack)',
      'bitmask-dp': 'PD con Máscaras de Bits',
      'segment-tree': 'Árbol de Segmentos',
      'fenwick-tree': 'Árbol de Fenwick (BIT)',
      trie: 'Trie',
      'modular-arithmetic': 'Aritmética Modular',
      sieve: 'Criba de Eratóstenes',
      combinatorics: 'Combinatoria',
    },
  },

  overview: {
    heroTitle: 'Guía de Programación\nCompetitiva',
    heroSubtitle:
      'Una guía estructurada de los algoritmos, estructuras de datos y técnicas más esenciales en la programación competitiva.',
    stats: {
      algorithms: 'Algoritmos Esenciales',
      categories: 'Categorías de Temas',
      problems: 'Problemas de Práctica',
      stateOfTheArt: 'Estado del Arte',
    },
    quickNav: {
      title: 'Navegación Rápida',
      assess: {
        title: 'Evalúa tu Nivel',
        desc: 'Determina tu nivel actual en programación competitiva',
      },
      explore: {
        title: 'Explorar Algoritmos',
        desc: 'Navega todas las categorías y temas de algoritmos',
      },
      roadmap: {
        title: 'Hoja de Ruta',
        desc: 'Obtén un plan de aprendizaje estructurado por fases',
      },
      tools: {
        title: 'Herramientas y Recursos',
        desc: 'Jueces en línea, editores y hojas de referencia',
      },
    },
    introTitle: 'Introducción',
    introBody: [
      'La programación competitiva (PC) es la práctica de resolver problemas algorítmicos bien definidos dentro de límites estrictos de tiempo y memoria. Dominar la PC requiere una comprensión profunda de algoritmos, estructuras de datos y razonamiento matemático.',
      'Esta guía cubre los temas esenciales que necesitas para pasar de principiante a competitivo en plataformas como Codeforces, LeetCode, AtCoder e ICPC.',
      'Cada tema incluye una descripción clara, análisis de complejidad, implementaciones en C++, mejores prácticas y problemas de práctica seleccionados.',
    ],
    learningPathTitle: 'Plan de Aprendizaje',
    learningPath: [
      {
        step: 1,
        title: 'Fundamentos (2–4 semanas)',
        desc: 'Complejidad, arreglos, sumas prefijas, STL, ordenamiento',
        color: '#d1fae5',
        textColor: '#065f46',
      },
      {
        step: 2,
        title: 'Algoritmos Clave (4–6 semanas)',
        desc: 'Dos punteros, ventana deslizante, búsqueda binaria, BFS/DFS',
        color: '#fef3c7',
        textColor: '#92400e',
      },
      {
        step: 3,
        title: 'Temas Avanzados (8+ semanas)',
        desc: 'PD, teoría de grafos, árboles de segmentos, matemáticas',
        color: '#fee2e2',
        textColor: '#991b1b',
      },
    ],
  },

  algorithms: {
    title: 'Biblioteca de Algoritmos',
    subtitle:
      'Haz clic en cualquier tarjeta para ver la explicación completa, código en C++ y problemas de práctica.',
  },

  modal: {
    description: 'Descripción',
    keyTechniques: 'Técnicas Clave',
    constraints: 'Restricciones Típicas',
    whyLearn: 'Por Qué Aprender Esto',
    codeExamples: 'Ejemplos de Código (C++)',
    bestPractices: 'Mejores Prácticas',
    practiceProblems: 'Problemas de Práctica',
    copy: 'Copiar',
    copied: '¡Copiado!',
    close: 'Cerrar',
  },

  roadmap: {
    title: 'Hoja de Ruta de Aprendizaje',
    subtitle: 'Un plan por fases para ir de principiante a programador competitivo.',
    phases: [
      {
        number: 1,
        title: 'Fundamentos',
        duration: 'Semanas 1–4 · Codeforces Div. 4 / LeetCode Fácil',
        topics: [
          'Análisis de Complejidad (Big-O)',
          'Arreglos y Sumas Prefijas',
          'Strings y Hashing',
          'STL Esencial (vector, map, set)',
          'Algoritmos de Ordenamiento',
          'Matemáticas y Teoría de Números',
        ],
      },
      {
        number: 2,
        title: 'Algoritmos Clave',
        duration: 'Semanas 5–10 · Codeforces Div. 3 / LeetCode Medio',
        topics: [
          'Dos Punteros',
          'Ventana Deslizante',
          'Búsqueda Binaria en la Respuesta',
          'BFS / DFS',
          'Union-Find (DSU)',
          'Técnicas Greedy',
        ],
      },
      {
        number: 3,
        title: 'Programación Dinámica',
        duration: 'Semanas 11–16 · Codeforces Div. 2 / LeetCode Difícil',
        topics: [
          'PD en 1D (Cambio de Monedas, LIS)',
          'PD en 2D (LCS, PD en Grillas)',
          'Variantes de Mochila',
          'PD de Intervalos',
          'PD con Máscaras de Bits',
          'PD en Árboles',
        ],
      },
      {
        number: 4,
        title: 'Teoría de Grafos',
        duration: 'Semanas 17–22 · Codeforces Div. 2–1',
        topics: [
          'Algoritmo de Dijkstra',
          'Bellman-Ford / SPFA',
          'Floyd-Warshall',
          'Árbol de Expansión Mínima',
          'Ordenamiento Topológico',
          'Componentes Fuertemente Conexas',
        ],
      },
      {
        number: 5,
        title: 'Estructuras Avanzadas y Matemáticas',
        duration: 'Semana 23+ · Codeforces Div. 1 / Nivel ICPC',
        topics: [
          'Árbol de Segmentos + Propagación Perezosa',
          'Árbol de Fenwick (BIT)',
          'Trie',
          'Aritmética Modular',
          'Combinatoria',
          'FFT / NTT',
        ],
      },
    ],
  },

  tools: {
    title: 'Herramientas y Recursos',
    subtitle: 'Todo lo que necesitas para practicar, competir y mejorar.',
    sections: {
      judges: 'Jueces en Línea',
      learning: 'Recursos de Aprendizaje',
      dev: 'Herramientas de Desarrollo',
    },
    visitLabel: 'Visitar →',
    downloadLabel: 'Descargar PDF →',
    githubLabel: 'GitHub →',
    viewLabel: 'Ver →',
    docsLabel: 'Docs →',
    items: {
      codeforces: {
        title: 'Codeforces',
        desc: 'La principal plataforma de programación competitiva con concursos regulares (Div. 1–4) y un enorme archivo de problemas.',
      },
      leetcode: {
        title: 'LeetCode',
        desc: 'Problemas orientados a la industria categorizados por tema y dificultad. Ideal para preparación de entrevistas.',
      },
      atcoder: {
        title: 'AtCoder',
        desc: 'Plataforma japonesa con problemas de alta calidad y concursos semanales. Conocida por enunciados claros.',
      },
      cses: {
        title: 'CSES Problem Set',
        desc: 'Un conjunto curado de ~300 problemas clásicos organizados por tema. Ideal para aprendizaje sistemático.',
      },
      cpAlgorithms: {
        title: 'CP-Algorithms',
        desc: 'Referencia completa de algoritmos con demostraciones, complejidades e implementaciones en C++.',
      },
      usacoGuide: {
        title: 'USACO Guide',
        desc: 'Plan de estudios estructurado de nivel Bronce a Platino, utilizado por los mejores programadores competitivos.',
      },
      errichto: {
        title: 'Errichto (YouTube)',
        desc: 'Videos educativos de PC con estrategias de resolución, explicaciones de algoritmos y análisis de concursos.',
      },
      cpHandbook: {
        title: 'Manual del Programador Competitivo',
        desc: 'Libro gratuito de Antti Laaksonen — una guía completa de algoritmos para programación competitiva.',
      },
      vscode: {
        title: 'VS Code + Competitive Companion',
        desc: 'Configura un entorno local con obtención automática de casos de prueba desde Codeforces/LeetCode.',
      },
      gdb: {
        title: 'GDB + AddressSanitizer',
        desc: 'Herramientas de depuración esenciales para C++. ASan detecta errores de memoria; GDB para depuración paso a paso.',
      },
      stlCheatsheet: {
        title: 'Hoja de Referencia de STL de C++',
        desc: 'Referencia rápida de vector, map, set, priority_queue y funciones de algoritmos usados en PC.',
      },
      cfTracker: {
        title: 'Rastreador de Rating de Codeforces',
        desc: 'Rastrea tu progreso de rating, estadísticas de problemas y rendimiento en concursos a lo largo del tiempo.',
      },
    },
  },
};