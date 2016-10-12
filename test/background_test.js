const chai = require('chai');
const assert = chai.assert;
const Background = require('../lib/background')

describe('Background', function(){
  context('with given attributes', function(){
    var background = new Background({ x: 0, y: 360, width: 500, height: 500, source: '/assets/images/ground.png' });
    it('should be instantiated', function(){
      assert.instanceOf(background, Background);
    });

    it('should have an img', function(){
      assert.instanceOf(background.img, Image);
      assert.equal(background.img.src, '/assets/images/ground.png');
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
});
