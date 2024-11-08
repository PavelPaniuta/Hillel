const form = document.querySelector("form");
const addNewTodoBtn = document.querySelector(".form__btn");
const addNewTodoInput = document.querySelector(".form__input");
const ul = document.querySelector(".js--todos-wrapper");

let mass = {};

const addNewElement = (id, value, checked) => {
  const newLiElement = document.createElement("li");
  newLiElement.className = "todo-item";
  newLiElement.id = id;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "todo-item__checkbox";
  input.checked = checked;
  const span = document.createElement("span");
  span.className = "todo-item__description";
  if (checked) {
    span.classList.add("active");
  }
  span.textContent = value.value;
  const button = document.createElement("button");
  button.className = "todo-item__delete";
  button.textContent = "Видалити";
  newLiElement.appendChild(input);
  newLiElement.appendChild(span);
  newLiElement.appendChild(button);
  ul.appendChild(newLiElement);
};

const parseLocalStorage = () => {
  const locStorage = JSON.parse(localStorage.getItem("todo"));
  for (let key in locStorage) {
    let chek = locStorage[key].checked;
    mass[key] = locStorage[key];
    addNewElement(key, locStorage[key], chek);
  }
};
parseLocalStorage();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = { value: addNewTodoInput.value, checked: false };
  const id = +new Date();
  addNewElement(id, value);
  mass[id] = value;
  localStorage.setItem("todo", JSON.stringify(mass));
  form.reset();
});

ul.addEventListener("click", (event) => {
  const id = event.target.parentElement.id;
  if (event.target.className === "todo-item__delete") {
    event.target.parentElement.remove();
    delete mass[id];
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(mass));
  }
  if (event.target.className === "todo-item__checkbox") {
    event.target.checked = !mass[id].checked;
    mass[id].checked = !mass[id].checked;
    const el = event.target.parentElement.querySelector(
      ".todo-item__description"
    );
    el.classList.toggle("active");
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(mass));
  }
});
