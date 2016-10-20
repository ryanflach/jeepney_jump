const AudioPlayer = require('./audio_player');

var Bonus = function(data){
  this.img = new Image();
  this.img.src = data.imgSrc;
  this.audio = new AudioPlayer({ source: data.audioSrc, volume: 0.2 });
  this.x = data.x;
  this.y = data.y;
  this.width = data.width;
  this.height = data.height;
  this.speed = data.speed || 5;
  this.name = data.name;
  this.yVelocity = data.yVelocity || 1;
  this.hitByJeepney = false;
  this.bonusPoints = false;
};

Bonus.prototype.update = function() {
  var minY = 334.25 - 100;
  var maxY = 334.25 - this.height;

  if (this.hitByJeepney) {
    this.y -= 2;
    return;
  }

  if (this.y >= maxY || this.y <= minY) { this.yVelocity *= -1; }

  this.x -= this.speed;
  this.y += this.yVelocity;
};

Bonus.prototype.draw = function(context) {
  if (this.bonusPoints) {
    context.font = '30px VT323';
    context.fillStyle = 'black';
    context.fillText("+500 pts", this.x, this.y);
  } else {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
};

Bonus.prototype.processColission = function(jeepney) {
  this.hitByJeepney = true;
  this.audio.play();

  if (jeepney.health === 5) {
    this.bonusPoints = true;
  } else {
    this.img.src = 'assets/images/heart.png';
    this.width = 30;
    this.height = 30;
  }
};

module.exports = Bonus;
