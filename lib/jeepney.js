var Jeepney = function(){
  this.img = new Image();
  this.img.src = 'assets/images/jeepney/jeepney_no_damage.png';
  this.x = 50;
  this.y = 210.5;
  this.width = 168;
  this.height = 122;
  this.health = 5;
  this.jumping = false;
  this.gravity = 0.38;
  this.yVelocity = 0;
  this.speed = 5;
  this.score = 0;
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
  switch(this.health){
    case 1:
      this.img.src = 'assets/images/jeepney/jeepney_full_damage.png';
      break;
    case 2:
      this.img.src = 'assets/images/jeepney/jeepney_damage_2.png';
      break;
    case 3:
    case 4:
    case 5:
      this.img.src = 'assets/images/jeepney/jeepney_damage_1.png';
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

  this.score++;
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

Jeepney.prototype.isDead = function(){
  return this.health <= 0;
};

module.exports = Jeepney;
