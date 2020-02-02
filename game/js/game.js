var player = new Player((c.width/2)-25,(c.height/2)-25,50,100,15,35);

function debugloop() {
  player.level = 999;
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

function gameoverloop() {
  ctx.clearAll();
  ctx.fillAll('#000');
  gamepads = navigator.getGamepads();
  drawText('GAME OVER','5em FR73Pixel','#000','#fff',VIEWPORTWIDTH/2,VIEWPORTHEIGHT/2,null);
  // drawText('(reload page to retry)','1.5em monospace','#fff',VIEWPORTWIDTH/2,(VIEWPORTHEIGHT/2)+80,null);
  if (gamepads[CONTROLLER]) {
    if (!sicretry) document.getElementById('reloadbtn').innerHTML = '<img style="background: black;" height="20" src="assets/img/icon/btn/btn_08.png"></img> RETRY';
    if (mouseinretry) document.getElementById('reloadbtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> RETRY';
    if (inputcheck(BINDINGS.D_NEXTLEVEL).state) {
      document.getElementById('reloadbtn').innerHTML = '<img style="background: white;" height="20" src="assets/img/icon/btn/btn_09.png"></img> RETRY';
      document.getElementById('reloadbtn').classList.add('activerlb');
      sicretry = true;
      document.getElementById('reloadbtn').click();
    };
  };
}

function gameloop() {
  ctx.clearAll();

  if (player.lives <= 0) {
    endGame();
  };

  gamepads = navigator.getGamepads();
  camera.update(VIEWPORT,LEVELS[player.level],player);

  if (inputcheck(BINDINGS.DEBUG).state) {
    debug = true;
  };

  if (LEVELS[player.level] == null && LEVELS[player.level-1] && !debug) {
    player.prevlvl();
  };

  LEVELS[player.level].drawBG(ctx);
  player.update(ctx,FRICTION,GRAVITY,LEVELS[player.level]);
  LEVELS[player.level].drawFG(ctx);
  player.spritehearts.draw(ctx,10,35,28*5.5,28);

  if (debug) debugloop();

  drawText(`Level: ${player.level+1}`,'bold 1.3em FR73Pixel','#fff','#000',10,(25*textline)+10,'urc');

  textline = 0;
};

function endGame() {
  clearInterval(gameloopvar);
  gameoverloopvar = setInterval(gameoverloop,1000/30);
  document.getElementById('reloadbtn').classList.remove('hidden');
};

gameloopvar = setInterval(gameloop,1000/30);
