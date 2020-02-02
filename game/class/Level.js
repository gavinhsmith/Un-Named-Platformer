// 14x10 grid-spaces visible at one time;
const Level = class {
  constructor(name,layout,forespritemap,backspritemap,gs) {
    this.name = name;
    this.width = layout[0].length;
    this.height = layout.length;
    this.layout = layout;
    this.forespritemap = forespritemap;
    this.backspritemap = backspritemap;
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
    this.sprites = LEVELSPRITES.THEME.GROUND;
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
  drawBG(ctx) {
    for (var lv0 in this.backspritemap) {
      for (var lv1 in this.backspritemap[lv0]) {
        var db = this.backspritemap[lv0][lv1];
        var rb = findGridRect(lv1,lv0,this.gs);
        this.sprites[0].update(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height);
        if (db != 0) {
          this.sprites[db].update(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height);
        };
      };
    };
  }
  drawFG(ctx) {
    for (var lv0 in this.forespritemap) {
      for (var lv1 in this.forespritemap[lv0]) {
        var db = this.forespritemap[lv0][lv1];
        var rb = findGridRect(lv1,lv0,this.gs);
        if (db >= 1 && db != 8) {
          this.sprites[db].update(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height);
        };
      };
    };
  }
};
