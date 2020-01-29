const c = document.createElement('canvas');
const ctx = c.getContext('2d');
c.classList.add('main-canvas');
c.width = VIEWPORTWIDTH;
c.height = VIEWPORTHEIGHT;
document.body.appendChild(c);

// CTX Functions
ctx.clearAll = function () {
  ctx.clearRect(-100,-100,c.width+100,c.height+100);
};
ctx.fillAll = function (color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(-100,-100,c.width+100,c.height+100);
  ctx.restore();
};

rsjs(c,'full',{margin_width: 0, margin_height: 0});
