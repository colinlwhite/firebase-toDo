import $ from 'jquery';
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';

const tasksPrinter = (tasksArray) => {
  let tasksCards = '';
  tasksArray.forEach((task) => {
    tasksCards += `
  <div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${task.task}</li>
    <li class="list-group-item">Due Date</li>
    <li class="list-group-item">Category</li>
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

export default tasksPage;
