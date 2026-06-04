/* ============================================================
   Western School & College - Login Protection + Session + Dark Mode
   Default demo login: Admin / admin123
   Website will be locked until login
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

  function isLoggedIn() {
    return !!getSession();
  }

  function updateLoginDot() {
    const dot = document.querySelector("[data-wsc-login-dot]");
    if (!dot) return;
    dot.classList.toggle("wsc-is-active", isLoggedIn());
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

  function openLoginPopup() {
    const popup = document.querySelector("[data-wsc-login-popup]");
    if (!popup) return;

    popup.classList.add("wsc-is-open");
    document.body.classList.add("wsc-login-required");
  }

  function closeLoginPopup() {
    const popup = document.querySelector("[data-wsc-login-popup]");
    if (!popup) return;

    if (!isLoggedIn()) {
      popup.classList.add("wsc-is-open");
      document.body.classList.add("wsc-login-required");
      toast("Please login first");
      return;
    }

    popup.classList.remove("wsc-is-open");
    document.body.classList.remove("wsc-login-required");
  }

  function enforceLogin() {
    if (!isLoggedIn()) {
      openLoginPopup();
    } else {
      closeLoginPopup();
    }

    updateLoginDot();
  }

  async function login(username, password) {
    /*
      Demo login.
      Later you can remove this block if you want only Google Sheet login.
    */
    if (username === "Admin" && password === "admin123") {
      return {
        success: true,
        user: {
          username: "Admin",
          role: "Admin"
        }
      };
    }

    if (!cfg.appsScriptWebAppUrl || cfg.appsScriptWebAppUrl.includes("PASTE_")) {
      return {
        success: false,
        message: "Apps Script URL not connected."
      };
    }

    const params = new URLSearchParams({
      action: "login",
      username: username,
      password: password
    });

    const response = await fetch(`${cfg.appsScriptWebAppUrl}?${params.toString()}`);
    return response.json();
  }

  /*
    Prevent website use before login.
    User can only click inside the login popup.
  */
  document.addEventListener(
    "click",
    function (event) {
      const popup = document.querySelector("[data-wsc-login-popup]");
      const clickedInsidePopup = event.target.closest("[data-wsc-login-popup]");
      const clickedThemeToggle = event.target.closest("[data-wsc-theme-toggle]");

      if (!isLoggedIn()) {
        if (clickedThemeToggle) {
          toggleTheme();
          return;
        }

        if (!clickedInsidePopup) {
          event.preventDefault();
          event.stopPropagation();
          openLoginPopup();
          toast("Please login first");
          return;
        }
      }
    },
    true
  );

  document.addEventListener("click", function (event) {
    if (event.target.closest("[data-wsc-theme-toggle]")) {
      toggleTheme();
    }

    if (event.target.closest("[data-wsc-login-toggle]")) {
      if (isLoggedIn()) {
        clearSession();
        updateLoginDot();
        toast("Logged out");

        /*
          After logout, website locks again.
        */
        setTimeout(openLoginPopup, 100);
      } else {
        openLoginPopup();
      }
    }

    if (event.target.closest("[data-wsc-login-close]")) {
      closeLoginPopup();
    }
  });

  document.addEventListener("submit", async function (event) {
    const form = event.target.closest("[data-wsc-login-form]");
    if (!form) return;

    event.preventDefault();

    const username = form.querySelector("[name='username']").value.trim();
    const password = form.querySelector("[name='password']").value;

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Checking...";
    }

    try {
      const result = await login(username, password);

      if (result.success) {
        setSession(result.user);
        updateLoginDot();

        const popup = document.querySelector("[data-wsc-login-popup]");
        if (popup) popup.classList.remove("wsc-is-open");

        document.body.classList.remove("wsc-login-required");

        toast("Login successful");
        form.reset();
      } else {
        clearSession();
        openLoginPopup();
        toast(result.message || "Login failed");
      }
    } catch (error) {
      clearSession();
      openLoginPopup();
      toast("Login error. Please try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Login";
      }
    }
  });

  /*
    Stop ESC key from closing/escaping login requirement.
  */
  document.addEventListener("keydown", function (event) {
    if (!isLoggedIn() && event.key === "Escape") {
      event.preventDefault();
      openLoginPopup();
      toast("Please login first");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme();

    /*
      Website will ask login immediately after loading.
    */
    setTimeout(function () {
      enforceLogin();
    }, 100);
  });
})();