const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

/* =====================
   INIT
   ===================== */
renderTodos();

/* =====================
   EVENTS
   ===================== */
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

document.addEventListener("click", function (e) {

  // DELETE
  if (e.target.classList.contains("delete")) {
    const item = e.target.closest(".todo-item");
    const index = item.dataset.index;
    todos.splice(index, 1);
    save();
    renderTodos();
  }

  // EDIT
  if (e.target.classList.contains("edit-btn")) {
    const item = e.target.closest(".todo-item");
    const index = item.dataset.index;
    const textEl = item.querySelector(".todo-text");

    if (textEl.isContentEditable) {
      textEl.contentEditable = "false";
      e.target.textContent = "Edit";
      textEl.classList.remove("editing");
      todos[index].text = textEl.textContent.trim();
      save();
    } else {
      textEl.contentEditable = "true";
      textEl.focus();
      e.target.textContent = "Simpan";
      textEl.classList.add("editing");
    }
  }

});

list.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    const item = e.target.closest(".todo-item");
    const index = item.dataset.index;
    todos[index].done = e.target.checked;
    save();
    renderTodos();
  }
});

/* =====================
   FUNCTIONS
   ===================== */
function addTask() {
  const text = input.value.trim();
  if (!text) return;

  todos.unshift({ text, done: false });
  save();
  renderTodos();

  input.value = "";
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.index = index;

    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.done ? "checked" : ""}>
        <span class="todo-text ${todo.done ? "done" : ""}">
          ${todo.text}
        </span>
      </div>
      <div class="todo-actions">
        <button class="btn edit edit-btn">Edit</button>
        <button class="delete">Hapus</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
