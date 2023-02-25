import Tasks from './modules/Tasks.js';

import './style.css';

const newTask = {};
const taskList = new Tasks();

if (localStorage.TodoDB) {
  taskList.tasks = JSON.parse(localStorage.getItem('TodoDB'));
}

const clearAll = document.querySelector('.clear-btn');
const root = document.querySelector('.main-container');
const inputElement = document.querySelector('input');

inputElement.addEventListener('change', () => {
  newTask.description = inputElement.value;
  newTask.completed = false;
  newTask.index = taskList.tasks.length;
  taskList.addTask(new Tasks(newTask.description, newTask.completed, newTask.index));
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    inputElement.value = '';
  }
});

clearAll.addEventListener('click', () => {
  // implement clear btn
});

taskList.displayTasks();
root.append(clearAll);
