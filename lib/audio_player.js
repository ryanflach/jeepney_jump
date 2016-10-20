var AudioPlayer = function(data){
  this.audio = new Audio(data.source);
  this.audio.loop = data.loops || false;
  this.audio.volume = data.volume || 1.0;
};

AudioPlayer.prototype.play = function() {
  if (!this.audio.loop) {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  this.audio.play();
};

AudioPlayer.prototype.stop = function() {
  this.audio.pause();
  this.audio.currentTime = 0;
};

module.exports = AudioPlayer;
