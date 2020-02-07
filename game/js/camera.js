const camera = {
  x: 0,
  y: 0,
  update: function (viewport,map,player) {
    this.x = Math.clamp(
      -(player.x+(player.width/2)) + viewport.W/2,
      viewport.W - map.mw,
      0
    );
    this.y = Math.clamp(
      -(player.y+(player.height/2)) + viewport.H/2,
      viewport.H - map.mh,
      0
    );
  },
  rect: function (viewport) {
    return {
      x: -this.x,
      y: -this.y,
      width: viewport.W,
      height: viewport.H
    }
  }
};
