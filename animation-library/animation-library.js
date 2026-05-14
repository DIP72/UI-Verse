/* ================= CHIP ACTIVE ================= */

const chips =
document.querySelectorAll(
".chip"
);

chips.forEach(chip => {

  chip.addEventListener(
  "click",
  () => {

    chips.forEach(c => {

      c.classList.remove(
      "active"
      );

    });

    chip.classList.add(
    "active"
    );

  });

});

/* ================= COPY BUTTON ================= */

const copyButtons =
document.querySelectorAll(
".card-footer button"
);

copyButtons.forEach(btn => {

  btn.addEventListener(
  "click",
  () => {

    const original =
    btn.innerText;

    btn.innerText =
    "Copied ✓";

    setTimeout(() => {

      btn.innerText =
      original;

    },2000);

  });

});

/* ================= HERO BUTTON ================= */

const previewBtn =
document.querySelector(
".primary-btn"
);

previewBtn.addEventListener(
"click",
() => {

  previewBtn.innerHTML =
  `<i class="fa-solid fa-circle-play"></i>
   Playing Preview`;

  setTimeout(() => {

    previewBtn.innerHTML =
    `<i class="fa-solid fa-play"></i>
     Preview Pack`;

  },3000);

});

/* ================= SEARCH ================= */

const search =
document.querySelector(
".search-box input"
);

search.addEventListener(
"keydown",
(e) => {

  if(e.key === "Enter"){

    alert(
      "Searching animations for: " +
      search.value
    );

  }

});

/* ================= THEME BUTTON ================= */

const themeBtn =
document.querySelector(
".theme-btn"
);

themeBtn.addEventListener(
"click",
() => {

  document.body.classList.toggle(
  "light-mode"
  );

});
