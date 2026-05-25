/* ============================================================
   EDIT HERE: Search logic only
   Apps Script URL is in assets/js/wsc-config.js
   ============================================================ */

(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function localPageSearch(query) {
    const cfg = window.WSC_CONFIG;
    const results = [];

    cfg.menuGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.title.toLowerCase().includes(query.toLowerCase()) || item.file.toLowerCase().includes(query.toLowerCase())) {
          results.push({ title: item.title, url: item.file, type: "Page" });
        }
      });
    });

    return results;
  }

  async function driveSearch(query) {
    const cfg = window.WSC_CONFIG;
    if (!cfg.appsScriptWebAppUrl || cfg.appsScriptWebAppUrl.includes("PASTE_")) {
      return [];
    }

    const params = new URLSearchParams({ action: "searchDrive", query: query });
    const response = await fetch(`${cfg.appsScriptWebAppUrl}?${params.toString()}`);
    const data = await response.json();
    return data.files || [];
  }

  function resultHTML(item) {
    return `
      <a class="wsc-result" href="${escapeHTML(item.url || item.file || "#")}" target="${item.type === "Page" ? "_self" : "_blank"}">
        <span>↗</span>
        <span>
          <strong>${escapeHTML(item.title || item.name || "Untitled")}</strong><br>
          <small>${escapeHTML(item.type || "File")}</small>
        </span>
      </a>
    `;
  }

  document.addEventListener("submit", async function (event) {
    const form = event.target.closest("[data-wsc-search-form]");
    if (!form) return;

    event.preventDefault();
    const input = form.querySelector("[data-wsc-search-input]");
    const panel = document.querySelector("[data-wsc-search-panel]");
    const query = input.value.trim();

    if (!query) return;

    panel.classList.add("wsc-is-open");
    panel.innerHTML = `<div class="wsc-result">Searching...</div>`;

    try {
      const pages = localPageSearch(query);
      const drive = await driveSearch(query);
      const all = [...pages, ...drive];

      panel.innerHTML = all.length
        ? all.map(resultHTML).join("")
        : `<div class="wsc-result">No result found</div>`;
    } catch (error) {
      panel.innerHTML = `<div class="wsc-result">Search error: ${escapeHTML(error.message)}</div>`;
    }
  });
})();
