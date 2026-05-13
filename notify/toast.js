function showToast(type){

  const container = document.getElementById("toastContainer");

  const toastData = {

    success:{
      title:"Success!",
      text:"Your action was completed successfully.",
      icon:"✔"
    },

    error:{
      title:"Error!",
      text:"Something went wrong. Please try again.",
      icon:"✖"
    },

    warning:{
      title:"Warning!",
      text:"Please review before continuing further.",
      icon:"⚠"
    },

    info:{
      title:"Information",
      text:"New updates are now available for your dashboard.",
      icon:"ℹ"
    }

  };

  const data = toastData[type];

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  toast.innerHTML = `
  
    <div class="toast-header">

      <div class="toast-left">

        <div class="toast-icon">
          ${data.icon}
        </div>

        <div class="toast-content">
          <h4>${data.title}</h4>
          <p>${data.text}</p>
        </div>

      </div>

      <button class="toast-close">
        ✕
      </button>

    </div>

    <div class="toast-progress"></div>

  `;

  container.appendChild(toast);

  // manual close

  toast.querySelector(".toast-close")
  .addEventListener("click", () => {
    removeToast(toast);
  });

  // auto remove

  setTimeout(() => {
    removeToast(toast);
  }, 4000);

}

function removeToast(toast){

  toast.style.animation = "slideOut 0.4s ease forwards";

  setTimeout(() => {
    toast.remove();
  }, 400);

}