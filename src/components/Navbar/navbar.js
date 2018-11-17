import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import $ from 'jquery';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        console.log('you have logged out');
      }).catch((err) => {
        console.log('you are still logged in', err);
      });
    } else {
      console.log(e.target.id);
    }
  });
};

const createNavbar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Firebase To Do Project</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto"> 
      <li class="nav-item">
        <a class="nav-link" id="navbar-button-auth">Authentication <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="navbar-button-tasks">Tasks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="navbar-button-logout">Logout</a>
      </li>
    </ul>
  </div>
</nav>
    `;
  $('#navbar').html(domString);
  navbarEvents();
};

export default createNavbar;
