const showDialog = () => {
  toggleModal("addNewModel", true);
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  const body = document.body;
  body.style.position = "fixed";
  body.style.top = `-${scrollY}`;
};
const closeDialog = () => {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = "";
  body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  toggleModal("addNewModel", false);
};
const addNewBtn = document.getElementById("addNew");
const closeModalBtn = document.getElementsByClassName("addNewModalClose");
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
