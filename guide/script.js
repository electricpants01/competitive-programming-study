/* ============================================================
   CP Study Guide — Main Script
   ============================================================ */

(function () {
  "use strict";

  // ── State ───────────────────────────────────────────────────
  const state = {
    theme: localStorage.getItem("cp-theme") || "light",
    activeSection: "overview",
    sidebarCollapsed: false,
    searchQuery: "",
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
  const modalCloseBtn = document.getElementById("modal-close");
  const sidebarNav = document.getElementById("sidebar-nav");

  // ── Theme ────────────────────────────────────────────────────
  function applyTheme(t) {
    state.theme = t;
    html.setAttribute("data-theme", t);
    localStorage.setItem("cp-theme", t);
    themeIcon.innerHTML =
      t === "dark"
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
             <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
             <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
             <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
           </svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
           </svg>`;
  }

  themeToggleBtn.addEventListener("click", () =>
    applyTheme(state.theme === "dark" ? "light" : "dark")
  );

  // ── Sidebar ──────────────────────────────────────────────────
  function setSidebarCollapsed(collapsed) {
    state.sidebarCollapsed = collapsed;
    sidebarEl.classList.toggle("collapsed", collapsed);
    mainEl.classList.toggle("sidebar-collapsed", collapsed);
    const arrow = sidebarToggleBtn.querySelector("svg");
    if (arrow)
      arrow.style.transform = collapsed ? "rotate(180deg)" : "rotate(0deg)";
  }

  sidebarToggleBtn.addEventListener("click", () =>
    setSidebarCollapsed(!state.sidebarCollapsed)
  );

  // Mobile sidebar toggle
  const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");
  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener("click", () =>
      sidebarEl.classList.toggle("mobile-open")
    );
  }

  // ── Build sidebar nav ────────────────────────────────────────
  function buildSidebar() {
    sidebarNav.innerHTML = "";
    sidebarSections.forEach((section) => {
      const sectionEl = document.createElement("div");
      sectionEl.className = "sidebar-section";

      const labelEl = document.createElement("div");
      labelEl.className = "sidebar-section-label";
      labelEl.textContent = section.label;
      sectionEl.appendChild(labelEl);

      section.items.forEach((item) => {
        const btn = document.createElement("button");
        btn.className = "sidebar-item";
        btn.dataset.id = item.id;
        btn.innerHTML = `<span class="item-dot"></span>${item.title}`;
        btn.addEventListener("click", () => {
          handleSidebarItemClick(item.id);
          // mobile: close sidebar after click
          if (window.innerWidth <= 768) sidebarEl.classList.remove("mobile-open");
        });
        sectionEl.appendChild(btn);
      });

      sidebarNav.appendChild(sectionEl);
    });
    updateActiveSidebarItem(null);
  }

  function updateActiveSidebarItem(id) {
    document.querySelectorAll(".sidebar-item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.id === id);
    });
  }

  function handleSidebarItemClick(id) {
    // Mark as visited
    if (!state.visitedItems.includes(id)) {
      state.visitedItems.push(id);
      localStorage.setItem("cp-visited", JSON.stringify(state.visitedItems));
    }
    updateProgress();
    updateActiveSidebarItem(id);

    // Check if it's an algorithm
    if (algorithmsData[id]) {
      // Switch to algorithms section and open modal
      setActiveSection("algorithms");
      openModal(id);
    } else {
      // Overview items: just scroll to anchor if exists
      const anchor = document.getElementById("overview-" + id);
      if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
    }
  }

  // ── Progress ─────────────────────────────────────────────────
  function updateProgress() {
    const total = sidebarSections.reduce(
      (acc, s) => acc + s.items.length,
      0
    );
    const visited = state.visitedItems.length;
    const pct = Math.round((visited / total) * 100);
    progressFill.style.width = pct + "%";
    progressLabel.textContent = pct + "% Complete";
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

  // Quick nav cards
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", () => setActiveSection(el.dataset.goto));
  });

  // ── Build Algorithm Grid ──────────────────────────────────────
  function difficultyBadgeClass(d) {
    const dl = d.toLowerCase();
    if (dl.includes("beginner")) return "badge-beginner";
    if (dl.includes("advanced")) return "badge-advanced";
    return "badge-intermediate";
  }

  function buildAlgoGrid() {
    algoGrid.innerHTML = "";
    Object.entries(algorithmsData).forEach(([id, algo]) => {
      const card = document.createElement("div");
      card.className = "algo-card";
      card.innerHTML = `
        <div class="algo-card-header">
          <div class="algo-card-title">${algo.title}</div>
          <div class="algo-badges">
            <span class="badge badge-category">${algo.category}</span>
            <span class="badge ${difficultyBadgeClass(algo.difficulty)}">${algo.difficulty}</span>
          </div>
        </div>
        <div class="algo-card-body">
          <div class="algo-card-desc">${algo.description}</div>
          <div class="algo-card-meta">
            <span class="algo-meta-item">⏱ ${algo.timeToLearn}</span>
            <span class="algo-meta-item">⚡ ${algo.importance}</span>
          </div>
        </div>
      `;
      card.addEventListener("click", () => openModal(id));
      algoGrid.appendChild(card);
    });
  }

  // ── Modal ─────────────────────────────────────────────────────
  function openModal(id) {
    const algo = algorithmsData[id];
    if (!algo) return;

    // Track visit
    if (!state.visitedItems.includes(id)) {
      state.visitedItems.push(id);
      localStorage.setItem("cp-visited", JSON.stringify(state.visitedItems));
      updateProgress();
    }
    updateActiveSidebarItem(id);

    const examplesHTML = (algo.examples || [])
      .map(
        (ex, i) => `
      <div class="code-example">
        <div class="code-example-header">
          <div class="code-example-title">${ex.title}</div>
          <button class="code-copy-btn" data-index="${i}">Copy</button>
        </div>
        ${ex.description ? `<div style="padding:8px 16px;font-size:12px;color:var(--text-secondary);border-bottom:1px solid var(--border)">${ex.description}</div>` : ""}
        <pre class="code-block">${escapeHtml(ex.codeSnippet)}</pre>
      </div>`
      )
      .join("");

    const keyTechHTML = (algo.keyTechniques || [])
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");

    const benefitsHTML = (algo.benefits || [])
      .map((b) => `<li>${b}</li>`)
      .join("");

    const bestPracticesHTML = (algo.bestPractices || [])
      .map((b) => `<li>${b}</li>`)
      .join("");

    const constraintsHTML = (algo.typicalConstraints || [])
      .map((c) => `<span class="tag">${c}</span>`)
      .join("");

    const problemsHTML = (algo.problems || [])
      .map((p) => `<span class="problem-chip">${p}</span>`)
      .join("");

    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <div class="modal-title">${algo.title}</div>
          <div class="algo-badges">
            <span class="badge badge-category">${algo.category}</span>
            <span class="badge ${difficultyBadgeClass(algo.difficulty)}">${algo.difficulty}</span>
            <span class="badge" style="background:var(--bg-body);border:1px solid var(--border);color:var(--text-secondary)">
              ⏱ ${algo.timeToLearn}
            </span>
          </div>
        </div>
        <button class="modal-close" id="modal-close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-section">
          <div class="modal-section-title">Description</div>
          <div class="modal-desc">${algo.description}</div>
        </div>
        ${keyTechHTML ? `<div class="modal-section">
          <div class="modal-section-title">Key Techniques</div>
          <div class="tag-list">${keyTechHTML}</div>
        </div>` : ""}
        ${constraintsHTML ? `<div class="modal-section">
          <div class="modal-section-title">Typical Constraints</div>
          <div class="tag-list">${constraintsHTML}</div>
        </div>` : ""}
        ${benefitsHTML ? `<div class="modal-section">
          <div class="modal-section-title">Why Learn This</div>
          <ul class="bullet-list">${benefitsHTML}</ul>
        </div>` : ""}
        ${examplesHTML ? `<div class="modal-section">
          <div class="modal-section-title">Code Examples (C++)</div>
          ${examplesHTML}
        </div>` : ""}
        ${bestPracticesHTML ? `<div class="modal-section">
          <div class="modal-section-title">Best Practices</div>
          <ul class="bullet-list">${bestPracticesHTML}</ul>
        </div>` : ""}
        ${problemsHTML ? `<div class="modal-section">
          <div class="modal-section-title">Practice Problems</div>
          <div class="problems-list">${problemsHTML}</div>
        </div>` : ""}
      </div>
    `;

    modalBackdrop.classList.add("visible");
    document.body.style.overflow = "hidden";

    // Wire close button (re-queried since innerHTML was replaced)
    document.getElementById("modal-close").addEventListener("click", closeModal);

    // Wire copy buttons
    modalContent.querySelectorAll(".code-copy-btn").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        const snippet = algo.examples[i].codeSnippet;
        navigator.clipboard.writeText(snippet).then(() => {
          btn.textContent = "Copied!";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 1800);
        });
      });
    });
  }

  function closeModal() {
    modalBackdrop.classList.remove("visible");
    document.body.style.overflow = "";
  }

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalBackdrop.classList.contains("visible")) closeModal();
      else if (searchOverlay.classList.contains("visible")) closeSearch();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // ── Search ────────────────────────────────────────────────────
  function buildSearchIndex() {
    const index = [];
    Object.entries(algorithmsData).forEach(([id, algo]) => {
      index.push({
        id,
        title: algo.title,
        category: algo.category,
        difficulty: algo.difficulty,
        description: algo.description,
        keywords: [
          ...(algo.keyTechniques || []),
          ...(algo.useCases || []),
        ].join(" ").toLowerCase(),
      });
    });
    // Also index sidebar items without data
    sidebarSections.forEach((section) => {
      section.items.forEach((item) => {
        if (!algorithmsData[item.id]) {
          index.push({
            id: item.id,
            title: item.title,
            category: section.label,
            difficulty: "",
            description: "",
            keywords: item.title.toLowerCase(),
          });
        }
      });
    });
    return index;
  }

  const searchIndex = buildSearchIndex();

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.difficulty.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.includes(q)
    );
  }

  function renderSearchResults(results, query) {
    searchResultsContainer.innerHTML = "";
    if (!query.trim()) {
      searchOverlay.classList.remove("visible");
      return;
    }
    searchOverlay.classList.add("visible");
    if (results.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="search-no-results">No results for "<strong>${escapeHtml(query)}</strong>"</div>`;
      return;
    }
    const title = document.createElement("div");
    title.className = "search-results-title";
    title.textContent = `${results.length} result${results.length !== 1 ? "s" : ""}`;
    searchResultsContainer.appendChild(title);

    results.forEach((r) => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      item.innerHTML = `
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-meta">${r.category}${r.difficulty ? " · " + r.difficulty : ""}</div>
      `;
      item.addEventListener("click", () => {
        closeSearch();
        handleSidebarItemClick(r.id);
      });
      searchResultsContainer.appendChild(item);
    });
  }

  function closeSearch() {
    searchOverlay.classList.remove("visible");
    searchInput.value = "";
    searchClearBtn.classList.remove("visible");
    state.searchQuery = "";
  }

  let searchDebounce = null;
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value;
    state.searchQuery = q;
    searchClearBtn.classList.toggle("visible", q.length > 0);
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      renderSearchResults(runSearch(q), q);
    }, 180);
  });

  searchClearBtn.addEventListener("click", closeSearch);

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  // ── Utility ───────────────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    applyTheme(state.theme);
    buildSidebar();
    buildAlgoGrid();
    updateProgress();
    setActiveSection("overview");
  }

  init();
})();