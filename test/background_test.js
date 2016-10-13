const chai = require('chai');
const assert = chai.assert;
const Background = require('../lib/background');

describe('Background', function(){
  var background = new Background({ imgSrc: '/assets/images/ground.png', x: 0, y: 360, width: 500, height: 500 });

  context('with given attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(background, Background);
    });

    it('should have an image', function(){
      assert.instanceOf(background.img, Image);
    });

    it('should have an image source', function(){
      assert.equal(background.img.src, 'http://localhost:8080/assets/images/ground.png');
    });

    it('should have an x coordinate', function(){
      assert.equal(background.x, 0);
    });

    it('should have a y coordinate', function(){
      assert.equal(background.y, 360);
    });

    it('should have a width', function(){
      assert.equal(background.width, 500);
    });

    it('should have a height', function(){
      assert.equal(background.height, 500);
    });
  });

  context('page rendering', function(){
    it('has a draw function', function(){
      assert.isFunction(background.draw);
    });
  });
});
