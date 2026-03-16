export default class Navbar extends HTMLElement {
  connectedCallback() {
    let isActiveTheme = true;
    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    const root = document.documentElement;
    root.setAttribute("data-theme", savedTheme);
    const navLinks = this.getAttribute("links").split(",");

    this.innerHTML = `
            <nav class="nav-navbar">
                <div class="div-nav-brand"></div>
                <div class="div-nav-links">
                    ${navLinks.map((item) => `<a href="#${item.toLowerCase()}">${item}</a>`).join("")}
                </div>
                <div class="div-nav-icon">
                    <i class="fa-solid fa-moon" id="icon-toggle-theme"></i>
                </div>
            </nav>
        `;

    const toggleThemeButton = this.querySelector("#icon-toggle-theme");
    toggleThemeButton.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      isActiveTheme = !isActiveTheme;
      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", currentTheme);
      toggleThemeButton.className = isActiveTheme
        ? "fa-solid fa-moon"
        : "fa-solid fa-sun";
    });
  }
}
