// =========================================================
// FILTER ACTIVE
// =========================================================

const filters =
  document.querySelectorAll(".filter-btn");

filters.forEach((btn)=>{

  btn.addEventListener("click",()=>{

    filters.forEach((b)=>{

      b.classList.remove("active");

    });

    btn.classList.add("active");

  });

});

// =========================================================
// BOOKING BUTTON ACTIVE
// =========================================================

const bookingBtns =
  document.querySelectorAll(".booking-days button");

bookingBtns.forEach((btn)=>{

  btn.addEventListener("click",()=>{

    bookingBtns.forEach((b)=>{

      b.classList.remove("active-book");

    });

    btn.classList.add("active-book");

  });

});

// =========================================================
// HERO CALENDAR SWITCH
// =========================================================

const activeDay =
  document.querySelector(".active-day");

activeDay.addEventListener("click",()=>{

  activeDay.classList.toggle("pulse");

});