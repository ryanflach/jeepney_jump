var Jeepney = function(){
  this.x = 50;
  this.y = 300;
  this.width = 168;
  this.height = 82.5;
  this.health = 5;
};

Jeepney.prototype.loseHealth = function(){
  this.health --;
};

Jeepney.prototype.jump = function(){

};

module.exports = Jeepney;
