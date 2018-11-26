import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeTasksPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#tasks').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-tasks').show();
      $('#navbar-button-logout').show();
      initializeTasksPage(); // not sure
    } else {
      $('#auth').show();
      $('#tasks').hide();
      $('#navbar-button-auth').show();
      $('#navbar-button-tasks').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;
export default { checkLoginStatus, getCurrentUid };
