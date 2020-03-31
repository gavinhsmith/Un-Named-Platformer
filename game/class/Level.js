// 20x10 grid-spaces visible at one time;
const Level = class {
  constructor(name,theme,layout,forespritemap,backspritemap,gs,entities,lvlid) {
    this.name = name;
    this.theme = theme;
    this.width = layout[0].length;
    this.height = layout.length;
    this.layout = layout;
    this.forespritemap = forespritemap;
    this.backspritemap = backspritemap;
    this.entities = entities;
    this.lvlid = lvlid;
    this.gs = gs;

    for (var lv0 in this.layout) {
      var breaktest = false;
      for (var lv1 in this.layout[lv0]) {
        if (this.layout[lv0][lv1] == 2) {
          var rect = findGridRect(lv1,lv0,this.gs);
          this.sx = rect.x+(rect.width/2);
          this.sy = rect.y-10;
          breaktest = true;
          break;
        };
      };
      if (breaktest) break;
    };

    for (var lv5 in this.entities) {
      if (this.entities[lv5].name == 'goblin') {
        var entityrect = findGridRect(this.entities[lv5].x,this.entities[lv5].y,GRIDSIZE);
        var entityx = entityrect.x;
        var entityy = entityrect.y;
        Enemy.Goblin(entityx,entityy,this.lvlid);
      };
    };

    for (var lv0 in this.layout) {
      var breaktest = false;
      for (var lv1 in this.layout[lv0]) {
        if (this.layout[lv0][lv1] == 3) {
          var rect = findGridRect(lv1,lv0,this.gs);
          this.ex = rect.x+(rect.width/2);
          this.ey = rect.y+(rect.height/2);
          breaktest = true;
          break;
        };
      };
      if (breaktest) break;
    };

    this.mw = this.width*this.gs;
    this.mh = this.height*this.gs;
    if (theme == 'ground' || theme == "test") {
      this.sprites = ASSETS.SPRITES.LEVEL.THEME.GROUND;
      this.audio = ASSETS.AUDIO.THEME.GROUND;
    } else if (theme == 'cave') {
      this.sprites = ASSETS.SPRITES.LEVEL.THEME.CAVE;
      this.audio = ASSETS.AUDIO.THEME.CAVE;
    };
  }
  getCollideObjs() {
    var rtn = [];
    for (var lvl0 in this.layout) {
      for (var lvl1 in this.layout[lvl0]) {
        if (this.layout[lvl0][lvl1] == 1) {
          rtn[rtn.length] = findGridRect(lvl1,lvl0,this.gs);
        };
      };
    };
    return rtn;
  }
  getFlagObjs() {
    for (var lvl0 in this.layout) {
      for (var lvl1 in this.layout[lvl0]) {
        if (this.layout[lvl0][lvl1] == 3) {
          return findGridRect(lvl1,lvl0,this.gs);
        };
      };
    };
    return {
      x: -50,
      y: -50,
      width: 10,
      height: 10
    };
  }
  drawBG(ctx) {
    for (var lv0 in this.backspritemap) {
      for (var lv1 in this.backspritemap[lv0]) {
        var db = this.backspritemap[lv0][lv1];
        var rb = findGridRect(lv1,lv0,this.gs);
        if (this.theme == 'cave') {
          this.sprites[35].update(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height,undefined);
        } else {
          this.sprites[0].update(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height,undefined);
        };

        if (db != 0 && checkIfRectOverlap(camera.rect(VIEWPORT),rb)) {
          this.sprites[db].update(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height,undefined);
        };
      };
    };
    for (var lv0 in this.layout) {
      for (var lv1 in this.layout[lv0]) {
        var db = this.layout[lv0][lv1];
        var rb = findGridRect(lv1,lv0,this.gs);
        if (db == 3) {
          ASSETS.SPRITES.END_GATE.update(ctx,(rb.x-(rb.width/2)-(rb.width/4))+camera.x,(rb.y-(rb.height*1.5))+camera.y,rb.width*2.5,rb.height*2.5,undefined);
        };
      };
    };
  }
  drawFG(ctx) {
    for (var lv0 in this.forespritemap) {
      for (var lv1 in this.forespritemap[lv0]) {
        var db = this.forespritemap[lv0][lv1];
        var rb = findGridRect(lv1,lv0,this.gs);
        if (db >= 1 && db != 8 && checkIfRectOverlap(camera.rect(VIEWPORT),rb)) {
          this.sprites[db].update(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height,undefined);
        };
      };
    };
  }
};
