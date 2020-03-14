const Random = class {
  static color() {
    var char = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    var out = '#';
    for (var i = 0; i < 6; i++) {
      var n = Random.number(0,char.length)
      if (n >= char.length) n = char.length-1;
      out += char[n];
    };
    return out;
  }
  static number(min,max) {
    var num = Math.random();
    num *= max-min;
    num += min;
    return Number(Math.floor(num));
  }
};
