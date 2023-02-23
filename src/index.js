import './style.css';

const toDoLists = [
  {
    description: 'Read all the lesson articles.',
    completed: false,
    index: 0,
  },
  {
    description: 'Complete all the projects.',
    completed: false,
    index: 1,
  },
  {
    description: 'Do the quiz.',
    completed: false,
    index: 2,
  },
];

function Todo(toDoLists) {
  let isSelected = false;
  const li = document.createElement('li');
  const itemTaskElement = document.createElement('div');
  const checkBox = document.createElement('input');
  const checkBoxContainer = document.createElement('div');
  checkBoxContainer.classList.add('checkbox-container');
  const label = document.createElement('label');
  const iconMenu = document.createElement('div');
  const iconDelete = document.createElement('div');
  iconMenu.classList.add('menu-container');
  itemTaskElement.classList.add('list-element');
  iconMenu.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
  iconDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
  checkBox.type = 'checkbox';
  checkBox.id = `check${toDoLists.index}`;
  label.htmlFor = `check${toDoLists.index}`;
  label.innerText = toDoLists.description;

  label.addEventListener('click', () => {
    isSelected = !isSelected;
    if (isSelected === true) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
  });

  checkBox.addEventListener('click', () => {
    if (checkBox.checked) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
  });

  checkBoxContainer.append(checkBox, label);
  itemTaskElement.append(checkBoxContainer, iconMenu);
  li.appendChild(itemTaskElement);
  return li;
}

function component() {
  const container = document.createElement('div');
  const input = document.createElement('input');
  const ul = document.createElement('ul');
  const btnClear = document.createElement('button');
  container.classList.add('list-container');
  input.placeholder = 'Add to your list...';
  btnClear.textContent = 'Clear all completed';
  btnClear.classList.add('clear-btn');
  btnClear.disabled = true;

  toDoLists.map((toDoLists) => {
    ul.appendChild(Todo(toDoLists));
    return 'Completed';
  });

  container.append(input, ul, btnClear);

  return container;
}

const mainContainer = document.querySelector('.main-container');

mainContainer.appendChild(component());