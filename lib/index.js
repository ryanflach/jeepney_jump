require('offline-plugin/runtime').install();
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

const touchedCanvas = (touchEvent) => {
  if (!touchEvent) { return false; }

  const $game = $('#game');
  const startX = $game.position().left;
  const startY = $game.position().top;
  const endX = startX + $game.width();
  const endY = startY + $game.height();

  return (
    touchEvent[0].pageX >= startX &&
    touchEvent[0].pageX <= endX &&
    touchEvent[0].pageY >= startY &&
    touchEvent[0].pageY <= endY
  );
};

const startGame = () => {
  let game = new Game(canvas, gameContext);

  $(document).on('keydown touchstart', (e) => {
    if (!game.playing && (e.keyCode === 32 || touchedCanvas(e.changedTouches))) {
      game = new Game(canvas, gameContext);
      game.playing = true;
      game.startUp();
    } else if (game.playing && (e.keyCode === 32 || touchedCanvas(e.changedTouches))) {
      game.jeepney.jump();
    }
  });
};

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/jeepney_jump/service_worker.js')
    .then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
};
