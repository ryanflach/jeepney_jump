const chai = require('chai');
const assert = chai.assert;
const Jeepney = require('../lib/jeepney');

describe('Jeepney', function(){
  var jeepney = new Jeepney();

  context('with default attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(jeepney, Jeepney);
    });

    it('should have an x coordinate', function(){
      assert.equal(jeepney.x, 50);
    });

    it('should have an y coordinate', function(){
      assert.equal(jeepney.y, 250);
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

    it('should have an image', function(){
      assert.instanceOf(jeepney.img, Image);
    });

    it('should have an image source', function(){
      assert.equal('http://localhost:8080/assets/images/jeepney.png', jeepney.img.src);
    });

    it('should have a jumping status', function(){
      assert.equal(jeepney.jumping, false);
    });

    it('should have a gravity', function(){
      assert.equal(jeepney.gravity, 0.4);
    });

    it('should have a y velocity', function(){
      assert.equal(jeepney.yVelocity, 0);
    });

    it('should have a speed', function(){
      assert.equal(jeepney.speed, 5);
    });
  });

  context('loseHealth', function(){
    it('should be able to lose health', function(){
      jeepney.loseHealth();
      assert.equal(jeepney.health, 4);
    });
  });

  context('movement', function(){
    it('can jump!', function(){
      jeepney.jump();
      assert.equal(jeepney.jumping, true);
      assert.equal(jeepney.yVelocity, -jeepney.speed * 2);
    });

    it('does not jump if currently jumping', function(){
      var currentYVelocity = jeepney.yVelocity;

      assert.equal(jeepney.jumping, true);

      jeepney.jump();

      assert.equal(jeepney.jumping, true);
      assert.equal(jeepney.yVelocity, currentYVelocity);
    });
  });

  context('page rendering', function(){
    it('has a draw function', function(){
      assert.isFunction(jeepney.draw);
    });

    it('has an update function', function(){
      assert.isFunction(jeepney.update);
    });
  });
});
