const Enemy = class extends Entity {
  static enemyai = {
    Goblin: [new EntityMovement('right',30,false,{time:60}),,new EntityMovement('jump1',0,false,{time:10}),new EntityMovement('left',30,false,{time:60}),new EntityMovement('jump2',0,false,{time:10})]
  };
  static enemymovefunc = {
    Goblin: function () {
      if (this.ai.check('right')) {
        this.moveright();
      }
      if (this.ai.check('left')) {
        this.moveleft();
      }
      if (this.ai.check('jump1') && !this.isJump) {
        this.jump();
      };
      if (this.ai.check('jump2') && !this.isJump) {
        this.jump();
      };
    }
  };
  static enemysprites = {
    Goblin: {
      walkleft: ASSETS.SPRITES.ENEMIES.GOBLIN.WALK_LEFT,
      walkright: ASSETS.SPRITES.ENEMIES.GOBLIN.WALK_RIGHT,
      stillleft: ASSETS.SPRITES.ENEMIES.GOBLIN.STILL_LEFT,
      stillright: ASSETS.SPRITES.ENEMIES.GOBLIN.STILL_RIGHT
    }
  };
  static Goblin(x,y,lvl) {
    return new Enemy(x,y,50,50,10,20,lvl,Enemy.enemyai.Goblin,'Goblin',Enemy.enemymovefunc.Goblin,Enemy.enemysprites.Goblin);
  };
  constructor(x,y,width,height,speed,jumph,lvl,ai,name,movefunc,sprites) {
    super(x,y,width,height,speed,jumph,lvl,ai,'bad');
    this.name = name;
    this.move = movefunc;
    this.sprites = sprites;
  };
};
