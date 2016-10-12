const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game');

describe('Game', function(){
  var game = new Game;

  context('it has default properties', function(){
    it('should be instantiated', function(){
      assert.instanceOf(game, Game);
    });
  });
});
