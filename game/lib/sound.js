Sound = class {
  constructor(src,volume,loop) {
    this.audio = new Audio(src);

    this.src = src;
    this.audio.controls = false;
    this.audio.preload = 'auto';
    this.audio.volume = Math.clamp((volume) ? volume : 1,0,1);
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
    this.audio.volume = Math.clamp((volume) ? volume : 1,0,1);
  }
  getVolume() {
    return this.audio.volume;
  }
}
