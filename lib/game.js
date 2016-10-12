var Game = function(){
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  this.size = { x: canvas.width, y: canvas.height };
  this.buildings = [new Building(this)];
  this.jeepney = new Jeepney();
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
  if (this.buildings[0].x < 0 - this.buildings[0].width) {
    this.buildings.shift();
  } else if (this.buildings[this.buildings.length - 1].x < this.size.x - 100) {
    this.buildings.push(new Building(this));
  }

  this.buildings.forEach(function(building){
    building.update();
  });
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
};

Game.prototype.populateBuildings = function(){

};

var Jeepney = function(){
  this.image = new Image();
  this.image.src = '/assets/images/bussprite.png';
  this.x = 50;
  this.y = 250;
  this.width = 168;
  this.height = 82.5;
};

Jeepney.prototype.update = function() {

};

Jeepney.prototype.draw = function(context) {
  context.drawImage(this.image, 0, 0, 224, 110, this.x, this.y, this.width, this.height);
};

var Background = function(data) {
  this.image = new Image();
  this.image.src = data.source;
  this.x = data.x;
  this.y = data.y;
  this.height = data.height;
  this.width = data.width;
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
