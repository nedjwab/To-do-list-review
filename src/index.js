import './index.css';
import Task from './modules/list.js';

const Tasks = new Task();
Tasks.display();

document.querySelector('#add-task').addEventListener('submit', (e) => {
  e.preventDefault();
  const task = e.target.elements.activity.value;
  Tasks.addTask(task);
  e.target.reset();
});

document.querySelector('.clear-completed').addEventListener('click', () => {
  Tasks.clearCompleted();
});

document.querySelector('#delete-all').addEventListener('click', () => {
  Tasks.clearAll();
});