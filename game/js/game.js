var player1 = new Player((c.width/2)-25,(c.height/2)-25,50,100,15,35,0);

function debugloop() {
  ctx.save();
  ctx.font = '2em FR73Pixel';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#00f';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeText('DEBUG ENABLED',c.width-10,10);
  ctx.fillText('DEBUG ENABLED',c.width-10,10);
  ctx.restore();
}

function drawText(text,font,fcolor,scolor,x,y,pos) {
  ctx.save();
  ctx.font = font;
  if (pos == 'urc') {
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
  } else if (pos == 'ulc') {
    ctx.textBaseline = 'top';
    ctx.textAlign = 'right';
  } else {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
  }
  ctx.strokeStyle = scolor;
  ctx.fillStyle = fcolor;
  ctx.lineWidth = 3;
  ctx.strokeText(text,x,y);
  ctx.fillText(text,x,y);
  ctx.restore();
  textline++;
};

setInterval(function () {
  btntimeout--;
},1000/30);

function pauseloop() {
  drawText('PAUSE','5em FR73Pixel','#000','#fff',VIEWPORTWIDTH/2,VIEWPORTHEIGHT/2,null);
  gamepads = navigator.getGamepads();
  if (gamepads[player1.controler]) {
    if (!sicretry5) document.getElementById('resumegamebtn').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_08.png"></img> RESUME';
    if (mouseinresum) document.getElementById('resumegamebtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> RESUME';
    if (inputcheck(BINDINGS.D_NEXTLEVEL,player1.controler).state && btntimeout <= 0) {
      document.getElementById('resumegamebtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> RESUME';
      document.getElementById('resumegamebtn').classList.add('activeb');
      sicretry5 = true;
      document.getElementById('resumegamebtn').click();
    };

    if (!sicretry6) document.getElementById('gototitlebtn2').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_10.png"></img> TITLE SCREEN';
    if (mouseintitl2) document.getElementById('gototitlebtn2').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> TITLE SCREEN';
    if (inputcheck(BINDINGS.D_PREVLEVEL,player1.controler).state && btntimeout <= 0) {
      document.getElementById('gototitlebtn2').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> TITLE SCREEN';
      document.getElementById('gototitlebtn2').classList.add('activeb');
      sicretry6 = true;
      document.getElementById('gototitlebtn2').click();
    };
  };
};

function gameoverloop() {
  ctx.clearAll();
  ctx.fillAll('#000');
  gamepads = navigator.getGamepads();
  drawText('GAME OVER','5em FR73Pixel','#000','#fff',VIEWPORTWIDTH/2,VIEWPORTHEIGHT/2,null);
  // drawText('(reload page to retry)','1.5em monospace','#fff',VIEWPORTWIDTH/2,(VIEWPORTHEIGHT/2)+80,null);
  if (gamepads[player1.controler]) {
    if (!sicretry) document.getElementById('reloadbtn').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_08.png"></img> RETRY';
    if (mouseinretry) document.getElementById('reloadbtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> RETRY';
    if (inputcheck(BINDINGS.D_NEXTLEVEL,player1.controler).state && btntimeout <= 0) {
      document.getElementById('reloadbtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> RETRY';
      document.getElementById('reloadbtn').classList.add('activeb');
      sicretry = true;
      document.getElementById('reloadbtn').click();
    };

    if (!sicretry4) document.getElementById('gototitlebtn').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_10.png"></img> TITLE SCREEN';
    if (mouseintitle) document.getElementById('gototitlebtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> TITLE SCREEN';
    if (inputcheck(BINDINGS.D_PREVLEVEL,player1.controler).state && btntimeout <= 0) {
      document.getElementById('gototitlebtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> TITLE SCREEN';
      document.getElementById('gototitlebtn').classList.add('activeb');
      sicretry4 = true;
      document.getElementById('gototitlebtn').click();
    };
  };
}

function gameloop() {
  ctx.clearAll();

  if (player1.lives <= 0) {
    endGame();
  };

  gamepads = navigator.getGamepads();
  camera.update(VIEWPORT,LEVELS[player1.level],player1);

  if (inputcheck(BINDINGS.DEBUG,player1.controler).state) {
    debug = true;
  } else if (inputcheck(BINDINGS.UNDEBUG,player1.controler).state) {
    debug = false;
  };

  LEVELS[player1.level].drawBG(ctx);
  player1.update(ctx,FRICTION,GRAVITY,LEVELS[player1.level]);
  LEVELS[player1.level].drawFG(ctx);
  drawText(`${LEVELS[player1.level].name} (LEVEL ${player1.level+1})`,'bold 1.3em FR73Pixel','#fff','#000',10,(25*textline)+10,'urc');
  player1.spritehearts.draw(ctx,10,35,28*5.5,28);

  if (player1.pause) startPauseLoop();

  if (debug) debugloop();

  textline = 0;
};

function endGame() {
  clearInterval(gameloopvar);
  gameoverloopvar = setInterval(gameoverloop,1000/30);
  document.getElementById('gameorbtnmnu').classList.remove('hidden');
  LEVELS[player1.level].audio.main.stop();
  ASSETS.AUDIO.GAMEOVER.play();
};

function startGame() {
  LEVELS[player1.level].audio.main.audio.volume = 1;
  ASSETS.AUDIO.STARTSCREEN.stop();
  ASSETS.AUDIO.GAMEOVER.stop();
  player1.pause = false;
  document.getElementById('titlebtnmnu').style.display = 'none';
  clearInterval(titlescreenloopvar);
  player1.reset();
  gameloopvar = setInterval(gameloop,1000/30);
  LEVELS[player1.level].audio.main.play();
};

function stopEndGame() {
  document.getElementById('gameorbtnmnu').classList.add('hidden');
  document.getElementById('reloadbtn').classList.remove('activeb');
  document.getElementById('gototitlebtn').classList.remove('activeb');
  sicretry = false;
  clearInterval(gameoverloopvar);
};

function startTitleLoop() {
  clearInterval(pauseloopvar);
  ASSETS.AUDIO.GAMEOVER.stop();
  LEVELS[player1.level].audio.main.stop();
  sicretry = false;
  sicretry2 = false;
  sicretry3 = false;
  sicretry4 = false;
  sicretry5 = false;
  sicretry6 = false;
  document.getElementById('gameorbtnmnu').classList.add('hidden');
  document.getElementById('pausebtnmnu').classList.add('hidden');
  document.getElementById('pausebtnmnu').style.display = 'none';
  document.getElementById('titlebtnmnu').classList.remove('hidden');
  document.getElementById('titlebtnmnu').style.display = 'block';
  document.getElementById('startgamebtn').classList.remove('activeb');
  document.getElementById('creditbtn').classList.remove('activeb');
  titlescreenloopvar = setInterval(titlescreenloop,1000/30);
  ASSETS.AUDIO.STARTSCREEN.play();
};

function stopPauseLoop() {
  LEVELS[player1.level].audio.main.audio.volume = 1;
  sicretry = false;
  sicretry2 = false;
  sicretry3 = false;
  sicretry4 = false;
  sicretry5 = false;
  sicretry6 = false;
  document.getElementById('pausebtnmnu').classList.add('hidden');
  document.getElementById('pausebtnmnu').style.display = 'none';
  document.getElementById('resumegamebtn').classList.remove('activeb');
  document.getElementById('gototitlebtn2').classList.remove('activeb');
  player1.pause = false;
  clearInterval(pauseloopvar);
  gameloopvar = setInterval(gameloop,1000/30);
};

function startPauseLoop() {
  clearInterval(gameloopvar);
  ctx.fillAll('rgba(0,0,0,0.5)');
  LEVELS[player1.level].audio.main.audio.volume = 0.3;
  sicretry = false;
  sicretry2 = false;
  sicretry3 = false;
  sicretry4 = false;
  sicretry5 = false;
  sicretry6 = false;
  document.getElementById('pausebtnmnu').classList.remove('hidden');
  document.getElementById('pausebtnmnu').style.display = 'block';
  document.getElementById('resumegamebtn').classList.remove('activeb');
  document.getElementById('gototitlebtn2').classList.remove('activeb');
  pauseloopvar = setInterval(pauseloop,1000/30);
};

function titlescreenloop() {
  ctx.clearAll();
  ctx.fillAll('#000');
  gamepads = navigator.getGamepads();
  drawText('UN-NAMED PLATFORMER','4em FR73Pixel','#000','#fff',VIEWPORTWIDTH/2,VIEWPORTHEIGHT/2,null);
  if (gamepads[player1.controler]) {
    if (!sicretry2) document.getElementById('startgamebtn').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_08.png"></img> START';
    if (mouseinstart) document.getElementById('startgamebtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> START';
    if (!sicretry3) document.getElementById('creditbtn').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_10.png"></img> CREDITS';
    if (mouseincredi) document.getElementById('creditbtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> CREDITS';
    if (inputcheck(BINDINGS.D_NEXTLEVEL,player1.controler && btntimeout <= 0).state) {
      document.getElementById('startgamebtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> START';
      document.getElementById('startgamebtn').classList.add('activeb');
      sicretry2 = true;
      document.getElementById('startgamebtn').click();
    };
    if (inputcheck(BINDINGS.D_PREVLEVEL,player1.controler).state && btntimeout <= 0) {
      document.getElementById('creditbtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_11.png"></img> CREDITS';
      document.getElementById('creditbtn').classList.add('activeb');
      sicretry3 = true;
      document.getElementById('creditbtn').click();
    };
  };
};

ASSETS.AUDIO.STARTSCREEN.play();

titlescreenloopvar = setInterval(titlescreenloop,1000/30);
