export default class Navbar extends HTMLElement {
  connectedCallback() {
    const navLinks = this.dataset.links;
    let navLinkArray = [];
    try {
      navLinks ? (navLinkArray = JSON.parse(navLinks)) : (navLinkArray = [""]);
    } catch (e) {
      console.error("Invalid Data Link Format : ", e);
    }

    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    const root = document.documentElement;
    root.dataset.theme = savedTheme;

    this.innerHTML = `
            <nav class="nav-navbar">
                <div class="div-nav-brand"></div>
                <div class="div-nav-links">
                    ${navLinkArray.length > 1 ? navLinkArray.map((item) => `<a href="#${item.url}">${item.label}</a>`).join("") : ""}
                </div>
                <div class="div-nav-icon">
                    <i class="fa-solid ${savedTheme === "dark" ? "fa-moon" : "fa-sun"}" id="icon-toggle-theme"></i>
                </div>
            </nav>
        `;

    const toggleThemeButton = this.querySelector("#icon-toggle-theme");
    toggleThemeButton.addEventListener("click", () => {
      const currentTheme = root.dataset.theme || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      root.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      toggleThemeButton.className =
        newTheme === "black" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    });
  }
}
