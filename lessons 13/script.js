const form = document.querySelector("form");
const nameUser = document.querySelector("#exampleFormControlInput1");
const textUser = document.querySelector("#exampleFormControlTextarea1");
const phoneUser = document.querySelector("#exampleFormControlInput2");
const emeiltUser = document.querySelector("#exampleFormControlInput3");
const erroName = document.querySelector(".form-group__div__name");
const erroText = document.querySelector(".form-group__div__text");
const erroPhone = document.querySelector(".form-group__div__phone");
const erroEmail = document.querySelector(".form-group__div__emeil");

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
  let res = 0;
  if (regExp.test(item.value)) {
    res = res + 1;
    erro.style.display = "none";
  } else if (item.value.length < 1) {
    res = res - 1;
    erro.style.display = "block";
  }
  return res;
};

//main function, takes values ​​and writes to the result to fix errors in the fields
const validateInfo = () => {
  let result = 0;
  result += erroInfo(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, nameUser, erroName);
  result += erroInfo(/^(?=.{5,})[a-zA-Zа-яА-ЯёЁ0-9\s]+$/, textUser, erroText);
  result += erroInfo(
    /^\+3[ -]?8[ -]?0[ -]?\d{2}[ -]?\d{3}[ -]?\d{4}$/,
    phoneUser,
    erroPhone
  );
  result += erroInfo(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    emeiltUser,
    erroEmail
  );
  return result;
};

form.addEventListener('keypress', (event) => {
  validateInfo();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateInfo() < 4) {
    return;
  }

  const formData = new FormData(event.target);
  const formObj = {};

  formData.forEach((value, key) => (formObj[key] = value));

  console.log(formObj);

  form.reset();
});
