const JSONLevel = class {
  static info(json) {
    var p = JSON.parse(json);
    var o = {
      name: p.name,
      theme: p.theme,
      layout: p.coli,
      forespritemap: p.sfore,
      backspritemap: p.sback,
      gs: GRIDSIZE,
      entities: p.entities
    };
    return o;
  };
  static create(id,json) {
    var p = JSONLevel.info(json);
    LEVELS[id] = new Level(p.name,p.theme,JSON.parse(p.layout),JSON.parse(p.forespritemap),JSON.parse(p.backspritemap),p.gs,p.entities,id);
  };
};
