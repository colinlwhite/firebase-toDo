import firebase from 'firebase/app';
import 'bootstrap';
import $ from 'jquery';
import apiKeys from '../db/apiKeys.json';
import './index.scss';
import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers'; // basically importing all the 2 functions in that file
import tasksPage from './components/tasksPage/tasksPage';
import buildNewTaskForm from './components/AddEditTasks/addEditTasks';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginButton();
  authHelpers.checkLoginStatus(tasksPage);
  $('#show-task-form').on('click', buildNewTaskForm);
};

initializeApp();
