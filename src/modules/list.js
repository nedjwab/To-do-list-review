export default class Task {
  constructor() {
    if (!this.Tasks) {
      this.Tasks = [];
    }
    this.display();
  }

  display() {
    this.saveData();
    const Tasks = document.querySelector('#list-items');
    Tasks.innerHTML = '';
    this.Tasks.forEach((tasks) => {
      let task = `
          <li class="display s-between list-item" id="item-data-${tasks.index}">`;
      if (tasks.completed) {
        task += `
              <span class="material-icons done update-status" data="${tasks.index}">
                done
              </span>
              <p contenteditable="true" class="completed activity" data="${tasks.index}">
                ${tasks.description}
              </p>
              `;
      } else {
        task += `
              <span class="material-icons  update-status"  data="${tasks.index}">
                check_box_outline_blank
              </span>
              <p contenteditable="true" class="activity" data="${tasks.index}">
                ${tasks.description}
              </p>`;
      }
      task += `
            <span class="material-icons delete-activity" data="${tasks.index}">
              delete
            </span>
          </li>
        `;
      Tasks.innerHTML += task;
    });
    this.options();
  }

  addTask(task) {
    if (task || task === 0) {
      const newTask = {
        description: task,
        completed: false,
        index: (this.Tasks.length + 1),
      };
      this.Tasks.push(newTask);
      this.display();
    }
  }

  deleteTask(index) {
    if (index) {
      this.Tasks.splice((index - 1), 1);
      this.display();
    }
  }

  updateTask(index) {
    index -= 1;
    if (index !== undefined) {
      if (this.Tasks[index].completed === true) {
        this.Tasks[index].completed = false;
      } else {
        this.Tasks[index].completed = true;
      }
    }
    this.display();
  }

  updateTaskStatus(index) {
    index -= 1;
    if (index !== undefined) {
      if (this.Tasks[index].completed === true) {
        this.Tasks[index].completed = false;
      } else {
        this.Tasks[index].completed = true;
      }
    }
    this.display();
  }

  clearCompleted() {
    this.Tasks = this.Tasks.filter((task) => task.completed === false);
    this.display();
  }

  clearAll() {
    this.Tasks.splice(0);
    this.display();
  }

  saveData() {
    for (let i = 0; i < this.Tasks.length; i += 1) {
      this.Tasks[i].index = (i + 1);
    }
    this.Tasks.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    localStorage.setItem('todo-list', JSON.stringify(this.Tasks));
  }

  editTask(index, description) {
    this.Tasks[index - 1].description = description;
    this.saveData();
  }

  options() {
    const updateStatusBtns = document.querySelectorAll('.update-status');
    if (updateStatusBtns !== null) {
      updateStatusBtns.forEach((item) => {
        item.addEventListener('click', () => {
          this.updateTaskStatus(item.getAttribute('data'));
        });
      });
    }

    const activities = document.querySelectorAll('.activity');
    if (activities) {
      activities.forEach((task) => {
        task.addEventListener('input', (e) => {
          const description = e.target.innerText;
          const index = e.target.getAttribute('data');
          this.editTask(index, description);
        });
      });
    }
    const deleteBtns = document.querySelectorAll('.delete-activity');
    if (deleteBtns) {
      deleteBtns.forEach((task) => {
        task.addEventListener('click', () => {
          this.deleteTask(task.getAttribute('data'));
        });
      });
    }
  }
}