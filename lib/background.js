const GameObject = require('./game_object');

class Background extends GameObject {
  constructor(data) {
    super(data);

    this.speed = data.speed || 0;
  }
}

module.exports = Background;
