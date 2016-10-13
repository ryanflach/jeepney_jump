var Obstacle = function(data){
  this.img = new Image();
  this.img.src = data.imgSrc;
  this.x = data.x;
  this.y = data.y;
  this.width = data.width;
  this.height = data.height;
  this.speed = data.speed || 5;
};

Obstacle.prototype.update = function() {
  this.x -= this.speed;
};

Obstacle.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};


module.exports = Obstacle;
