const chai = require('chai');
const assert = chai.assert;
const Jeepney = require('../lib/jeepney');

describe('Jeepney', function(){
  context('with default attributes', function(){
    var jeepney = new Jeepney();

    it('should be instantiated', function(){
      assert.instanceOf(jeepney, Jeepney);
    });

    it('should have an x coordinate', function(){
      assert.equal(jeepney.x, 50);
    });

    it('should have a y coordinate', function(){
      assert.equal(jeepney.y, 210.5);
    });

    it('should have a width', function(){
      assert.equal(jeepney.width, 168);
    });

    it('should have a height', function(){
      assert.equal(jeepney.height, 122);
    });

    it('should have a starting health of 5', function(){
      assert.equal(jeepney.health, 5);
    });

    it('should have an image', function(){
      assert.instanceOf(jeepney.img, Image);
    });

    it('should have an image source', function(){
      assert.equal('http://localhost:8080/assets/images/jeepney/jeepney_no_damage.png', jeepney.img.src);
    });

    it('should have a jumping status', function(){
      assert.equal(jeepney.jumping, false);
    });

    it('should have a gravity attribute', function(){
      assert.equal(jeepney.gravity, 0.38);
    });

    it('should have a y velocity', function(){
      assert.equal(jeepney.yVelocity, 0);
    });

    it('should have a speed', function(){
      assert.equal(jeepney.speed, 5);
    });

    it('should have a default score of 0', function(){
      assert.equal(jeepney.score, 0);
    });
  });

  context('loseHealth', function(){
    var jeepney = new Jeepney();

    it('should be able to lose health', function(){
      jeepney.loseHealth();
      assert.equal(jeepney.health, 4);
    });
  });

  context('movement', function(){
    var jeepney = new Jeepney();

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
    var jeepney = new Jeepney();

    it('has a draw function', function(){
      assert.isFunction(jeepney.draw);
    });

    it('updates score at each update', function(){
      assert.equal(jeepney.score, 0);

      jeepney.update();

      assert.equal(jeepney.score, 1);

      jeepney.update();

      assert.equal(jeepney.score, 2);
    });

    it('updates y if jumping', function(){
      var oldY = jeepney.y;

      jeepney.jump();
      jeepney.update();

      assert.equal(jeepney.y, oldY + -jeepney.speed * 2);
    });

    it('updates image source based on current health', function(){
      var imagePrefix = 'http://localhost:8080/assets/images/jeepney/';

      jeepney.health = 4;
      jeepney.updateDamageShown();

      assert.equal(jeepney.img.src, imagePrefix + 'jeepney_damage_1.png');

      jeepney.health = 2;
      jeepney.updateDamageShown();

      assert.equal(jeepney.img.src, imagePrefix + 'jeepney_damage_2.png');

      jeepney.health = 1;
      jeepney.updateDamageShown();

      assert.equal(jeepney.img.src, imagePrefix + 'jeepney_full_damage.png');
    });
  });

  context('collision', function(){
    var jeepney = new Jeepney();

    it('detects collision', function(){
      var collidingObstacle = { x: 203, y: 250, width: 100 };
      var nonCollidingObstacle = { x: 400, y: 250, width: 100 };

      assert.equal(jeepney.isColliding(collidingObstacle), true);
      assert.equal(jeepney.isColliding(nonCollidingObstacle), false);
    });
  });

  context('is dead', function(){
    var jeepney = new Jeepney();

    it('should only be dead when health reaches 0', function(){
      assert.equal(jeepney.isDead(), false);

      jeepney.health = 0;

      assert.equal(jeepney.isDead(), true);
    });
  });
});
