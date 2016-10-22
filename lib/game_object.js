class GameObject {
  constructor(data) {
    this.img = new Image();
    this.img.src = data.imgSrc;
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.speed = data.speed || 5;
    this.name = data.name;
  }

  update() {
    this.x -= this.speed;
  }

  draw(context) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

module.exports = GameObject;
