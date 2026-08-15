/* ============================================================
   CP Study Guide — Interactive Script (Astro version)
   Reads translations from window.__CP_T__ injected server-side
   ============================================================ */
(function () {
  "use strict";

  const t = window.__CP_T__;
  const lang = window.__CP_LANG__ || 'en';
  const base = window.__CP_BASE__ || '/';

  /** Replace `{key}` placeholders in i18n templates (JSON-safe strings). */
  function fmt(template, vars) {
    if (template == null) return '';
    return String(template).replace(/\{(\w+)\}/g, (_, key) =>
      vars[key] != null ? String(vars[key]) : ''
    );
  }

  const visualizersMap = {
    'arrays-strings': [
      { name: 'VisuAlgo', url: 'https://visualgo.net/en/array' },
    ],
    'sorting': [
      { name: 'VisuAlgo', url: 'https://visualgo.net/en/sorting' },
      { name: 'Algorithm Visualizer', url: 'https://algorithm-visualizer.org/divide-and-conquer/merge-sort' },
      { name: 'See Algorithms', url: 'https://see-algorithms.com/sorting/MergeSort' },
      { name: 'DSA Visualizer', url: 'https://www.dsavisualizer.in/visualizer/sorting/mergesort' },
    ],
    'bfs': [
      { name: 'VisuAlgo', url: 'https://visualgo.net/en/dfsbfs' },
      { name: 'See Algorithms', url: 'https://see-algorithms.com/graph/BFS' },
    ],
    'dfs': [
      { name: 'VisuAlgo', url: 'https://visualgo.net/en/dfsbfs' },
      { name: 'See Algorithms', url: 'https://see-algorithms.com/graph/DFS' },
    ],
    'dijkstra': [
      { name: 'VisuAlgo', url: 'https://visualgo.net/en/sssp' },
      { name: 'Algorithm Visualizer', url: 'https://algorithm-visualizer.org/greedy/dijkstras-shortest-path' },
    ],
    'union-find': [
      { name: 'VisuAlgo', url: 'https://visualgo.net/en/ufds' },
    ],
    'dp-1d': [
      { name: 'Algorithm Visualizer', url: 'https://algorithm-visualizer.org/dynamic-programming/longest-increasing-subsequence' },
    ],
    'dp-2d': [
      { name: 'Algorithm Visualizer', url: 'https://algorithm-visualizer.org/dynamic-programming/longest-common-subsequence' },
    ],
    'segment-tree': [
      { name: 'VisuAlgo', url: 'https://visualgo.net/en/segmenttree' },
    ],
    'fenwick-tree': [
      { name: 'YouTube — William Fiset', url: 'https://www.youtube.com/watch?v=RgITNht_f4Q' },
    ],
    'trie': [
      { name: 'YouTube — NeetCode', url: 'https://www.youtube.com/watch?v=oobqoCJlHA0' },
    ],
  };

  // ── State ───────────────────────────────────────────────────
  const state = {
    theme: localStorage.getItem("cp-theme") || "light",
    activeSection: "overview",
    sidebarCollapsed: false,
    visitedItems: JSON.parse(localStorage.getItem("cp-visited") || "[]"),
  };

  // ── DOM refs ────────────────────────────────────────────────
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const sidebarEl = document.getElementById("sidebar");
  const mainEl = document.getElementById("main");
  const sidebarToggleBtn = document.getElementById("sidebar-toggle");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const searchInput = document.getElementById("search-input");
  const searchClearBtn = document.getElementById("search-clear");
  const searchOverlay = document.getElementById("search-overlay");
  const searchResultsContainer = document.getElementById("search-results");
  const progressFill = document.getElementById("progress-fill");
  const progressLabel = document.getElementById("progress-label");
  const algoGrid = document.getElementById("algo-grid");
  const sidebarNav = document.getElementById("sidebar-nav");
  const detailPanel = document.getElementById("detail-panel");
  const detailBackBtn = document.getElementById("detail-back");

  // ── Theme ────────────────────────────────────────────────────
  function applyTheme(theme) {
    state.theme = theme;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("cp-theme", theme);
    themeIcon.innerHTML =
      theme === "dark"
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <circle cx="12" cy="12" r="5"/>
             <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
             <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
             <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
             <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
           </svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
           </svg>`;
  }

  themeToggleBtn.addEventListener("click", () =>
    applyTheme(state.theme === "dark" ? "light" : "dark")
  );

  // ── Sidebar collapse ─────────────────────────────────────────
  function setSidebarCollapsed(collapsed) {
    state.sidebarCollapsed = collapsed;
    sidebarEl.classList.toggle("collapsed", collapsed);
    mainEl.classList.toggle("sidebar-collapsed", collapsed);
    const arrow = sidebarToggleBtn.querySelector("svg");
    if (arrow) arrow.style.transform = collapsed ? "rotate(180deg)" : "rotate(0deg)";
  }

  sidebarToggleBtn.addEventListener("click", () =>
    setSidebarCollapsed(!state.sidebarCollapsed)
  );

  // ── Sidebar sections definition ───────────────────────────────
  const sidebarSectionDefs = [
    { key: 'PRACTICE', items: ['search-problems', 'watch-videos', 'icpc-prelims', 'icpc-regionals'] },
    { key: 'OVERVIEW', items: ['introduction', 'learning-path', 'assessment'] },
    { key: 'FUNDAMENTALS', items: ['complexity-analysis', 'arrays-strings', 'stl-guide'] },
    { key: 'ALGORITHMS', items: ['two-pointers', 'sliding-window', 'binary-search', 'sorting'] },
    { key: 'GRAPH_THEORY', items: ['bfs', 'dfs', 'dijkstra', 'union-find'] },
    { key: 'DYNAMIC_PROGRAMMING', items: ['dp-1d', 'dp-2d', 'knapsack', 'bitmask-dp'] },
    { key: 'TREES_ADVANCED', items: ['segment-tree', 'fenwick-tree', 'trie'] },
    { key: 'MATHEMATICS', items: ['modular-arithmetic', 'sieve', 'combinatorics'] },
  ];

  // Sidebar item ids that map to a full page-section instead of an algo detail panel
  const PRACTICE_ITEM_SECTIONS = {
    'search-problems': 'search',
    'watch-videos': 'videos',
    'icpc-prelims': 'icpc-prelims',
    'icpc-regionals': 'icpc-regionals',
  };

  // Items that display a "NEW" badge — remove an id once the feature is no longer new
  const NEW_ITEMS = new Set(['watch-videos', 'search-problems', 'icpc-prelims', 'icpc-regionals']);

  // ── Build sidebar ─────────────────────────────────────────────
  function buildSidebar() {
    sidebarNav.innerHTML = "";
    sidebarSectionDefs.forEach((section) => {
      const sectionEl = document.createElement("div");
      sectionEl.className = "sidebar-section";

      const labelEl = document.createElement("div");
      labelEl.className = "sidebar-section-label";
      labelEl.textContent = t.sidebar.sections[section.key] || section.key;
      sectionEl.appendChild(labelEl);

      section.items.forEach((id) => {
        const itemLabel = t.sidebar.items[id] || id;
        const newBadge = NEW_ITEMS.has(id)
          ? '<span class="sidebar-new-badge">NEW</span>'
          : '';
        const btn = document.createElement("button");
        btn.className = "sidebar-item";
        btn.dataset.id = id;
        btn.innerHTML = `<span class="item-dot"></span>${itemLabel}${newBadge}`;
        btn.addEventListener("click", () => handleSidebarItemClick(id));
        sectionEl.appendChild(btn);
      });

      sidebarNav.appendChild(sectionEl);
    });
  }

  function updateActiveSidebarItem(id) {
    document.querySelectorAll(".sidebar-item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.id === id);
    });
  }

  function handleSidebarItemClick(id) {
    if (!state.visitedItems.includes(id)) {
      state.visitedItems.push(id);
      localStorage.setItem("cp-visited", JSON.stringify(state.visitedItems));
    }
    updateProgress();
    updateActiveSidebarItem(id);

    if (PRACTICE_ITEM_SECTIONS[id]) {
      setActiveSection(PRACTICE_ITEM_SECTIONS[id]);
    } else if (typeof algorithmsData !== 'undefined' && algorithmsData[id]) {
      showDetailPanel(id);
    } else {
      setActiveSection("overview");
      const anchor = document.getElementById("overview-" + id);
      if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
    }
  }

  // ── Progress ──────────────────────────────────────────────────
  function updateProgress() {
    const total = sidebarSectionDefs.reduce((acc, s) => acc + s.items.length, 0);
    const pct = total === 0 ? 0 : Math.round((state.visitedItems.length / total) * 100);
    progressFill.style.width = pct + "%";
    progressLabel.textContent = fmt(t.sidebar.progress, { pct });
  }

  // ── Section navigation ────────────────────────────────────────
  function setActiveSection(section) {
    state.activeSection = section;
    document.querySelectorAll(".page-section").forEach((el) => {
      el.classList.toggle("active", el.dataset.section === section);
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === section);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setActiveSection(link.dataset.section));
  });

  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", () => setActiveSection(el.dataset.goto));
  });

  // ── Back button from detail view ──────────────────────────────
  if (detailBackBtn) {
    detailBackBtn.addEventListener("click", () => setActiveSection("algorithms"));
  }

  // ── Build algorithm grid ──────────────────────────────────────
  function diffBadgeClass(d) {
    const dl = (d || "").toLowerCase();
    if (dl.includes("beginner")) return "badge-beginner";
    if (dl.includes("advanced")) return "badge-advanced";
    return "badge-intermediate";
  }

  function buildAlgoGrid() {
    if (!algoGrid || typeof algorithmsData === 'undefined') return;
    algoGrid.innerHTML = "";
    Object.entries(algorithmsData).forEach(([id, algo]) => {
      const card = document.createElement("div");
      card.className = "algo-card";
      card.innerHTML = `
        <div class="algo-card-header">
          <div class="algo-card-title">${algo.title}</div>
          <div class="algo-badges">
            <span class="badge badge-category">${algo.category}</span>
            <span class="badge ${diffBadgeClass(algo.difficulty)}">${algo.difficulty}</span>
          </div>
        </div>
        <div class="algo-card-body">
          <div class="algo-card-desc">${algo.description}</div>
          <div class="algo-card-meta">
            <span class="algo-meta-item">⏱ ${algo.timeToLearn}</span>
            <span class="algo-meta-item">⚡ ${algo.importance}</span>
          </div>
        </div>`;
      card.addEventListener("click", () => showDetailPanel(id));
      algoGrid.appendChild(card);
    });
  }

  // ── Inline detail panel ───────────────────────────────────────
  function showDetailPanel(id) {
    const algo = (typeof algorithmsData !== 'undefined') ? algorithmsData[id] : null;
    if (!algo) return;

    if (!state.visitedItems.includes(id)) {
      state.visitedItems.push(id);
      localStorage.setItem("cp-visited", JSON.stringify(state.visitedItems));
      updateProgress();
    }
    updateActiveSidebarItem(id);

    const examplesHTML = (algo.examples || []).map((ex, i) => `
      <div class="code-example">
        <div class="code-example-header">
          <div class="code-example-title">${ex.title}</div>
          <button class="code-copy-btn" data-index="${i}">${t.modal.copy}</button>
        </div>
        ${ex.description ? `<div style="padding:8px 16px;font-size:12px;color:var(--text-secondary);border-bottom:1px solid var(--border)">${ex.description}</div>` : ""}
        <pre class="code-block">${esc(ex.codeSnippet)}</pre>
      </div>`).join("");

    const keyTechHTML = (algo.keyTechniques || []).map(k => `<span class="tag">${k}</span>`).join("");
    const benefitsHTML = (algo.benefits || []).map(b => `<li>${b}</li>`).join("");
    const practicesHTML = (algo.bestPractices || []).map(b => `<li>${b}</li>`).join("");
    const constraintsHTML = (algo.typicalConstraints || []).map(c => `<span class="tag">${c}</span>`).join("");
    const problemsHTML = (algo.problems || []).map(p => `<span class="problem-chip">${p}</span>`).join("");

    const vizLinks = visualizersMap[id] || [];
    const ytQuery = encodeURIComponent(algo.title + ' algorithm visualization');
    const ytSearchHref = `https://www.youtube.com/results?search_query=${ytQuery}`;
    const visualizersHTML = [
      ...vizLinks.map(v => `<a class="viz-link" href="${v.url}" target="_blank" rel="noopener noreferrer">${esc(v.name)} ↗</a>`),
      `<a class="viz-link" href="${ytSearchHref}" target="_blank" rel="noopener noreferrer">YouTube Search ↗</a>`,
    ].join("");
    const vizLabel = lang === 'es' ? '🎬 Visualízalo' : '🎬 Visualize It';

    detailPanel.innerHTML = `
      <div class="detail-card">
        <div class="modal-header">
          <div>
            <div class="modal-title">${algo.title}</div>
            <div class="algo-badges">
              <span class="badge badge-category">${algo.category}</span>
              <span class="badge ${diffBadgeClass(algo.difficulty)}">${algo.difficulty}</span>
              <span class="badge" style="background:var(--bg-body);border:1px solid var(--border);color:var(--text-secondary)">⏱ ${algo.timeToLearn}</span>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <div class="modal-section-title">${t.modal.description}</div>
            <div class="modal-desc">${algo.description}</div>
          </div>
          ${algo.asciiArt ? `<div class="modal-section"><div class="modal-section-title">Visual Diagram</div><pre class="ascii-art">${esc(algo.asciiArt)}</pre></div>` : ""}
          ${keyTechHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.keyTechniques}</div><div class="tag-list">${keyTechHTML}</div></div>` : ""}
          ${constraintsHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.constraints}</div><div class="tag-list">${constraintsHTML}</div></div>` : ""}
          ${benefitsHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.whyLearn}</div><ul class="bullet-list">${benefitsHTML}</ul></div>` : ""}
          ${examplesHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.codeExamples}</div>${examplesHTML}</div>` : ""}
          ${practicesHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.bestPractices}</div><ul class="bullet-list">${practicesHTML}</ul></div>` : ""}
          ${visualizersHTML ? `<div class="modal-section"><div class="modal-section-title">${vizLabel}</div><div class="visualizer-links">${visualizersHTML}</div></div>` : ""}
          ${problemsHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.practiceProblems}</div><div class="problems-list">${problemsHTML}</div></div>` : ""}
          ${algo.quiz ? buildQuizHTML(algo.quiz) : ""}
        </div>
      </div>`;

    setActiveSection("detail");
    attachQuizListeners(algo.quiz || []);
    detailPanel.scrollTop = 0;
    mainEl.scrollTo({ top: 0, behavior: "smooth" });

    detailPanel.querySelectorAll(".code-copy-btn").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        const snippet = algo.examples[i].codeSnippet;
        navigator.clipboard.writeText(snippet).then(() => {
          btn.textContent = t.modal.copied;
          btn.classList.add("copied");
          setTimeout(() => { btn.textContent = t.modal.copy; btn.classList.remove("copied"); }, 1800);
        });
      });
    });
  }

  // ── Quiz ──────────────────────────────────────────────────────
  function buildQuizHTML(quiz) {
    if (!quiz || quiz.length === 0) return "";
    const quizTitle = t.quiz.tab || 'Quiz';
    const qHtml = quiz.map((q, qi) => {
      const opts = q.options.map((opt, oi) => `
        <button class="quiz-option" data-qi="${qi}" data-oi="${oi}">${esc(opt)}</button>
      `).join("");
      return `
        <div class="quiz-question" data-qi="${qi}" data-answer="${q.answer}">
          <div class="quiz-q-text">${qi + 1}. ${esc(q.q)}</div>
          <div class="quiz-options">${opts}</div>
          <div class="quiz-feedback" style="display:none"></div>
        </div>`;
    }).join("");
    return `
      <div class="modal-section quiz-section" id="quiz-section">
        <div class="modal-section-title">🧠 ${quizTitle}</div>
        <div class="quiz-body">
          ${qHtml}
          <div class="quiz-footer">
            <button class="quiz-submit-btn" id="quiz-submit">${t.quiz.submitBtn}</button>
            <button class="quiz-retry-btn" id="quiz-retry" style="display:none">${t.quiz.tryAgainBtn}</button>
            <div class="quiz-score" id="quiz-score" style="display:none"></div>
          </div>
        </div>
      </div>`;
  }

  function attachQuizListeners(quiz) {
    if (!quiz || quiz.length === 0) return;
    const section = document.getElementById('quiz-section');
    if (!section) return;

    const submitBtn = document.getElementById('quiz-submit');
    const retryBtn = document.getElementById('quiz-retry');
    const scoreEl = document.getElementById('quiz-score');

    // Option selection
    section.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = btn.dataset.qi;
        section.querySelectorAll(`.quiz-option[data-qi="${qi}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Submit
    submitBtn.addEventListener('click', () => {
      let correct = 0;
      section.querySelectorAll('.quiz-question').forEach((qEl) => {
        const answer = parseInt(qEl.dataset.answer, 10);
        const selected = qEl.querySelector('.quiz-option.selected');
        const feedback = qEl.querySelector('.quiz-feedback');
        qEl.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        if (!selected) {
          feedback.textContent = t.quiz.missFeedback;
          feedback.className = 'quiz-feedback quiz-feedback-miss';
        } else {
          const oi = parseInt(selected.dataset.oi, 10);
          if (oi === answer) {
            correct++;
            selected.classList.add('correct');
            feedback.textContent = t.quiz.correctFeedback;
            feedback.className = 'quiz-feedback quiz-feedback-correct';
          } else {
            selected.classList.add('wrong');
            qEl.querySelectorAll('.quiz-option').forEach(b => {
              if (parseInt(b.dataset.oi, 10) === answer) b.classList.add('correct');
            });
            feedback.textContent = t.quiz.wrongFeedback;
            feedback.className = 'quiz-feedback quiz-feedback-wrong';
          }
        }
        feedback.style.display = 'block';
      });
      const total = quiz.length;
      scoreEl.textContent = fmt(t.quiz.score, { correct, total });
      scoreEl.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
      retryBtn.style.display = 'inline-block';
    });

    // Retry
    retryBtn.addEventListener('click', () => {
      section.querySelectorAll('.quiz-option').forEach(b => {
        b.disabled = false;
        b.classList.remove('selected', 'correct', 'wrong');
      });
      section.querySelectorAll('.quiz-feedback').forEach(f => { f.style.display = 'none'; f.textContent = ''; });
      scoreEl.style.display = 'none';
      retryBtn.style.display = 'none';
      submitBtn.style.display = 'inline-block';
    });
  }

  // ── Search ────────────────────────────────────────────────────
  function buildSearchIndex() {
    const index = [];
    if (typeof algorithmsData !== 'undefined') {
      Object.entries(algorithmsData).forEach(([id, algo]) => {
        index.push({
          id,
          title: algo.title,
          category: algo.category,
          difficulty: algo.difficulty,
          description: algo.description,
          keywords: [...(algo.keyTechniques || []), ...(algo.useCases || [])].join(" ").toLowerCase(),
        });
      });
    }
    return index;
  }

  const searchIndex = buildSearchIndex();

  function runSearch(q) {
    if (!q.trim()) return [];
    const ql = q.toLowerCase();
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(ql) ||
      item.category.toLowerCase().includes(ql) ||
      item.difficulty.toLowerCase().includes(ql) ||
      item.description.toLowerCase().includes(ql) ||
      item.keywords.includes(ql)
    );
  }

  function renderSearchResults(results, query) {
    searchResultsContainer.innerHTML = "";
    if (!query.trim()) { searchOverlay.classList.remove("visible"); return; }
    searchOverlay.classList.add("visible");
    if (results.length === 0) {
      searchResultsContainer.innerHTML = `<div class="search-no-results">No results for "<strong>${esc(query)}</strong>"</div>`;
      return;
    }
    const titleEl = document.createElement("div");
    titleEl.className = "search-results-title";
    titleEl.textContent = `${results.length} result${results.length !== 1 ? "s" : ""}`;
    searchResultsContainer.appendChild(titleEl);
    results.forEach(r => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      item.innerHTML = `<div class="search-result-title">${r.title}</div><div class="search-result-meta">${r.category}${r.difficulty ? " · " + r.difficulty : ""}</div>`;
      item.addEventListener("click", () => { closeSearch(); handleSidebarItemClick(r.id); });
      searchResultsContainer.appendChild(item);
    });
  }

  function closeSearch() {
    searchOverlay.classList.remove("visible");
    searchInput.value = "";
    searchClearBtn.classList.remove("visible");
  }

  let debounce = null;
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value;
    searchClearBtn.classList.toggle("visible", q.length > 0);
    clearTimeout(debounce);
    debounce = setTimeout(() => renderSearchResults(runSearch(q), q), 180);
  });

  searchClearBtn.addEventListener("click", closeSearch);
  searchOverlay.addEventListener("click", (e) => { if (e.target === searchOverlay) closeSearch(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("visible")) closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); searchInput.focus(); }
  });

  // ── Util ──────────────────────────────────────────────────────
  function esc(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ── Codeforces Problem Search ──────────────────────────────────
  function initCfSearch() {
    const CF_TAGS = [
      'dp', 'graphs', 'greedy', 'implementation', 'math',
      'binary search', 'brute force', 'constructive algorithms',
      'data structures', 'dfs and similar', 'sortings', 'trees',
      'strings', 'number theory', 'combinatorics', 'two pointers',
      'bitmasks', 'shortest paths', 'geometry', 'hashing',
      'divide and conquer', 'games', 'flows', 'probabilities',
      'matrices', 'fft', 'string suffix structures',
      'meet-in-the-middle', 'dsu',
    ];

    const CF_FAV_KEY    = 'cp-cf-favorites';
    const CF_SOLVED_KEY = 'cp-cf-solved';
    const PAGE_SIZE     = 20;

    // favorites is stored as { "contestId-index": { contestId, index, name, rating, tags } }
    // so we can render the Favorites tab even without running a search first.

    // Migrate from old string[] format (just keys) → new object format.
    // If the saved value is an array we can't recover problem data, so reset to {}.
    let _savedFavs = JSON.parse(localStorage.getItem(CF_FAV_KEY) || '{}');
    if (Array.isArray(_savedFavs)) {
      _savedFavs = {};
      localStorage.removeItem(CF_FAV_KEY);
    }

    const cfState = {
      selectedTags: [],
      combineMode: 'and',
      minRating: 800,
      maxRating: 2000,
      allProblems: [],
      filtered: [],
      sortMode: 'rating',
      page: 1,
      favoritesData: _savedFavs,
      solved:        JSON.parse(localStorage.getItem(CF_SOLVED_KEY) || '[]'),
      activeTab: 'search',
    };

    const tagCloudEl   = document.getElementById('cf-tag-cloud');
    const clearTagsBtn = document.getElementById('cf-clear-tags');
    const minRatingEl  = document.getElementById('cf-min-rating');
    const maxRatingEl  = document.getElementById('cf-max-rating');
    const modeAndBtn   = document.getElementById('cf-mode-and');
    const modeOrBtn    = document.getElementById('cf-mode-or');
    const searchBtn    = document.getElementById('cf-search-btn');
    const statusEl     = document.getElementById('cf-status');
    const sortRow      = document.getElementById('cf-sort-row');
    const countEl      = document.getElementById('cf-count');
    const resultsList  = document.getElementById('cf-results-list');
    const paginationEl = document.getElementById('cf-pagination');
    const searchPanel  = document.getElementById('cf-search-panel');
    const favsPanel    = document.getElementById('cf-favs-panel');
    const favsList     = document.getElementById('cf-favs-list');
    const tabSearch    = document.getElementById('cf-tab-search');
    const tabFavs      = document.getElementById('cf-tab-favs');
    const sortRatingBtn     = document.getElementById('cf-sort-rating');
    const sortRatingDescBtn = document.getElementById('cf-sort-rating-desc');
    const sortIdBtn         = document.getElementById('cf-sort-id');

    if (!tagCloudEl || !searchBtn) return; // section not present

    // Build tag cloud
    CF_TAGS.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'cf-tag';
      btn.textContent = tag;
      btn.addEventListener('click', () => {
        const idx = cfState.selectedTags.indexOf(tag);
        if (idx === -1) { cfState.selectedTags.push(tag); btn.classList.add('selected'); }
        else { cfState.selectedTags.splice(idx, 1); btn.classList.remove('selected'); }
      });
      tagCloudEl.appendChild(btn);
    });

    clearTagsBtn.addEventListener('click', () => {
      cfState.selectedTags = [];
      tagCloudEl.querySelectorAll('.cf-tag').forEach(b => b.classList.remove('selected'));
    });

    // Combine mode toggle
    modeAndBtn.addEventListener('click', () => {
      cfState.combineMode = 'and';
      modeAndBtn.classList.add('active');
      modeOrBtn.classList.remove('active');
    });
    modeOrBtn.addEventListener('click', () => {
      cfState.combineMode = 'or';
      modeOrBtn.classList.add('active');
      modeAndBtn.classList.remove('active');
    });

    // Tab switching
    tabSearch.addEventListener('click', () => switchTab('search'));
    tabFavs.addEventListener('click',   () => switchTab('favs'));

    function switchTab(tab) {
      cfState.activeTab = tab;
      tabSearch.classList.toggle('active', tab === 'search');
      tabFavs.classList.toggle('active',   tab === 'favs');
      searchPanel.style.display = tab === 'search' ? '' : 'none';
      favsPanel.style.display   = tab === 'favs'   ? '' : 'none';
      if (tab === 'favs') renderFavs();
    }

    // Sort buttons
    [[sortRatingBtn, 'rating'], [sortRatingDescBtn, 'rating-desc'], [sortIdBtn, 'id']].forEach(([btn, mode]) => {
      btn.addEventListener('click', () => {
        cfState.sortMode = mode;
        [sortRatingBtn, sortRatingDescBtn, sortIdBtn].forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        cfState.page = 1;
        applyFilterSort();
        renderPage();
      });
    });

    // Search button
    searchBtn.addEventListener('click', doSearch);

    async function doSearch() {
      cfState.minRating = parseInt(minRatingEl.value) || 800;
      cfState.maxRating = parseInt(maxRatingEl.value) || 2000;
      showStatus(t.search.loading, false);
      searchBtn.disabled = true;
      try {
        // Fetch only when needed (spec: fetch if needed)
        if (cfState.allProblems.length === 0) {
          const resp = await fetch('https://codeforces.com/api/problemset.problems');
          if (!resp.ok) throw new Error('HTTP ' + resp.status);
          const data = await resp.json();
          if (data.status !== 'OK') throw new Error('CF API error');
          cfState.allProblems = (data.result.problems || []).filter(p => p.rating);
        }
        cfState.page = 1;
        applyFilterSort();
        hideStatus();
        renderPage();
      } catch (_) {
        showStatus(t.search.errorMsg, true, true);
      } finally {
        searchBtn.disabled = false;
      }
    }

    function applyFilterSort() {
      const { minRating, maxRating, selectedTags, combineMode, sortMode } = cfState;
      let filtered = cfState.allProblems.filter(p => {
        if (p.rating < minRating || p.rating > maxRating) return false;
        if (selectedTags.length === 0) return true;
        const pTags = p.tags || [];
        return combineMode === 'and'
          ? selectedTags.every(tag => pTags.includes(tag))
          : selectedTags.some(tag => pTags.includes(tag));
      });
      if (sortMode === 'rating')      filtered.sort((a, b) => a.rating - b.rating);
      else if (sortMode === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);
      else filtered.sort((a, b) => a.contestId !== b.contestId ? a.contestId - b.contestId : a.index.localeCompare(b.index));
      cfState.filtered = filtered;
    }

    function problemKey(p) { return p.contestId + '-' + p.index; }

    function renderProblemCard(p) {
      const key = problemKey(p);
      const isFav    = key in cfState.favoritesData;
      const isSolved = cfState.solved.includes(key);
      const url = 'https://codeforces.com/contest/' + p.contestId + '/problem/' + p.index;
      const tagsHtml = (p.tags || []).slice(0, 4).map(tag => `<span class="cf-problem-tag">${esc(tag)}</span>`).join('');
      const solvedLabel = t.search.solvedLabel || 'Solved';
      const ratingLabel = t.search.ratingLabel || 'Rating';
      return `<div class="cf-problem-card${isSolved ? ' solved' : ''}" data-key="${key}">
        <div class="cf-problem-info">
          <div class="cf-problem-title">${esc(p.contestId + p.index + '. ' + p.name)}</div>
          <div class="cf-problem-meta">
            ${tagsHtml}
            ${p.rating ? `<span class="cf-problem-rating">${ratingLabel}: ${p.rating}</span>` : ''}
            ${isSolved ? `<span class="cf-problem-solved-badge">✅ ${solvedLabel}</span>` : ''}
          </div>
        </div>
        <div class="cf-problem-actions">
          <a class="cf-action-btn" href="${url}" target="_blank" rel="noopener">${t.search.openProblem || 'Open ↗'}</a>
          <button class="cf-action-btn${isSolved ? ' solved-active' : ''}" data-action="solve" data-key="${key}" title="${esc(t.search.markSolved || 'Solved')}">
            ${isSolved ? '✅' : (t.search.markSolved || 'Solved')}
          </button>
          <button class="cf-action-btn${isFav ? ' fav-active' : ''}" data-action="fav" data-key="${key}" title="${esc(isFav ? (t.search.unfavorite || 'Unfavorite') : (t.search.favorite || 'Favorite'))}">
            ${isFav ? '⭐' : '☆'}
          </button>
        </div>
      </div>`;
    }

    function attachCardListeners(container) {
      container.querySelectorAll('[data-action="solve"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.key;
          const idx = cfState.solved.indexOf(key);
          if (idx === -1) cfState.solved.push(key); else cfState.solved.splice(idx, 1);
          localStorage.setItem(CF_SOLVED_KEY, JSON.stringify(cfState.solved));
          renderPage();
          if (cfState.activeTab === 'favs') renderFavs();
        });
      });
      container.querySelectorAll('[data-action="fav"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.key;
          if (key in cfState.favoritesData) {
            delete cfState.favoritesData[key];
          } else {
            // Find the problem object to store full data
            const problem = cfState.allProblems.find(p => problemKey(p) === key);
            if (problem) {
              cfState.favoritesData[key] = {
                contestId: problem.contestId,
                index: problem.index,
                name: problem.name,
                rating: problem.rating,
                tags: problem.tags || [],
              };
            }
          }
          localStorage.setItem(CF_FAV_KEY, JSON.stringify(cfState.favoritesData));
          renderPage();
          if (cfState.activeTab === 'favs') renderFavs();
        });
      });
    }

    function renderPage() {
      const { filtered, page } = cfState;
      const total      = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      const slice      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

      sortRow.style.display = total > 0 ? 'flex' : 'none';
      countEl.style.display = total > 0 ? 'block' : 'none';
      countEl.textContent = fmt(t.search.problemsFound, { n: total });

      if (total === 0) {
        resultsList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px">${t.search.noResults}</div>`;
        paginationEl.innerHTML = '';
        return;
      }

      resultsList.innerHTML = slice.map(p => renderProblemCard(p)).join('');
      attachCardListeners(resultsList);
      renderPagination(totalPages);
    }

    function renderFavs() {
      const favProblems = Object.values(cfState.favoritesData);
      if (favProblems.length === 0) {
        favsList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px">${t.search.noFavorites}</div>`;
        return;
      }
      favsList.innerHTML = favProblems.map(p => renderProblemCard(p)).join('');
      attachCardListeners(favsList);
    }

    function renderPagination(totalPages) {
      if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }
      const { page } = cfState;
      const start = Math.max(1, page - 3);
      const end   = Math.min(totalPages, start + 6);
      let html = `<button class="cf-page-btn" id="cf-prev" ${page === 1 ? 'disabled' : ''}>${t.search.prevPage}</button>`;
      for (let i = start; i <= end; i++) {
        html += `<button class="cf-page-btn${i === page ? ' active' : ''}" data-p="${i}">${i}</button>`;
      }
      if (t.search.pageOf) {
        html += `<span style="font-size:12px;color:var(--text-muted);padding:0 6px">${fmt(t.search.pageOf, { page, total: totalPages })}</span>`;
      }
      html += `<button class="cf-page-btn" id="cf-next" ${page === totalPages ? 'disabled' : ''}>${t.search.nextPage}</button>`;
      paginationEl.innerHTML = html;

      paginationEl.querySelectorAll('[data-p]').forEach(btn => {
        btn.addEventListener('click', () => { cfState.page = parseInt(btn.dataset.p, 10); renderPage(); });
      });
      const prevBtn = document.getElementById('cf-prev');
      const nextBtn = document.getElementById('cf-next');
      if (prevBtn) prevBtn.addEventListener('click', () => { if (cfState.page > 1) { cfState.page--; renderPage(); } });
      if (nextBtn) nextBtn.addEventListener('click', () => { if (cfState.page < totalPages) { cfState.page++; renderPage(); } });
    }

    function showStatus(msg, isError, withRetry) {
      statusEl.className = 'cf-status' + (isError ? ' error' : '');
      statusEl.style.display = 'block';
      if (withRetry) {
        statusEl.innerHTML = `${esc(msg)} <button type="button" class="cf-retry-btn" id="cf-retry-btn">${esc(t.search.retryBtn || 'Retry')}</button>`;
        const retryBtn = document.getElementById('cf-retry-btn');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            cfState.allProblems = []; // force refetch
            doSearch();
          });
        }
      } else {
        statusEl.textContent = msg;
      }
    }
    function hideStatus() { statusEl.style.display = 'none'; statusEl.innerHTML = ''; }
  }

  // ── Video Library ─────────────────────────────────────────────
  function initVideoSearch() {
    // Data is loaded by videos-data-{lang}.js → window.videosData
    const data = (typeof videosData !== 'undefined') ? videosData : null;

    const sectionEl    = document.querySelector('.page-section[data-section="videos"]');
    if (!sectionEl) return;

    // Populate static heading strings
    const titleEl    = document.getElementById('vl-title');
    const subtitleEl = document.getElementById('vl-subtitle');
    const tagsLabelEl = document.getElementById('vl-tags-label');
    if (titleEl)    titleEl.textContent    = t.videos.title;
    if (subtitleEl) subtitleEl.textContent = t.videos.subtitle;
    if (tagsLabelEl) tagsLabelEl.textContent = t.videos.tagsLabel;

    const queryInput  = document.getElementById('vl-query');
    const resultsEl   = document.getElementById('vl-results');
    const channelRow  = document.getElementById('vl-channel-row');
    const tagCloudEl  = document.getElementById('vl-tag-cloud');
    const clearTagBtn = document.getElementById('vl-clear-tags');

    if (!queryInput || !resultsEl) return;

    // Placeholder
    queryInput.placeholder = t.videos.searchPlaceholder;
    if (clearTagBtn) clearTagBtn.textContent = t.videos.clearTags;

    // If no data file yet, show a placeholder message
    if (!data || !data.videos || data.videos.length === 0) {
      resultsEl.innerHTML = `<p style="padding:24px;color:var(--text-muted);text-align:center">
        ${t.videos.noResults}
      </p>`;
      return;
    }

    const allVideos = data.videos;

    const vState = {
      query: '',
      channel: '',    // '' = all
      tags: [],       // selected topic tags
    };

    // -- CP topic tags derived from all videos
    const allTags = [...new Set(allVideos.flatMap(v => v.tags || []))].sort();

    // Build tag cloud
    if (tagCloudEl && allTags.length > 0) {
      allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'vl-tag';
        btn.textContent = tag;
        btn.addEventListener('click', () => {
          const idx = vState.tags.indexOf(tag);
          if (idx === -1) { vState.tags.push(tag); btn.classList.add('selected'); }
          else { vState.tags.splice(idx, 1); btn.classList.remove('selected'); }
          render();
        });
        tagCloudEl.appendChild(btn);
      });
    }

    if (clearTagBtn) {
      clearTagBtn.addEventListener('click', () => {
        vState.tags = [];
        if (tagCloudEl) tagCloudEl.querySelectorAll('.vl-tag').forEach(b => b.classList.remove('selected'));
        render();
      });
    }

    // Build channel filter row
    if (channelRow) {
      const allBtn = document.createElement('button');
      allBtn.className = 'vl-channel-btn active';
      allBtn.textContent = t.videos.channelAll;
      allBtn.dataset.ch = '';
      channelRow.appendChild(allBtn);

      (data.channels || []).forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'vl-channel-btn';
        btn.textContent = ch.name;
        btn.dataset.ch = ch.id;
        channelRow.appendChild(btn);
      });

      channelRow.addEventListener('click', e => {
        const btn = e.target.closest('.vl-channel-btn');
        if (!btn) return;
        vState.channel = btn.dataset.ch || '';
        channelRow.querySelectorAll('.vl-channel-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.ch === vState.channel);
        });
        render();
      });
    }

    // Search input
    let debounceVL = null;
    queryInput.addEventListener('input', e => {
      vState.query = e.target.value;
      clearTimeout(debounceVL);
      debounceVL = setTimeout(render, 160);
    });

    // Util: format seconds → MM:SS / H:MM:SS
    function fmtTime(secs) {
      const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = Math.floor(secs % 60);
      if (h > 0) return h + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
      return m + ':' + String(s).padStart(2,'0');
    }

    // Filter + render
    function render() {
      const q    = vState.query.trim().toLowerCase();
      const tags = vState.tags;
      const ch   = vState.channel;

      let filtered = allVideos.filter(v => {
        if (ch && v.channel !== ch) return false;
        if (tags.length > 0 && !tags.some(tag => (v.tags || []).includes(tag))) return false;
        if (!q) return true;
        // Match title
        if (v.title.toLowerCase().includes(q)) return true;
        // Match transcript text
        return (v.segments || []).some(seg => seg.text.toLowerCase().includes(q));
      });

      if (filtered.length === 0) {
        resultsEl.innerHTML = `<p style="padding:32px;text-align:center;color:var(--text-muted)">${t.videos.noResults}</p>`;
        return;
      }

      resultsEl.innerHTML = filtered.map(v => {
        // Find transcript matches
        const segs = v.segments || [];
        const matchedSegs = q ? segs.filter(seg => seg.text.toLowerCase().includes(q)).slice(0, 5) : [];
        const ytBase      = 'https://www.youtube.com/watch?v=' + v.id;
        const titleMatched = q && v.title.toLowerCase().includes(q);
        const segsHtml    = matchedSegs.length > 0
          ? matchedSegs.map(seg => {
              const ts = fmtTime(seg.t);
              const href = ytBase + '&t=' + seg.t + 's';
              const snippet = esc(seg.text.slice(0, 100));
              return `<a class="vl-segment" href="${href}" target="_blank" rel="noopener">
                <span class="vl-seg-ts">${fmt(t.videos.watchAt, { ts })}</span>
                <span class="vl-seg-text">${snippet}…</span>
              </a>`;
            }).join('')
          : '';

        const matchCount = matchedSegs.length > 0
          ? `<span class="vl-match-count">${fmt(t.videos.matchesFound, { n: matchedSegs.length })}</span>`
          : '';

        // Spec: show noTranscript when title matches but no segment text is available
        const noTranscriptNote = (q && titleMatched && segs.length === 0)
          ? `<span class="vl-no-transcript">${esc(t.videos.noTranscript)}</span>`
          : '';

        return `<div class="vl-card">
          <a href="${ytBase}" target="_blank" rel="noopener" class="vl-thumb-link">
            <img class="vl-thumb" src="${v.thumbnail}" loading="lazy" alt="${esc(v.title)}" />
            <span class="vl-duration-badge">${v.duration || ''}</span>
          </a>
          <div class="vl-info">
            <a class="vl-title" href="${ytBase}" target="_blank" rel="noopener">${esc(v.title)}</a>
            <div class="vl-meta">
              <span class="vl-channel">${esc(v.channelName)}</span>
              ${(v.tags || []).slice(0, 4).map(tag => `<span class="vl-badge">${esc(tag)}</span>`).join('')}
              <a class="vl-open" href="${ytBase}" target="_blank" rel="noopener">${esc(t.videos.openVideo)}</a>
            </div>
            ${matchCount}
            ${noTranscriptNote}
            ${segsHtml ? `<div class="vl-segments">${segsHtml}</div>` : ''}
          </div>
        </div>`;
      }).join('');
    }

    render(); // initial render shows all videos
  }

  // ── ICPC Preliminaries library ────────────────────────────────
  function initIcpcPrelims() {
    const data = (typeof icpcPrelimsData !== 'undefined') ? icpcPrelimsData : null;
    const sectionEl = document.querySelector('.page-section[data-section="icpc-prelims"]');
    if (!sectionEl) return;

    const ip = t.icpcPrelims || {};
    const titleEl = document.getElementById('ip-title');
    const subtitleEl = document.getElementById('ip-subtitle');
    const regionRow = document.getElementById('ip-region-row');
    const kindRow = document.getElementById('ip-kind-row');
    const countEl = document.getElementById('ip-count');
    const resultsEl = document.getElementById('ip-results');
    const editorialOverlay = document.getElementById('ip-editorial-overlay');
    const editorialTitle = document.getElementById('ip-editorial-title');
    const editorialNote = document.getElementById('ip-editorial-note');
    const editorialList = document.getElementById('ip-editorial-list');
    const editorialClose = document.getElementById('ip-editorial-close');
    if (!resultsEl) return;

    if (titleEl) titleEl.textContent = ip.title || 'ACM ICPC Preliminaries';
    if (subtitleEl) subtitleEl.textContent = ip.subtitle || '';

    if (!data || !data.contests || data.contests.length === 0) {
      resultsEl.innerHTML = `<p class="ip-empty">${ip.noResults || 'No problem sets found.'}</p>`;
      return;
    }

    const kindLabels = {
      preliminary: ip.kindPreliminary || 'Preliminary',
      qualifier: ip.kindQualifier || 'Qualifier',
      subregional: ip.kindSubregional || 'Sub-Regional',
      regional: ip.kindRegional || 'Regional',
    };

    const regionName = (id) => {
      const r = (data.regions || []).find((x) => x.id === id);
      return r ? r.name : id;
    };

    const ipState = { region: '', kind: '' };
    let editorialTrigger = null;

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function getEditorial(editorialId) {
      if (
        editorialId === 'dhaka2025Editorial' &&
        typeof dhaka2025Editorial !== 'undefined'
      ) {
        return dhaka2025Editorial;
      }
      return null;
    }

    function closeEditorial() {
      if (!editorialOverlay) return;
      editorialOverlay.hidden = true;
      document.body.style.overflow = '';
      if (editorialTrigger) editorialTrigger.focus();
      editorialTrigger = null;
    }

    function openEditorial(editorialId, trigger) {
      const editorial = getEditorial(editorialId);
      if (!editorial || !editorialOverlay || !editorialList) return;

      editorialTrigger = trigger;
      if (editorialTitle) editorialTitle.textContent = editorial.title;
      if (editorialNote) editorialNote.textContent = editorial.difficultyNote || '';
      if (editorialClose) {
        editorialClose.setAttribute('aria-label', ip.closeEditorial || 'Close editorial');
      }

      editorialList.innerHTML = editorial.problems.map((problem) => {
        const topics = (problem.topics || [])
          .map((topic) => `<span class="ip-badge">${escapeHtml(topic)}</span>`)
          .join('');
        const steps = (problem.analysis || [])
          .map((step) => `<li>${escapeHtml(step)}</li>`)
          .join('');
        return `
          <article class="ip-editorial-problem">
            <div class="ip-editorial-problem-head">
              <h4 class="ip-editorial-problem-title">
                ${escapeHtml(problem.id)}. ${escapeHtml(problem.title)}
              </h4>
              <span class="ip-difficulty">
                ${escapeHtml(ip.difficulty || 'Difficulty')}: ${escapeHtml(problem.difficulty)}
                · ~${escapeHtml(problem.rating)}
              </span>
            </div>
            <div class="ip-topic-row">${topics}</div>
            <pre class="ip-ascii">${escapeHtml(problem.ascii)}</pre>
            <h5 class="ip-editorial-section-title">${escapeHtml(ip.keyInsight || 'Key insight')}</h5>
            <div class="ip-insight">${escapeHtml(problem.insight)}</div>
            <h5 class="ip-editorial-section-title">${escapeHtml(ip.solutionAnalysis || 'How to solve it')}</h5>
            <ol class="ip-analysis">${steps}</ol>
            <h5 class="ip-editorial-section-title">${escapeHtml(ip.complexity || 'Complexity')}</h5>
            <div class="ip-complexity">${escapeHtml(problem.complexity)}</div>
          </article>`;
      }).join('');

      editorialOverlay.hidden = false;
      document.body.style.overflow = 'hidden';
      if (editorialClose) editorialClose.focus();
    }

    if (editorialClose) editorialClose.addEventListener('click', closeEditorial);
    if (editorialOverlay) {
      editorialOverlay.addEventListener('click', (event) => {
        if (event.target === editorialOverlay) closeEditorial();
      });
    }
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && editorialOverlay && !editorialOverlay.hidden) {
        closeEditorial();
      }
    });

    function setActiveButtons(row, activeValue) {
      if (!row) return;
      row.querySelectorAll('button').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.value === activeValue);
      });
    }

    function buildFilterRow(row, options, allLabel, onPick) {
      if (!row) return;
      row.innerHTML = '';
      const allBtn = document.createElement('button');
      allBtn.className = 'ip-filter-btn active';
      allBtn.dataset.value = '';
      allBtn.textContent = allLabel;
      allBtn.addEventListener('click', () => onPick(''));
      row.appendChild(allBtn);
      options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'ip-filter-btn';
        btn.dataset.value = opt.value;
        btn.textContent = opt.label;
        btn.addEventListener('click', () => onPick(opt.value));
        row.appendChild(btn);
      });
    }

    buildFilterRow(
      regionRow,
      (data.regions || []).map((r) => ({ value: r.id, label: r.name })),
      ip.regionAll || 'All Regions',
      (value) => {
        ipState.region = value;
        setActiveButtons(regionRow, value);
        render();
      }
    );

    buildFilterRow(
      kindRow,
      Object.keys(kindLabels).map((k) => ({ value: k, label: kindLabels[k] })),
      ip.kindAll || 'All Types',
      (value) => {
        ipState.kind = value;
        setActiveButtons(kindRow, value);
        render();
      }
    );

    function render() {
      let list = data.contests.slice();
      if (ipState.region) list = list.filter((c) => c.region === ipState.region);
      if (ipState.kind) list = list.filter((c) => c.kind === ipState.kind);
      list.sort((a, b) => (b.year - a.year) || String(a.title).localeCompare(String(b.title)));

      if (countEl) {
        countEl.textContent = fmt(ip.countFound || '{n} problem sets', { n: list.length });
        countEl.style.display = 'block';
      }

      if (list.length === 0) {
        resultsEl.innerHTML = `<p class="ip-empty">${ip.noResults || 'No problem sets found.'}</p>`;
        return;
      }

      resultsEl.innerHTML = list.map((c) => {
        const href = `${base}icpc-prelims/${c.file}`;
        const kindLabel = kindLabels[c.kind] || c.kind;
        const notes = c.notes
          ? `<div class="ip-notes">${c.notes}</div>`
          : '';
        const source = c.source
          ? `<a class="ip-source" href="${c.source}" target="_blank" rel="noopener noreferrer">${ip.sourceLabel || 'Source'} ↗</a>`
          : '';
        const editorialButton = c.editorial && getEditorial(c.editorial)
          ? `<button class="ip-btn ip-editorial-btn" type="button" data-editorial="${c.editorial}">${ip.editorial || 'Editorial'}</button>`
          : '';
        return `
          <div class="ip-card">
            <div class="ip-year">${c.year}</div>
            <div class="ip-info">
              <div class="ip-card-title">${c.title}</div>
              <div class="ip-meta">
                <span class="ip-badge">${regionName(c.region)}</span>
                <span class="ip-badge ip-badge-kind">${kindLabel}</span>
                ${source}
              </div>
              ${notes}
              <div class="ip-actions">
                <a class="ip-btn ip-btn-primary" href="${href}" target="_blank" rel="noopener noreferrer">${ip.openPdf || 'Open PDF'}</a>
                <a class="ip-btn" href="${href}" download="${c.file}">${ip.download || 'Download'}</a>
                ${editorialButton}
              </div>
            </div>
          </div>`;
      }).join('');

      resultsEl.querySelectorAll('.ip-editorial-btn').forEach((button) => {
        button.addEventListener('click', () => {
          openEditorial(button.dataset.editorial, button);
        });
      });
    }

    render();
  }

  // ── ICPC Regionals library ────────────────────────────────────
  function initIcpcRegionals() {
    const data = (typeof icpcRegionalsData !== 'undefined') ? icpcRegionalsData : null;
    const sectionEl = document.querySelector('.page-section[data-section="icpc-regionals"]');
    if (!sectionEl) return;

    const ir = t.icpcRegionals || {};
    const titleEl = document.getElementById('ir-title');
    const subtitleEl = document.getElementById('ir-subtitle');
    const regionRow = document.getElementById('ir-region-row');
    const countEl = document.getElementById('ir-count');
    const resultsEl = document.getElementById('ir-results');
    if (!resultsEl) return;

    if (titleEl) titleEl.textContent = ir.title || 'ACM ICPC Regionals';
    if (subtitleEl) subtitleEl.textContent = ir.subtitle || '';

    if (!data || !data.contests || data.contests.length === 0) {
      resultsEl.innerHTML = `<p class="ip-empty">${ir.noResults || 'No problem sets found.'}</p>`;
      return;
    }

    const regionName = (id) => {
      const r = (data.regions || []).find((x) => x.id === id);
      return r ? r.name : id;
    };

    const irState = { region: '' };

    function setActiveButtons(row, activeValue) {
      if (!row) return;
      row.querySelectorAll('button').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.value === activeValue);
      });
    }

    function buildFilterRow(row, options, allLabel, onPick) {
      if (!row) return;
      row.innerHTML = '';
      const allBtn = document.createElement('button');
      allBtn.className = 'ip-filter-btn active';
      allBtn.dataset.value = '';
      allBtn.textContent = allLabel;
      allBtn.addEventListener('click', () => onPick(''));
      row.appendChild(allBtn);
      options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'ip-filter-btn';
        btn.dataset.value = opt.value;
        btn.textContent = opt.label;
        btn.addEventListener('click', () => onPick(opt.value));
        row.appendChild(btn);
      });
    }

    buildFilterRow(
      regionRow,
      (data.regions || []).map((r) => ({ value: r.id, label: r.name })),
      ir.regionAll || 'All Regions',
      (value) => {
        irState.region = value;
        setActiveButtons(regionRow, value);
        render();
      }
    );

    function render() {
      let list = data.contests.slice();
      if (irState.region) list = list.filter((c) => c.region === irState.region);
      list.sort((a, b) => (b.year - a.year) || String(a.title).localeCompare(String(b.title)));

      if (countEl) {
        countEl.textContent = fmt(ir.countFound || '{n} problem sets', { n: list.length });
        countEl.style.display = 'block';
      }

      if (list.length === 0) {
        resultsEl.innerHTML = `<p class="ip-empty">${ir.noResults || 'No problem sets found.'}</p>`;
        return;
      }

      resultsEl.innerHTML = list.map((c) => {
        const href = `${base}icpc-regionals/${c.file}`;
        const notes = c.notes
          ? `<div class="ip-notes">${c.notes}</div>`
          : '';
        const source = c.source
          ? `<a class="ip-source" href="${c.source}" target="_blank" rel="noopener noreferrer">${ir.sourceLabel || 'Source'} ↗</a>`
          : '';
        return `
          <div class="ip-card">
            <div class="ip-year">${c.year}</div>
            <div class="ip-info">
              <div class="ip-card-title">${c.title}</div>
              <div class="ip-meta">
                <span class="ip-badge">${regionName(c.region)}</span>
                ${source}
              </div>
              ${notes}
              <div class="ip-actions">
                <a class="ip-btn ip-btn-primary" href="${href}" target="_blank" rel="noopener noreferrer">${ir.openPdf || 'Open PDF'}</a>
                <a class="ip-btn" href="${href}" download="${c.file}">${ir.download || 'Download'}</a>
              </div>
            </div>
          </div>`;
      }).join('');
    }

    render();
  }

  // ── Init ──────────────────────────────────────────────────────
  applyTheme(state.theme);
  buildSidebar();
  buildAlgoGrid();
  updateProgress();

  // Deep-link: ?section=search|videos|… or #search / #videos (spec G-3)
  function applySectionFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('section');
    const fromHash = (window.location.hash || '').replace(/^#/, '');
    const target = fromQuery || fromHash;
    const valid = new Set([
      'overview', 'algorithms', 'roadmap', 'tools', 'search', 'videos', 'detail',
      'icpc-prelims', 'icpc-regionals',
    ]);
    if (target && valid.has(target)) {
      setActiveSection(target);
      if (target === 'search') updateActiveSidebarItem('search-problems');
      else if (target === 'videos') updateActiveSidebarItem('watch-videos');
      else if (target === 'icpc-prelims') updateActiveSidebarItem('icpc-prelims');
      else if (target === 'icpc-regionals') updateActiveSidebarItem('icpc-regionals');
      return;
    }
    setActiveSection('overview');
  }
  applySectionFromUrl();

  initCfSearch();
  initVideoSearch();
  initIcpcPrelims();
  initIcpcRegionals();
})();
