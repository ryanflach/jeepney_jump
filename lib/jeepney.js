const AudioPlayer = require('./audio_player');
const GameObject = require('./game_object');

class Jeepney extends GameObject {
  constructor(data) {
    super(data);

    this.driveAudio = new AudioPlayer({ source: 'assets/audio/jeepney.mp3', loops: true, volume: 0.1 });
    this.jumpAudio = new AudioPlayer({ source: 'assets/audio/jeepney_jump.mp3', volume: 0.2 });
    this.health = 5;
    this.jumping = false;
    this.gravity = 0.38;
    this.yVelocity = 0;
    this.score = 0;
  }

  loseHealth() {
    this.health --;
    this.updateDamageShown();
  }

  gainHealth() {
    this.health++;
    this.updateDamageShown();
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
      this.yVelocity = -this.speed * 2;
      this.jumpAudio.play();
    }
  }

  updateDamageShown() {
    if (this.health < 2) {
      this.img.src = 'assets/images/jeepney/jeepney_full_damage.png';
    } else if (this.health < 3) {
      this.img.src = 'assets/images/jeepney/jeepney_damage_2.png';
    } else if (this.health < 5) {
      this.img.src = 'assets/images/jeepney/jeepney_damage_1.png';
    } else {
      this.img.src = 'assets/images/jeepney/jeepney_no_damage.png';
    }
  }

  update() {
    const bottomOfJeepneyWhenOnRoad = 332.50;

    if (this.jumping) {
      this.y += this.yVelocity;
      this.yVelocity += this.gravity;
      if (this.y >= bottomOfJeepneyWhenOnRoad - this.height) {
        this.y = bottomOfJeepneyWhenOnRoad - this.height;
        this.jumping = false;
      }
    }

    this.score++;
  }

  isColliding(obstacle) {
    return (
      // Jeepney's front is in front of the rear of the obstacle (+ buffer)
      this.x + this.width >= obstacle.x + 15 &&
      // Bottom of the jeepney is beneath the top of the obstacle
      this.y + this.height >= obstacle.y &&
      // Jeepney's rear is before the front of the obstacle (- buffer of 50 pixels)
      this.x <= obstacle.x + obstacle.width - 50
    );
  }

  collectBonus() {
    if (this.health === 5) {
      this.score += 500;
    } else {
      this.gainHealth();
    }
  }

  isDead() {
    return this.health <= 0;
  }
}

module.exports = Jeepney;
