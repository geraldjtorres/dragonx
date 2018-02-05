import "../styles/main.scss";
import "../index.html";
import "../ourStory.html";
import "../becomeAPartner.html";
import $ from 'jquery';
require("bootstrap-grid");
require('fullpage.js');
console.log('You are on Become a partner page');

// load assets
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../assets/img/', true));