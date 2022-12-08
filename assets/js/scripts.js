var formElement = $("form");
var inputElement = $("input");
var ulElement = $("ul");
var todos = [];

inputElement.keypress(function (e) {
  if (e.keyCode === 13) {
    var input = inputElement.val();

    addToDo(input);

    return false;
  }
});

function addToDo(input) {
  if (input !== "") {
    var todo = {
      input: input,
      completed: false,
    };
  }

  todos.push(todo);

  addToLocalStorage(todos);

  inputElement.val("");
}

function renderTodos(todos) {
  ulElement.html("");

  todos.forEach(function (todo, index) {
    var checked = todo.completed ? "checked" : "";

    var item = $(
      `<li class="${checked}" data-index='${index}'><span>${todo.input}</span><button>Done</button></li>`
    );

    ulElement.append(item);
  });
}

function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  var storage = localStorage.getItem("todos");

  if (storage) {
    todos = JSON.parse(storage);
    renderTodos(todos);
  }
}

getFromLocalStorage();

ulElement.click(function (e) {
  if (e.target.nodeName === "BUTTON") {
    todos.forEach(function (todo) {
      if (todo.input === e.target.previousElementSibling.innerText) {
        todo.completed = true;
        console.log(todos);
        addToLocalStorage(todos);
      }
    });
  }
});
