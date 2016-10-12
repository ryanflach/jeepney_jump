const Jeepney = require('./jeepney');
const backgroundObject = require('./background_object');
const Background = require('./background');
const Obstacle = require('./obstacle');

var Game = function(canvas, context){
  this.size = { x: canvas.width, y: canvas.height };
  this.backgroundObjects = [new backgroundObject(this)];
  this.jeepney = new Jeepney();
  this.background = new Background({ x: 0, y: 360, width: this.size.x, height: 50, source: '/assets/images/ground.png' });
  this.motorcycle = new Obstacle({ x: this.size.x, y: 230, width: 155.25, height: 120, speed: .5, source: '/assets/images/motorcycle.gif' });

  var self = this;

  var gameAnimation = function() {
    self.update();
    self.draw(context);
    requestAnimationFrame(gameAnimation);
  }

  gameAnimation();
};

Game.prototype.update = function() {
  firstbackgroundObject = this.backgroundObjects[0];
  lastbackgroundObject = this.backgroundObjects[this.backgroundObjects.length - 1];
  if (firstbackgroundObject.x < 0 - firstbackgroundObject.width) {
    this.backgroundObjects.shift();
  } else if (lastbackgroundObject.x < this.size.x - Math.random() * (500) - lastbackgroundObject.width) {
    this.backgroundObjects.push(new backgroundObject(this));
  }

  this.backgroundObjects.forEach(function(backgroundObject){
    backgroundObject.update();
  });
  this.jeepney.update();
  this.motorcycle.update();
};

Game.prototype.draw = function(context) {
  context.clearRect(0, 0, this.size.x, this.size.y);
  context.fillStyle = "gray";
  context.fillRect(0, 300, this.size.x, 65);
  this.background.draw(context);
  this.backgroundObjects.forEach(function(backgroundObject){
    backgroundObject.draw(context);
  });
  this.motorcycle.draw(context);
  this.jeepney.draw(context);
};

Game.prototype.populatebackgroundObjects = function(){
};

module.exports = Game;
