import firebase from 'firebase/app';
import 'bootstrap';
import apiKeys from '../db/apiKeys.json';
import './index.scss';
import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers'; // basically importing all the 2 functions in that file
import tasksPage from './components/tasksPage/tasksPage';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginButton();
  authHelpers.checkLoginStatus(tasksPage);
};

initializeApp();
