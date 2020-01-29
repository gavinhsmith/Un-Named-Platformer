// 14x10 grid-spaces visible at one time;
class Level {
  constructor(name,layout,forespritemap,backspritemap,spawnx,spawny,gs) {
    this.name = name;
    this.width = layout[0].length;
    this.height = layout.length;
    this.layout = layout;
    this.forespritemap = forespritemap;
    this.backspritemap = backspritemap;
    this.sx = spawnx;
    this.sy = spawny;
    this.gs = gs;
    this.mw = this.width*this.gs;
    this.mh = this.height*this.gs;
    this.sprites = [
      new Sprite('assets/img/theme/air.png',512,512,1,10), // Air (00)
      new Sprite('assets/img/theme/ground/sprite_00.png',512,512,1,10), // Ground Flat (01)
      new Sprite('assets/img/theme/ground/sprite_03.png',512,512,1,10), // Dirt (02)
      new Sprite('assets/img/theme/ground/sprite_01.png',512,512,1,10), // Upper-Right Corner In-Wall Ground (03)
      new Sprite('assets/img/theme/ground/sprite_02.png',512,512,1,10),  // Upper-Left Corner In-Wall Ground (04)
      new Sprite('assets/img/theme/ground/sprite_04.png',512,512,1,10), // Left Clift (05)
      new Sprite('assets/img/theme/ground/sprite_05.png',512,512,1,10), // Right Clift (06)
      new Sprite('assets/img/theme/ground/sprite_06.png',512,512,1,10),  // Tall Grass (07)
      null,
      new Sprite('assets/img/theme/ground/sprite_07.png',512,512,1,10), // Right Grass (09)
      new Sprite('assets/img/theme/ground/sprite_08.png',512,512,1,10),  // Left Grass (10)
      new Sprite('assets/img/theme/ground/sprite_09.png',512,512,1,10),  // Full Grass (11)
      new Sprite('assets/img/theme/ground/sprite_10.png',512,512,1,10),  // Full G Down (12)
      new Sprite('assets/img/theme/ground/sprite_11.png',512,512,1,10),  // Full G Right (13)
      new Sprite('assets/img/theme/ground/sprite_12.png',512,512,1,10),  // Full G Up (14)
      new Sprite('assets/img/theme/ground/sprite_13.png',512,512,1,10),  // Full G Left (15)
      new Sprite('assets/img/theme/ground/sprite_14.png',512,512,1,10),  // Full G Line Hori (16)
      new Sprite('assets/img/theme/ground/sprite_15.png',512,512,1,10),  // Full G Line Diag (17)
      new Sprite('assets/img/theme/ground/sprite_17.png',512,512,1,10),  // Full G T Right (19)
      new Sprite('assets/img/theme/ground/sprite_16.png',512,512,1,10),  // Full G T Left (18)
      new Sprite('assets/img/theme/ground/sprite_18.png',512,512,1,10),  // Full G T Up (20)
      new Sprite('assets/img/theme/ground/sprite_19.png',512,512,1,10),  // Full G T Down (21)
      new Sprite('assets/img/theme/ground/sprite_20.png',512,512,1,10),  // Lower-Left Corner In-Wall Ground (22)
      new Sprite('assets/img/theme/ground/sprite_21.png',512,512,1,10),  // Lower-Right Corner In-Wall Ground (23)
      new Sprite('assets/img/theme/ground/sprite_22.png',512,512,1,10),  // Upside Down Flat (24)
    ];
  }
  getCollideObjs() {
    var rtn = [];
    for (var lvl0 in this.layout) {
      for (var lvl1 in this.layout[lvl0]) {
        if (this.layout[lvl0][lvl1] != 0) {
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
        this.sprites[db].draw(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height);
      };
    };
  }
  drawFG(ctx) {
    for (var lv0 in this.forespritemap) {
      for (var lv1 in this.forespritemap[lv0]) {
        var db = this.forespritemap[lv0][lv1];
        var rb = findGridRect(lv1,lv0,this.gs);
        if (db >= 1 && db != 8) {
          this.sprites[db].draw(ctx,rb.x+camera.x,rb.y+camera.y,rb.width,rb.height);
        };
      };
    };
  }
};
