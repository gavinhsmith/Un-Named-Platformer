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
document.getElementById('startgamebtn').onmouseover = function (e) {
  mouseinstart = true;
};
document.getElementById('startgamebtn').onmouseout = function (e) {
  mouseinstart = false;
};
document.getElementById('creditbtn').onmouseover = function (e) {
  mouseincredi = true;
};
document.getElementById('creditbtn').onmouseout = function (e) {
  mouseincredi = false;
};
document.getElementById('gototitlebtn').onmouseover = function (e) {
  mouseintitle = true;
};
document.getElementById('gototitlebtn').onmouseout = function (e) {
  mouseintitle = false;
};
document.getElementById('resumegamebtn').onmouseover = function (e) {
  mouseinresum = true;
};
document.getElementById('resumegamebtn').onmouseout = function (e) {
  mouseinresum = false;
};
document.getElementById('gototitlebtn2').onmouseover = function (e) {
  mouseintitl2 = true;
};
document.getElementById('gototitlebtn2').onmouseout = function (e) {
  mouseintitl2 = false;
};
