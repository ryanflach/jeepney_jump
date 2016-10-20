const chai = require('chai');
const assert = chai.assert;
const AudioPlayer = require('../lib/audio_player');

describe('Audio Player', function(){
  var audioPlayer = new AudioPlayer({ source: 'assets/audio/jeepney.mp3' });

  context('with default attributes', function(){
    it('should be instantiated', function(){
      assert.instanceOf(audioPlayer, AudioPlayer);
    });

    it('should create a new audio instance', function(){
      assert.instanceOf(audioPlayer.audio, Audio);
    });

    it('should have a default loop status of false', function(){
      assert.equal(audioPlayer.audio.loop, false);
    });

    it('should have a default volume of 1.0', function(){
      assert.equal(audioPlayer.audio.volume, 1.0);
    });
  });

  context('playing audio', function(){
    it('should have a play function', function(){
      assert.isFunction(audioPlayer.play);
    });

    it('should have a stop function', function(){
      assert.isFunction(audioPlayer.stop);
    });
  });
});
