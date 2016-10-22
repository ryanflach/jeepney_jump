const AudioPlayer = require('./audio_player');
const GameObject = require('./game_object');

class Bonus extends GameObject {
  constructor(data) {
    super(data);

    this.audio = new AudioPlayer({ source: data.audioSrc, volume: 0.2 });
    this.yVelocity = data.yVelocity || 1;
    this.hitByJeepney = false;
    this.bonusPoints = false;
  }

  update() {
    const minY = 334.25 - 100;
    const maxY = 334.25 - this.height;

    if (this.hitByJeepney) {
      this.y -= 2;
      return;
    }

    if (this.y >= maxY || this.y <= minY) { this.yVelocity *= -1; }

    this.x -= this.speed;
    this.y += this.yVelocity;
  }

  draw(context) {
    if (this.bonusPoints) {
      context.font = '30px VT323';
      context.fillStyle = 'black';
      context.fillText("+500 pts", this.x, this.y);
    } else {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  processColission(jeepney) {
    this.hitByJeepney = true;
    this.audio.play();

    if (jeepney.health === 5) {
      this.bonusPoints = true;
    } else {
      this.img.src = 'assets/images/heart.png';
      this.width = 30;
      this.height = 30;
    }
  }
}

module.exports = Bonus;
