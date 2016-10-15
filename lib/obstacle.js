var Obstacle = function(data) {
  this.img = new Image();
  this.img.src = data.imgSrc;
  this.x = data.x;
  this.y = data.y;
  this.width = data.width;
  this.height = data.height;
  this.speed = data.speed || 5;
  this.hitByJeepney = false;
  this.yVelocity = 0;
  this.xVelocity = 0;
};

Obstacle.prototype.update = function() {
  if (this.hitByJeepney) {
    this.y += this.yVelocity;
    this.x += this.xVelocity;
  } else {
    this.x -= this.speed;
  }
};

Obstacle.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Obstacle.prototype.processColission = function(jeepney) {
  var jeepneyFront = jeepney.x + jeepney.width;
  // Front of jeepney is hitting within the back 35 pixels of the obstacle
  var headOnCollision = jeepneyFront >= this.x + 15 && jeepneyFront <= this.x + 50;

  this.hitByJeepney = true;

  if (headOnCollision) {
    this.yVelocity = -2;
    this.xVelocity = 12;
  // Else jeepney is on top of obstacle - send to bottom of canvas
  } else {
    this.yVelocity = 12;
  }
};


module.exports = Obstacle;
