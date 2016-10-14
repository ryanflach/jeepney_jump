var Jeepney = function(){
  this.img = new Image();
  this.img.src = '/assets/images/jeepney.png';
  this.x = 50;
  this.y = 250;
  this.width = 168;
  this.height = 82.5;
  this.health = 5;
  this.jumping = false;
  this.gravity = 0.38;
  this.yVelocity = 0;
  this.speed = 5;
};

Jeepney.prototype.loseHealth = function(){
  this.health --;
  this.updateDamageShown();
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

Jeepney.prototype.updateDamageShown = function () {
  if (this.health < 2) {
    this.img.src = '/assets/images/jeepney-damage3.png';
  } else if (this.health < 3) {
    this.img.src = '/assets/images/jeepney-damage2.png';
  } else if (this.health < 5) {
    this.img.src = '/assets/images/jeepney-damage1.png';
  }
};

Jeepney.prototype.update = function() {
  var bottomOfJeepneyWhenOnRoad = 332.50;

  if (this.jumping) {
    this.y += this.yVelocity;
    this.yVelocity += this.gravity;
    if (this.y >= bottomOfJeepneyWhenOnRoad - this.height) {
      this.y = bottomOfJeepneyWhenOnRoad - this.height;
      this.jumping = false;
    }
  }
};

Jeepney.prototype.isColliding = function(obstacle){
  return (
    // Jeepney's front is in front of the rear of the obstacle (+ buffer)
    this.x + this.width >= obstacle.x + 15 &&
    // Bottom of the jeepney is beneath the top of the obstacle
    this.y + this.height >= obstacle.y &&
    // Jeepney's rear is before the front of the obstacle (- buffer of 50 pixels)
    this.x <= obstacle.x + obstacle.width - 50
  );
};

module.exports = Jeepney;
