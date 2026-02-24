// menu-links.js
(function () {
  const LINKS = [
    { href: "./index.html", label: "Tasks" },
    { href: "./finances.html", label: "Finances" },
    { href: "./jobs.html", label: "Jobs" },
    { href: "./statistics.html", label: "Statistics" },
    { href: "./workout.html", label: "Workout" },
  ];

  function inject() {
    const menu = document.getElementById("menu");
    if (!menu) return;

    // Keep the darkmode block if present, wipe other links
    const darkItem = menu.querySelector(".menuItem");
    menu.innerHTML = "";
    if (darkItem) menu.appendChild(darkItem);

    for (const l of LINKS) {
      const a = document.createElement("a");
      a.className = "menuLink";
      a.href = l.href;
      a.textContent = l.label;
      menu.appendChild(a);
    }

    // Optional: highlight current page
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    [...menu.querySelectorAll("a.menuLink")].forEach(a => {
      const target = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (target === path) a.classList.add("activeLink");
    });
  }

  window.MenuLinks = { inject };
})();
