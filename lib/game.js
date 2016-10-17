const Jeepney = require('./jeepney');
const BackgroundObject = require('./background_object');
const Background = require('./background');
const Obstacle = require('./obstacle');
const $ = require('jquery');
const startButton = $('.button,play');

var Game = function(canvas, context) {
  this.size = {
    x: canvas.width,
    y: canvas.height
  };
  this.motorcycle = {
    x: this.size.x,
    y: 270,
    width: 97.25,
    height: 64.25,
    speed: 6,
    imgSrc: '/assets/images/motorcycle.png'
  };
  this.backgroundObjects = [new BackgroundObject({
    x: this.size.x,
    y: 167,
    width: 53.75,
    height: 135,
    imgSrc: '/assets/images/palm_tree.png'
  })];
  this.jeepney = new Jeepney();
  this.obstacles = [new Obstacle(this.motorcycle)];
  this.background = new Background({
    x: 0,
    y: 360,
    width: this.size.x,
    height: 50,
    imgSrc: '/assets/images/ground.png'
  });
  this.playing = false;
  const self = this;


  var checkForStart = function(e) {
    if (e.keyCode === 32) {
      self.startUp();
      window.removeEventListener('keyup', checkForStart);
    }
  }

  var gameAnimation = function() {
    window.addEventListener('keyup', checkForStart);
    if (self.playing) {
      self.update();
      self.draw(context);
      requestAnimationFrame(gameAnimation);
    } else {
      requestAnimationFrame(gameAnimation);
      self.endGame(context);
    }
  };

  gameAnimation();
};

Game.prototype.startUp = function(){
  this.playing = true
}

Game.prototype.shutDown = function(){
  this.playing = false
}

Game.prototype.update = function() {
  var jeepney = this.jeepney;

  this.generateBackgroundObjects();
  this.generateObstacles();
  this.setBackgroundObjects(jeepney);
  this.setObstacles(jeepney);

  jeepney.update();

  this.checkJeepneyHealth();
};

Game.prototype.generateBackgroundObjects = function() {
  var firstbackgroundObject = this.backgroundObjects[0];
  var lastbackgroundObject = this.backgroundObjects[this.backgroundObjects.length - 1];

  if (firstbackgroundObject.x < 0 - firstbackgroundObject.width) {
    this.backgroundObjects.shift();
  } else if (lastbackgroundObject.x + lastbackgroundObject.width < this.size.x - Math.random() * 500) {
    this.backgroundObjects.push(new BackgroundObject({
      x: this.size.x,
      y: 167,
      width: 53.75,
      height: 135,
      imgSrc: '/assets/images/palm_tree.png'
    }));
  }
};

Game.prototype.generateObstacles = function() {
  var firstObstacle = this.obstacles[0];
  var lastObstacle = this.obstacles[this.obstacles.length - 1];
  var minDistanceBetweenObstacles = this.size.x - Math.random() * 5000 - this.jeepney.width * 2;

  if (!firstObstacle || lastObstacle.x + lastObstacle.width < minDistanceBetweenObstacles) {
    this.obstacles.push(new Obstacle(this.motorcycle));
  } else if (
    firstObstacle.x + firstObstacle.width < 0 ||
    firstObstacle.x > this.size.x ||
    firstObstacle.y > this.size.y
  ) {
    this.obstacles.shift();
  }
};

Game.prototype.setBackgroundObjects = function() {
  this.backgroundObjects.forEach(function(backgroundObject) {
    backgroundObject.update();
  });
};

Game.prototype.setObstacles = function(jeepney) {
  var validObstacles = this.obstacles.filter(function(obstacle) {
    return !obstacle.hitByJeepney;
  });
  var hitObstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.hitByJeepney;
  });

  validObstacles.forEach(function(obstacle) {
    if (jeepney.isColliding(obstacle)) {
      jeepney.loseHealth();
      obstacle.processColission(jeepney);
    }
    obstacle.update();
  });

  hitObstacles.forEach(function(obstacle) {
    obstacle.update();
  });
};

Game.prototype.checkJeepneyHealth = function() {
  if (this.jeepney.isDead()) {
    this.shutDown();
  }
};

Game.prototype.reloadStartButton = function() {
  startButton.show();
};

Game.prototype.endGame = function(context) {
  this.playing = false;
  context.clearRect(0, 0, this.size.x, this.size.y);
  this.drawStart(context)
  localStorage.lastScore = this.jeepney.score;
  if (!localStorage.highScore || this.jeepney.score > localStorage.highScore) {
    localStorage.highScore = this.jeepney.score;
    $('#high-score').text(this.jeepney.score);
  }
};

Game.prototype.draw = function(context) {
  context.clearRect(0, 0, this.size.x, this.size.y);
  context.fillStyle = "gray";
  context.fillRect(0, 300, this.size.x, 65);
  this.background.draw(context);
  this.backgroundObjects.forEach(function(backgroundObject) {
    backgroundObject.draw(context);
  });

  this.jeepney.draw(context);

  this.obstacles.forEach(function(obstacle) {
    obstacle.draw(context);
  });

  this.drawScore(context);
  this.drawHealth(context);
};

Game.prototype.drawScore = function(context) {
  context.font = '32px Waiting for the Sunrise';
  context.fillStyle = 'black';
  context.fillText("Score: " + this.jeepney.score, 50, 50);
};

Game.prototype.drawLastScore = function(context) {
  context.font = '50px Waiting for the Sunrise';
  context.fillStyle = 'black';
  context.fillText("Last Score: " + localStorage.lastScore, 330, 50);
  let img = new Image();
  img.src = '/assets/images/restart.png';
  context.drawImage(img, 1, 1, 898, 398);
};

Game.prototype.drawHealth = function(context) {
  let x = 825;
  for (let i = 0; i < this.jeepney.health; i++) {
    let img = new Image();
    img.src = '/assets/images/heart.png';
    context.drawImage(img, x, 25, 30, 30);
    x -= 45;
  }
};

Game.prototype.drawStart = function(context){
  if (localStorage.highScore) {
    this.drawLastScore(context)
  } else {
    let img = new Image();
    img.src = '/assets/images/start.png';
    context.drawImage(img, 1, 1, 898, 398);
  }
}
module.exports = Game;
