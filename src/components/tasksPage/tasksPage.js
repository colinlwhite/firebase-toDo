import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const tasksPage = () => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/tasks.json`)
    .then((results) => {
      const tasksObject = results.data;
      const tasksArray = [];
      if (tasksObject !== null) {
        Object.keys(tasksObject).forEach((taskId) => {
          tasksObject[taskId].id = taskId;
          tasksArray.push(tasksObject[taskId]);
        });
      }
      console.log(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};
export default tasksPage;
