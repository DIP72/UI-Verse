const cards = document.querySelectorAll(".card");
const toastUI = document.getElementById("toast-ui");

// SMALL UI TOAST
function uiToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerText = msg;
  toastUI.appendChild(t);

  setTimeout(() => t.remove(), 2000);
}

// HANDLE CARDS
cards.forEach(card => {

  const code = card.getAttribute("data-code");

  // COPY
  card.querySelector(".copy").addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code.trim());
    uiToast("Copied Component Code!");
  });

  // VIEW
  card.querySelector(".view").addEventListener("click", (e) => {
    e.stopPropagation();
    showModal(code);
  });

});

// MODAL FIXED
function showModal(code) {
  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <pre>${code}</pre>
    <button class="close" onclick="this.parentElement.remove()">Close</button>
  `;

  document.body.appendChild(modal);
}
const codeLibrary = {
  success: `
<!-- SUCCESS TOAST -->
<div id="toast-container"></div>

<script>
function showToast(type, message) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerText = message;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
</script>

<style>
.toast {
  padding: 10px;
  margin: 8px;
  background: #1f2937;
  color: white;
  border-radius: 8px;
}
.toast.success { border-left: 4px solid #22c55e; }
</style>
  `,

  error: `
<!-- ERROR TOAST -->
<div id="toast-container"></div>

<script>
function showToast(type, message) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerText = message;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
</script>

<style>
.toast.error { border-left: 4px solid #ef4444; }
</style>
  `,

  info: `
<!-- INFO TOAST -->
<div id="toast-container"></div>

<script>
function showToast(type, message) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerText = message;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
</script>

<style>
.toast.info { border-left: 4px solid #3b82f6; }
</style>
  `
};

// =====================
// EVENT HANDLERS
// =====================
document.querySelectorAll(".card").forEach(card => {

  const id = card.getAttribute("data-id");

  // COPY
  card.querySelector(".copy").addEventListener("click", (e) => {
    e.stopPropagation();

    navigator.clipboard.writeText(codeLibrary[id]);

    showToast("success", "Code copied!");
  });

  // VIEW
  card.querySelector(".view").addEventListener("click", (e) => {
    e.stopPropagation();

    showModal(codeLibrary[id]);
  });

});

// =====================
// MODAL (FIXED)
// =====================
function showModal(code) {
  const modal = document.createElement("div");

  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.background = "#111827";
  modal.style.color = "white";
  modal.style.padding = "20px";
  modal.style.borderRadius = "10px";
  modal.style.whiteSpace = "pre-wrap";
  modal.style.zIndex = "9999";
  modal.style.maxWidth = "600px";
  modal.style.maxHeight = "80vh";
  modal.style.overflow = "auto";

  modal.innerHTML = `
    <pre style="white-space: pre-wrap;">${code}</pre>
    <button onclick="this.parentElement.remove()" style="
      margin-top:10px;
      padding:8px;
      background:red;
      border:none;
      color:white;
      border-radius:6px;
      cursor:pointer;
    ">Close</button>
  `;

  document.body.appendChild(modal);
}