const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const row = document.createElement('div');
    row.className = 'task-row';

    const left = document.createElement('div');
    left.className = 'task-left';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = task.done;

    const text = document.createElement('span');
    text.textContent = task.text;
    if (task.done) text.classList.add('completed');

    const status = document.createElement('span');
    status.className = 'status' + (task.done ? ' done' : '');
    status.textContent = task.done ? 'Selesai' : 'Belum';

    cb.onchange = () => {
      task.done = cb.checked;
      save();
      render();
    };

    left.append(cb, text);
    row.append(left, status);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.className = 'edit';
    edit.onclick = () => {
      const val = prompt('Edit tugas', task.text);
      if (val) task.text = val;
      save(); render();
    };

    const del = document.createElement('button');
    del.textContent = 'Hapus';
    del.className = 'delete';
    del.onclick = () => {
      tasks.splice(index, 1);
      save(); render();
    };

    actions.append(edit, del);
    li.append(row, actions);
    taskList.appendChild(li);
  });
}

addBtn.onclick = () => {
  if (!taskInput.value.trim()) return;
  tasks.push({ text: taskInput.value, done: false });
  taskInput.value = '';
  save(); render();
};

render();