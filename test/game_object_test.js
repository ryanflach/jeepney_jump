const chai = require('chai');
const assert = chai.assert;
const GameObject = require('../lib/game_object');

describe('Game Object', () => {
  const gameObject = new GameObject({ imgSrc: 'assets/images/heart.png', x: 50, y: 50, width: 100, height: 100, name: 'example' });

  context('attributes', () => {
    it('should have an image', () => {
      assert.instanceOf(gameObject.img, Image);
    });

    it('should have an image source', () => {
      assert.equal(gameObject.img.src, 'http://localhost:8080/assets/images/heart.png');
    });

    it('should have an x attribute', () => {
      assert.equal(gameObject.x, 50);
    });

    it('should have a y attribute', () => {
      assert.equal(gameObject.y, 50);
    });

    it('should have a width attribute', () => {
      assert.equal(gameObject.width, 100);
    });

    it('should have a height attribute', () => {
      assert.equal(gameObject.height, 100);
    });

    it('should have a default speed attribute of 5', () => {
      assert.equal(gameObject.speed, 5);
    });

    it('should have a name attribute', () => {
      assert.equal(gameObject.name, 'example');
    });
  });

  context('page rendering', () => {
    it('should have an update function that reduces x', () => {
      const currentX = gameObject.x;

      gameObject.update();

      assert.equal(gameObject.x, currentX - gameObject.speed);
    });

    it('should have a draw function', () => {

    });
  });

});
