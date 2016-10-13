require("../assets/style.scss");
const Game = require('./game');
const $ = require('jquery');
const canvas = document.getElementById('game');
const gameContext = canvas.getContext('2d');

$(document).ready(function(){
  var game = new Game(canvas, gameContext);

  document.addEventListener('keydown', function(e){
    if (e.keyCode === 32) {
      game.jeepney.jump();
    }
  });
});
