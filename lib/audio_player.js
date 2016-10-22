class AudioPlayer {
  constructor(data) {
    this.audio = new Audio(data.source);
    this.audio.loop = data.loops || false;
    this.audio.volume = data.volume || 1.0;
  }

  play() {
    if (!this.audio.loop) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

module.exports = AudioPlayer;
