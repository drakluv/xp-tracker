// app-core.js
(function () {
  const LS = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  };

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
  }

  function clamp0(n) {
    n = Number(n) || 0;
    return n < 0 ? 0 : n;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m]));
  }

  function localDateKey(d = new Date()) {
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${yr}-${mo}-${da}`;
  }

  function startOfWeekMonday(d) {
    const x = new Date(d);
    const day = x.getDay(); // 0 Sun..6 Sat
    const diff = (day === 0 ? -6 : 1 - day);
    x.setDate(x.getDate() + diff);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function weekKeyFor(d) {
    return localDateKey(startOfWeekMonday(d));
  }

  function dayIndexMon0(d) {
    const day = d.getDay();
    return (day === 0) ? 6 : (day - 1);
  }

  function toMiddayTs(dateStr) {
    return new Date(dateStr + "T12:00:00").getTime();
  }

  const Theme = (() => {
    function init() {
      const darkToggle = document.getElementById("darkToggle");
      const theme = LS.get("theme", "light");
      document.documentElement.setAttribute("data-theme", theme);
      if (darkToggle) darkToggle.checked = theme === "dark";

      if (darkToggle) {
        darkToggle.addEventListener("change", () => {
          const t = darkToggle.checked ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", t);
          LS.set("theme", t);
        });
      }
    }
    return { init };
  })();

  const Menu = (() => {
    function init() {
      const menuBtn = document.getElementById("menuBtn");
      const menu = document.getElementById("menu");
      if (!menuBtn || !menu) return;

      function setOpen(open) {
        if (open) {
          menu.classList.add("open");
          menuBtn.setAttribute("aria-expanded", "true");
        } else {
          menu.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        }
      }

      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        setOpen(!menu.classList.contains("open"));
      });
      document.addEventListener("click", () => setOpen(false));
    }
    return { init };
  })();

  function initCommon() {
    Theme.init();
    Menu.init();
    if (window.MenuLinks && typeof window.MenuLinks.inject === "function") {
      window.MenuLinks.inject();
    }
  }

  window.AppCore = {
    LS,
    uuid,
    clamp0,
    escapeHtml,
    localDateKey,
    startOfWeekMonday,
    weekKeyFor,
    dayIndexMon0,
    toMiddayTs,
    Theme,
    Menu,
    initCommon,
  };
})();
