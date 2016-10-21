const $ = require('jquery');
const Assets = require('./asset_manager');
const AudioPlayer = require('./audio_player');

class Game {
  constructor(canvas, context) {
    this.size = { x: canvas.width, y: canvas.height };
    this.assets = new Assets({ x: this.size.x, y: this.size.y });
    this.difficulty = 0.001;
    this.playing = false;
    this.gameOver = false;
    this.backgroundObjects = [this.assets.randomBackgroundObject(null, this.difficulty)];
    this.jeepney = this.assets.jeepney();
    this.obstacles = [this.assets.obstacle('streetDog', this.difficulty)];
    this.background = this.assets.background('ground');
    this.clouds = [this.assets.background('cloud')];
    this.bonuses = [];
    this.audio = new AudioPlayer({ source: 'assets/audio/lupang_hinirang.mp3', loops: true, volume: 0.3 });
    this.gameAnimation.call(this, context);
  }

  gameAnimation(context) {
    if (this.playing) {
      this.update();
      this.draw(context);
      requestAnimationFrame(this.gameAnimation.bind(this, context));
    } else {
      requestAnimationFrame(this.gameAnimation.bind(this, context));
      this.endGame(context);
    }
  }

  startUp() {
    this.playing = true;
    this.jeepney.driveAudio.play();
    this.audio.play();
    setInterval(this.generateBonusObjects.bind(this), 5000);
  }

  update() {
    this.difficulty += 0.001;
    this.generateBackgroundObjects();
    this.generateObstacles();
    this.generateClouds();
    this.set(this.backgroundObjects);
    this.set(this.clouds);
    this.setObstacles(this.jeepney);
    this.setBonusObjects();
    this.jeepney.update();
    this.checkJeepneyHealth();
  }

  generateClouds() {
    const firstCloud = this.clouds[0];
    const lastCloud = this.clouds[this.clouds.length - 1];

    if (firstCloud.x < 0 - firstCloud.width) {
      this.clouds.shift();
    } else if (lastCloud.x + lastCloud.width < this.size.x - Math.random() * 5000 - 40) {
      this.clouds.push(this.assets.background('cloud'));
    }
  }

  generateBackgroundObjects() {
    const firstBackgroundObject = this.backgroundObjects[0];
    const lastBackgroundObject = this.backgroundObjects[this.backgroundObjects.length - 1];

    if (firstBackgroundObject.x < 0 - firstBackgroundObject.width) {
      this.backgroundObjects.shift();
    } else if (lastBackgroundObject.x + lastBackgroundObject.width < this.size.x - Math.random() * 50 - 10) {
      this.backgroundObjects.push(this.assets.randomBackgroundObject(lastBackgroundObject, this.difficulty));
    }
  }

  generateBonusObjects() {
    const bonus = this.bonuses[0];
    const offScreen = bonus ? bonus.x + bonus.width < 0 || bonus.y + bonus.height < 0 : null;

    if (!bonus) {
      this.bonuses.push(this.assets.randomBonusObject(this.difficulty));
    } else if (offScreen) {
      this.bonuses.shift();
    }
  }

  set(objects) {
    for (let i = 0; i < objects.length; i++) {
      objects[i].update();
    }
  }

  setBonusObjects() {
    const validBonusObjects = this.bonuses.filter(function(bonusItem){
      return !bonusItem.hitByJeepney;
    });

    const collectedBonuses = this.bonuses.filter(function(bonusItem){
      return bonusItem.hitByJeepney;
    });

    for (let i = 0; i < validBonusObjects.length; i++) {
      if (this.jeepney.isColliding(validBonusObjects[i])) {
        validBonusObjects[i].processColission(this.jeepney);
        this.jeepney.collectBonus();
      }
      validBonusObjects[i].update();
    }

    for (let i = 0; i < collectedBonuses.length; i++) {
      collectedBonuses[i].update();
    }
  }

  generateObstacles() {
    const firstObstacle = this.obstacles[0];
    const lastObstacle = this.obstacles[this.obstacles.length - 1];
    const minDistanceBetweenObstacles = this.size.x - Math.random() * 5000 - this.jeepney.width * 2;

    if (!firstObstacle || lastObstacle.x + lastObstacle.width < minDistanceBetweenObstacles) {
      const newObstacle = this.difficulty > 1 ? this.assets.randomObstacle(this.difficulty) : this.assets.obstacle('streetDog', this.difficulty);
      this.obstacles.push(newObstacle);
    } else if (
      firstObstacle.x + firstObstacle.width < 0 ||
      firstObstacle.x > this.size.x ||
      firstObstacle.y > this.size.y
    ) {
      this.obstacles.shift();
    }
  }

  setObstacles(jeepney) {
    const validObstacles = this.obstacles.filter(function(obstacle) {
      return !obstacle.hitByJeepney;
    });
    const hitObstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.hitByJeepney;
    });

    for (let i = 0; i < validObstacles.length; i++) {
      if (jeepney.isColliding(validObstacles[i])) {
        jeepney.loseHealth();
        validObstacles[i].processColission(jeepney);
      }
      validObstacles[i].update();
    }

    for (let i = 0; i < hitObstacles.length; i++) {
      hitObstacles[i].update();
    }
  }

  checkJeepneyHealth() {
    if (this.jeepney.isDead()) {
      localStorage.lastScore = this.jeepney.score;
      this.gameOver = true;
      this.playing = false;
    }
  }

  endGame(context) {
    this.playing = false;
    this.jeepney.driveAudio.stop();
    this.audio.stop();
    context.clearRect(0, 0, this.size.x, this.size.y);
    this.drawStart(context);
    if (!localStorage.highScore || this.jeepney.score > localStorage.highScore) {
      localStorage.highScore = this.jeepney.score;
      $('#high-score').text(this.jeepney.score);
    }
  }

  draw(context) {
    context.clearRect(0, 0, this.size.x, this.size.y);
    context.fillStyle = "darkGray";
    context.fillRect(0, 300, this.size.x, 65);
    this.background.draw(context);
    this.drawAsset(this.clouds, context);
    this.drawAsset(this.backgroundObjects, context);
    this.jeepney.draw(context);
    this.drawAsset(this.obstacles, context);
    this.drawAsset(this.bonuses, context);
    this.drawScore(context);
    this.drawHealth(context);
  }

  drawAsset(objects, context) {
    for (let i = 0; i < objects.length; i++) {
      objects[i].draw(context);
    }
  }

  drawScore(context) {
    context.font = '30px VT323';
    context.fillStyle = 'black';
    context.fillText("Score: " + this.jeepney.score, 50, 48);
  }

  drawLastScore(context) {
    const numHighScoreChars = localStorage.lastScore.split('').length;
    context.font = '50px VT323';
    context.fillStyle = 'black';
    context.fillText("Last Score: " + localStorage.lastScore, this.size.x / 2 - ((11 + numHighScoreChars) * 11), 75);
    const img = new Image();
    img.src = 'assets/images/restart.png';
    context.drawImage(img, 1, 1, 898, 398);
  }

  drawHealth(context) {
    let x = 825;
    for (let i = 0; i < this.jeepney.health; i++) {
      const img = new Image();
      img.src = 'assets/images/heart.png';
      context.drawImage(img, x, 25, 30, 30);
      x -= 45;
    }
  }

  drawStart(context) {
    if (this.gameOver) {
      this.drawLastScore(context);
    } else {
      const img = new Image();
      img.src = 'assets/images/start.png';
      context.drawImage(img, 1, 1, 898, 398);
    }
  }
}

module.exports = Game;
