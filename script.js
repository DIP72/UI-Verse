const editBtn = document.querySelector(".btnn");

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

if (editBtn) {
  editBtn.addEventListener("click", () => {
  const openProfileEditor = () => {
    const currentInfo = document.querySelectorAll(".info p");
    if (!currentInfo || currentInfo.length < 3) return;


    const currentName = currentInfo[0].textContent;
    const currentEmail = currentInfo[1].textContent;
    const currentUsername = currentInfo[2].textContent;

    // Non-blocking inline editor (modal)
    const existing = document.getElementById("profile-editor-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "profile-editor-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="modal-backdrop" data-close="1" aria-hidden="true"></div>
      <div class="modal-card">
        <div class="modal-header">
          <h3>Edit Profile</h3>
          <button type="button" class="modal-close" aria-label="Close">&times;</button>
        </div>

        <div class="modal-body">
          <label>
            <span>Full Name</span>
            <input type="text" id="profile-editor-name" value="${escapeAttr(currentName)}" />
          </label>

          <label>
            <span>Email</span>
            <input type="email" id="profile-editor-email" value="${escapeAttr(currentEmail)}" />
          </label>

          <label>
            <span>Username</span>
            <input type="text" id="profile-editor-username" value="${escapeAttr(currentUsername)}" />
          </label>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" data-cancel="1">Cancel</button>
          <button type="button" class="btn-primary" data-save="1">Save</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      modal.remove();
    };

    const backdrop = modal.querySelector(".modal-backdrop");
    const closeBtn = modal.querySelector(".modal-close");
    const cancelBtn = modal.querySelector("[data-cancel='1']");

    backdrop?.addEventListener("click", closeModal);
    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);

    // Save
    const saveBtn = modal.querySelector("[data-save='1']");
    saveBtn?.addEventListener("click", () => {
      const newName = modal.querySelector("#profile-editor-name")?.value?.trim();
      const newEmail = modal.querySelector("#profile-editor-email")?.value?.trim();
      const newUsername = modal.querySelector("#profile-editor-username")?.value?.trim();

      if (newName) {
        currentInfo[0].textContent = newName;
        document.querySelector(".profile-header h2").textContent = newName;
      }
      if (newEmail) {
        currentInfo[1].textContent = newEmail;
        document.querySelector(".profile-header p").textContent = newEmail;
      }
      if (newUsername) {
        currentInfo[2].textContent = newUsername;
      }

      showToastSafe("Profile Updated Successfully! ✅");
      modal.remove();
    });

    // Focus management (best effort)
    setTimeout(() => {
      modal.querySelector("#profile-editor-name")?.focus?.();
    }, 0);
  };

  openProfileEditor();

  });
}


// forms
// login
let loginBtn = document.querySelectorAll(".form-card button")[0];

loginBtn.onclick = function () {
  showToastSafe("Login button clicked");
};
// signup
let signupBtn = document.querySelectorAll(".form-card button")[1];
signupBtn.onclick = function () {
  showToastSafe("Signup button clicked");
};
// contact form
let contactBtn = document.querySelectorAll(".form-card button")[2];

contactBtn.onclick = function () {
  showToastSafe("Message sent");
};
//extra
let extraBtn = document.querySelectorAll(".form-card button")[3];
extraBtn.onclick = function () {
  showToastSafe("Form submitted");
};

// icon-
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
});
/* =================================================================
   script.js  –  UI-Verse
   Single consolidated file. Each function is declared exactly once.
   ================================================================= */


/* ================= POPUP ================= */
let popup;

document.addEventListener("DOMContentLoaded", () => {
  popup = document.getElementById("popup");
});

function openPopup() {
  if (popup) popup.classList.add("open-popup");
}

function closePopup() {
  if (popup) popup.classList.remove("open-popup");
}


/* ================= TOAST NOTIFICATION ================= */
function showToast(message) {
  const existing = document.getElementById("toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  // Trigger slide-in (double rAF ensures the element is painted first)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add("toast-visible");
    });
  });

  // Auto-dismiss after 2 seconds
  setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-hidden");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 2000);
}

// Defensive wrapper: if toast fails/unavailable, do nothing (no blocking UX)
function showToastSafe(message) {
  try {
    if (typeof showToast === "function") showToast(message);
  } catch (e) {}
}


/* ================= TOGGLE CODE BLOCK ================= */
function toggleCode(id) {
  const codeBlock = document.getElementById(id);
  if (!codeBlock) return;

  if (codeBlock.classList.contains("show")) {
    codeBlock.style.display = "none";
    codeBlock.classList.remove("show");
  } else {
    codeBlock.style.display = "block";
    codeBlock.classList.add("show");
  }
}


/* ================= COPY CODE ================= */
function copyCode(id, btn) {
  const element = document.getElementById(id);
  if (!element) return;

  // Support both <textarea>/<input> (use .value) and any other element (use .innerText)
  const code = (element.tagName === "TEXTAREA" || element.tagName === "INPUT")
    ? element.value
    : element.innerText;

  navigator.clipboard.writeText(code)
    .then(() => {
      showToastSafe("Code copied!");

      if (btn) {
        const originalText = btn.innerText;
        btn.innerText = "Copied ✓";
        btn.classList.add("copied");

        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove("copied");
        }, 1500);
      }
    })
    .catch(() => {
      showToastSafe("Failed to copy ❌");
      if (btn) btn.innerText = "Error";
    });
}


/* ================= COPY COLOR ================= */
function copyColor(color) {
  navigator.clipboard.writeText(color);
  showToastSafe(color + " copied!");
}

function copyRGB(value) {
  navigator.clipboard.writeText(`rgb(${value})`);
  showToastSafe(`rgb(${value}) copied!`);
}


/* ================= SIDEBAR ================= */
function toggleSidebar() {
  const backdrop = document.querySelector(".sidebar-backdrop");

  if (window.innerWidth <= 900) {
    document.body.classList.toggle("sidebar-open");
    backdrop?.classList.toggle("active");
  } else {
    const isHidden = document.body.classList.toggle("sidebar-hidden");
    sessionStorage.setItem("sidebarHidden", isHidden ? "1" : "0");
  }
}

function updateSidebarActiveLink() {
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll(".sidebar ul li").forEach((li) => {
    const anchor = li.querySelector("a");
    if (!anchor) return;

    if (anchor.getAttribute("href").toLowerCase() === currentPage) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

function restoreSidebarState() {
  if (window.innerWidth > 900 && sessionStorage.getItem("sidebarHidden") === "1") {
    document.body.classList.add("sidebar-hidden");
  }
}

function initSidebarLinkClose() {
  document.querySelectorAll(".sidebar ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function () {
      if (window.innerWidth <= 900) {
        document.body.classList.remove("sidebar-open");
        document.querySelector(".sidebar-backdrop")?.classList.remove("active");
      }
    });
  });
}

function toggleMenu() {
  document.querySelector(".sidebar")?.classList.toggle("active");
}

function initSidebar() {
  restoreSidebarState();
  updateSidebarActiveLink();
  initSidebarLinkClose();
}


/* ================= LIVE IFRAME SANDBOX ================= */
function initLiveSandboxes() {
  const componentCards = document.querySelectorAll(".component-card");

  componentCards.forEach((card, index) => {
    const h3 = card.querySelector("h3");
    const actions = card.querySelector(".actions");
    const existingCodeBlock = card.querySelector(".code-block");

    const previewNodes = Array.from(card.childNodes).filter((node) => {
      return (
        (node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "")) &&
        node !== h3 &&
        node !== actions &&
        node !== existingCodeBlock &&
        node.nodeName !== "SCRIPT"
      );
    });

    if (previewNodes.length === 0 && !existingCodeBlock) return;

    let initialHTML = existingCodeBlock
      ? existingCodeBlock.textContent.trim()
      : previewNodes.map((n) => n.outerHTML || n.textContent).join("\n").trim();

    previewNodes.forEach((node) => node.remove());

    // Create iframe preview
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.minHeight = "160px";
    iframe.style.border = "1px solid #e8ebf2";
    iframe.style.borderRadius = "8px";
    iframe.style.background = "transparent";

    // Create editable textarea
    const textarea = document.createElement("textarea");
    if (existingCodeBlock) {
      textarea.id = existingCodeBlock.id;
      textarea.className = existingCodeBlock.className;
      textarea.style.display = existingCodeBlock.style.display || "none";
    } else {
      textarea.id = "live-code-" + index;
      textarea.className = "code-block";
      textarea.style.display = "none";

      if (actions) {
        const toggleBtn = actions.querySelector('button[onclick^="toggleCode"]');
        const copyBtn = actions.querySelector('button[onclick^="copyCode"]');
        if (toggleBtn) toggleBtn.setAttribute("onclick", `toggleCode("${textarea.id}")`);
        if (copyBtn) copyBtn.setAttribute("onclick", `copyCode("${textarea.id}", this)`);
      }
    }

    textarea.value = initialHTML;
    textarea.style.width = "100%";
    textarea.style.minHeight = "120px";
    textarea.style.boxSizing = "border-box";
    textarea.style.resize = "vertical";

    const renderIframe = (htmlContent) => {
      iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: transparent;
              padding: 20px;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>${htmlContent}</body>
        </html>`;
    };

    renderIframe(initialHTML);

    // Debounced live update
    let timeout;
    textarea.addEventListener("input", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => renderIframe(e.target.value), 300);
    });

    if (h3) {
      h3.after(iframe);
    } else {
      card.insertBefore(iframe, card.firstChild);
    }

    if (existingCodeBlock) {
      existingCodeBlock.replaceWith(textarea);
    } else if (actions) {
      actions.after(textarea);
    }
  });
}


/* ================= SEARCH – INLINE FILTER ================= */
// Initialised inside DOMContentLoaded to avoid a const re-declaration at top level.
function initSearchFilter() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase().trim();

    document.querySelectorAll(".component-card").forEach((item) => {
      const text = (item.dataset.name || item.innerText).toLowerCase();
      item.style.display = text.includes(value) ? "block" : "none";
    });
  });
}


/* ================= SEARCH – PAGE ROUTING ================= */
function handleSearch(event) {
  if (event.key !== "Enter") return;

  const query = event.target.value.toLowerCase().trim();

  const routes = {
    button:  "button.html",
    buttons: "button.html",
    navbar:  "Navbar.html",
    navbars: "Navbar.html",
    card:    "cards.html",
    cards:   "cards.html",
    form:    "form.html",
    forms:   "form.html",
    footer:  "footer.html",
    color:   "color.html",
    colors:  "color.html",
  };

  for (const key in routes) {
    if (query.includes(key)) {
      window.location.href = routes[key];
      return;
    }
  }

  showToastSafe("No component found 😢");
}


/* ================= DARK MODE ================= */
// Uses a single toggle element id ("theme-toggle") and the "dark-mode" class.
function loadTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.innerText = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggle) themeToggle.innerText = "🌙 Dark Mode";
  }
}

function initDarkMode() {
  // Apply system preference on first visit
  if (!localStorage.getItem("theme")) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark-mode");
    }
  }

  loadTheme();

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  }
}


/* ================= SCROLL TO TOP ================= */
function initScrollTop() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 50 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ================= SCROLL PROGRESS BAR ================= */
function initProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = ((scrollTop / height) * 100) + "%";
  });
}


/* ================= ALERT CLOSE ================= */
function closeAlert(alertId) {
  const alert = document.getElementById(alertId);
  if (alert) alert.style.display = "none";
}


/* ================= SUBSCRIBE ================= */
function subscribe(e) {
  e.preventDefault();
  showToastSafe("Subscribed successfully! 🎉");
}


/* ================= INIT (DOMContentLoaded) ================= */
window.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initLiveSandboxes();
  initDarkMode();
  initScrollTop();
  initProgressBar();
  initSearchFilter();
});

// DARK MODE
  const toggle = document.getElementById('darkModeToggle');
  const icon = toggle.querySelector('i');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.className = 'fa-solid fa-sun';
  }

  toggle.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');

    icon.className = isDark
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

  });


  // SIDEBAR
  function toggleSidebar() {

    document.getElementById('sidebar').classList.toggle('open');

    document.getElementById('sidebarBackdrop')
      .classList.toggle('visible');

  }


  // SCROLL TOP
  function scrollToTop() {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }
  // SHOW BUTTON
  window.addEventListener('scroll', () => {

    document.getElementById('scrollTopBtn')
      .classList.toggle('visible', window.scrollY > 400);

    document.getElementById('navbar')
      .classList.toggle('scrolled', window.scrollY > 40);

  });

  // TOGGLE CODE
  function toggleCode(id, btn) {

    const block = document.getElementById(id);

    const isOpen = block.classList.toggle('open');

    btn.innerHTML = isOpen
      ? '<i class="fa-solid fa-eye-slash"></i> Hide Code'
      : '<i class="fa-solid fa-code"></i> View Code';

  }

  // COPY CODE
  function copyCode(id, btn) {

    navigator.clipboard.writeText(
      document.getElementById(id).innerText
    ).then(() => {

      btn.innerHTML =
        '<i class="fa-solid fa-check"></i> Copied!';

      btn.classList.add('copied');

      setTimeout(() => {

        btn.innerHTML =
          '<i class="fa-solid fa-copy"></i> Copy';

        btn.classList.remove('copied');

      }, 2000);

    });

  }

  // SCROLL ANIMATION
  const observer = new IntersectionObserver(entries => {

    entries.forEach(e => {

      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }

    });

  }, { threshold: 0.08 });

  document.querySelectorAll('.form-component-card')
    .forEach(el => observer.observe(el));
