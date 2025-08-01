//Select Element
const form = document.querySelector("#addtask");
const task = document.querySelector("#task");
const todosListEl = document.querySelector(".todo__list");
const notificationEl = document.querySelector(".notification");

// Mảng Todo
let todos = [];
let EditIndex = -1;
renderTodo();
// form listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveTodo();
  renderTodo();
});
// Save todo
function saveTodo() {
  const taskValue = task.value.trim();
  // Kiểm tra điều kiện nó có trống ko
  const isEmpty = taskValue === "";
  const isDuplicate = todos.some((todo) => {
    return todo.value.toLowerCase() === taskValue.toLowerCase();
  });
  if (isEmpty) {
    ShowNotification("Todo's input is empty");
  } else if (isDuplicate) {
    ShowNotification("Todo already exist");
  } else if (EditIndex >= 0) {
    todos.forEach((todo, index) => {
      todo.value = index === EditIndex ? taskValue : todo.value;
    });
    EditIndex = -1;
    form.reset();
  } else {
    todos.push({ value: taskValue, checked: false });
    form.reset();
  }
}
// render todo
function renderTodo() {
  if (todos.length === 0) {
    todosListEl.innerHTML = `<center>Nothing to do!</center>`;
  } else {
    // clear todoList
    todosListEl.innerHTML = "";
    todos.forEach((todo, index) => {
      todosListEl.innerHTML += `<div class="todo" id="${index}">
          <div class="todo__left">
            <a href="">
              <i class="${
                todo.checked
                  ? "fa-regular fa-circle-check"
                  : "fa-regular fa-circle"
              }" id="check"></i>
            </a>
            <p class="${todo.checked ? "desc checked" : "desc"}">${
        todo.value
      }</p>
          </div>
          <div class="todo__right">
            <a href="">
              <i class="fa-solid fa-pen-to-square" id="edit"></i>
            </a>
            <a href="">
              <i class="fa-solid fa-trash-can" id="delete"></i>
            </a>
          </div>
        </div>
     `;
    });
  }
}
// select Id all todos
todosListEl.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  //   tìm thằng cha gần nhất có tên class là todo bằng phương thức closet
  //   Lấy id của nơi người dùng click
  const todoID = Number(target.closest(".todo").id);
  //   Tìm sự kiện khi click
  const action = target.id;
  action === "check" && checkTodo(todoID);
  action === "delete" && DeleteTodo(todoID);
  action === "edit" && editTodo(todoID);
});
// Check TO DO
function checkTodo(todoID) {
  todos.forEach((todo, index) => {
    if (todoID === index) {
      todo.checked = !todo.checked;
    }
  });
  renderTodo();
}
// Delete To Do
function DeleteTodo(todoID) {
  todos.splice(todoID, 1);
  EditIndex = -1;
  renderTodo();
}
// Edit To Do
function editTodo(todoID) {
  // gán edit index = todo
  EditIndex = todoID;
  // nội dung index bằng thẻ được chọn
  task.value = todos[todoID].value;
  task.focus();
}
// Notification

function ShowNotification(msg) {
  notificationEl.innerHTML = msg;
  notificationEl.classList.add("notifi--trans");
  setTimeout(() => {
    notificationEl.classList.remove("notifi--trans");
  }, 2000);
}
