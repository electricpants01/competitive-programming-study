/* ============================================================
   CP Study Guide — Interactive Script (Astro version)
   Reads translations from window.__CP_T__ injected server-side
   ============================================================ */
(function () {
  "use strict";

  const t = window.__CP_T__;
  const lang = window.__CP_LANG__ || 'en';

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
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalContent = document.getElementById("modal-content");
  const sidebarNav = document.getElementById("sidebar-nav");

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

    if (typeof algorithmsData !== 'undefined' && algorithmsData[id]) {
      setActiveSection("algorithms");
      openModal(id);
    } else {
      const anchor = document.getElementById("overview-" + id);
      if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
    }
  }

  // ── Progress ──────────────────────────────────────────────────
  function updateProgress() {
    const total = sidebarSectionDefs.reduce((acc, s) => acc + s.items.length, 0);
    const pct = Math.round((state.visitedItems.length / total) * 100);
    progressFill.style.width = pct + "%";
    // Use translated progress label (which may be a function)
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
      card.addEventListener("click", () => openModal(id));
      algoGrid.appendChild(card);
    });
  }

  // ── Modal ─────────────────────────────────────────────────────
  function openModal(id) {
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

    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <div class="modal-title">${algo.title}</div>
          <div class="algo-badges">
            <span class="badge badge-category">${algo.category}</span>
            <span class="badge ${diffBadgeClass(algo.difficulty)}">${algo.difficulty}</span>
            <span class="badge" style="background:var(--bg-body);border:1px solid var(--border);color:var(--text-secondary)">⏱ ${algo.timeToLearn}</span>
          </div>
        </div>
        <button class="modal-close" id="modal-close" aria-label="${t.modal.close}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-section">
          <div class="modal-section-title">${t.modal.description}</div>
          <div class="modal-desc">${algo.description}</div>
        </div>
        ${keyTechHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.keyTechniques}</div><div class="tag-list">${keyTechHTML}</div></div>` : ""}
        ${constraintsHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.constraints}</div><div class="tag-list">${constraintsHTML}</div></div>` : ""}
        ${benefitsHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.whyLearn}</div><ul class="bullet-list">${benefitsHTML}</ul></div>` : ""}
        ${examplesHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.codeExamples}</div>${examplesHTML}</div>` : ""}
        ${practicesHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.bestPractices}</div><ul class="bullet-list">${practicesHTML}</ul></div>` : ""}
        ${problemsHTML ? `<div class="modal-section"><div class="modal-section-title">${t.modal.practiceProblems}</div><div class="problems-list">${problemsHTML}</div></div>` : ""}
      </div>`;

    modalBackdrop.classList.add("visible");
    document.body.style.overflow = "hidden";

    document.getElementById("modal-close").addEventListener("click", closeModal);

    modalContent.querySelectorAll(".code-copy-btn").forEach((btn, i) => {
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

  function closeModal() {
    modalBackdrop.classList.remove("visible");
    document.body.style.overflow = "";
  }

  modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalBackdrop.classList.contains("visible")) closeModal();
      else if (searchOverlay.classList.contains("visible")) closeSearch();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); searchInput.focus(); }
  });

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

  // ── Util ──────────────────────────────────────────────────────
  function esc(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ── Init ──────────────────────────────────────────────────────
  applyTheme(state.theme);
  buildSidebar();
  buildAlgoGrid();
  updateProgress();
  setActiveSection("overview");
})();