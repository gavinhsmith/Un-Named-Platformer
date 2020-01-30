class Wall {
  constructor(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = '#4f4';
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height)
    ctx.restore();
  }
  update(ctx) {
    this.draw(ctx);
  }
}
