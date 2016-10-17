const chai = require('chai');
const assert = chai.assert;
const Obstacle = require('../lib/obstacle');
const Jeepney = require('../lib/jeepney');

describe('Obstacle', function(){
  var obstacle = new Obstacle({ imgSrc: '/assets/images/obstacle.png', x: 50, y: 300, width: 150, height: 250, speed: 20, name: 'Robert Paulson' });

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

    it('should not be collided with by default', function(){
      assert.equal(obstacle.hitByJeepney, false);
    });

    it('should have a default y velocity of 0', function(){
      assert.equal(obstacle.yVelocity, 0);
    });

    it('should have a default x velocity of 0', function(){
      assert.equal(obstacle.xVelocity, 0);
    });

    it('should have a name', function(){
      assert.equal(obstacle.name, 'Robert Paulson');
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

    it('should update by velocity in place of speed if hit', function(){
      obstacle.hitByJeepney = true;
      obstacle.yVelocity = 5;
      obstacle.xVelocity = 5;

      assert.equal(obstacle.x, 30);

      obstacle.update();

      assert.equal(obstacle.x, 35);
      assert.equal(obstacle.y, 305);
    });
  });

  context('process collision', function(){
    var jeepney = new Jeepney();
    var newObstacle = new Obstacle({ imgSrc: '/assets/images/obstacle.png', x: 200, y: 300, width: 150, height: 250, speed: 20 });

    it('updates x and y velocity in a head-on collision', function(){
      newObstacle.processColission(jeepney);

      assert.equal(newObstacle.hitByJeepney, true);
      assert.equal(newObstacle.yVelocity, -2);
      assert.equal(newObstacle.xVelocity, 12);
    });

    it('updates y velocity when landed on by jeepney', function(){
      newObstacle.hitByJeepney = false;
      newObstacle.yVelocity = 0;
      newObstacle.xVelocity = 0;
      newObstacle.x += 50;

      newObstacle.processColission(jeepney);

      assert.equal(newObstacle.hitByJeepney, true);
      assert.equal(newObstacle.yVelocity, 12);
      assert.equal(newObstacle.xVelocity, 0);
    });
  });
});
