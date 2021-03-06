import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import $ from 'jquery';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#tasks').hide();
      }).catch((err) => {
        console.log('you are still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-tasks') {
      $('#auth').hide();
      $('#tasks').show();
      $('#completed-tasks').show();
      $('#create-new-task').hide();
    } else if (e.target.id === 'navbar-button-auth') {
      $('#auth').show();
      $('#tasks').hide();
    } else {
      $('#auth').show();
      $('#tasks').hide();
    }
  });
};

const createNavbar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Just Do It</a>
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
