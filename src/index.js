import $ from 'jquery';
import 'bootstrap';
import './index.scss';

const initializeApp = () => {
  $('body').html('<h1>Hello World!</h1>');
  console.log('its working');
};

initializeApp();
