function checkIfRectOverlap(r1,r2) {
  return r1.x < r2.x + r2.width
  && r2.x < r1.x + r1.width
  && r1.y < r2.y + r2.height
  && r2.y < r1.y + r1.height;
};
function findGridRect(x,y,size) {
  return {
    x: x*size,
    y: y*size,
    width: size,
    height: size
  };
};
