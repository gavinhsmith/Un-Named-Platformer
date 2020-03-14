const EntityMovement = class {
  constructor(name,delay,jump,move) {
    this.name = name;
    this.delay = delay;
    this.jump = jump;
    this.move = move;
    this.totaltime = delay+move.time;
  }
}
