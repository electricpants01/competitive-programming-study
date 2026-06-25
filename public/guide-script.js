/* ============================================================
   CP Study Guide — Interactive Script (Astro version)
   Reads translations from window.__CP_T__ injected server-side
   ============================================================ */
(function () {
  "use strict";

  const t = window.__CP_T__;
  const lang = window.__CP_LANG__ || 'en';

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
    { key: 'OVERVIEW', items: ['introduction', 'learning-path', 'assessment'] },
    { key: 'FUNDAMENTALS', items: ['complexity-analysis', 'arrays-strings', 'stl-guide'] },
    { key: 'ALGORITHMS', items: ['two-pointers', 'sliding-window', 'binary-search', 'sorting'] },
    { key: 'GRAPH_THEORY', items: ['bfs', 'dfs', 'dijkstra', 'union-find'] },
    { key: 'DYNAMIC_PROGRAMMING', items: ['dp-1d', 'dp-2d', 'knapsack', 'bitmask-dp'] },
    { key: 'TREES_ADVANCED', items: ['segment-tree', 'fenwick-tree', 'trie'] },
    { key: 'MATHEMATICS', items: ['modular-arithmetic', 'sieve', 'combinatorics'] },
    { key: 'PRACTICE', items: ['search-problems'] },
  ];

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
        const btn = document.createElement("button");
        btn.className = "sidebar-item";
        btn.dataset.id = id;
        btn.innerHTML = `<span class="item-dot"></span>${itemLabel}`;
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

    if (id === 'search-problems') {
      setActiveSection("search");
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
    const pct = Math.round((state.visitedItems.length / total) * 100);
    progressFill.style.width = pct + "%";
    if (typeof t.sidebar.progress === 'function') {
      progressLabel.textContent = t.sidebar.progress(pct);
    } else {
      progressLabel.textContent = pct + "% Complete";
    }
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
    const quizTitle = lang === 'es' ? '🧠 Mini Quiz' : '🧠 Mini Quiz';
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
    const scoreLabel = lang === 'es' ? 'Respuestas correctas: ' : 'Score: ';
    const submitLabel = lang === 'es' ? 'Ver Resultados' : 'See Results';
    const retryLabel = lang === 'es' ? 'Reintentar' : 'Retry';
    return `
      <div class="modal-section quiz-section" id="quiz-section">
        <div class="modal-section-title">${quizTitle}</div>
        <div class="quiz-body">
          ${qHtml}
          <div class="quiz-footer">
            <button class="quiz-submit-btn" id="quiz-submit">${submitLabel}</button>
            <button class="quiz-retry-btn" id="quiz-retry" style="display:none">${retryLabel}</button>
            <div class="quiz-score" id="quiz-score" style="display:none">${scoreLabel}<span id="quiz-score-val"></span></div>
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
    const scoreVal = document.getElementById('quiz-score-val');

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
      section.querySelectorAll('.quiz-question').forEach((qEl, qi) => {
        const answer = parseInt(qEl.dataset.answer, 10);
        const selected = qEl.querySelector('.quiz-option.selected');
        const feedback = qEl.querySelector('.quiz-feedback');
        qEl.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        if (!selected) {
          feedback.textContent = lang === 'es' ? '⚠️ Sin respuesta' : '⚠️ No answer selected';
          feedback.className = 'quiz-feedback quiz-feedback-miss';
        } else {
          const oi = parseInt(selected.dataset.oi, 10);
          if (oi === answer) {
            correct++;
            selected.classList.add('correct');
            feedback.textContent = lang === 'es' ? '✅ ¡Correcto!' : '✅ Correct!';
            feedback.className = 'quiz-feedback quiz-feedback-correct';
          } else {
            selected.classList.add('wrong');
            qEl.querySelectorAll('.quiz-option').forEach(b => {
              if (parseInt(b.dataset.oi, 10) === answer) b.classList.add('correct');
            });
            feedback.textContent = lang === 'es' ? '❌ Incorrecto' : '❌ Incorrect';
            feedback.className = 'quiz-feedback quiz-feedback-wrong';
          }
        }
        feedback.style.display = 'block';
      });
      const total = quiz.length;
      scoreVal.textContent = `${correct} / ${total}`;
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
        const resp = await fetch('https://codeforces.com/api/problemset.problems');
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        const data = await resp.json();
        if (data.status !== 'OK') throw new Error('CF API error');
        cfState.allProblems = (data.result.problems || []).filter(p => p.rating);
        cfState.page = 1;
        applyFilterSort();
        hideStatus();
        renderPage();
      } catch (_) {
        showStatus(t.search.errorMsg, true);
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
          <button class="cf-action-btn${isSolved ? ' solved-active' : ''}" data-action="solve" data-key="${key}">
            ${isSolved ? '✅' : (t.search.markSolved || 'Solved')}
          </button>
          <button class="cf-action-btn${isFav ? ' fav-active' : ''}" data-action="fav" data-key="${key}">
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
      if (typeof t.search.problemsFound === 'function') countEl.textContent = t.search.problemsFound(total);

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
      if (typeof t.search.pageOf === 'function') {
        html += `<span style="font-size:12px;color:var(--text-muted);padding:0 6px">${t.search.pageOf(page, totalPages)}</span>`;
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

    function showStatus(msg, isError) {
      statusEl.textContent = msg;
      statusEl.className = 'cf-status' + (isError ? ' error' : '');
      statusEl.style.display = 'block';
    }
    function hideStatus() { statusEl.style.display = 'none'; }
  }

  // ── Init ──────────────────────────────────────────────────────
  applyTheme(state.theme);
  buildSidebar();
  buildAlgoGrid();
  updateProgress();
  setActiveSection("overview");
  initCfSearch();
})();