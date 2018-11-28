import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import tasksData from '../../helpers/Data/tasksData';

const tasksPrinter = (tasksArray) => {
  let tasksCards = '';
  tasksArray.forEach((task) => {
    tasksCards += `
  <div class="card d-inline-block m-4" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${task.task}</li>
    <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
    <button class="btn btn-warning edit-btn" data-edit-id=${task.id}>Edit</button>
  </ul>
</div>
  `;
  });
  $('#tasks').html(tasksCards);
};

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  tasksData.getAllTasks(uid)
    .then((tasksArray) => {
      tasksPrinter(tasksArray);
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

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeTasksPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeTasksPage;
