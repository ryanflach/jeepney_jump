const chai = require('chai');
const assert = chai.assert;
const Obstacle = require('../lib/obstacle');

describe('Obstacle', function(){
  var obstacle = new Obstacle({ imgSrc: '/assets/images/obstacle.png', x: 50, y: 300, width: 150, height: 250, speed: 20 });

  context('with given attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(obstacle, Obstacle);
    });

    it('should have an image', function(){
      assert.instanceOf(obstacle.img, Image);
    });

    it('should have an image source', function(){
      assert.equal(obstacle.img.src, 'http://localhost:8080/assets/images/obstacle.png');
    });

    it('should have an x coordinate', function(){
      assert.equal(obstacle.x, 50);
    });

    it('should have a y coordinate', function(){
      assert.equal(obstacle.y, 300);
    });

    it('should have a width', function(){
      assert.equal(obstacle.width, 150);
    });

    it('should have a height', function(){
      assert.equal(obstacle.height, 250);
    });

    it('should have a speed', function(){
      assert.equal(obstacle.speed, 20);
    });
  });

  context('page rendering', function(){
    it('has a draw function', function(){
      assert.isFunction(obstacle.draw);
    });

    it('has an update function that updates x value', function(){
      assert.equal(obstacle.x, 50);

      obstacle.update();

      assert.equal(obstacle.x, 30);
    });
  });
});
