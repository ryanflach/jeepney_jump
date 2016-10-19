const Game = require('./game');
const $ = require('jquery');
const canvas = document.getElementById('game');
const gameContext = canvas.getContext('2d');

$(document).ready(function(){
  startGame();
  displayHighScore();
});

var displayHighScore = function(){
  if (localStorage.highScore){
    $('#high-score').html(localStorage.highScore);
  }
};

function startGame(){
  var game = new Game(canvas, gameContext);

  document.addEventListener('keydown', function(e){
    if (!game.playing && e.keyCode === 32) {
      game = new Game(canvas, gameContext);
      game.playing = true;
      game.startUp();
    } else if (game.playing && e.keyCode === 32) {
      game.jeepney.jump();
    }
  });
}
