window.addEventListener('keydown',function (e) {
  KEYSTATE[e.keyCode] = true;
});
window.addEventListener('keyup',function (e) {
  delete KEYSTATE[e.keyCode];
});
window.addEventListener('resize',function (e) {
  rsjs(c,'full',{margin_width: 0, margin_height: 0});
});
window.addEventListener("gamepadconnected", (e) => {
  console.log(`A gamepad connected: INDEX ${e.gamepad.index}`);
});
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(`A gamepad disconnected: INDEX ${e.gamepad.index}`);
});
document.getElementById('reloadbtn').onmouseover = function (e) {
  mouseinretry = true;
};
document.getElementById('reloadbtn').onmouseout = function (e) {
  mouseinretry = false;
};
