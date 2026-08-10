
(function () {
  document.documentElement.dataset.theme = localStorage.getItem("theme") || "dark";
})();

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
        <a class="brand" href="index.html" aria-label="Thomas Derouck home">
          <span class="brand-text">
            <strong>Thomas Derouck</strong>
            <small>PhD Candidate in Biomedical Sciences</small>
          </span>
        </a>

        <div class="header-actions">
          <a class="header-email" href="mailto:thomas.derouck@uqtr.ca">thomas.derouck@uqtr.ca</a>
          <button class="theme-toggle" type="button" aria-label="Switch theme" title="Switch theme">🌙</button>
        </div>

      </header>
      <nav class="site-nav" aria-label="Main navigation">
          <a href="index.html">Profile</a>
          <a href="experience.html">Experience</a>
          <a href="research.html">Research Projects</a>
          <a href="publications.html">Publications</a>
          <a href="awards.html">Awards</a>
          <a href="cv.html">CV</a>
          <a href="contact.html" class="nav-contact">Contact</a>
      </nav>
    `;

    const themeToggle = this.querySelector(".theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.dataset.theme = currentTheme;
    themeToggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";
    themeToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
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
        <p>© 2026 Thomas Derouck — PhD Researcher in Exercise &amp; Environmental Physiology</p>
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

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));





