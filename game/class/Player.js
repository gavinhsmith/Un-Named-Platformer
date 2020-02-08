const Player = class {
  constructor(x,y,width,height,spd,jumph,controler) {
    this.x =              x;
    this.y =              y;
    this.sw =             width;
    this.sh =             0.5*height;
    this.fw =             width;
    this.fh =             height;
    this.width =          width;
    this.height =         height;
    this.color =          '#44f';
    this.speed =          spd;
    this.dx =             0;
    this.dy =             0;
    this.spritestilll =   ASSETS.SPRITES.PLAYER.STILL_LEFT;
    this.spritestillr =   ASSETS.SPRITES.PLAYER.STILL_RIGHT;
    this.spritewalkl =    ASSETS.SPRITES.PLAYER.WALK_LEFT;
    this.spritewalkr =    ASSETS.SPRITES.PLAYER.WALK_RIGHT;
    this.spritehearts =   ASSETS.SPRITES.PLAYER.HEARTS;
    this.jmph =           jumph;
    this.isJump =         true;
    this.forceJump =      false;
    this.isRun =          false;
    this.isSmall =        false;
    this.wasSmall =       false;
    this.lives =          5;
    this.level =          0;
    this.djc =            0;
    this.facing =         1;
    this.isMoving =       false;
    this.controler =      controler;
    this.debugOLC =       '#00f';
    this.pause =          false;
  }
  draw(ctx) {
    ctx.save();
    //ctx.fillStyle = this.color;
    //ctx.fillRect(Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height)
    if (this.facing == 0 && !this.isMoving) {
      this.spritestilll.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height);
    } else if (this.facing == 1 && !this.isMoving) {
      this.spritestillr.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height);
    } else if (this.facing == 1 && this.isMoving) {
      this.spritewalkr.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height);
    } else if (this.facing == 0 && this.isMoving) {
      this.spritewalkl.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height);
    };

    if (debug) {
      ctx.strokeStyle = this.debugOLC;
      ctx.strokeRect(Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height);
    }

    ctx.restore();
  }
  resetmove() {
    this.dx = 0;
    this.dy = 0;
    this.isJump = true;
  }
  die(lvl) {
    this.lives--;
    this.spritehearts.updatestate();
    this.resetmove();
    this.x = lvl.sx-(this.width/2);
    this.y = lvl.sy-(this.height/2);
  }
  nextlvl() {
    if (!LEVELS[this.level+1]) return;
    if (LEVELS[this.level].theme != LEVELS[this.level+1].theme) {
      LEVELS[this.level].audio.main.stop();
    }
    this.level++;
    if (LEVELS[this.level].theme != LEVELS[this.level-1].theme) {
      LEVELS[this.level].audio.main.play();
    }
    this.resetmove();
    this.x = LEVELS[this.level].sx-(this.width/2);
    this.y = LEVELS[this.level].sy-(this.height/2);
  };
  setlvl(lvl) {
    if (!LEVELS[lvl]) return;
    var oldlvl = this.level;
    if (LEVELS[this.level].theme != LEVELS[lvl].theme) {
      LEVELS[this.level].audio.main.stop();
    }
    this.level = lvl;
    if (LEVELS[this.level].theme != LEVELS[oldlvl].theme) {
      LEVELS[this.level].audio.main.play();
    }
    this.resetmove();
    this.x = LEVELS[this.level].sx-(this.width/2);
    this.y = LEVELS[this.level].sy-(this.height/2);
  };
  prevlvl() {
    if (!LEVELS[this.level-1]) return;
    if (LEVELS[this.level].theme != LEVELS[this.level-1].theme) {
      LEVELS[this.level].audio.main.stop();
    }
    this.level--;
    if (LEVELS[this.level].theme != LEVELS[this.level+1].theme) {
      LEVELS[this.level].audio.main.play();
    }
    this.resetmove();
    this.x = LEVELS[this.level].sx-(this.width/2);
    this.y = LEVELS[this.level].sy-(this.height/2);
  };
  reset() {
    this.setlvl(0);
    this.lives = 5;
    this.spritehearts.setstate(0,0);
    this.facing = 1;
    this.resetmove();
  }
  collideObj(objlist) {
    if (this.dx >= 0.01) {
      for (var i = 0.1; i < this.dx; i++) {
        this.x += 1;
        this.facing = 1;
        this.isMoving = true;

        for (var b in objlist) {
          if (checkIfRectOverlap(this,objlist[b])) {
            this.x -= 1;
            this.dx = 0;
            this.isMoving = false;
          };
        };

      };
    } else {
      for (var i = this.dx; i < -0.1; i++) {
        this.x -= 1;
        this.facing = 0;
        this.isMoving = true;

        for (var b in objlist) {
          if (checkIfRectOverlap(this,objlist[b])) {
            this.x += 1;
            this.dx = 0;
            this.isMoving = false;
          };
        };

      };
    };

    if (this.dy >= 0) {
      for (var i = 0.1; i < this.dy; i++) {
        this.y += 1;

        for (var b in objlist) {
          if (checkIfRectOverlap(this,objlist[b])) {
            this.y -= 1;
            this.dy = 0;
            this.forceJump = true;
          };
        };

      };
    } else {
      for (var i = this.dy; i < -0.1; i++) {
        this.y -= 1;

        for (var b in objlist) {
          if (checkIfRectOverlap(this,objlist[b])) {
            this.y += 1;
            this.dy = 0;
          };
        };

      };
    };
  }
  move(fri,grav,objlist) {
    this.isRun = false;
    this.isMoving = false;
    var joystickdeadzone = 0.1;
    /*
    this.isSmall = false;
    if (inputcheck(BINDINGS.CROUCH)) {
      this.isSmall = true;
      this.wasSmall = true;
    };
    */
    if (inputcheck(BINDINGS.LEFT,this.controler).state) {
      this.dx -= inputcheck(BINDINGS.LEFT,this.controler).val*this.speed;
    };
    if (inputcheck(BINDINGS.RIGHT,this.controler).state) {
      this.dx += inputcheck(BINDINGS.RIGHT,this.controler).val*this.speed;
    };
    if (inputcheck(BINDINGS.JUMP,this.controler).state && !this.isJump) {
      this.dy -= /*(this.isSmall) ? 0.5*this.jmph : */this.jmph;
      this.isJump = true;
    };
    if (inputcheck(BINDINGS.RUN,this.controler).state) {
      this.isRun = true;
    };
    if (inputcheck(BINDINGS.PAUSE,this.controler).state) {
      this.pause = true;
    };

    if (inputcheck(BINDINGS.D_NEXTLEVEL,this.controler).state && this.djc <= 0) {
      this.djc = 10;
      this.nextlvl();
    };
    if (inputcheck(BINDINGS.D_PREVLEVEL,this.controler).state && this.djc <= 0) {
      this.djc = 10;
      this.prevlvl();
    };
    /*
    if (inputcheck([NS_CONTROLER.HOME])) {
      navigator.getGamepads()[0].vibrate(1000,1);
    };
    */

    this.isJump = true;
    this.dy += grav;

    this.dx *= /*(this.isSmall) ? 0.4*fri : */((this.isRun) ? 1.4*fri : fri);

    /* (DECAPRIATED) Crouching
    if (this.isSmall) {
      this.width = this.sw;
      this.height = this.sh;
    } else {
      //this.y -= this.sh;
      this.width = this.fw;
      this.height = this.fh;
    }
    */

    this.wasSmall = false;

    this.collideObj(objlist);
  }
  collideWall(lv,ctx) {
    if (this.x < 0) {
      this.dx = 0;
      this.x = 0;
      this.isMoving = false;
    };
    if (this.x+this.width > lv.mw) {
      this.dx = 0;
      this.x = lv.mw-this.width;
      this.isMoving = false;
    };
    if (this.y < 0) {
      this.dy = 0;
      this.y = 0;
    };
    if (this.y-this.height > lv.mh) {
      this.die(lv);
    };
    if (this.forceJump) {
      this.isJump = false;
      this.forceJump = false;
    }
  }
  update(ctx,fri,grav,lvl) {
    this.move(fri,grav,lvl.getCollideObjs());
    this.djc--;
    this.collideWall(lvl,ctx);
    this.draw(ctx);
  }
};
