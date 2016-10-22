const Game = require('./game');
const $ = require('jquery');
const canvas = document.getElementById('game');
const gameContext = canvas.getContext('2d');

$(document).ready(() => {
  startGame();
  displayHighScore();
});

const displayHighScore = () => {
  if (localStorage.highScore){
    $('#high-score').html(localStorage.highScore);
  }
};

const startGame = () => {
  let game = new Game(canvas, gameContext);

  $(document).on('keydown touchstart', (e) => {
    if (!game.playing && (e.keyCode === 32 || e.changedTouches)) {
      game = new Game(canvas, gameContext);
      game.playing = true;
      game.startUp();
    } else if (game.playing && (e.keyCode === 32 || e.changedTouches)) {
      game.jeepney.jump();
    }
  });
};
