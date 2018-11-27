import $ from 'jquery';
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';

const tasksPrinter = (tasksArray) => {
  let tasksCards = '';
  tasksArray.forEach((task) => {
    tasksCards += `
  <div class="card d-inline-block m-4" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${task.task}</li>
    <li class="list-group-item">Due Date</li>
    <li class="list-group-item">Category</li>
    <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
  </ul>
</div>
  `;
  });
  $('#tasks').html(tasksCards);
};

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/tasks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const tasksObject = results.data;
      const tasksArray = [];
      if (tasksObject !== null) {
        Object.keys(tasksObject).forEach((taskId) => {
          tasksObject[taskId].id = taskId;
          tasksArray.push(tasksObject[taskId]);
        });
      }
      tasksPrinter(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  console.log(idToDelete);
  axios.delete(`${apiKeys.firebaseKeys.databaseURL}/tasks/${idToDelete}.json`)
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
