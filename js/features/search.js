/**
 * Search Feature
 * Provides inline filtering and page routing based on search queries
 */

const Search = {
  // Component routing map
  routes: {
    button: "button.html",
    buttons: "button.html",
    navbar: "navbar.html",
    navbars: "navbar.html",
    card: "cards.html",
    cards: "cards.html",
    form: "form.html",
    forms: "form.html",
    footer: "footer.html",
    color: "color.html",
    colors: "color.html",
  },

  /**
   * Initialize inline search filter
   */
  initFilter() {
    const searchInput = getElement("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("keyup", (e) => {
      const value = e.target.value.toLowerCase().trim();

      document.querySelectorAll(".component-card").forEach((item) => {
        const text = (item.dataset.name || item.innerText).toLowerCase();
        item.style.display = text.includes(value) ? "block" : "none";
      });
    });
  },

  /**
   * Handle search routing (Enter key navigation)
   * @param {Event} event - Keyboard event
   */
  handleRouting(event) {
    if (event.key !== "Enter") return;

    const query = event.target.value.toLowerCase().trim();

    for (const key in this.routes) {
      if (query.includes(key)) {
        window.location.href = this.routes[key];
        return;
      }
    }

    showToast("No component found 😢");
  },

  /**
   * Initialize search feature
   */
  init() {
    this.initFilter();
    
    // Expose for potential use
    window.handleSearch = (event) => this.handleRouting(event);
  }
};

// Export for use in bootstrap
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Search;
}
