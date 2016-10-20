const chai = require('chai');
const assert = chai.assert;
const Bonus = require('../lib/bonus');
const AudioPlayer = require('../lib/audio_player');

describe('Bonus', function(){
  var bonus = new Bonus({ imgSrc: '/assets/images/bonus.png', x: 50, y: 300, width: 150, height: 250, audioSrc: 'assets/audio/bonus.wav' });

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

    it('should have an instance of audio', function(){
      assert.instanceOf(bonus.audio, AudioPlayer);
    });

    it('should have a default yVelocity of 1', function(){
      assert.equal(bonus.yVelocity, 1);
    });

    it('should have a default hitByJeepney status of false', function(){
      assert.equal(bonus.hitByJeepney, false);
    });

    it('should have a default bonusPoints status of false', function(){
      assert.equal(bonus.bonusPoints, false);
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

    it('has a process collision function that updates bonus points and/or image', function(){
      bonus.processColission({ health: 4 });

      assert.equal(bonus.hitByJeepney, true);
      assert.equal(bonus.bonusPoints, false);
      assert.equal(bonus.img.src, 'http://localhost:8080/assets/images/heart.png');
      assert.equal(bonus.width, 30);
      assert.equal(bonus.height, 30);

      bonus.processColission({ health: 5 });

      assert.equal(bonus.bonusPoints, true);
    });
  });
});
