const chai = require('chai');
const assert = chai.assert;
const Bonus = require('../lib/bonus')

describe('Bonus', function(){
  context('with given attributes', function(){
    var bonus = new Bonus({source: 'bonus.png', x: 50, y: 300, width: 150, height: 250});
    it('should be instantiated', function(){
      assert.instanceOf(bonus, Bonus);
    });

    it('should have an img', function(){
      assert.instanceOf(bonus.img, Image);
      assert.equal(bonus.img.src, 'bonus.png');
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
  });
});
