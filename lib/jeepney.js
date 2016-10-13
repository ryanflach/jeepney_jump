var Jeepney = function(){
  this.img = new Image();
  this.img.src = '/assets/images/jeepney.png';
  this.x = 50;
  this.y = 250;
  this.width = 168;
  this.height = 82.5;
  this.health = 5;
  this.jumping = false;
  this.gravity = 0.40;
  this.yVelocity = 0;
  this.speed = 5;
};

Jeepney.prototype.loseHealth = function(){
  this.health --;
};

Jeepney.prototype.jump = function(){
  if (!this.jumping) {
    this.jumping = true;
    this.yVelocity = -this.speed * 2;
  }
};

Jeepney.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Jeepney.prototype.update = function() {
  if (this.jumping) {
    this.y += this.yVelocity;
    this.yVelocity += this.gravity;
    if (this.y >= 332.50 - this.height) {
      this.y = 332.50 - this.height;
      this.jumping = false;
    }
  }
};

Jeepney.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Jeepney.prototype.isColliding = function(obstacle){
  return (
    (this.x > (obstacle.x - obstacle.width)) &&
    ((this.y - this.height) < obstacle.y && obstacle.y < this.y) &&
    (this.x < obstacle.x)
  );
};

module.exports = Jeepney;
