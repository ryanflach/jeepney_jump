const Background = require('./background');
const BackgroundObject = require('./background_object');
// Temporary placeholder
// const Bonus = require('./bonus');
const Jeepney = require('./jeepney');
const Obstacle = require('./obstacle');

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
  // Temporary placeholder
  // this.allBonusObjects = [
  //
  // ];
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
AssetManager.prototype.backgroundObject = function(item) {
  const palmTreeSpecs = {
    x: this.maximumX,
    y: 167,
    width: 53.75,
    height: 135,
    imgSrc: 'assets/images/background_objects/palm_tree.png',
    name: 'palmTree'
  };

  const bankSpecs = {
    x: this.maximumX,
    y: 141.5,
    width: 103.5,
    height: 160.5,
    imgSrc: 'assets/images/background_objects/bank.png',
    name: 'bank'
  };

  const churchSpecs = {
    x: this.maximumX,
    y: 119,
    width: 63,
    height: 183,
    imgSrc: 'assets/images/background_objects/church.png',
    name: 'church'
  };

  const greenBuildingSpecs = {
    x: this.maximumX,
    y: 130,
    width: 84,
    height: 171,
    imgSrc: 'assets/images/background_objects/green_building.png',
    name: 'greenBuilding'
  };

  const hospitalSpecs = {
    x: this.maximumX,
    y: 141,
    width: 88.5,
    height: 159,
    imgSrc: 'assets/images/background_objects/hospital.png',
    name: 'hospital'
  };

  const mallSpecs = {
    x: this.maximumX,
    y: 130.5,
    width: 232.5,
    height: 169.5,
    imgSrc: 'assets/images/background_objects/mall.png',
    name: 'mall'
  };

  const pinkBuildingSpecs = {
    x: this.maximumX,
    y: 181,
    width: 132,
    height: 123,
    imgSrc: 'assets/images/background_objects/pink_building.png',
    name: 'pinkBuilding'
  };

  const videokeBarSpecs = {
    x: this.maximumX,
    y: 150.5,
    width: 84.5,
    height: 153.5,
    imgSrc: 'assets/images/background_objects/videoke_bar.png',
    name: 'videokeBar'
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

AssetManager.prototype.randomBackgroundObject = function(previousItem) {
  const rand = Math.floor(Math.random() * this.allBackgroundObjects.length);
  const itemName = this.allBackgroundObjects[rand];
  const repeatItem = previousItem && itemName === previousItem.name;

  if (repeatItem) {
    return this.randomBackgroundObject.call(this, previousItem);
  }

  return this.backgroundObject(itemName);
};

// Bonus Objects

// Obstacles
AssetManager.prototype.obstacle = function(obstacleName) {
  const motorcycleSpecs = {
    x: this.maximumX,
    y: 270,
    width: 97.25,
    height: 64.25,
    speed: 6,
    imgSrc: 'assets/images/obstacles/motorcycle.png',
    name: 'motorcycle'
  };

  const streetDogSpecs = {
    x: this.maximumX,
    y: 283.85,
    width: 90.6,
    height: 50.4,
    speed: 7,
    imgSrc: 'assets/images/obstacles/street_dog.png',
    name: 'streetDog'
  };

  const obstacleSpecs = {
    motorcycle: motorcycleSpecs,
    streetDog: streetDogSpecs
  };

  return new Obstacle(obstacleSpecs[obstacleName]);
};

AssetManager.prototype.randomObstacle = function() {
  const rand = Math.floor(Math.random() * this.allObstacles.length);
  const itemName = this.allObstacles[rand];

  return this.obstacle(itemName);
};

// Jeepney
AssetManager.prototype.jeepney = function () {
  return new Jeepney();
};

module.exports = AssetManager;
