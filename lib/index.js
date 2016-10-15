require("../assets/style.scss");
const Game = require('./game');
const $ = require('jquery');
const canvas = document.getElementById('game');
const gameContext = canvas.getContext('2d');
const startButton = $('.button,play');

$(document).ready(function(){
  gameFlow();
  displayHighScore();
});

var displayHighScore = function(){
  if (localStorage.highScore){
    $('#high-score').html(localStorage.highScore);
  }
};

var gameFlow = function(){
  if (startButton.is(":visible")){
    startButton.on('click', function(){
      startGame();
      startButton.hide();
    });
  } else {
    gameFlow();
  }
};

function startGame(){
  var game = new Game(canvas, gameContext);
  document.addEventListener('keydown', function(e){
    if (e.keyCode === 32) {
      game.jeepney.jump();
    }
  });
}
