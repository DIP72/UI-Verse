// =========================================================
// FILTER ACTIVE
// =========================================================

const filterBtns =
  document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn)=>{

  btn.addEventListener("click",()=>{

    filterBtns.forEach((b)=>{

      b.classList.remove("active");

    });

    btn.classList.add("active");

  });

});

// =========================================================
// SEARCH FILTER
// =========================================================

const searchInput =
  document.getElementById("badgeSearch");

const cards =
  document.querySelectorAll(".badge-card");

searchInput.addEventListener("keyup",()=>{

  const value =
    searchInput.value.toLowerCase();

  cards.forEach((card)=>{

    const text =
      card.innerText.toLowerCase();

    if(text.includes(value)){

      card.style.display = "block";

    }else{

      card.style.display = "none";

    }

  });

});

// =========================================================
// COPY BUTTON
// =========================================================

const copyBtns =
  document.querySelectorAll(".copy-btn");

copyBtns.forEach((btn)=>{

  btn.addEventListener("click",()=>{

    btn.innerText = "Copied!";

    setTimeout(()=>{

      btn.innerText = "Copy";

    },1500);

  });

});

// =========================================================
// RANDOM NOTIFICATION COUNT
// =========================================================

const notification =
  document.querySelector(".notification-count");

setInterval(()=>{

  const random =
    Math.floor(Math.random() * 9) + 1;

  notification.innerText = random;

},3000);