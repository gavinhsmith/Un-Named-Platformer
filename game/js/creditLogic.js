var scrooltop = 0;
disableScroll();
function update() {
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
    scrooltop += 0.25;
    window.scroll(0,scrooltop);
  },1000/30);
},2000);

setInterval(update,1000/30);
