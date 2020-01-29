const Sprite = function (src, spriteWidth, spriteHeight, frames, updatePerFrames) {
  this.img = new Image();
  this.img.src = src;
  this.curFrame = 0;
  this.sW = spriteWidth;
  this.sH = spriteHeight;
  this.uPF = updatePerFrames;
  this.fC = frames;
  this.overallcf = 0;
  this.draw = function (ctx,x,y,width,height) {
    ctx.save();
    ctx.drawImage(this.img,this.sW*this.curFrame,0,this.sW,this.sH,x,y,width,height);
    ctx.restore();

    this.overallcf++;

    if (this.overallcf % this.uPF == 0) {
      this.curFrame++;
    };

    if (this.curFrame >= this.fC) {
      this.curFrame = 0;
    };
  };
};
