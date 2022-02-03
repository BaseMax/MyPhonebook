// Const
const contacts = document.querySelector("#contacts");
const searchField = document.querySelector("#searchField");
const addNewBtn = document.getElementById("addNew");
const filterBtn = document.getElementById("filterBtn");
const closeAddnewModal = document.getElementsByClassName("addNewModalClose");
const closeFilterModalBtn = document.getElementsByClassName("filterModalClose");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const phonenumber = document.getElementById("phonenumber");
const description = document.getElementById("grid-description");
const contactFormSubmit = document.getElementById("contactFormSubmit");
const filterModal = document.getElementById("filterModal");
const addNewModel = document.getElementById("addNewModel");
// const pagesNumber = document.getElementById("pagesNumber");
const contactForm = document.getElementById("contactForm");
const toggleMenu = document.getElementById("toggleMenu");
let addNewModelOpen = false;   //Indicates the state (open/close) of Add New Model
let filterModelOpen = false;   //Indicates the state (open/close) of Filter Model
// let currentPage = pagesNumber.firstElementChild;  //Indicate pagination of the current table page

// Init database
var db = new Dexie("MyFriendDB");
db.version(1).stores({
  contacts: '++id, first_name, last_name, &phone' // description not need indexing.
});
console.log(`Using Dexie v${Dexie.semVer}`);

// Functions
const add_contact = (first_name, last_name, phone, description) => {
  db.contacts.put({
    first_name: first_name,
    last_name: last_name,
    description: description,
    phone: phone,
  });
  render_contacts();
};

const render_contacts = () => {
  contacts.innerHTML = "";
  let list = db.contacts;
  searchField.value = searchField.value.trim();
  if(searchField.value !== "") {
    list = list.filter(x => {
      if(x.first_name.toLowerCase().includes(searchField.value.toLowerCase()) || x.last_name.toLowerCase().includes(searchField.value.toLowerCase()) || x.description.toLowerCase().includes(searchField.value.toLowerCase()) || x.phone.toLowerCase().includes(searchField.value.toLowerCase()))
        return true;
      return false;
    });
  }

	list.each(item => {
    contacts.innerHTML += `<tr class="hover:bg-blue-500 hover:text-white group">
    <td class="sm:px-6 sm:py-4 px-4 py-5">
        <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
                <img class="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                    alt="">
            </div>
            <div class="ml-4">
                <div class="text-sm font-medium text-gray-900 group-hover:text-white">
                  ${item.first_name} ${item.last_name}
                </div>
            </div>
        </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell ">
        <div class="text-sm text-gray-900 group-hover:text-white">${item.description}</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex ">
            ${item.phone}
        </span>
    </td>

</tr>`;
  });
}
const showDialog = (modal) => {
  toggleModal(modal, true);
  if (modal === "addNewModel") {
    addNewModelOpen = true;
    addNewModel.classList.remove("fadeOut");
    addNewModel.classList.add("fadeIn");
  } else {
    filterModelOpen = true;
    filterModal.classList.remove("fadeOut");
    filterModal.classList.add("fadeIn");
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
    addNewModelOpen = false;
    addNewModel.classList.remove("fadeIn");
    addNewModel.classList.add("fadeOut");
    setTimeout(() => {
      toggleModal(modal, false);
    }, 500);
  } else {
    filterModelOpen = false;
    filterModal.classList.remove("fadeIn");
    filterModal.classList.add("fadeOut");
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
  if (e.keyCode == 27 && addNewModelOpen === true) {
    closeDialog("addNewModel");
    clearWarning();
  }
  if (e.keyCode == 13 && addNewModelOpen === true && checkValidation(firstname, lastname, phonenumber)) {
      contactForm.reset();
      closeDialog("addNewModel");
  }
  if (e.keyCode == 27 && filterModelOpen === true) {
    closeDialog("filterModal");
    closeDialog("filterModal");
  }
});

window.addEventListener("keydown", (e) => {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

// pagesNumber.addEventListener("click", (e) => {
//   const page = e.target;
//   if (page !== currentPage && currentPage) {
//     paginationEffect(currentPage);
//   }
//   currentPage = page;
//   paginationEffect(page);
// });

contactFormSubmit.addEventListener("click", (e) => {
  let passed = checkValidation(firstname, lastname, phonenumber);
  if (passed) {
    add_contact(firstname.value, lastname.value, phonenumber.value, description.value);
    contactForm.reset();
    closeDialog("addNewModel");
  } else {
    e.preventDefault();
  }
});

searchField.addEventListener("keydown", (e) => {
  if(e.key === 'Enter') {}
  render_contacts();
});

window.addEventListener("load", () => {
  render_contacts();
});

toggleMenu.addEventListener("click", () => {
  toggleMenu.children[0].classList.toggle('hidden')
  toggleMenu.children[1].classList.toggle('hidden')
})
