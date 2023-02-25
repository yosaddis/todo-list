import Tasks from './modules/Tasks.js';
import './style.css';
import cleanTasks from './modules/cleanTask.js';

const newTask = {};
const taskList = new Tasks();

if (localStorage.TodoDB) {
  let local_storage = localStorage.getItem('TodoDB');
  taskList.tasks = local_storage !== undefined ? JSON.parse(local_storage) : [] ;
}

const clearAll = document.querySelector('.clear-btn');
const root = document.querySelector('.main-container');
const inputElement = document.querySelector('input');
const ulElement = document.querySelector('ul');

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
  cleanTasks(taskList);
  ulElement.innerHTML = '';
  root.append(taskList.displayTasks(), clearAll);
});

taskList.displayTasks();
root.append(clearAll);
