var backgroundObject = function(game){
  this.img = new Image();
  this.img.src = '/assets/images/palm_tree.png';
  this.x = game.size.x;
  this.y = 165;
  this.width = 53.75;
  this.height = 135;
};

backgroundObject.prototype.update = function() {
  this.x -= 5;
};

backgroundObject.prototype.draw = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

module.exports = backgroundObject
