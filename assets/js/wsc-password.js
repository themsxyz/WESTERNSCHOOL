/* ============================================================
   EDIT HERE: Password, login session, active status, dark mode
   Default demo login: Admin / admin123
   ============================================================ */

(function () {
  "use strict";

  const cfg = window.WSC_CONFIG;

  function toast(message) {
    const wrap = document.querySelector("[data-wsc-toast]");
    if (!wrap) return;

    const item = document.createElement("div");
    item.className = "wsc-toast__item";
    item.textContent = message;
    wrap.appendChild(item);

    setTimeout(() => item.remove(), 2600);
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(cfg.storageKeys.session) || "null");
    } catch {
      return null;
    }
  }

  function setSession(user) {
    localStorage.setItem(cfg.storageKeys.session, JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem(cfg.storageKeys.session);
  }

  function updateLoginDot() {
    const dot = document.querySelector("[data-wsc-login-dot]");
    if (!dot) return;
    dot.classList.toggle("wsc-is-active", !!getSession());
  }

  function applyTheme() {
    const saved = localStorage.getItem(cfg.storageKeys.theme) || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(cfg.storageKeys.theme, next);
    document.documentElement.setAttribute("data-theme", next);
  }

  async function login(username, password) {
    if (username === "Admin" && password === "admin123") {
      return { success: true, user: { username: "Admin", role: "Admin" } };
    }

    if (!cfg.appsScriptWebAppUrl || cfg.appsScriptWebAppUrl.includes("PASTE_")) {
      return { success: false, message: "Apps Script URL not connected." };
    }

    const params = new URLSearchParams({ action: "login", username, password });
    const response = await fetch(`${cfg.appsScriptWebAppUrl}?${params.toString()}`);
    return response.json();
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest("[data-wsc-theme-toggle]")) {
      toggleTheme();
    }

    if (event.target.closest("[data-wsc-login-toggle]")) {
      if (getSession()) {
        clearSession();
        updateLoginDot();
        toast("Logged out");
      } else {
        document.querySelector("[data-wsc-login-popup]").classList.add("wsc-is-open");
      }
    }

    if (event.target.closest("[data-wsc-login-close]")) {
      document.querySelector("[data-wsc-login-popup]").classList.remove("wsc-is-open");
    }
  });

  document.addEventListener("submit", async function (event) {
    const form = event.target.closest("[data-wsc-login-form]");
    if (!form) return;

    event.preventDefault();
    const username = form.querySelector("[name='username']").value.trim();
    const password = form.querySelector("[name='password']").value;
    const result = await login(username, password);

    if (result.success) {
      setSession(result.user);
      updateLoginDot();
      document.querySelector("[data-wsc-login-popup]").classList.remove("wsc-is-open");
      toast("Login successful");
    } else {
      toast(result.message || "Login failed");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme();
    setTimeout(updateLoginDot, 100);
  });
})();
