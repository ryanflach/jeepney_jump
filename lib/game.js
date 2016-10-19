const $ = require('jquery');
const startButton = $('.button,play');
const Assets = require('./asset_manager');

var Game = function(canvas, context) {
  this.size = {
    x: canvas.width,
    y: canvas.height
  };
  this.assets = new Assets({
    x: this.size.x,
    y: this.size.y
  });
  this.backgroundObjects = [this.assets.randomBackgroundObject(null, this.difficulty)];
  this.jeepney = this.assets.jeepney();
  this.obstacles = [this.assets.randomObstacle(this.difficulty)];
  this.background = this.assets.background('ground');
  this.clouds = [this.assets.background('cloud')];
  this.playing = true;
  this.difficulty = 0.001;

  var gameAnimation = function() {
    if (this.playing) {
      this.update();
      this.draw(context);
      requestAnimationFrame(gameAnimation);
    } else {
      this.endGame(context);
    }
  }.bind(this);

  gameAnimation();
};


Game.prototype.update = function() {
  var jeepney = this.jeepney;

  this.difficulty += 0.001;
  this.generateBackgroundObjects();
  this.generateObstacles();
  this.generateClouds();
  this.setBackgroundObjects(jeepney);
  this.setObstacles(jeepney);
  this.setClouds();

  jeepney.update();

  this.checkJeepneyHealth();
};

Game.prototype.generateClouds = function() {
  var firstCloud = this.clouds[0];
  var lastCloud = this.clouds[this.clouds.length - 1];

  if (firstCloud.x < 0 - firstCloud.width) {
    this.clouds.shift();
  } else if (lastCloud.x + lastCloud.width < this.size.x - Math.random() * 5000 - 40) {
    this.clouds.push(this.assets.background('cloud'));
  }
};

Game.prototype.generateBackgroundObjects = function() {
  var firstBackgroundObject = this.backgroundObjects[0];
  var lastBackgroundObject = this.backgroundObjects[this.backgroundObjects.length - 1];

  if (firstBackgroundObject.x < 0 - firstBackgroundObject.width) {
    this.backgroundObjects.shift();
  } else if (lastBackgroundObject.x + lastBackgroundObject.width < this.size.x - Math.random() * 50 - 10) {
    this.backgroundObjects.push(this.assets.randomBackgroundObject(lastBackgroundObject, this.difficulty));
  }
};

Game.prototype.generateObstacles = function() {
  var firstObstacle = this.obstacles[0];
  var lastObstacle = this.obstacles[this.obstacles.length - 1];
  var minDistanceBetweenObstacles = this.size.x - Math.random() * 5000 - this.jeepney.width * 2;

  if (!firstObstacle || lastObstacle.x + lastObstacle.width < minDistanceBetweenObstacles) {
    this.obstacles.push(this.assets.randomObstacle(this.difficulty));
  } else if (
    firstObstacle.x + firstObstacle.width < 0 ||
    firstObstacle.x > this.size.x ||
    firstObstacle.y > this.size.y
  ) {
    this.obstacles.shift();
  }
};

Game.prototype.setBackgroundObjects = function() {
  for (let i = 0; i < this.backgroundObjects.length; i++) {
    this.backgroundObjects[i].update();
  }
};

Game.prototype.setClouds = function() {
  for (var i = 0; i < this.clouds.length; i++) {
    this.clouds[i].update();
  }
};

Game.prototype.setObstacles = function(jeepney) {
  var validObstacles = this.obstacles.filter(function(obstacle) {
    return !obstacle.hitByJeepney;
  });
  var hitObstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.hitByJeepney;
  });

  for (let i = 0; i < validObstacles.length; i++) {
    if (jeepney.isColliding(validObstacles[i])) {
      jeepney.loseHealth();
      validObstacles[i].processColission(jeepney);
    }
    validObstacles[i].update();
  }

  for (let i = 0; i < hitObstacles.length; i++) {
    hitObstacles[i].update();
  }
};

Game.prototype.checkJeepneyHealth = function() {
  if (this.jeepney.isDead()) {
    this.playing = false;
  }
};

Game.prototype.reloadStartButton = function() {
  startButton.show();
};

Game.prototype.endGame = function(context) {
  context.clearRect(0, 0, this.size.x, this.size.y);
  this.drawScore(context);
  this.reloadStartButton();
  if (!localStorage.highScore || this.jeepney.score > localStorage.highScore) {
    localStorage.highScore = this.jeepney.score;
    $('#high-score').text(this.jeepney.score);
  }
};

Game.prototype.draw = function(context) {
  context.clearRect(0, 0, this.size.x, this.size.y);
  context.fillStyle = "darkGray";
  context.fillRect(0, 300, this.size.x, 65);
  this.background.draw(context);

  for (let i = 0; i < this.clouds.length; i++) {
    this.clouds[i].draw(context);
  }

  for (let i = 0; i < this.backgroundObjects.length; i++) {
    this.backgroundObjects[i].draw(context);
  }

  this.jeepney.draw(context);

  for (let i = 0; i < this.obstacles.length; i++) {
    this.obstacles[i].draw(context);
  }

  this.drawScore(context);
  this.drawHealth(context);
};

Game.prototype.drawScore = function(context) {
  context.font = '30px VT323';
  context.fillStyle = 'black';
  context.fillText("Score: " + this.jeepney.score, 50, 48);
};

Game.prototype.drawHealth = function(context) {
  var x = 825;
  for (var i = 0; i < this.jeepney.health; i++) {
    var img = new Image();
    img.src = 'assets/images/heart.png';
    context.drawImage(img, x, 25, 30, 30);
    x -= 45;
  }
};

module.exports = Game;
