const chai = require('chai');
const assert = chai.assert;
const Bonus = require('../lib/bonus');

describe('Bonus', function(){
  var bonus = new Bonus({ imgSrc: '/assets/images/bonus.png', x: 50, y: 300, width: 150, height: 250 });

  context('with given attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(bonus, Bonus);
    });

    it('should have an image', function(){
      assert.instanceOf(bonus.img, Image);
    });

    it('should have an image source', function(){
      assert.equal(bonus.img.src, 'http://localhost:8080/assets/images/bonus.png');
    });

    it('should have an x coordinate', function(){
      assert.equal(bonus.x, 50);
    });

    it('should have a y coordinate', function(){
      assert.equal(bonus.y, 300);
    });

    it('should have a width', function(){
      assert.equal(bonus.width, 150);
    });

    it('should have a height', function(){
      assert.equal(bonus.height, 250);
    });

    it('should have a speed', function(){
      assert.equal(bonus.speed, 5);
    });
  });

  context('page rendering', function(){
    it('has a draw function', function(){
      assert.isFunction(bonus.draw);
    });

    it('has an update function that updates x value', function(){
      assert.equal(bonus.x, 50);

      bonus.update();

      assert.equal(bonus.x, 45);
    });
  });
});
