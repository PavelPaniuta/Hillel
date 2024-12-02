"use strict";

$(document).ready(function () {
  var form = $("form");
  var addNewTodoInput = $(".form__input");
  var ul = $(".js--todos-wrapper");
  var modalText = $(".modal-body");
  var mass = {};
  var addNewElement = function addNewElement(id, value, checked) {
    var newLiElement = $("\n      <li class=\"todo-item\" id=\"".concat(id, "\">\n        <input type=\"checkbox\" class=\"todo-item__checkbox\" ").concat(checked ? "checked" : "", ">\n        <span class=\"todo-item__description ").concat(checked ? "active" : "", "\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\">").concat(value.value, "</span>\n        <button class=\"todo-item__delete\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n      </li>\n    "));
    ul.append(newLiElement);
  };
  var parseLocalStorage = function parseLocalStorage() {
    var locStorage = JSON.parse(localStorage.getItem("todo")) || {};
    $.each(locStorage, function (key, item) {
      var isChecked = item.checked;
      mass[key] = item;
      addNewElement(key, item, isChecked);
    });
  };
  parseLocalStorage();
  form.on("submit", function (event) {
    event.preventDefault();
    var value = {
      value: addNewTodoInput.val(),
      checked: false
    };
    var id = +new Date();
    addNewElement(id, value, false);
    mass[id] = value;
    localStorage.setItem("todo", JSON.stringify(mass));
    form.trigger("reset");
  });
  ul.on("click", ".todo-item__description", function () {
    modalText.text($(this).text());
  });
  ul.on("click", ".todo-item__delete", function () {
    var liElement = $(this).parent();
    var id = liElement.attr("id");
    liElement.remove();
    delete mass[id];
    localStorage.setItem("todo", JSON.stringify(mass));
  });
  ul.on("change", ".todo-item__checkbox", function () {
    var liElement = $(this).parent();
    var id = liElement.attr("id");
    var isChecked = $(this).is(":checked");
    mass[id].checked = isChecked;
    liElement.find(".todo-item__description").toggleClass("active", isChecked);
    localStorage.setItem("todo", JSON.stringify(mass));
  });
});