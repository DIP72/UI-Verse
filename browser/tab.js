const addTabBtn =
  document.getElementById("addTabBtn");

const tabsHeader =
  document.getElementById("tabsHeader");

function activateTab(tab){

  document
  .querySelectorAll(".tab")
  .forEach(item => {

    item.classList.remove("active");

  });

  tab.classList.add("active");
}

document
.querySelectorAll(".tab")
.forEach(tab => {

  tab.addEventListener("click", () => {

    activateTab(tab);

  });

});

document
.querySelectorAll(".close-btn")
.forEach(button => {

  button.addEventListener("click", event => {

    event.stopPropagation();

    button.parentElement.remove();

  });

});

addTabBtn.addEventListener("click", () => {

  const newTab =
    document.createElement("div");

  newTab.classList.add("tab");

  newTab.innerHTML = `
    <span>New Tab</span>
    <button class="close-btn">×</button>
  `;

  tabsHeader.insertBefore(
    newTab,
    addTabBtn
  );

  activateTab(newTab);

  newTab.addEventListener("click", () => {

    activateTab(newTab);

  });

  newTab
  .querySelector(".close-btn")
  .addEventListener("click", event => {

    event.stopPropagation();

    newTab.remove();

  });

});