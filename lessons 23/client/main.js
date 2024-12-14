import "./main.scss";

const form = document.querySelector("form");
const addNewTodoInput = document.querySelector(".form__input");
const ul = document.querySelector(".js--todos-wrapper");

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
  span.textContent = value;
  const button = document.createElement("button");
  button.className = "todo-item__delete";
  button.textContent = "Видалити";
  newLiElement.appendChild(input);
  newLiElement.appendChild(span);
  newLiElement.appendChild(button);
  ul.appendChild(newLiElement);
};

const fetchTodos = async () => {
  try {
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();
    todos.forEach(({ _id, text, checked }) => {
      addNewElement(_id, text, checked);
    });
  } catch {
    console.log("Error, server off!!!");
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const response = await fetch("http://localhost:8080/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: +new Date(),
      text: addNewTodoInput.value,
      checked: false,
    }),
  });

  const newTodo = await response.json();
  addNewElement(newTodo._id, newTodo.text, newTodo.checked);
  form.reset();
});

ul.addEventListener("click", async (event) => {
  const id = event.target.parentElement.id;

  if (event.target.className === "todo-item__delete") {
    await fetch(`http://localhost:8080/todos/${id}`, { method: "DELETE" });
    event.target.parentElement.remove();
  }

  if (event.target.className === "todo-item__checkbox") {
    const checked = event.target.checked;
    const span = event.target.parentElement.querySelector(
      ".todo-item__description"
    );
    span.classList.toggle("active", checked);

    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
  }
});

fetchTodos();
