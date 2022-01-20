// Const
const addNewBtn = document.getElementById("addNew");
const closeModalBtn = document.getElementsByClassName("addNewModalClose");

// Functions
const showDialog = () => {
  toggleModal("addNewModel", true);
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}`;
};

const closeDialog = () => {
  const scrollY = body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  toggleModal("addNewModel", false);
};

// Events
for (let item of closeModalBtn) {
  item.addEventListener("click", () => {
    closeDialog();
  });
}

addNewBtn.addEventListener("click", () => {
  showDialog();
});

window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});
