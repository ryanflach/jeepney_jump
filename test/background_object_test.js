const chai = require('chai');
const assert = chai.assert;
const BackgroundObject = require('../lib/background_object');

describe('BackgroundObject', function(){
  var backgroundObject = new BackgroundObject({imgSrc: '/assets/images/backgroundObject.png', x: 50, y: 300, width: 150, height: 250});

  context('with given attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(backgroundObject, BackgroundObject);
    });

    it('should have an image', function(){
      assert.instanceOf(backgroundObject.img, Image);
    });

    it('should have an image source', function(){
      assert.equal(backgroundObject.img.src, 'http://localhost:8080/assets/images/backgroundObject.png');
    });

    it('should have an x coordinate', function(){
      assert.equal(backgroundObject.x, 50);
    });

    it('should have a y coordinate', function(){
      assert.equal(backgroundObject.y, 300);
    });

    it('should have a width', function(){
      assert.equal(backgroundObject.width, 150);
    });

    it('should have a height', function(){
      assert.equal(backgroundObject.height, 250);
    });

    it('should have a speed', function(){
      assert.equal(backgroundObject.speed, 5);
    });
  });

  context('page rendering', function(){
    it('has a draw function', function(){
      assert.isFunction(backgroundObject.draw);
    });

    it('has an update function that updates x value', function(){
      assert.equal(backgroundObject.x, 50);

      backgroundObject.update();

      assert.equal(backgroundObject.x, 45);
    });
  });
});
