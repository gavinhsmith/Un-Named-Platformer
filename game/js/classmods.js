Math.clamp = (n, lo, hi) => n < lo ? lo : n > hi ? hi : n;
Gamepad.prototype.vibrate = function (length,power) {
  this.vibrationActuator.playEffect('dual-rumble',{
    startDelay: 0,
    duration: length,
    weakMagnitude: power,
    strongMagnitude: power
  })
};
