const AudioPlayer = require('./audio_player');
const GameObject = require('./game_object');

class Obstacle extends GameObject {
  constructor(data) {
    super(data);

    this.audio = new AudioPlayer({ source: data.audioSrc, volume: data.audioVol });
    this.hitByJeepney = false;
    this.yVelocity = 0;
    this.xVelocity = 0;
  }

  update() {
    if (this.hitByJeepney) {
      this.y += this.yVelocity;
      this.x += this.xVelocity;
    } else {
      this.x -= this.speed;
    }
  }

  processColission(jeepney) {
    const jeepneyFront = jeepney.x + jeepney.width;
    // Front of jeepney is hitting within the back 35 pixels of the obstacle
    const headOnCollision = jeepneyFront >= this.x + 15 && jeepneyFront <= this.x + 50;

    this.audio.play();
    this.hitByJeepney = true;

    if (headOnCollision) {
      this.yVelocity = -2;
      this.xVelocity = 12;
      // Else jeepney is on top of obstacle - send to bottom of canvas
    } else {
      this.yVelocity = 12;
    }
  }

}

module.exports = Obstacle;
