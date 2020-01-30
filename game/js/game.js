var player = new Player((c.width/2)-25,(c.height/2)-25,50,100,15,35);

function debugloop() {
  player.level = 999;
  ctx.save();
  ctx.font = '2em monospace';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#00f';
  ctx.fillText('DEBUG ENABLED',c.width-10,10);
  ctx.restore();
}

function drawText(text,font,color,x,y,pos) {
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
  ctx.fillStyle = color;
  ctx.fillText(text,x,y);
  ctx.restore();
  textline++;
};

function gameoverloop() {
  ctx.clearAll();
  ctx.fillAll('#000');
  drawText('GAME OVER','5em monospace','#fff',VIEWPORTWIDTH/2,VIEWPORTHEIGHT/2,null);
  // drawText('(reload page to retry)','1.5em monospace','#fff',VIEWPORTWIDTH/2,(VIEWPORTHEIGHT/2)+80,null);
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

  if (debug) debugloop();

  drawText(`Level: ${player.level+1}`,'2em monospace','#f00',10,(25*textline)+10,'urc');
  drawText(`Lives: ${player.lives}`,'2em monospace','#f00',10,(25*textline)+10,'urc');

  textline = 0;
};

function endGame() {
  clearInterval(gameloopvar);
  gameoverloopvar = setInterval(gameoverloop,1000/30);
  document.getElementById('reloadbtn').classList.remove('hidden');
};

gameloopvar = setInterval(gameloop,1000/30);
