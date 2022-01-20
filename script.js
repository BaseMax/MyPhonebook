// Const
let modal1IsOpen = false;
let modal2IsOpen = false;
const addNewBtn = document.getElementById("addNew");
const filterBtn = document.getElementById("filterBtn");
const closeAddnewModal = document.getElementsByClassName("addNewModalClose");
const closeFilterModalBtn = document.getElementsByClassName("filterModalClose");
const modall = document.querySelectorAll(".main-modal");

// Functions
const showDialog = (modal) => {
  toggleModal(modal, true);
  if (modal === "addNewModel") {
    modal1IsOpen = true;
    modall[0].classList.remove("fadeOut");
    modall[0].classList.add("fadeIn");
  } else {
    modal2IsOpen = true;
    modall[1].classList.remove("fadeOut");
    modall[1].classList.add("fadeIn");
  }
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  document.body.style.overflow = "hidden";
  document.body.style.width = "100%";
  document.body.style.top = `-${scrollY}`;
};
const closeDialog = (modal) => {
  const scrollY = document.body.style.top;
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  if (modal === "addNewModel") {
    modal1IsOpen = false;
    modall[0].classList.remove("fadeIn");
    modall[0].classList.add("fadeOut");
    setTimeout(() => {
      toggleModal(modal, false);
    }, 500);
  } else {
    modal2IsOpen = false;
    modall[1].classList.remove("fadeIn");
    modall[1].classList.add("fadeOut");
    setTimeout(() => {
      toggleModal(modal, false);
    }, 500);
  }
  setTimeout(() => {
    document.body.style.overflow = "visible";
  }, 500);
};

// Events
for (let item of closeAddnewModal) {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog("addNewModel");
  });
}
for (let item of closeFilterModalBtn) {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog("filterModal");
    closeDialog("filterModal");
  });
}

addNewBtn.addEventListener("click", () => {
  showDialog("addNewModel");
});

filterBtn.addEventListener("click", () => {
  showDialog("filterModal");
});

window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27 && modal1IsOpen === true) {
    closeDialog("addNewModel");
  }
  if (e.keyCode == 27 && modal2IsOpen === true) {
    closeDialog("filterModal");
    closeDialog("filterModal");
  }
});
