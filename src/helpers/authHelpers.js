import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeTasksPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#tasks').show();
      $('#navbar-button-tasks').show();
      $('#navbar-button-logout').show();
      $('#show-task-form').show();
      $('#completed-tasks').show();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      initializeTasksPage(); // not sure
    } else {
      $('#auth').show();
      $('#tasks').hide();
      $('#navbar-button-auth').show();
      $('#navbar-button-tasks').hide();
      $('#navbar-button-logout').hide();
      $('#show-task-form').hide();
      $('#completed-tasks').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;
export default { checkLoginStatus, getCurrentUid };
