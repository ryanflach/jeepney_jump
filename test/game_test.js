const chai = require('chai');
const assert = chai.assert;
const Game = require('../lib/game');
const canvas = document.getElementById('game');
const canvasContext = canvas.getContext('2d');
const Jeepney = require('../lib/jeepney');
const Background = require('../lib/background');

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
    });

    it('should have a jeepney', function(){
      assert.instanceOf(game.jeepney, Jeepney);
    });

    it('should have an array of obstacles', function(){
      assert.instanceOf(game.obstacles, Array);
    });

    it('should have a background', function(){
      assert.instanceOf(game.background, Background);
    });
  });

  context('page rendering', function(){
    it('should have a draw function', function(){
      assert.isFunction(game.draw);
    });

    it('should have an update function', function(){
      assert.isFunction(game.update);
    });
  });
});
