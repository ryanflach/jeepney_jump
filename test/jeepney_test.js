const chai = require('chai');
const assert = chai.assert;
const Jeepney = require('../lib/jeepney')

describe('Jeepney', function(){
  var jeepney = new Jeepney;
  context('with default attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(jeepney, Jeepney);
    });

    it('should have an x coordinate', function(){
      assert.equal(jeepney.x, 50);
    });

    it('should have an y coordinate', function(){
      assert.equal(jeepney.y, 300);
    });

    it('should have a width', function(){
      assert.equal(jeepney.width, 168);
    });

    it('should have a height', function(){
      assert.equal(jeepney.height, 82.5);
    });

    it('should have a starting health of 5', function(){
      assert.equal(jeepney.health, 5);
    });
  });

  context('loseHealth', function(){
    it('should be able to lose health', function(){
      jeepney.loseHealth();
      assert.equal(jeepney.health, 4);
    });
  });

  context('movement', function(){
    it('has a jump function', function(){
      assert.isFunction(jeepney.jump);
    });
  });
});
