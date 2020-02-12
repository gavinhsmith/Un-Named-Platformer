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
  parsestyles(as) {
    if (this.styles == false && as == undefined) {
      return this.img;
    };
    for (var sc in spritecashe) {
      if (JSON.stringify(spritecashe[sc].set) == JSON.stringify(this.styles) || JSON.stringify(spritecashe[sc].set) == JSON.stringify(as)) {
        var returnimg = new Image();
        returnimg.src = spritecashe[sc].du;
        return returnimg;
      };
    };

    var tempc = document.createElement('canvas');
    tempc.width = this.sW*(this.img.width/this.sW);
    tempc.height = this.sH;
    var tempctx = tempc.getContext('2d');

    if (typeof this.styles.opacity == 'number') {
      tempctx.globalAlpha = this.styles.opacity;
    };
    if (typeof as.opacity == 'number') {
      tempctx.globalAlpha = as.opacity;
    };

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

    if (as.shade) {
      for (var i in as.shade) {
        tempctx.save();
        tempctx.fillStyle = as.shade[i].color;
        tempctx.globalAlpha = as.shade[i].intensity;
        tempctx.fillRect((typeof as.shade[i].x == 'number' || as.shade[i].x == -1) ? as.shade[i].x : 0,(typeof as.shade[i].y == 'number' || as.shade[i].y == -1) ? as.shade[i].y : 0,(typeof as.shade[i].width == 'number' || as.shade[i].width == -1) ? as.shade[i].width : tempc.width,(typeof as.shade[i].height == 'number' || as.shade[i].height == -1) ? as.shade[i].height : tempc.height);
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
  setstate(overall,cframe) {
    this.overallcf = overall;
    this.curFrame = cframe;
  };
  draw(ctx,x,y,width,height,as) {
    var drawImage = this.parsestyles(as);
    ctx.save();
    ctx.drawImage(drawImage,this.sW*this.curFrame,0,this.sW,this.sH,x,y,width,height);
    ctx.restore();
  }
  getFrame(frame) {
    var img = this.parsestyles();
    var tempc = document.createElement('canvas');
    var tempctx = tempc.getContext('2d');
    tempc.width = this.sW;
    tempc.height = this.sH;
    tempctx.drawImage(img,this.sW*frame,0,tempc.width,tempc.height,0,0,tempc.width,tempc.height);
    var newImg = new Image(this.sW,this.sH);
    newImg.src = tempc.toDataURL();
    return newImg;
  }
  update(ctx,x,y,width,height,as) {
    this.draw(ctx,x,y,width,height,as);
    this.updatestate();
  }
  getSRC() {
    return this.parsestyles().src;
  };
}
