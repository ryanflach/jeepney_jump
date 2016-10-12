const chai = require('chai');
const assert = chai.assert;
const Building = require('../lib/building')

describe('Building', function(){
  context('with given attributes', function(){
    var building = new Building('building.png', 50, 300, 150, 250);
    it('should be instantiated', function(){
      assert.instanceOf(building, Building);
    });

    it('should have an img', function(){
      assert.equal(building.img, 'building.png');
    });

    it('should have an x coordinate', function(){
      assert.equal(building.x, 50);
    });

    it('should have a y coordinate', function(){
      assert.equal(building.y, 300);
    });

    it('should have a width', function(){
      assert.equal(building.width, 150);
    });

    it('should have a height', function(){
      assert.equal(building.height, 250);
    });
  });
});
