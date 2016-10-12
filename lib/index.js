require("../assets/style.scss");
const Game = require('./game');
const $ = require('jquery');

$(document).ready(function(){
  new Game();
});
