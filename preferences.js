(function () {
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* The theme still applies to this page. */ } };
  document.documentElement.dataset.theme = read("theme") === "light" ? "light" : "dark";
  window.SitePreferences = {
    setTheme(value) {
      if (value !== "light" && value !== "dark") return;
      document.documentElement.dataset.theme = value;
      save("theme", value);
    }
  };
})();
