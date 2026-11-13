const siteWords = {"role": "PhD Candidate in Biomedical Sciences", "home": "Thomas Derouck home", "email": "Email", "profile": "Profile", "experience": "Experience", "research": "Research Projects", "publications": "Publications", "awards": "Awards", "nav": "Main navigation", "light": "Switch to light theme", "dark": "Switch to dark theme"};



if (!document.querySelector(".spotlight")) {
  const spotlight = document.createElement("div");
  spotlight.className = "spotlight";
  spotlight.setAttribute("aria-hidden", "true");
  document.body.prepend(spotlight);
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <a class="brand" href="index.html" aria-label="${siteWords.home}">
          <span class="brand-text">
            <strong>Thomas Derouck</strong>
            <small>${siteWords.role}</small>
          </span>
        </a>

        <div class="header-actions">
          <a class="header-email" href="mailto:thomas.derouck@uqtr.ca">${siteWords.email}</a>
          <button class="theme-toggle" type="button" aria-label="Switch theme" title="Switch theme">🌙</button>
        </div>

      </header>
      <nav class="site-nav" aria-label="${siteWords.nav}">
          <a href="index.html">${siteWords.profile}</a>
          <a href="experience.html">${siteWords.experience}</a>
          <a href="research.html">${siteWords.research}</a>
          <a href="publications.html">${siteWords.publications}</a>
          <a href="awards.html">${siteWords.awards}</a>
          <a href="cv.html">CV</a>
          <a href="contact.html" class="nav-contact">Contact</a>
      </nav>
    `;

    const themeToggle = this.querySelector(".theme-toggle");
    const currentTheme = document.documentElement.dataset.theme || "dark";
    document.documentElement.dataset.theme = currentTheme;
    const updateThemeButton = (theme) => {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
      const label = theme === "dark" ? siteWords.light : siteWords.dark;
      themeToggle.setAttribute("aria-label", label);
      themeToggle.title = label;
    };
    updateThemeButton(currentTheme);
    themeToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      window.SitePreferences.setTheme(next);
      updateThemeButton(next);
    });

    const current = location.pathname.split("/").pop() || "index.html";
    this.querySelectorAll(".site-nav a").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === current) link.setAttribute("aria-current", "page");
    });

  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <p>© ${new Date().getFullYear()} Thomas Derouck — PhD Researcher in Exercise &amp; Environmental Physiology</p>
        <p class="last-updated">Content updated <time datetime="2026-11-13">November 13, 2026</time></p>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

document.addEventListener("mousemove", (event) => {
  document.body.style.setProperty("--mx", `${event.clientX}px`);
  document.body.style.setProperty("--my", `${event.clientY}px`);
});

const progress = document.getElementById("scroll-progress");
if (progress) {
  window.addEventListener("scroll", () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = height > 0 ? (window.scrollY / height) * 100 : 0;
    progress.style.width = `${scrolled}%`;
  });
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}
