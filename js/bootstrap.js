/**
 * UIverse - JavaScript Bootstrap Module
 * 
 * Entry point for all JavaScript functionality
 * Initializes all features based on DOM presence
 * 
 * This file should be loaded after all feature modules:
 * - js/core/utils.js
 * - js/features/toast.js
 * - js/features/popup.js
 * - js/features/code-tools.js
 * - js/features/sidebar.js
 * - js/features/search.js
 * - js/features/theme.js
 * - js/features/scroll.js
 * - js/features/alerts.js
 * - js/features/sandbox.js
 */

const Bootstrap = {
  /**
   * Initialize all features
   * Each feature is only initialized if its required elements exist in DOM
   */
  init() {
    // Initialize features in logical order
    this.initCore();
    this.initFeatures();
    this.logStatus();
  },

  /**
   * Initialize core utilities
   */
  initCore() {
    // Core utilities are passive and already loaded
  },

  /**
   * Initialize all features
   */
  initFeatures() {
    // Popup
    if (typeof Popup !== 'undefined') {
      Popup.init();
    }

    // Toast (passive initialization)
    if (typeof Toast !== 'undefined') {
      Toast.init();
    }

    // Code Tools (exposes to global)
    if (typeof CodeTools !== 'undefined') {
      CodeTools.init();
    }

    // Sidebar
    if (typeof Sidebar !== 'undefined' && document.querySelector(".sidebar")) {
      Sidebar.init();
    }

    // Search
    if (typeof Search !== 'undefined') {
      Search.init();
    }

    // Theme
    if (typeof Theme !== 'undefined') {
      Theme.init();
    }

    // Scroll
    if (typeof Scroll !== 'undefined') {
      Scroll.init();
    }

    // Alerts
    if (typeof Alerts !== 'undefined') {
      Alerts.init();
    }

    // Live Sandbox (for component pages with editable code)
    if (typeof Sandbox !== 'undefined' && document.querySelector(".component-card")) {
      Sandbox.init();
    }
  },

  /**
   * Log initialization status (development only)
   */
  logStatus() {
    if (typeof console !== 'undefined' && console.log) {
      console.log('[UIverse] Bootstrap complete. All features initialized.');
    }
  }
};

/**
 * Start bootstrap on DOM ready
 */
document.addEventListener("DOMContentLoaded", () => {
  Bootstrap.init();
});

// Also expose bootstrap to window for debugging
window.UIverseBootstrap = Bootstrap;
