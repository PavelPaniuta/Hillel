const form = document.querySelector("form");
const nameUser = document.querySelector("#exampleFormControlInput1");
const textUser = document.querySelector("#exampleFormControlTextarea1");
const phoneUser = document.querySelector("#exampleFormControlInput2");
const emeiltUser = document.querySelector("#exampleFormControlInput3");
const erroName = document.querySelector(".form-group__div__name");
const erroText = document.querySelector(".form-group__div__text");
const erroPhone = document.querySelector(".form-group__div__phone");
const erroEmail = document.querySelector(".form-group__div__emeil");
const allSelectorError = document.querySelectorAll(".form-group__div");


//only letters
nameUser.addEventListener("keypress", (event) => {
  const char = String.fromCharCode(event.which);
  if (!/^[A-Za-zА-Яа-яЁё ]$/.test(char)) {
    event.preventDefault();
  }
});

//correct number input field
phoneUser.addEventListener("input", () => {
  const value = phoneUser.value.replace(/\D/g, "").replace(/^380/, "");
  phoneUser.value = `+380 ${value.slice(0, 2)}${
    value.length > 2 ? "-" + value.slice(2, 5) : ""
  }${value.length > 5 ? "-" + value.slice(5, 9) : ""}`;
});

//function checking the field is filled, error appears
const erroInfo = (regExp, item, erro) => {
  if (regExp.test(item.value)) {
    erro.classList.remove("block");
  } else if (!regExp.test(item.value) || item.value.length < 1) {
    erro.classList.add("block");
  }
};

nameUser.addEventListener("input", () => {
  erroInfo(/^(?=.{1,})[a-zA-Zа-яА-ЯёЁ\s]+$/, nameUser, erroName);
});

phoneUser.addEventListener("input", () => {
  erroInfo(/^\+380[ -]?\d{2}[ -]?\d{3}[ -]?\d{4}$/, phoneUser, erroPhone);
});

textUser.addEventListener("input", () => {
  erroInfo(/^(?=.{5,})[a-zA-Zа-яА-ЯёЁ0-9\s]+$/, textUser, erroText);
});

emeiltUser.addEventListener("input", () => {
  erroInfo(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    emeiltUser,
    erroEmail
  );
});

const sendMassage = () => {
  
  allSelectorError.forEach((el) => {
    if(el.className.includes("block")){
      return false;
    }});
  return true;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if(!sendMassage() || nameUser.value < 1 || phoneUser.value < 5 || emeiltUser.value < 1) {
    return
  }
  const formData = new FormData(event.target);
  const formObj = {};

  formData.forEach((value, key) => (formObj[key] = value));

  console.log(formObj);

  form.reset();
});
