class Player {
  constructor(x,y,width,height,spd,jumph) {
    this.x = x;
    this.y = y;
    this.sw = width;
    this.sh = 0.5*height;
    this.fw = width;
    this.fh = height;
    this.width = width;
    this.height = height;
    this.color = '#44f';
    this.speed = spd;
    this.dx = 0;
    this.dy = 0;
    this.sprites = [

    ];
    this.spritestilll = new Sprite('assets/img/char_still_l.png',256,512,1,1);
    this.spritestillr = new Sprite('assets/img/char_still_r.png',256,512,1,1);
    this.spritewalkl = new Sprite('assets/img/char_walk_l.png',256,512,4,3);
    this.spritewalkr = new Sprite('assets/img/char_walk_r.png',256,512,4,3);
    this.jmph = jumph;
    this.isJump = true;
    this.forceJump = false;
    this.isRun = false;
    this.isSmall = false;
    this.wasSmall = false;
    this.lives = 5;
    this.level = 0;
    this.djc = 0;
    this.facing = 1;
    this.isMoving = false;
  }
  draw(ctx) {
    ctx.save();
    //ctx.fillStyle = this.color;
    //ctx.fillRect(Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height)
    if (this.facing == 0 && !this.isMoving) {
      this.spritestilll.draw(ctx,this.x+camera.x,this.y+camera.y,this.width,this.height);
    } else if (this.facing == 1 && !this.isMoving) {
      this.spritestillr.draw(ctx,this.x+camera.x,this.y+camera.y,this.width,this.height);
    } else if (this.facing == 1 && this.isMoving) {
      this.spritewalkr.draw(ctx,this.x+camera.x,this.y+camera.y,this.width,this.height);
    } else if (this.facing == 0 && this.isMoving) {
      this.spritewalkl.draw(ctx,this.x+camera.x,this.y+camera.y,this.width,this.height);
    };
    ctx.restore();
  }
  resetmove() {
    this.dx = 0;
    this.dy = 0;
    this.isJump = true;
  }
  die(lvl) {
    this.lives--;
    this.resetmove();
    this.x = lvl.sx-(this.width/2);
    this.y = lvl.sy-(this.height/2);
  }
  nextlvl() {
    this.level++;
    this.resetmove();
    this.x = LEVELS[this.level].sx-(this.width/2);
    this.y = LEVELS[this.level].sy-(this.height/2);
  };
  prevlvl() {
    this.level--;
    this.resetmove();
    this.x = LEVELS[this.level].sx-(this.width/2);
    this.y = LEVELS[this.level].sy-(this.height/2);
  };
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
    if (inputcheck(BINDINGS.LEFT).state) {
      this.dx -= inputcheck(BINDINGS.LEFT).val*this.speed;
    };
    if (inputcheck(BINDINGS.RIGHT).state) {
      this.dx += inputcheck(BINDINGS.RIGHT).val*this.speed;
    };
    if (inputcheck(BINDINGS.JUMP).state && !this.isJump) {
      this.dy -= /*(this.isSmall) ? 0.5*this.jmph : */this.jmph;
      this.isJump = true;
    };
    if (inputcheck(BINDINGS.RUN).state) {
      this.isRun = true;
    };

    if (inputcheck(BINDINGS.D_NEXTLEVEL).state && this.djc <= 0) {
      this.djc = 10;
      this.nextlvl();
    };
    if (inputcheck(BINDINGS.D_PREVLEVEL).state && this.djc <= 0) {
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

    if (this.dx >= 0.01) {
      for (var i = 0.1; i < this.dx; i++) {
        this.x += 1;
        this.facing = 1;
        this.isMoving = true;

        for (var b in objlist) {
          if (checkIfRectOverlap(this,objlist[b])) {
            this.x -= 1;
            this.dx = 0;
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
  collideWall(lv,ctx) {
    if (this.x < 0) {
      this.dx = 0;
      this.x = 0;
    };
    if (this.x+this.width > lv.mw) {
      this.dx = 0;
      this.x = lv.mw-this.width;
    };
    if (this.y < 0) {
      this.dy = 0;
      this.y = 0;
    };
    if (this.y-this.height > lv.mh) {
      this.dy = 0;
      this.die(lv);
      this.isJump = false;
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
