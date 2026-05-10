/* UI-Verse - Consolidated script.js
   Single canonical implementations: toggleSidebar, toggleCode(id, btn), copyCode(id, btn), scrollToTop(), dark mode handlers, etc.
*/

// Utility
function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
// Profile editor (attached to button .btnn if present)
const editBtn = document.querySelector('.btnn');
if (editBtn) {
  editBtn.addEventListener('click', () => {
    const currentInfo = document.querySelectorAll('.info p');
    if (!currentInfo || currentInfo.length < 3) return;

    const currentName = currentInfo[0].textContent;
    const currentEmail = currentInfo[1].textContent;
    const currentUsername = currentInfo[2].textContent;

    const existing = document.getElementById('profile-editor-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'profile-editor-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="modal-backdrop" data-close="1" aria-hidden="true"></div>
      <div class="modal-card">
        <div class="modal-header">
          <h3>Edit Profile</h3>
          <button type="button" class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <label><span>Full Name</span><input type="text" id="profile-editor-name" value="${escapeAttr(currentName)}"/></label>
          <label><span>Email</span><input type="email" id="profile-editor-email" value="${escapeAttr(currentEmail)}"/></label>
          <label><span>Username</span><input type="text" id="profile-editor-username" value="${escapeAttr(currentUsername)}"/></label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-secondary" data-cancel="1">Cancel</button>
          <button type="button" class="btn-primary" data-save="1">Save</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
    modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
    modal.querySelector('[data-cancel="1"]')?.addEventListener('click', closeModal);

    modal.querySelector('[data-save="1"]')?.addEventListener('click', () => {
      const newName = modal.querySelector('#profile-editor-name')?.value?.trim();
      const newEmail = modal.querySelector('#profile-editor-email')?.value?.trim();
      const newUsername = modal.querySelector('#profile-editor-username')?.value?.trim();

      if (newName) {
        currentInfo[0].textContent = newName;
        document.querySelector('.profile-header h2')?.textContent = newName;
      }
      if (newEmail) {
        currentInfo[1].textContent = newEmail;
        document.querySelector('.profile-header p')?.textContent = newEmail;
      }
      if (newUsername) currentInfo[2].textContent = newUsername;

      showToastSafe('Profile Updated Successfully! ✅');
      modal.remove();
    });

    setTimeout(() => modal.querySelector('#profile-editor-name')?.focus?.(), 0);
  });
}

// Lightweight toasts
function showToast(message) {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('toast-visible')));

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hidden');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2000);
}
function showToastSafe(message) { try { if (typeof showToast === 'function') showToast(message); } catch (e) {} }

// Toggle code block (used by inline HTML: toggleCode('id', this))
function toggleCode(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.classList.toggle('show');
  el.style.display = isOpen ? 'block' : 'none';
  if (btn) {
    const showHtml = btn.getAttribute('data-show') || '<i class="fa-solid fa-code"></i> View Code';
    const hideHtml = btn.getAttribute('data-hide') || '<i class="fa-solid fa-eye-slash"></i> Hide Code';
    btn.innerHTML = isOpen ? hideHtml : showHtml;
  }
}

// Copy code (used by inline HTML: copyCode('id', this))
function copyCode(id, btn) {
  const element = document.getElementById(id);
  if (!element) return;
  const code = (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') ? element.value : element.innerText;
  navigator.clipboard.writeText(code).then(() => {
    showToastSafe('Code copied!');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 1500);
    }
  }).catch(() => { showToastSafe('Failed to copy ❌'); if (btn) btn.innerText = 'Error'; });
}

// Copy color helpers
function copyColor(color) { navigator.clipboard.writeText(color); showToastSafe(color + ' copied!'); }
function copyRGB(value) { navigator.clipboard.writeText(`rgb(${value})`); showToastSafe(`rgb(${value}) copied!`); }

// Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebarBackdrop') || document.querySelector('.sidebar-backdrop');
  if (!sidebar) return;

  const isOpen = sidebar.classList.toggle('open');
  document.body.classList.toggle('sidebar-open', isOpen);

  if (backdrop) {
    backdrop.classList.toggle('visible', isOpen);
    backdrop.classList.toggle('active', isOpen);
  }
}
function updateSidebarActiveLink() {
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.sidebar ul li').forEach(li => {
    const a = li.querySelector('a'); if (!a) return;
    a.getAttribute('href').toLowerCase() === currentPage ? li.classList.add('active') : li.classList.remove('active');
  });
}
function restoreSidebarState() { sessionStorage.removeItem('sidebarHidden'); }
function initSidebarLinkClose() { document.querySelectorAll('.sidebar ul li a').forEach(a => a.addEventListener('click', () => { document.body.classList.remove('sidebar-open'); document.querySelector('#sidebarBackdrop')?.classList.remove('visible'); document.querySelector('.sidebar-backdrop')?.classList.remove('active'); document.getElementById('sidebar')?.classList.remove('open'); document.querySelector('.sidebar')?.classList.remove('open'); })); }
function initSidebar() { restoreSidebarState(); updateSidebarActiveLink(); initSidebarLinkClose(); }

// Live sandboxes
function initLiveSandboxes() {
  document.querySelectorAll('.component-card').forEach((card, index) => {
    const h3 = card.querySelector('h3');
    const actions = card.querySelector('.actions');
    const existingCodeBlock = card.querySelector('.code-block');
    const previewNodes = Array.from(card.childNodes).filter(node => ((node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')) && node !== h3 && node !== actions && node !== existingCodeBlock && node.nodeName !== 'SCRIPT'));
    if (previewNodes.length === 0 && !existingCodeBlock) return;

    const initialHTML = existingCodeBlock ? existingCodeBlock.textContent.trim() : previewNodes.map(n => n.outerHTML || n.textContent).join('\n').trim();
    previewNodes.forEach(n => n.remove());

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%'; iframe.style.minHeight = '160px'; iframe.style.border = '1px solid #e8ebf2'; iframe.style.borderRadius = '8px'; iframe.style.background = 'transparent';

    const textarea = document.createElement('textarea');
    if (existingCodeBlock) { textarea.id = existingCodeBlock.id; textarea.className = existingCodeBlock.className; textarea.style.display = existingCodeBlock.style.display || 'none'; }
    else { textarea.id = 'live-code-' + index; textarea.className = 'code-block'; textarea.style.display = 'none'; if (actions) { const toggleBtn = actions.querySelector('button[onclick^="toggleCode"]'); const copyBtn = actions.querySelector('button[onclick^="copyCode"]'); if (toggleBtn) toggleBtn.setAttribute('onclick', `toggleCode("${textarea.id}", this)`); if (copyBtn) copyBtn.setAttribute('onclick', `copyCode("${textarea.id}", this)`); } }

    textarea.value = initialHTML; textarea.style.width = '100%'; textarea.style.minHeight = '120px'; textarea.style.boxSizing = 'border-box'; textarea.style.resize = 'vertical';

    const renderIframe = html => { iframe.srcdoc = `<!doctype html><html><head><link rel="stylesheet" href="style.css"><style>body{margin:0;background:transparent;padding:20px;box-sizing:border-box}</style></head><body>${html}</body></html>`; };
    renderIframe(initialHTML);

    let timeout;
    textarea.addEventListener('input', e => { clearTimeout(timeout); timeout = setTimeout(() => renderIframe(e.target.value), 300); });

    if (h3) h3.after(iframe); else card.insertBefore(iframe, card.firstChild);
    if (existingCodeBlock) existingCodeBlock.replaceWith(textarea); else if (actions) actions.after(textarea);
  });
}

// Search filter and routing
function initSearchFilter() {
  const searchInput = document.getElementById('searchInput'); if (!searchInput) return;
  searchInput.addEventListener('keyup', function () { const value = this.value.toLowerCase().trim(); document.querySelectorAll('.component-card').forEach(item => { const text = (item.dataset.name || item.innerText).toLowerCase(); item.style.display = text.includes(value) ? 'block' : 'none'; }); });
}
function handleSearch(event) {
  if (event.key !== 'Enter') return;
  const query = (event.target.value || '').toLowerCase().trim();
  const routes = {
    button: 'button.html',
    buttons: 'button.html',
    navbar: 'navbar.html',
    navbars: 'navbar.html',
    card: 'cards.html',
    cards: 'cards.html',
    form: 'form.html',
    forms: 'form.html',
    footer: 'footer.html',
    color: 'color.html',
    colors: 'color.html'
  };

  for (const k in routes) {
    if (query.includes(k)) {
      window.location.href = routes[k];
      return;
    }
  }

  showToastSafe('No component found \u{1F622}');
}

// Dark mode
function updateToggleVisual(toggleEl, isDark) { const icon = toggleEl?.querySelector?.('i'); if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'; else toggleEl.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode'; }
function loadTheme(toggleEl) { const saved = localStorage.getItem('theme'); if (saved === 'dark') { document.body.classList.add('dark-mode'); if (toggleEl) updateToggleVisual(toggleEl, true); } else if (saved === 'light') { document.body.classList.remove('dark-mode'); if (toggleEl) updateToggleVisual(toggleEl, false); } else { const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; document.body.classList.toggle('dark-mode', prefersDark); if (toggleEl) updateToggleVisual(toggleEl, prefersDark); } }
function initDarkMode() { const toggleEl = document.getElementById('theme-toggle') || document.getElementById('themeToggle') || document.getElementById('darkModeToggle'); loadTheme(toggleEl); if (toggleEl) toggleEl.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); const isDark = document.body.classList.contains('dark-mode'); localStorage.setItem('theme', isDark ? 'dark' : 'light'); updateToggleVisual(toggleEl, isDark); }); }

// Scroll to top
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function initScrollTop() { const btn = document.getElementById('scrollTopBtn'); if (!btn) return; window.addEventListener('scroll', () => { const visible = window.scrollY > 50; btn.style.display = visible ? 'block' : 'none'; btn.classList.toggle('visible', window.scrollY > 400); document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40); }); btn.addEventListener('click', () => scrollToTop()); }

// Progress bar
function initProgressBar() { const bar = document.getElementById('progressBar'); if (!bar) return; window.addEventListener('scroll', () => { const scrollTop = document.documentElement.scrollTop; const height = document.documentElement.scrollHeight - document.documentElement.clientHeight; bar.style.width = ((scrollTop / Math.max(height, 1)) * 100) + '%'; }); }

// Alerts & subscribe
function closeAlert(alertId) { const a = document.getElementById(alertId); if (a) a.style.display = 'none'; }
function subscribe(e) { e.preventDefault(); showToastSafe('Subscribed successfully! 🎉'); }

// Init
window.addEventListener('DOMContentLoaded', () => {
  // Popup reference
  window.popup = document.getElementById('popup');

  initSidebar();
  initLiveSandboxes();
  initDarkMode();
  initScrollTop();
  initProgressBar();
  initSearchFilter();

  // Attach global search handler
  const searchEl = document.getElementById('searchInput'); if (searchEl) searchEl.addEventListener('keydown', handleSearch);

  // Attach optional form-card buttons toast safely
  try { const btns = document.querySelectorAll('.form-card button'); if (btns[0]) btns[0].addEventListener('click', () => showToastSafe('Login button clicked')); if (btns[1]) btns[1].addEventListener('click', () => showToastSafe('Signup button clicked')); if (btns[2]) btns[2].addEventListener('click', () => showToastSafe('Message sent')); if (btns[3]) btns[3].addEventListener('click', () => showToastSafe('Form submitted')); } catch (e) {}

  // Menu toggle (legacy id)
  const menuToggle = document.getElementById('menuToggle'); const sidebarEl = document.querySelector('.sidebar'); if (menuToggle && sidebarEl) menuToggle.addEventListener('click', () => sidebarEl.classList.toggle('hide'));
});


// ================= SEARCH (ROUTING) =================
function handleSearch(event) {
  if (event.key === "Enter") {
    const query = event.target.value.toLowerCase().trim();

    const routes = {
      "button": "button.html",
      "buttons": "button.html",
      "navbar": "navbar.html",
      "navbars": "navbar.html",
      "card": "cards.html",
      "cards": "cards.html",
      "form": "form.html",
      "forms": "form.html",
      "footer": "footer.html",
      "color": "color.html",
      "colors": "color.html"
    };

    for (let key in routes) {
      if (query.includes(key)) {
        window.location.href = routes[key];
        return;
      }
    }

    showToast("No component found 😢");
  }
}


// ================= DARK MODE =================
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const toggleBtn = document.getElementById("theme-toggle");

  if (toggleBtn) {
    toggleBtn.innerText = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.innerText = "☀️ Light Mode";
      } else {
        localStorage.setItem("theme", "light");
        toggleBtn.innerText = "🌙 Dark Mode";
      }
    });
  }

// Init sidebar after DOM ready
  restoreSidebarState();
  updateSidebarActiveLink();
  initSidebarLinkClose();
});  

