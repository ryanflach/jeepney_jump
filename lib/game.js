const Jeepney = require('./jeepney');
const BackgroundObject = require('./background_object');
const Background = require('./background');
const Obstacle = require('./obstacle');

var Game = function(canvas, context){
  this.size = { x: canvas.width, y: canvas.height };
  this.motorcycle = { x: this.size.x, y: 230, width: 155.25, height: 120, speed: 6, imgSrc: '/assets/images/motorcycle.gif' };
  this.backgroundObjects = [new BackgroundObject({ x: this.size.x, y: 165, width: 53.75, height: 135, imgSrc: '/assets/images/palm_tree.png' })];
  this.jeepney = new Jeepney();
  this.obstacles = [new Obstacle(this.motorcycle)];
  this.background = new Background({ x: 0, y: 360, width: this.size.x, height: 50, imgSrc: '/assets/images/ground.png' });

  var self = this;

  var gameAnimation = function() {
    self.update();
    self.draw(context);
    requestAnimationFrame(gameAnimation);
  };

  gameAnimation();
};

Game.prototype.update = function() {
  var firstbackgroundObject = this.backgroundObjects[0];
  var lastbackgroundObject = this.backgroundObjects[this.backgroundObjects.length - 1];
  var firstObstacle = this.obstacles[0];
  var lastObstacle = this.obstacles[this.obstacles.length - 1];
  var jeepney = this.jeepney;

  if (firstbackgroundObject.x < 0 - firstbackgroundObject.width) {
    this.backgroundObjects.shift();
  } else if (lastbackgroundObject.x < this.size.x - Math.random() * (500) - lastbackgroundObject.width) {
    this.backgroundObjects.push(new BackgroundObject({ x: this.size.x, y: 165, width: 53.75, height: 135, imgSrc: '/assets/images/palm_tree.png' }));
  }

  if (firstObstacle.x < 0 - firstObstacle.width) {
    this.obstacles.shift();
  } else if (lastObstacle.x < this.size.x - Math.random() * (5000) - 300) {
    this.obstacles.push(new Obstacle(this.motorcycle));
  }

  this.backgroundObjects.forEach(function(backgroundObject){
    backgroundObject.update();
  });

  this.obstacles.forEach(function(obstacle){
    obstacle.update();
    if (jeepney.isColliding(obstacle)){
      jeepney.health --;
      if (jeepney.health == 1 ){
        jeepney.img.src = '/assets/images/jeepney-damage3.png';
      } else if (jeepney.health == 2){
        jeepney.img.src = '/assets/images/jeepney-damage2.png';
      } else if (jeepney.health == 4){
        jeepney.img.src = '/assets/images/jeepney-damage1.png';
      }

      obstacle.x += 50;
      obstacle.y += -400;
    }
  });

  this.jeepney.update();
};

Game.prototype.draw = function(context) {
  context.clearRect(0, 0, this.size.x, this.size.y);
  context.fillStyle = "gray";
  context.fillRect(0, 300, this.size.x, 65);
  this.background.draw(context);
  this.backgroundObjects.forEach(function(backgroundObject){
    backgroundObject.draw(context);
  });

  this.jeepney.draw(context);

  this.obstacles.forEach(function(obstacle){
    obstacle.draw(context);
  });
};

module.exports = Game;
