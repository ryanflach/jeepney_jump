const chai = require('chai');
const assert = chai.assert;
const Game = require('../lib/game');
const canvas = document.getElementById('game');
const canvasContext = canvas.getContext('2d');
const Jeepney = require('../lib/jeepney');
const Background = require('../lib/background');
const AssetManager = require('../lib/asset_manager');
const Obstacle = require('../lib/obstacle');
const BackgroundObject = require('../lib/background_object');

describe('Game', function(){
  var game = new Game(canvas, canvasContext);

  context('with default properties', function(){
    it('should be instantiated', function(){
      assert.instanceOf(game, Game);
    });

    it('should have an x and y size', function(){
      assert.equal(game.size.x, canvas.width);
      assert.equal(game.size.y, canvas.height);
    });

    it('should have an array of background objects', function(){
      assert.instanceOf(game.backgroundObjects, Array);
      assert.instanceOf(game.backgroundObjects[0], BackgroundObject);
    });

    it('should have an instance of an Asset Manager', function(){
      assert.instanceOf(game.assets, AssetManager);
    });

    it('should have a jeepney', function(){
      assert.instanceOf(game.jeepney, Jeepney);
    });

    it('should have an array of obstacles', function(){
      assert.instanceOf(game.obstacles, Array);
      assert.instanceOf(game.obstacles[0], Obstacle);
    });

    it('should have a background', function(){
      assert.instanceOf(game.background, Background);
    });

    it('should have clouds', function(){
      assert.instanceOf(game.clouds, Array);
      assert.instanceOf(game.clouds[0], Background);
    });

    it('should have a default playing status of true', function(){
      assert.equal(game.playing, true);
    });
  });

  context('page rendering', function(){
    it('should have a draw function', function(){
      assert.isFunction(game.draw);
    });

    it('should have an update function', function(){
      assert.isFunction(game.update);
    });

    it('should have a generate clouds function', function(){
      assert.isFunction(game.generateClouds);
    });

    it('should have a set clouds function', function(){
      assert.isFunction(game.setClouds);
    });

    it('should have a generate background objects function', function(){
      assert.isFunction(game.generateBackgroundObjects);
    });

    it('should have a set background objects function', function(){
      assert.isFunction(game.setBackgroundObjects);
    });

    it('should have a generate obstacles function', function(){
      assert.isFunction(game.generateObstacles);
    });

    it('should have a set obstacles function', function(){
      assert.isFunction(game.setObstacles);
    });

    it('should have a check jeepney health function', function(){
      assert.isFunction(game.checkJeepneyHealth);
    });

    it('should have a reload start button function', function(){
      assert.isFunction(game.reloadStartButton);
    });

    it('should have a draw score function', function(){
      assert.isFunction(game.drawScore);
    });

    it('should have a draw health function', function(){
      assert.isFunction(game.drawHealth);
    });

    it('should have an end game function', function(){
      assert.isFunction(game.endGame);
    });
  });
});
