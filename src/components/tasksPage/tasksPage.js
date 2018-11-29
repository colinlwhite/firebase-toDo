import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import tasksData from '../../helpers/Data/tasksData';

const tasksPrinter = (tasksArray) => {
  let tasksCards = '';
  tasksArray.forEach((task) => {
    if (task.isCompleted === false) {
      tasksCards += `
      <div class="card d-inline-block m-4" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${task.task}</li>
        <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
        <button class="btn btn-warning edit-btn" data-edit-id=${task.id}>Edit</button>
        <label class="is-completed-checkbox" for="complete">Is Completed</label>
        <input type="checkbox" class="form-control is-completed-checkbox" value="${task.isCompleted}" id="${task.id}">
      </ul>
    </div>
      `;
    }
  });
  $('#tasks').html(tasksCards);
};

const completedTasksPrinter = (tasksArray) => {
  let tasksCards = '';
  tasksArray.forEach((task) => {
    if (task.isCompleted === true) {
      tasksCards += `
      <div class="card d-inline-block m-4" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${task.task}</li>
        <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
      </ul>
    </div>
      `;
    }
  });
  $('#completed-tasks').html(tasksCards);
};

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  tasksData.getAllTasks(uid)
    .then((tasksArray) => {
      tasksPrinter(tasksArray);
      completedTasksPrinter(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  tasksData.deleteTask(idToDelete)
    .then(() => {
      tasksPage();
      console.log('stocism - it works');
    })
    .catch((error) => {
      console.log('error in deleting the task', error);
    });
};

const taskChange = (e) => {
  const taskId = e.target.id;
  const isCompleted = e.target.checked;
  tasksData.taskChanged(taskId, isCompleted).then(() => {

  })
    .catch((error) => {
      console.log(error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.is-completed-checkbox', taskChange);
};

const initializeTasksPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeTasksPage;
