/* ======================================================
COUNT ANIMATION
====================================================== */

function animateValue(id,start,end,duration){

  let range = end - start;

  let current = start;

  let increment = end > start ? 1 : -1;

  let stepTime =
    Math.abs(
      Math.floor(duration / range)
    );

  const obj =
    document.getElementById(id);

  const timer =
    setInterval(()=>{

      current += increment;

      if(id === "growthCount"){

        obj.innerHTML =
          current + "%";

      }else{

        obj.innerHTML =
          current.toLocaleString();

      }

      if(current == end){

        clearInterval(timer);
      }

    },stepTime);

}

animateValue(
  "usersCount",
  0,
  15420,
  1200
);

animateValue(
  "componentsCount",
  0,
  842,
  1200
);

animateValue(
  "viewsCount",
  0,
  98450,
  1200
);

animateValue(
  "growthCount",
  0,
  78,
  1200
);

/* ======================================================
SEARCH DEMO
====================================================== */

const searchInput =
  document.querySelector(
    ".search-bar input"
  );

searchInput.addEventListener(
  "focus",
  ()=>{

    searchInput.parentElement.style.borderColor =
      "#7b61ff";

  }
);

searchInput.addEventListener(
  "blur",
  ()=>{

    searchInput.parentElement.style.borderColor =
      "rgba(255,255,255,.08)";

  }
);