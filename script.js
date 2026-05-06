// icon-
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
});

// settings.html
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function () {
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("email", emailInput.value);
  alert("Profile saved!");
});
// password
const currentPass = document.getElementById("currentPass");
const newPass = document.getElementById("newPass");
const passBtn = document.getElementById("passBtn");

passBtn.addEventListener("click", function () {
  let savedPass = localStorage.getItem("password");
  if (!savedPass) {
    savedPass = "1234";
  }

  if (currentPass.value === savedPass) {
    localStorage.setItem("password", newPass.value);
    alert("Password updated!");
  } else {
    alert("Wrong current password!");
  }
});

// darkmode
const darkToggle = document.getElementById("dark-Toggle");
darkToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark");
});

// email
const emailToggle = document.getElementById("emailToggle");
emailToggle.addEventListener("change", function () {
  if (emailToggle.checked) {
    alert("Email notifications ON");
  } else {
    alert("Email notifications OFF");
  }
});

// popup

let popup = document.getElementById("popup");

function openPopup(){
  popup.classList.add("open-popup");
}

function closePopup(){
  popup.classList.remove("open-popup");
}

const btn = document.getElementById("scrollTopBtn");

// show btn when scrolling down
window.onscroll = function () {
  if (document.documentElement.scrollTop > 50) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// scroll to top
btn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// darkmode

const toggleBtn = document.getElementById("darkModeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

// Toggle dark mode
toggleBtn.onclick = function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
};


/* Toggle Code Block */
function toggleCode(id) {
  const el = document.getElementById(id);

  if (el.style.display === "block") {
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
}

/* Copy Code with Better UX */
function copyCode(id, btn) {
  const code = document.getElementById(id).innerText;

  navigator.clipboard.writeText(code)
    .then(() => {
      btn.innerText = "Copied!";
      btn.style.background = "#00b894";

      setTimeout(() => {
        btn.innerText = "Copy";
        btn.style.background = "#111";
      }, 1500);
    })
    .catch(() => {
      btn.innerText = "Error";
    });
}
