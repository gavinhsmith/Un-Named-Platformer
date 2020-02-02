const spritecashe = [];

const SpriteCasheEntry = class {
  constructor(dataUrl,settings) {
    this.du = dataUrl;
    this.set = settings;
  }
};

function updatestoredcashe(data) {
  spritecashe[spritecashe.length] = data;
};

const Sprite = class {
  constructor(src,spriteWidth,spriteHeight,frames,updatePerFrames,styles) {
    this.img = new Image();
    this.img.src = src;
    this.curFrame = 0;
    this.sW = spriteWidth;
    this.sH = spriteHeight;
    this.uPF = updatePerFrames;
    this.fC = frames;
    this.overallcf = 0;
    this.styles = styles;
    if (styles == undefined | null) {
      this.styles = false;
    };
  }
  parsestyles() {
    if (this.styles == false) {
      return this.img;
    };
    for (var sc in spritecashe) {
      if (JSON.stringify(spritecashe[sc].set) == JSON.stringify(this.styles)) {
        var returnimg = new Image();
        returnimg.src = spritecashe[sc].du;
        return returnimg;
      };
    };
    var tempc = document.createElement('canvas');
    tempc.width = this.sW*(this.img.width/this.sW);
    tempc.height = this.sH;
    var tempctx = tempc.getContext('2d');

    tempctx.drawImage(this.img,0,0,tempc.width,tempc.height,0,0,tempc.width,tempc.height);

    if (this.styles.shade) {
      for (var i in this.styles.shade) {
        tempctx.save();
        tempctx.fillStyle = this.styles.shade[i].color;
        tempctx.globalAlpha = this.styles.shade[i].intensity;
        tempctx.fillRect((typeof this.styles.shade[i].x == 'number' || this.styles.shade[i].x == -1) ? this.styles.shade[i].x : 0,(typeof this.styles.shade[i].y == 'number' || this.styles.shade[i].y == -1) ? this.styles.shade[i].y : 0,(typeof this.styles.shade[i].width == 'number' || this.styles.shade[i].width == -1) ? this.styles.shade[i].width : tempc.width,(typeof this.styles.shade[i].height == 'number' || this.styles.shade[i].height == -1) ? this.styles.shade[i].height : tempc.height);
        tempctx.restore();
      };
    };

    var returnimg = new Image();
    returnimg.src = tempc.toDataURL();

    updatestoredcashe(new SpriteCasheEntry(returnimg.src,this.styles));

    return returnimg;
  }
  updatestate() {
    this.overallcf++;

    if (this.overallcf % this.uPF == 0) {
      this.curFrame++;
    };

    if (this.curFrame >= this.fC) {
      this.curFrame = 0;
    };
  }
  draw(ctx,x,y,width,height) {
    var drawImage = this.parsestyles();
    ctx.save();
    ctx.drawImage(drawImage,this.sW*this.curFrame,0,this.sW,this.sH,x,y,width,height);
    ctx.restore();
  }
  update(ctx,x,y,width,height) {
    this.draw(ctx,x,y,width,height);
    this.updatestate();
  }
  getSRC() {
    return this.parsestyles().src;
  };
}
