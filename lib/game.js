const Jeepney = require('./jeepney');

var Game = function(canvas, context){
  this.size = { x: canvas.width, y: canvas.height };
  this.motorcycle = { x: this.size.x, y: 230, width: 155.25, height: 120, speed: 6, source: '/assets/images/motorcycle.gif' };
  this.buildings = [new Building(this)];
  this.jeepney = new Jeepney();
  this.obstacles = [new Background(this.motorcycle)]
  this.background = new Background({ x: 0, y: 360, width: this.size.x, height: 50, source: '/assets/images/ground.png' });

  var self = this;

  var gameAnimation = function() {
    self.update();
    self.draw(context);
    requestAnimationFrame(gameAnimation);
  }

  gameAnimation();
};

Game.prototype.update = function() {
  firstBuilding = this.buildings[0];
  lastBuilding = this.buildings[this.buildings.length - 1];
  firstObstacle = this.obstacles[0];
  lastObstacle = this.obstacles[this.obstacles.length - 1];

  if (firstBuilding.x < 0 - firstBuilding.width) {
    this.buildings.shift();
  } else if (lastBuilding.x < this.size.x - Math.random() * (500) - lastBuilding.width) {
    this.buildings.push(new Building(this));
  }

  if (firstObstacle.x < 0 - firstObstacle.width) {
    this.obstacles.shift();
  } else if (lastObstacle.x < this.size.x - Math.random() * (5000) - 300) {
    this.obstacles.push(new Background(this.motorcycle));
  }

  this.buildings.forEach(function(building){
    building.update();
  });

  this.obstacles.forEach(function(obstacle){
    obstacle.update();
  })

  this.jeepney.update();
};

Game.prototype.draw = function(context) {
  context.clearRect(0, 0, this.size.x, this.size.y);
  context.fillStyle = "gray";
  context.fillRect(0, 300, this.size.x, 65);
  this.background.draw(context);
  this.buildings.forEach(function(building){
    building.draw(context);
  });

  this.jeepney.draw(context);

  this.obstacles.forEach(function(obstacle){
    obstacle.draw(context);
  })
};

var Background = function(data) {
  this.image = new Image();
  this.image.src = data.source;
  this.speed = data.speed || 0
  this.x = data.x;
  this.y = data.y;
  this.height = data.height;
  this.width = data.width;
};

Background.prototype.update = function() {
  this.x -= this.speed;
};

Background.prototype.draw = function(context) {
  context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

var Building = function(game){
  this.image = new Image();
  this.image.src = '/assets/images/palm_tree.png';
  this.x = game.size.x;
  this.y = 165;
  this.width = 53.75;
  this.height = 135;
};

Building.prototype.update = function() {
  this.x -= 5;
};

Building.prototype.draw = function(context) {
  context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

module.exports = Game;
