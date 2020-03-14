const Entity = class {
  static list = [];
  static resetall() {
    for (var spog in Entity.list) {
      Entity.list[spog].x = Entity.list[spog].defx;
      Entity.list[spog].y = Entity.list[spog].defy;
      Entity.list[spog].dx = 0;
      Entity.list[spog].dy = 0;
      Entity.list[spog].ai.reset();
    };
  }
  constructor(x,y,width,height,speed,jumph,playerlevel,ai,type) {
    this.x =              x;
    this.y =              y;
    this.defx =           x;
    this.defy =           y;
    this.width =          width;
    this.height =         height;
    this.speed =          speed;
    this.pl =             playerlevel;
    this.dx =             0;
    this.dy =             0;
    this.facing =         1;
    this.isMoving =       false;
    this.color =          Random.color();
    this.jmph =           jumph;
    this.isJump =         true;
    this.forceJump =      false;
    this.isRun =          false;
    this.uuid =           SHA256(String(Math.floor(Math.random()*Math.random()*100)));
    this.ai =             new EntityAI(ai);
    this.type = type;

    this.sprites =        {
        walkleft: ASSETS.SPRITES.ENEMIES.PLACEHOLDER.WALK_LEFT,
        walkright: ASSETS.SPRITES.ENEMIES.PLACEHOLDER.WALK_RIGHT,
        stillleft: ASSETS.SPRITES.ENEMIES.PLACEHOLDER.STILL_LEFT,
        stillright: ASSETS.SPRITES.ENEMIES.PLACEHOLDER.STILL_RIGHT
    }

    Entity.list[Entity.list.length] = this;
  }
  draw(ctx) {
    ctx.save();
    //ctx.fillStyle = this.color;
    //ctx.fillRect(this.x+camera.x,this.y+camera.y,this.width,this.height);
    if (this.facing == 0 && !this.isMoving) {
      this.sprites.stillleft.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height,undefined);
    } else if (this.facing == 1 && !this.isMoving) {
      this.sprites.stillright.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height,undefined);
    } else if (this.facing == 1 && this.isMoving) {
      this.sprites.walkright.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height,undefined);
    } else if (this.facing == 0 && this.isMoving) {
      this.sprites.walkleft.update(ctx,Math.floor(this.x+camera.x),Math.floor(this.y+camera.y),this.width,this.height,undefined);
    };
    ctx.restore();
  };
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
  die() {
    for (var k in Entity.list) {
      if (Entity.list[k] != null | undefined) {
        if (Entity.list[k].uuid = this.uuid) {
          delete Entity.list[k];
          return;
        }
      };
    };
  };
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
  premove() {
    this.isMoving = false;
  }
  moveright() {
    this.dx += this.speed;
  }
  moveleft() {
    this.dx -= this.speed;
  }
  jump() {
    this.dy -= this.jmph;
  }
  move() {
    if (this.ai.check('right')) {
      this.moveright();
    }
    if (this.ai.check('left')) {
      this.moveleft();
    }
    if (player1.isJump && !this.isJump) {
      this.jump();
    };
  }
  postmove(fri,grav,objlist) {
    this.dx *= fri;
    this.dy += grav;
    this.isJump = true;
    this.collideObj(objlist);
  }
  update(ctx,fri,grav,lvl,playerlevel) {
    if (this.pl == playerlevel) {
      this.ai.update();
      this.premove();
      this.move();
      this.postmove(fri,grav,lvl.getCollideObjs());
      this.collideWall(lvl,ctx);
      this.draw(ctx);
    };
  }
};
