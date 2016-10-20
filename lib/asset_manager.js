const Background = require('./background');
const BackgroundObject = require('./background_object');
const Bonus = require('./bonus');
const Jeepney = require('./jeepney');
const Obstacle = require('./obstacle');
const defaultSpeed = 5;

const AssetManager = function(canvasSize){
  this.maximumX = canvasSize.x;
  this.maximumY = canvasSize.y;
  this.allBackgroundObjects = [
    'palmTree',
    'bank',
    'church',
    'greenBuilding',
    'hospital',
    'mall',
    'pinkBuilding',
    'videokeBar'
  ];
  this.allBonusObjects = [
    'lumpia',
    'mango'
  ];
  this.allObstacles = [
    'motorcycle',
    'streetDog'
  ];
};

// Background
AssetManager.prototype.background = function(itemName) {
  const groundSpecs = {
    x: 0,
    y: 360,
    width: this.maximumX,
    height: 50,
    imgSrc: 'assets/images/background/ground.png'
  };

  const cloudSpecs = {
    x: this.maximumX,
    y: Math.random() * 50 + 9,
    width: 203,
    height: 61,
    imgSrc: 'assets/images/background/cloud.png',
    speed: 0.5
  };

  const backgroundSpecs = {
    ground: groundSpecs,
    cloud: cloudSpecs
  };

  return new Background(backgroundSpecs[itemName]);
};

// Background Objects
AssetManager.prototype.backgroundObject = function(item, difficulty) {
  const palmTreeSpecs = {
    x: this.maximumX,
    y: 167,
    width: 53.75,
    height: 135,
    imgSrc: 'assets/images/background_objects/palm_tree.png',
    name: 'palmTree',
    speed: defaultSpeed + difficulty
  };

  const bankSpecs = {
    x: this.maximumX,
    y: 141.5,
    width: 103.5,
    height: 160.5,
    imgSrc: 'assets/images/background_objects/bank.png',
    name: 'bank',
    speed: defaultSpeed + difficulty
  };

  const churchSpecs = {
    x: this.maximumX,
    y: 119,
    width: 63,
    height: 183,
    imgSrc: 'assets/images/background_objects/church.png',
    name: 'church',
    speed: defaultSpeed + difficulty
  };

  const greenBuildingSpecs = {
    x: this.maximumX,
    y: 130,
    width: 84,
    height: 171,
    imgSrc: 'assets/images/background_objects/green_building.png',
    name: 'greenBuilding',
    speed: defaultSpeed + difficulty
  };

  const hospitalSpecs = {
    x: this.maximumX,
    y: 141,
    width: 88.5,
    height: 159,
    imgSrc: 'assets/images/background_objects/hospital.png',
    name: 'hospital',
    speed: defaultSpeed + difficulty
  };

  const mallSpecs = {
    x: this.maximumX,
    y: 130.5,
    width: 232.5,
    height: 169.5,
    imgSrc: 'assets/images/background_objects/mall.png',
    name: 'mall',
    speed: defaultSpeed + difficulty
  };

  const pinkBuildingSpecs = {
    x: this.maximumX,
    y: 181,
    width: 132,
    height: 123,
    imgSrc: 'assets/images/background_objects/pink_building.png',
    name: 'pinkBuilding',
    speed: defaultSpeed + difficulty
  };

  const videokeBarSpecs = {
    x: this.maximumX,
    y: 150.5,
    width: 84.5,
    height: 153.5,
    imgSrc: 'assets/images/background_objects/videoke_bar.png',
    name: 'videokeBar',
    speed: defaultSpeed + difficulty
  };

  const backgroundObjectSpecs =  {
    palmTree: palmTreeSpecs,
    bank: bankSpecs,
    church: churchSpecs,
    greenBuilding: greenBuildingSpecs,
    hospital: hospitalSpecs,
    mall: mallSpecs,
    pinkBuilding: pinkBuildingSpecs,
    videokeBar: videokeBarSpecs
  };

  return new BackgroundObject(backgroundObjectSpecs[item]);
};

AssetManager.prototype.randomBackgroundObject = function(previousItem, difficulty) {
  const rand = Math.floor(Math.random() * this.allBackgroundObjects.length);
  const itemName = this.allBackgroundObjects[rand];
  const repeatItem = previousItem && itemName === previousItem.name;

  if (repeatItem) {
    return this.randomBackgroundObject.call(this, previousItem, difficulty);
  }

  return this.backgroundObject(itemName, difficulty);
};

// Bonus Objects
AssetManager.prototype.bonusObject = function(itemName, difficulty) {
  const lumpiaSpecs = {
    x: this.maximumX,
    y: 291.95,
    width: 65.7,
    height: 42.3,
    speed: defaultSpeed + difficulty,
    imgSrc: 'assets/images/bonuses/lumpia.png',
    audioSrc: 'assets/audio/bonus.wav',
    name: 'lumpia'
  };

  const mangoSpecs = {
    x: this.maximumX,
    y: 287.65,
    width: 52.2,
    height: 46.6,
    speed: defaultSpeed + difficulty,
    imgSrc: 'assets/images/bonuses/mango.png',
    audioSrc: 'assets/audio/bonus.wav',
    name: 'mango'
  };

  const bonusSpecs = {
    lumpia: lumpiaSpecs,
    mango: mangoSpecs
  };

  return new Bonus(bonusSpecs[itemName]);
};

AssetManager.prototype.randomBonusObject = function(difficulty) {
  const rand = Math.floor(Math.random() * this.allBonusObjects.length);
  const itemName = this.allBonusObjects[rand];

  return this.bonusObject(itemName, difficulty);
};

// Obstacles
AssetManager.prototype.obstacle = function(obstacleName, difficulty) {
  const motorcycleSpecs = {
    x: this.maximumX,
    y: 270,
    width: 97.25,
    height: 64.25,
    speed: defaultSpeed - 0.5 + difficulty,
    imgSrc: 'assets/images/obstacles/motorcycle.png',
    audioSrc: 'assets/audio/motorcycle_hit.mp3',
    audioVol: 0.2,
    name: 'motorcycle'
  };

  const streetDogSpecs = {
    x: this.maximumX,
    y: 283.85,
    width: 90.6,
    height: 50.4,
    speed: defaultSpeed + 0.5 + difficulty,
    imgSrc: 'assets/images/obstacles/street_dog.png',
    audioSrc: 'assets/audio/dog_hit.mp3',
    audioVol: 1.0,
    name: 'streetDog'
  };

  const obstacleSpecs = {
    motorcycle: motorcycleSpecs,
    streetDog: streetDogSpecs
  };

  return new Obstacle(obstacleSpecs[obstacleName]);
};

AssetManager.prototype.randomObstacle = function(difficulty) {
  const rand = Math.floor(Math.random() * this.allObstacles.length);
  const itemName = this.allObstacles[rand];

  return this.obstacle(itemName, difficulty);
};

// Jeepney
AssetManager.prototype.jeepney = function() {
  return new Jeepney();
};

module.exports = AssetManager;
