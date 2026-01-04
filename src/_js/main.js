// =========================================
// MAIN.JS - Global Scripts
// =========================================

(function () {
  "use strict";

  // -------------------------
  // Theme Toggle
  // -------------------------
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || getPreferredTheme();
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }

  // -------------------------
  // Search Modal
  // -------------------------
  const searchToggle = document.getElementById("search-toggle");
  const searchModal = document.getElementById("search-modal");
  const searchClose = document.getElementById("search-close");
  const searchContainer = document.getElementById("search-container");
  const mobileSearchToggle = document.getElementById("mobile-search-toggle");

  function openSearch() {
    if (searchModal) {
      searchModal.hidden = false;
      // Initialize Pagefind if not already
      if (searchContainer && !searchContainer.hasChildNodes()) {
        new PagefindUI({
          element: "#search-container",
          showSubResults: true,
          showImages: false,
        });
      }
      // Focus input
      setTimeout(() => {
        const input = searchContainer?.querySelector("input");
        if (input) input.focus();
      }, 100);
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.hidden = true;
    }
  }

  if (searchToggle) {
    searchToggle.addEventListener("click", openSearch);
  }

  if (mobileSearchToggle) {
    mobileSearchToggle.addEventListener("click", openSearch);
  }

  if (searchClose) {
    searchClose.addEventListener("click", closeSearch);
  }

  // Close on backdrop click
  if (searchModal) {
    searchModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("search-modal-backdrop")) {
        closeSearch();
      }
    });
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSearch();
      closeSidebars();
    }
  });

  // Cmd/Ctrl + K to open search
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
  });

  // -------------------------
  // Sidebar Controls
  // -------------------------
  const sidebarLeft = document.getElementById("sidebar-left");
  const sidebarRight = document.getElementById("sidebar-right");
  const sidebarLeftClose = document.getElementById("sidebar-left-close");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileTocToggle = document.getElementById("mobile-toc-toggle");
  const mobileOverlay = document.getElementById("mobile-overlay");

  function openSidebarLeft() {
    if (sidebarLeft) {
      sidebarLeft.classList.add("is-open");
      showOverlay();
    }
  }

  function openSidebarRight() {
    if (sidebarRight) {
      sidebarRight.classList.add("is-open");
      showOverlay();
    }
  }

  function closeSidebars() {
    if (sidebarLeft) sidebarLeft.classList.remove("is-open");
    if (sidebarRight) sidebarRight.classList.remove("is-open");
    hideOverlay();
  }

  function showOverlay() {
    if (mobileOverlay) {
      mobileOverlay.hidden = false;
      setTimeout(() => mobileOverlay.classList.add("is-visible"), 10);
    }
  }

  function hideOverlay() {
    if (mobileOverlay) {
      mobileOverlay.classList.remove("is-visible");
      setTimeout(() => (mobileOverlay.hidden = true), 300);
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", openSidebarLeft);
  }

  if (mobileTocToggle) {
    mobileTocToggle.addEventListener("click", openSidebarRight);
  }

  if (sidebarLeftClose) {
    sidebarLeftClose.addEventListener("click", closeSidebars);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeSidebars);
  }

  // -------------------------
  // Mobile Controls Visibility
  // -------------------------
  const mobileControls = document.getElementById("mobile-controls");
  let lastTap = 0;
  let controlsVisible = true;
  let scrollTimeout;

  function showMobileControls() {
    if (mobileControls) {
      mobileControls.classList.add("is-visible");
      controlsVisible = true;
    }
  }

  function hideMobileControls() {
    if (mobileControls) {
      mobileControls.classList.remove("is-visible");
      controlsVisible = false;
    }
  }

  // Show controls on tap (not scroll)
  document.addEventListener("click", (e) => {
    // Ignore if clicking on interactive elements
    if (e.target.closest("a, button, input, .sidebar, .nav-top")) {
      return;
    }

    if (controlsVisible) {
        hideMobileControls();
      } else {
        showMobileControls();
      }

    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap - toggle
      
    }
    lastTap = now;
  });

  // Show controls initially on mobile
  if (window.innerWidth < 768) {
    showMobileControls();
  }

  // -------------------------
  // TOC Active State
  // -------------------------
  const tocLinks = document.querySelectorAll(".toc a");
  const headings = document.querySelectorAll("h2[id], h3[id]");

  if (tocLinks.length > 0 && headings.length > 0) {
    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach((link) => {
            link.classList.remove("is-active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("is-active");
            }
          });
        }
      });
    }, observerOptions);

    headings.forEach((heading) => observer.observe(heading));
  }
})();