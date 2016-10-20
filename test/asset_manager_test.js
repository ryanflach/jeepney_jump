const chai = require('chai');
const assert = chai.assert;
const AssetManager = require('../lib/asset_manager');
const Background = require('../lib/background');
const BackgroundObject = require('../lib/background_object');
const Jeepney = require('../lib/jeepney');
const Obstacle = require('../lib/obstacle');
const Bonus = require('../lib/bonus');


describe('Asset Manager', function(){
  const assets = new AssetManager({ x: 900, y: 400 });

  context('with given attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(assets, AssetManager);
    });

    it('should have a maximum X', function(){
      assert.equal(assets.maximumX, 900);
    });

    it('should have a maximum Y', function(){
      assert.equal(assets.maximumY, 400);
    });

    it('should have an array of all possible background object names', function(){
      assert.instanceOf(assets.allBackgroundObjects, Array);
      assert.equal(assets.allBackgroundObjects[0], 'palmTree');
    });

    it('should have an array of all possible obstacle names', function(){
      assert.instanceOf(assets.allObstacles, Array);
      assert.equal(assets.allObstacles[0], 'motorcycle');
    });

    it('should have an array of all possible bonus object names', function(){
      assert.instanceOf(assets.allBonusObjects, Array);
      assert.equal(assets.allBonusObjects[0], 'lumpia');
    });
  });

  context('object creation', function(){
    it('can create a background', function(){
      assert.instanceOf(assets.background('cloud'), Background);
    });

    it('can create a background object', function(){
      assert.instanceOf(assets.backgroundObject('hospital'), BackgroundObject);
    });

    it('can create a random background object', function(){
      assert.instanceOf(assets.randomBackgroundObject(), BackgroundObject);
    });

    it('can create an obstacle', function(){
      assert.instanceOf(assets.obstacle('motorcycle'), Obstacle);
    });

    it('can create a random obstacle', function(){
      assert.instanceOf(assets.randomObstacle(), Obstacle);
    });

    it('can create a bonus object', function(){
      assert.instanceOf(assets.bonusObject('lumpia'), Bonus);
    });

    it('can create a random bonus object', function(){
      assert.instanceOf(assets.randomBonusObject(), Bonus);
    });

    it('can create a jeepney', function(){
      assert.instanceOf(assets.jeepney(), Jeepney);
    });
  });
});
