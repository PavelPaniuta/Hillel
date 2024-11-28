$(document).ready(function () {
  const form = $("form");
  const addNewTodoInput = $(".form__input");
  const ul = $(".js--todos-wrapper");
  const modalText = $(".modal-body");

  let mass = {};

  const addNewElement = (id, value, checked) => {
    const newLiElement = $(`
      <li class="todo-item" id="${id}">
        <input type="checkbox" class="todo-item__checkbox" ${checked ? "checked" : ""}>
        <span class="todo-item__description ${checked ? "active" : ""}" data-bs-toggle="modal" data-bs-target="#exampleModal">${value.value}</span>
        <button class="todo-item__delete">Видалити</button>
      </li>
    `);

    ul.append(newLiElement);
  };

  const parseLocalStorage = () => {
    const locStorage = JSON.parse(localStorage.getItem("todo")) || {};
    $.each(locStorage, (key, item) => {
      const isChecked = item.checked;
      mass[key] = item;
      addNewElement(key, item, isChecked);
    });
  };

  parseLocalStorage();

  form.on("submit", (event) => {
    event.preventDefault();

    const value = { value: addNewTodoInput.val(), checked: false };
    const id = +new Date();

    addNewElement(id, value, false);
    mass[id] = value;

    localStorage.setItem("todo", JSON.stringify(mass));
    form.trigger("reset");
  });

  ul.on("click", ".todo-item__description", function () {
    modalText.text($(this).text());
  });

  ul.on("click", ".todo-item__delete", function () {
    const liElement = $(this).parent();
    const id = liElement.attr("id");

    liElement.remove();
    delete mass[id];

    localStorage.setItem("todo", JSON.stringify(mass));
  });

  ul.on("change", ".todo-item__checkbox", function () {
    const liElement = $(this).parent();
    const id = liElement.attr("id");

    const isChecked = $(this).is(":checked");
    mass[id].checked = isChecked;

    liElement.find(".todo-item__description").toggleClass("active", isChecked);
    localStorage.setItem("todo", JSON.stringify(mass));
  });
});
