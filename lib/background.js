var Background = function(data) {
  this.img = new Image();
  this.img.src = data.source;
  this.speed = data.speed
  this.x = data.x;
  this.y = data.y;
  this.height = data.height;
  this.width = data.width;
};

Background.prototype.update = function() {
  this.x -= this.speed;
};

Background.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

module.exports = Background
