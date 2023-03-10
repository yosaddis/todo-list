const Tasks = class {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  createList = () => {
    let i = 0;
    this.tasks.forEach((task) => {
      i += 1;
      task.index = i;
    });
    localStorage.setItem('TodoDB', JSON.stringify(this.tasks));
  };

  addTask = (newTask) => {
    if (newTask.description === '') {
      return;
    }
    this.tasks.push(newTask);
    this.createList();
    this.displayTasks();
  };

  removeTask = (task) => {
    const result = this.tasks.filter((b) => b.index !== task.index);
    this.tasks = result;
    this.createList();
    this.displayTasks();
  }

  editTask = (text, label, icon) => {
    label.innerHTML = text;
    this.createList();
    icon.innerHTML = '<i class="fas fa-trash-alt"></i>';
    icon.style.cursor = 'pointer';
  };

  completedTask = (task, checkBox, label) => {
    if (checkBox.checked) {
      label.style.textDecoration = 'line-through';
      task.completed = checkBox.checked;
      this.createList();
    } else {
      label.style.textDecoration = 'none';
      task.completed = checkBox.checked;
      this.createList();
    }
  };

  displayTasks = () => {
    const containerElement = document.querySelector('.list-container');
    const ulElement = document.querySelector('ul');
    ulElement.innerHTML = '';
    this.tasks.map((task) => {
      const li = document.createElement('li');
      const itemTaskElement = document.createElement('div');
      const checkBox = document.createElement('input');
      const checkBoxContainer = document.createElement('div');
      checkBoxContainer.classList.add('checkbox-container');
      const label = document.createElement('label');
      const textInput = document.createElement('input');

      const icon = document.createElement('div');

      textInput.classList.add('text-edit', 'hidden');

      icon.classList.add('menu-container');

      li.classList.add(`li${task.index}`);
      itemTaskElement.classList.add('list-element');

      const iconMenu = '<i class="fas fa-ellipsis-v"></i>';
      const iconDelete = '<i class="fas fa-trash-alt"></i>';

      icon.innerHTML = iconMenu;

      checkBox.type = 'checkbox';
      checkBox.id = `check${task.index}`;
      textInput.value = task.description;
      label.innerHTML = task.description;
      checkBox.checked = task.completed;

      label.addEventListener('click', () => {
        label.classList.add('hidden');
        textInput.classList.remove('hidden');
        li.classList.add('on-update');
        textInput.focus();
      });

      textInput.addEventListener('focus', () => {
        this.createList();
        icon.innerHTML = iconDelete;
        icon.style.cursor = 'pointer';
      });

      textInput.addEventListener('change', (e) => {
        task.description = e.target.value;
        this.editTask(task.description, label, icon);
      });

      textInput.addEventListener('blur', () => {
        label.classList.remove('hidden');
        textInput.classList.add('hidden');
        li.classList.remove('on-update');
        setTimeout(() => {
          icon.innerHTML = iconMenu;
          icon.style.cursor = 'menu';
        }, 1500);
      });

      checkBox.addEventListener('change', (e) => {
        if (e.currentTarget.checked) {
          label.style.textDecoration = 'line-through';
          this.completedTask(task, checkBox, label);
        } else {
          label.style.textDecoration = 'none';
          this.completedTask(task, checkBox, label);
        }
      });

      icon.addEventListener('click', () => {
        if (icon.innerHTML === iconDelete) {
          this.removeTask(task);
          ulElement.removeChild(li);
        }
      });

      li.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          checkBox.focus();
          textInput.classList.add('hidden');
          label.classList.remove('hidden');
          li.classList.remove('on-update');
        }
      });

      checkBoxContainer.append(checkBox, label, textInput);
      itemTaskElement.append(checkBoxContainer, icon);

      li.appendChild(itemTaskElement);
      ulElement.appendChild(li);
      return ulElement;
    });
    containerElement.appendChild(ulElement);
    return containerElement;
  };
};

export default Tasks;
