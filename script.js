const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "todo-item";

  li.innerHTML = `
    <div class="todo-left">
      <input type="checkbox">
      <span class="todo-text">${text}</span>
    </div>
    <div class="todo-actions">
      <button class="edit">Edit</button>
      <button class="delete">Hapus</button>
    </div>
  `;

  li.querySelector("input").addEventListener("change", e => {
    li.querySelector(".todo-text").classList.toggle("done");
  });

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
  input.value = "";
}
