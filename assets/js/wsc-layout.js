/* ============================================================
   SAFE WSC LAYOUT
   Navbar/sidebar HTML structure only
   For links/menu text, edit assets/js/wsc-config.js
   For navbar/sidebar design, edit assets/css/side-nav/wsc-side-nav.css

   Important fix:
   - Does NOT replace document.body.innerHTML
   - Keeps custom HTML, custom scripts, and event listeners safe
   - Moves existing [data-wsc-page-content] safely into layout
   - Dispatches "wsc:layout-ready" after navbar/sidebar render
   ============================================================ */

(function () {
  "use strict";

  const cfg = window.WSC_CONFIG;

  if (!cfg) {
    console.error("WSC_CONFIG not found. Make sure wsc-config.js loads before wsc-layout.js");
    return;
  }

  let layoutEventsBound = false;

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function currentFile() {
    return location.pathname.split("/").pop() || "index.html";
  }

  function menuIconHTML(icon) {
    if (!icon) {
      return `<span class="wsc-menu-icon-text">•</span>`;
    }

    const iconText = String(icon);

    if (
      iconText.startsWith("http") ||
      iconText.includes(".svg") ||
      iconText.includes(".png") ||
      iconText.includes(".jpg") ||
      iconText.includes(".jpeg") ||
      iconText.includes(".webp")
    ) {
      return `<img class="wsc-menu-img-icon" src="${escapeHTML(iconText)}" alt="menu icon">`;
    }

    return `<span class="wsc-menu-icon-text">${escapeHTML(iconText)}</span>`;
  }

  function sidebarHTML() {
    const now = currentFile();
    const menuGroups = Array.isArray(cfg.menuGroups) ? cfg.menuGroups : [];

    const groups = menuGroups.map((group) => {
      const items = Array.isArray(group.items) ? group.items : [];
      const hasActive = items.some((item) => item.file === now);

      if (items.length === 1) {
        const item = items[0];
        const active = item.file === now ? " wsc-is-active" : "";

        return `
          <a class="wsc-menu-link${active}" href="${escapeHTML(item.file)}">
            ${menuIconHTML(item.icon || group.icon)}
            <span class="wsc-menu-text">${escapeHTML(item.title)}</span>
          </a>
        `;
      }

      const links = items.map((item) => {
        const active = item.file === now ? " wsc-is-active" : "";

        return `
          <a class="wsc-menu-link${active}" href="${escapeHTML(item.file)}">
            ${menuIconHTML(item.icon || group.icon)}
            <span class="wsc-menu-text">${escapeHTML(item.title)}</span>
          </a>
        `;
      }).join("");

      return `
        <div class="wsc-menu-group${hasActive ? " wsc-is-open" : ""}" data-wsc-menu-group>
          <button class="wsc-menu-toggle" type="button" data-wsc-menu-toggle>
            ${menuIconHTML(group.icon)}
            <span class="wsc-menu-text">${escapeHTML(group.title)}</span>
            <span class="wsc-menu-arrow">⌄</span>
          </button>
          <div class="wsc-submenu">${links}</div>
        </div>
      `;
    }).join("");

    return `
      <aside class="wsc-sidebar" data-wsc-sidebar>
        <div class="wsc-sidebar__top">
          <button class="wsc-apple-menu" type="button" data-wsc-sidebar-toggle title="Menu" aria-label="Menu">☰</button>
        </div>

        <nav class="wsc-sidebar__nav">
          ${groups}
        </nav>
      </aside>
    `;
  }

  function toolsHTML() {
    const toolsLinks = Array.isArray(cfg.toolsLinks) ? cfg.toolsLinks : [];

    return toolsLinks.map((tool) => {
      const logo = tool.logo
        ? `<img class="wsc-tool-logo" src="${escapeHTML(tool.logo)}" alt="${escapeHTML(tool.title)}">`
        : `<span class="wsc-tool-logo">+</span>`;

      return `
        <a class="wsc-tool-link" href="${escapeHTML(tool.url)}" target="_blank" rel="noopener">
          ${logo}
          <span>${escapeHTML(tool.title)}</span>
        </a>
      `;
    }).join("");
  }

  function navbarHTML() {
    const whatsappNumber = String(cfg.helpline || "").replace(/\D/g, "");

    return `
      <header class="wsc-navbar" data-wsc-navbar>
        <a class="wsc-brand" href="index.html">
          <img class="wsc-brand__logo" src="${escapeHTML(cfg.logoUrl)}" alt="Logo">
          <span class="wsc-brand__text">
            <span class="wsc-brand__bn">${escapeHTML(cfg.schoolNameBn)}</span>
            <span class="wsc-brand__en">${escapeHTML(cfg.schoolNameEn)}</span>
          </span>
        </a>

        <div class="wsc-search">
          <form class="wsc-search__form" data-wsc-search-form>
            <input class="wsc-search__input" data-wsc-search-input type="search" placeholder="Search page or Drive file...">

            <button class="wsc-search-icon-btn" type="submit" title="Search" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M21 21l-4.3-4.3"></path>
              </svg>
            </button>
          </form>

          <div class="wsc-search__panel" data-wsc-search-panel></div>
        </div>

        <div class="wsc-navbar__actions">
          <a class="wsc-icon-btn"
             href="https://wa.me/${escapeHTML(whatsappNumber)}"
             target="_blank"
             rel="noopener"
             title="WhatsApp"
             aria-label="WhatsApp">
            <svg class="wsc-nav-svg-icon" viewBox="0 0 24 24" fill="none">
              <path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
            </svg>
          </a>

          <div class="wsc-tool-wrap">
            <button class="wsc-icon-btn" type="button" data-wsc-tool-toggle title="Tools" aria-label="Tools">
              <svg class="wsc-nav-svg-icon" viewBox="0 0 24 24" fill="none">
                <path d="M5.5 16.5C6.60457 16.5 7.5 17.3954 7.5 18.5C7.5 19.6046 6.60457 20.5 5.5 20.5C4.39543 20.5 3.5 19.6046 3.5 18.5C3.5 17.3954 4.39543 16.5 5.5 16.5Z" fill="currentColor"></path>
                <path d="M12 16.5C13.1046 16.5 14 17.3954 14 18.5C14 19.6046 13.1046 20.5 12 20.5C10.8954 20.5 10 19.6046 10 18.5C10 17.3954 10.8954 16.5 12 16.5Z" fill="currentColor"></path>
                <path d="M18.5 16.5C19.6046 16.5 20.5 17.3954 20.5 18.5C20.5 19.6046 19.6046 20.5 18.5 20.5C17.3954 20.5 16.5 19.6046 16.5 18.5C16.5 17.3954 17.3954 16.5 18.5 16.5Z" fill="currentColor"></path>
                <path d="M5.5 10C6.60457 10 7.5 10.8954 7.5 12C7.5 13.1046 6.60457 14 5.5 14C4.39543 14 3.5 13.1046 3.5 12C3.5 10.8954 4.39543 10 5.5 10Z" fill="currentColor"></path>
                <path d="M12 10C13.1046 10 14 17.3954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="currentColor"></path>
                <path d="M18.5 10C19.6046 10 20.5 10.8954 20.5 12C20.5 13.1046 19.6046 14 18.5 14C17.3954 14 16.5 13.1046 16.5 12C16.5 10.8954 17.3954 10 18.5 10Z" fill="currentColor"></path>
                <path d="M5.5 3.5C6.60457 3.5 7.5 4.39543 7.5 5.5C7.5 6.60457 6.60457 7.5 5.5 7.5C4.39543 7.5 3.5 6.60457 3.5 5.5C3.5 4.39543 4.39543 3.5 5.5 3.5Z" fill="currentColor"></path>
                <path d="M12 3.5C13.1046 3.5 14 4.39543 14 5.5C14 6.60457 13.1046 7.5 12 7.5C10.8954 7.5 10 6.60457 10 5.5C10 4.39543 10.8954 3.5 12 3.5Z" fill="currentColor"></path>
                <path d="M18.5 3.5C19.6046 3.5 20.5 4.39543 20.5 5.5C20.5 6.60457 19.6046 7.5 18.5 7.5C17.3954 7.5 16.5 6.60457 16.5 5.5C16.5 4.39543 17.3954 3.5 18.5 3.5Z" fill="currentColor"></path>
              </svg>
            </button>

            <div class="wsc-tool-panel" data-wsc-tool-panel>${toolsHTML()}</div>
          </div>

          <button class="wsc-icon-btn wsc-theme-btn" type="button" data-wsc-theme-toggle title="Theme" aria-label="Theme">
            <svg class="wsc-nav-svg-icon wsc-theme-icon-sun" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.6"></circle>
              <path d="M12 2.5V5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
              <path d="M12 19V21.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
              <path d="M4.57 4.57L6.34 6.34" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
              <path d="M17.66 17.66L19.43 19.43" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
              <path d="M2.5 12H5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
              <path d="M19 12H21.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
              <path d="M4.57 19.43L6.34 17.66" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
              <path d="M17.66 6.34L19.43 4.57" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
            </svg>

            <svg class="wsc-nav-svg-icon wsc-theme-icon-moon" viewBox="0 0 24 24" fill="none">
              <path d="M21 13.2C19.9 13.7 18.7 14 17.4 14C12.8 14 9 10.2 9 5.6C9 4.3 9.3 3.1 9.8 2C5.6 3 2.5 6.8 2.5 11.3C2.5 16.6 6.8 20.9 12.1 20.9C16.6 20.9 20.4 17.8 21.4 13.6C21.3 13.5 21.2 13.4 21 13.2Z"
                stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>

          <button class="wsc-icon-btn" type="button" data-wsc-login-toggle title="Admin Login" aria-label="Admin Login">
            <svg class="wsc-nav-svg-icon" viewBox="0 0 24 24" fill="none">
              <path opacity="0.45" d="M12.1605 10.87C12.0605 10.86 11.9405 10.86 11.8305 10.87C9.45055 10.79 7.56055 8.84 7.56055 6.44C7.56055 3.99 9.54055 2 12.0005 2C14.4505 2 16.4405 3.99 16.4405 6.44C16.4305 8.84 14.5405 10.79 12.1605 10.87Z"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M7.1607 14.56C4.7407 16.18 4.7407 18.82 7.1607 20.43C9.9107 22.27 14.4207 22.27 17.1707 20.43C19.5907 18.81 19.5907 16.17 17.1707 14.56C14.4307 12.73 9.9207 12.73 7.1607 14.56Z"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span class="wsc-login-dot" data-wsc-login-dot></span>
          </button>
        </div>
      </header>
    `;
  }

  function popupHTML() {
    return `
      <div class="wsc-popup-overlay" data-wsc-login-popup>
        <div class="wsc-popup-card">
          <h2 style="margin-top:0;">Admin Login</h2>
          <form data-wsc-login-form>
            <div class="wsc-form-field">
              <label>Username</label>
              <input name="username" type="text" value="Admin" required>
            </div>

            <div class="wsc-form-field">
              <label>Password</label>
              <input name="password" type="password" value="admin123" required>
            </div>

            <button class="wsc-btn" type="submit">Login</button>
            <button class="wsc-btn" type="button" data-wsc-login-close>Close</button>
          </form>
        </div>
      </div>

      <div class="wsc-toast" data-wsc-toast></div>
    `;
  }

  function bindLayout() {
    if (layoutEventsBound) return;
    layoutEventsBound = true;

    document.addEventListener("click", function (event) {
      const menuToggle = event.target.closest("[data-wsc-menu-toggle]");
      if (menuToggle) {
        const group = menuToggle.closest("[data-wsc-menu-group]");
        if (group) {
          group.classList.toggle("wsc-is-open");
        }
      }

      if (event.target.closest("[data-wsc-sidebar-toggle]")) {
        if (window.matchMedia("(max-width: 1024px)").matches) {
          document.documentElement.classList.toggle("wsc-mobile-sidebar-open");
        } else {
          document.documentElement.classList.toggle("wsc-sidebar-collapsed");

          if (cfg.storageKeys && cfg.storageKeys.sidebar) {
            localStorage.setItem(
              cfg.storageKeys.sidebar,
              document.documentElement.classList.contains("wsc-sidebar-collapsed") ? "1" : "0"
            );
          }
        }
      }

      if (event.target.closest("[data-wsc-tool-toggle]")) {
        const panel = document.querySelector("[data-wsc-tool-panel]");
        if (panel) {
          panel.classList.toggle("wsc-is-open");
        }
      }

      if (!event.target.closest(".wsc-tool-wrap")) {
        const panel = document.querySelector("[data-wsc-tool-panel]");
        if (panel) {
          panel.classList.remove("wsc-is-open");
        }
      }

      const mobileNavLink = event.target.closest(".wsc-sidebar a");
      if (mobileNavLink && window.matchMedia("(max-width: 1024px)").matches) {
        document.documentElement.classList.remove("wsc-mobile-sidebar-open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;

      document.documentElement.classList.remove("wsc-mobile-sidebar-open");

      const toolPanel = document.querySelector("[data-wsc-tool-panel]");
      if (toolPanel) toolPanel.classList.remove("wsc-is-open");

      const searchPanel = document.querySelector("[data-wsc-search-panel]");
      if (searchPanel) searchPanel.classList.remove("wsc-is-open");

      const loginPopup = document.querySelector("[data-wsc-login-popup]");
      if (loginPopup) loginPopup.classList.remove("wsc-is-open");
    });
  }

  function getOrCreatePageContent() {
    let pageContent = document.querySelector("[data-wsc-page-content]");

    if (!pageContent) {
      pageContent = document.createElement("main");
      pageContent.setAttribute("data-wsc-page-content", "");
      document.body.prepend(pageContent);
    }

    pageContent.classList.add("wsc-page-content");
    return pageContent;
  }

  function renderLayout() {
    if (document.querySelector("[data-wsc-shell]")) return;

    if (
      cfg.storageKeys &&
      cfg.storageKeys.sidebar &&
      localStorage.getItem(cfg.storageKeys.sidebar) === "1"
    ) {
      document.documentElement.classList.add("wsc-sidebar-collapsed");
    }

    const pageContent = getOrCreatePageContent();

    const shell = document.createElement("div");
    shell.className = "wsc-shell";
    shell.setAttribute("data-wsc-shell", "");

    shell.insertAdjacentHTML("beforeend", sidebarHTML());
    shell.insertAdjacentHTML("beforeend", navbarHTML());

    const mainWrap = document.createElement("div");
    mainWrap.className = "wsc-main";
    mainWrap.setAttribute("data-wsc-main", "");

    mainWrap.appendChild(pageContent);
    shell.appendChild(mainWrap);

    shell.insertAdjacentHTML("beforeend", popupHTML());

    document.body.prepend(shell);

    bindLayout();

    document.documentElement.classList.add("wsc-layout-ready");

    document.dispatchEvent(
      new CustomEvent("wsc:layout-ready", {
        detail: {
          shell: shell,
          pageContent: pageContent
        }
      })
    );
  }

  window.WSC_LAYOUT = {
    renderLayout,
    navbarHTML,
    sidebarHTML,
    toolsHTML,
    menuIconHTML
  };

  document.addEventListener("DOMContentLoaded", renderLayout);
})();
document.addEventListener("wsc:layout-ready", function () {
  const navbar = document.querySelector(".wsc-navbar");

  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});