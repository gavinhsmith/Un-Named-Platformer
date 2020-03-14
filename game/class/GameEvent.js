const GameEvent = class {
  static turnon(name) {
    for (var spo in EVENTS) {
      if (EVENTS[spo].name = name) {
        EVENTS[spo].active = true;
        return EVENTS[spo];
      };
    };
  }
  static turnoff(name) {
    for (var spo in EVENTS) {
      if (EVENTS[spo].name = name) {
        EVENTS[spo].active = false;
        return EVENTS[spo];
      };
    };
  }
  static trig(name) {
    for (var spo in EVENTS) {
      if (EVENTS[spo].name = name) {
        EVENTS[spo].active = !EVENTS[spo].active;
        return EVENTS[spo];
      };
    };
  }
  static get(name) {
    for (var spo in EVENTS) {
      if (EVENTS[spo].name = name) {
        return EVENTS[spo];
      };
    };
  }
};
