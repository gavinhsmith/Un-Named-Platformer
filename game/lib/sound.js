Sound = class {
  constructor(src,volume,loop) {
    this.audio = new Audio(src);

    this.src = src;
    this.audio.controls = false;
    this.audio.preload = 'auto';
    this.audio.volume = volume;
    this.audio.loop = (loop) ? loop : false;
  }
  play() {
    this.audio.play();
  }
  stop() {
    this.audio.pause();
    this.audio.src = this.src;
  }
  setVolume(volume) {
    this.audio.volume = volume;
  }
  getVolume() {
    return this.audio.volume;
  }
}
