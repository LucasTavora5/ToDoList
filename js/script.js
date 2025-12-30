// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('.todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

// Funções
const saveTodo = (text) => {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish-todo');
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-todo');
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('remove-todo');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = '';
  todoInput.focus();
};

// Eventos
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = todoInput.value.trim();

  if (inputValue === '') {
    return;
  }

  saveTodo(inputValue);
});
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('finish-todo')) {
    const todo = e.target.parentElement;
    todo.classList.toggle('done');
  } else if (e.target.classList.contains('edit-todo')) {
    const todo = e.target.parentElement;
    editInput.value = todo.querySelector('h3').innerText;
    todoList.classList.add('hide');
    editForm.classList.remove('hide');
    editForm.setAttribute('data-todo', todo.querySelector('h3').innerText);
    editInput.focus();
  } else if (e.target.classList.contains('remove-todo')) {
    const todo = e.target.parentElement;
    todo.remove();
  }
});
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = editForm.getAttribute('data-todo');
  const todos = document.querySelectorAll('.todo');
  todos.forEach((todo) => {
    if (todo.querySelector('h3').innerText === todoText) {
      todo.querySelector('h3').innerText = editInput.value;
    }
  });
  editForm.classList.add('hide');
  todoList.classList.remove('hide');
});
cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault();
  editForm.classList.add('hide');
  todoList.classList.remove('hide');
});
