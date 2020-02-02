const FRICTION        = 0.35,
      GRAVITY         = 4,
      LEVELS          = [],
      LEVELMAPS       = [],
      FORESPRITEMAPS  = [],
      BACKSPRITEMAPS  = [],
      GRIDSIZE        = 50,
      VIEWPORTWIDTH   = 1000,
      VIEWPORTHEIGHT  = 500,
      CONTROLLER      = 0,
      VIEWPORT        = {
        W:            VIEWPORTWIDTH,
        H:            VIEWPORTHEIGHT
      };

let   debug           = false,
      gamepads        = [],
      textline        = 0,
      gameloopvar     = null,
      gameoverloopvar = null,
      sicretry        = false;
      mouseinretry    = false;
