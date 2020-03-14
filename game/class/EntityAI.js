const EntityAI = class {
  constructor(movementarr) {
    this.time = 0;
    this.totaltime = 0;
    this.movements = movementarr;
    for (var b in this.movements) {
      this.totaltime += this.movements[b].totaltime;
    };
  }
  check(name) {
    var timebefore = 0;
    for (var k in this.movements) {
      if (this.movements[k].name == name) {
        timebefore += this.movements[k].delay;
        if (this.time > timebefore && this.time <= timebefore + this.movements[k].move.time) {
          return true;
        };
      } else {
        timebefore += this.movements[k].totaltime;
      };
    };
    return false;
  }
  reset() {
    this.time = 0;
  }
  update() {
    this.time++;
    if (this.time > this.totaltime) this.time = 0;
  }
}
