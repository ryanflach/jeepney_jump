const chai = require('chai');
const assert = chai.assert;
const Obstacle = require('../lib/obstacle')

describe('Obstacle', function(){
  context('with given attributes', function(){
    var obstacle = new Obstacle('obstacle.png', 50, 300, 50, 300, 150, 250);
    it('should be instantiated', function(){
      assert.instanceOf(obstacle, Obstacle);
    });

    it('should have an img', function(){
      assert.equal(obstacle.img, 'obstacle.png');
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
  });
});
