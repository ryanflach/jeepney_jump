require("../assets/style.scss");
const Game = require('./game');
const $ = require('jquery');
const canvas = document.getElementById('game')
const context = canvas.getContext('2d');

$(document).ready(function(){
  new Game(canvas, context);
});
