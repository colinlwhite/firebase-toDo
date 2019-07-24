import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleImage from './gimage.png';
import './auth.scss';

const loginButton = () => {
  const domString = `
  <div id="google-auth">
  <input type="image" alt="Login" src="${googleImage}">
  </div>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new
    firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
