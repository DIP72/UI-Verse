const saveBtn =
  document.getElementById("saveBtn");

const clipboardInput =
  document.getElementById("clipboardInput");

const clipboardList =
  document.getElementById("clipboardList");

saveBtn.addEventListener("click", () => {

  const text =
    clipboardInput.value.trim();

  if(text === ""){
    return;
  }

  const card =
    document.createElement("div");

  card.classList.add("clipboard-card");

  card.innerHTML = `
    <p>${text}</p>

    <div class="card-buttons">

      <button class="copy-btn">
        Copy
      </button>

      <button class="delete-btn">
        Delete
      </button>

    </div>
  `;

  clipboardList.appendChild(card);

  clipboardInput.value = "";

  const copyBtn =
    card.querySelector(".copy-btn");

  const deleteBtn =
    card.querySelector(".delete-btn");

  copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(text);

    copyBtn.textContent = "Copied";

  });

  deleteBtn.addEventListener("click", () => {

    card.remove();

  });

});