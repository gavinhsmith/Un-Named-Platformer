var scrooltop = 0;
var oldscrolly = 5;
var autoscroll = true;
var activetime = 0;
ASSETS.AUDIO.CREDITS.play();
disableScroll();
function update() {
  activetime++;
  gamepads = navigator.getGamepads();
  if (gamepads[CONTROLLER]) {
    if (!sicretry) document.getElementById('leavecredits').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_10.png"></img> GO BACK';
    if (mouseinretry) document.getElementById('leavecredits').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> GO BACK';
    if (inputcheck([NS_CONTROLER.SELECT]).state) {
      document.getElementById('leavecredits').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> GO BACK';
      document.getElementById('leavecredits').classList.add('activeb');
      sicretry = true;
      document.getElementById('leavecredits').click();
    };
  };
};

setTimeout(function () {
  setInterval(function () {
    scrooltop += 1;
    if (oldscrolly == window.scrollY) {
      enableScroll();
      autoscroll = false;
    };
    oldscrolly = window.scrollY;
    if (autoscroll) window.scroll(0,scrooltop);
  },1000/15);
},2000);

setInterval(update,1000/30);
