// Const
let modal1IsOpen = false;
let modal2IsOpen = false;
let currentPage = null;
const addNewBtn = document.getElementById("addNew");
const filterBtn = document.getElementById("filterBtn");
const closeAddnewModal = document.getElementsByClassName("addNewModalClose");
const closeFilterModalBtn = document.getElementsByClassName("filterModalClose");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const phonenumber = document.getElementById("phonenumber");
const contactFormSubmit = document.getElementById("contactFormSubmit");
const modall = document.querySelectorAll(".main-modal");
const pagesNumber = document.getElementById("pagesNumber");
const contactForm = document.getElementById("contactForm");

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

const paginationEffect = (page) => {
  page.classList.toggle("bg-blue-500");
  page.classList.toggle("text-white");
};

const warningEffectAdd = (page) => {
  page.classList.add(
    "bg-red-50",
    "border-red-500",
    "text-red-900",
    "placeholder-red-700",
    "focus:border-red-500"
  );
};
const warningEffectRemove = (page) => {
  page.classList.remove(
    "bg-red-50",
    "border-red-500",
    "text-red-900",
    "placeholder-red-700",
    "focus:border-red-500"
  );
};

const checkValidation = (fname, lname, phone) => {
  const phoneNo = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  let errorFlag = true;

  if (fname.value == null || fname.value == "") {
    fname.nextElementSibling.classList.remove("hidden");
    warningEffectAdd(firstname);
    errorFlag = false;
  } else {
    warningEffectRemove(firstname);
    fname.nextElementSibling.classList.add("hidden");
  }

  if (lname.value == null || lname.value == "") {
    warningEffectAdd(lastname);
    lname.nextElementSibling.classList.remove("hidden");
    errorFlag = false;
  } else {
    warningEffectRemove(lastname);
    lname.nextElementSibling.classList.add("hidden");
  }
  if (!phone.value.match(phoneNo)) {
    phone.nextElementSibling.classList.remove("hidden");
    warningEffectAdd(phonenumber);
    errorFlag = false;
  } else {
    warningEffectRemove(phonenumber);
    phone.nextElementSibling.classList.add("hidden");
  }
  return errorFlag;
};

const clearWarning = () => {
  setTimeout(() => {
    warningEffectRemove(firstname);
    warningEffectRemove(lastname);
    warningEffectRemove(phonenumber);
    firstname.nextElementSibling.classList.add("hidden");
    lastname.nextElementSibling.classList.add("hidden");
    phonenumber.nextElementSibling.classList.add("hidden");
  }, 500);
};

// Events
for (let item of closeAddnewModal) {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog("addNewModel");
    clearWarning();
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
    clearWarning();
  }
  if (e.keyCode == 13 && modal1IsOpen === true && checkValidation(firstname, lastname, phonenumber)) {
      contactForm.reset();
      closeDialog("addNewModel");
  }
  if (e.keyCode == 27 && modal2IsOpen === true) {
    closeDialog("filterModal");
    closeDialog("filterModal");
  }
});

window.addEventListener("keydown", (e) => {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

pagesNumber.addEventListener("click", (e) => {
  const page = e.target;
  if (page !== currentPage && currentPage) {
    paginationEffect(currentPage);
  }
  currentPage = page;
  paginationEffect(page);
});

contactFormSubmit.addEventListener("click", (e) => {
  let passed = checkValidation(firstname, lastname, phonenumber);
  if (passed) {
    contactForm.reset();
    closeDialog("addNewModel");
  } else {
    e.preventDefault();
  }
});
