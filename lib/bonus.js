var Bonus = function(data){
  this.img = new Image();
  this.img.src = data.source;
  this.x = data.x;
  this.y = data.y;
  this.width = data.width;
  this.height = data.height;
};

module.exports = Bonus
