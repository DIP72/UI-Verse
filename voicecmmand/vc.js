const micBtn = document.getElementById("micBtn");
const statusText = document.getElementById("status");

let listening = false;

micBtn.addEventListener("click", () => {
  listening = !listening;

  micBtn.classList.toggle("active");

  if(listening){
    statusText.textContent = "Listening...";
  } else {
    statusText.textContent = "Waiting for command...";
  }
});