const cleanTasks = (taskList) => {
  const result = taskList.tasks.filter((task) => task.completed === false);
  taskList.tasks = result;
  taskList.createList();
};

export default cleanTasks;
