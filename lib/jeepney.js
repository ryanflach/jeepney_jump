var Jeepney = function(){
  this.img = new Image();
  this.img.src = '/assets/images/jeepney.png';
  this.x = 50;
  this.y = 250;
  this.width = 168;
  this.height = 82.5;
};

Jeepney.prototype.loseHealth = function(){
  this.health --;
};

Jeepney.prototype.jump = function(){
};

Jeepney.prototype.update = function() {
};

Jeepney.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

module.exports = Jeepney;
