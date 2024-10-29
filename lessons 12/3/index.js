const todoList = document.querySelector(".todo__ul");
const input = document.querySelector("input");
const form = document.querySelector(".form");

function addNeweText(event) {
  let thiss = event.target;
  if (thiss.tagName == "BUTTON") {
    const parentElement = thiss.parentElement;
    parentElement.remove();
  }
}

todoList.addEventListener("click", addNeweText);

function addNewItem(event) {
  event.preventDefault();
  const text = input.value;
  if (!text) {
    return;
  }
  const el = `<span>${text}</span>
                    <Button class="del">Dellate</Button> `;
  const nodeEl = document.createElement("li");
  nodeEl.classList.add("todo__li");
  nodeEl.innerHTML = el;
  todoList.appendChild(nodeEl);
  input.value = "";
}

form.addEventListener("submit", addNewItem);
