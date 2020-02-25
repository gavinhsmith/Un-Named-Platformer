const KEY = { // Keyboard Codes
        W:            {C:false,ID:87},
        A:            {C:false,ID:65},
        S:            {C:false,ID:83},
        D:            {C:false,ID:68},
        UP:           {C:false,ID:38},
        LEFT:         {C:false,ID:37},
        DOWN:         {C:false,ID:40},
        RIGHT:        {C:false,ID:39},
        SPACE:        {C:false,ID:32},
        SHIFT:        {C:false,ID:16},
        H:            {C:false,ID:72},
        PLUS:         {C:false,ID:187},
        MINUS:        {C:false,ID:189},
        J:            {C:false,ID:74},
        ESC:          {C:false,ID:27}
      },

      NS_CONTROLER = { // Nintendo Switch Controler
        A:            {C:true,TYPE:0,ID:1},
        B:            {C:true,TYPE:0,ID:0},
        X:            {C:true,TYPE:0,ID:3},
        Y:            {C:true,TYPE:0,ID:2},
        DL:           {C:true,TYPE:0,ID:14},
        DU:           {C:true,TYPE:0,ID:12},
        DR:           {C:true,TYPE:0,ID:15},
        DD:           {C:true,TYPE:0,ID:13},
        START:        {C:true,TYPE:0,ID:9},
        SELECT:       {C:true,TYPE:0,ID:8},
        HOME:         {C:true,TYPE:0,ID:16},
        USHLEFT:      {C:true,TYPE:1,ID:0,AD:0.2,NEG:true},
        USHRIGHT:     {C:true,TYPE:1,ID:0,AD:0.2,NEG:false}
      },

      WII_CONTROLER = { // Nitendo Wii Controler
        B1:            {C:true,TYPE:0,ID:2},
        B2:            {C:true,TYPE:0,ID:0},
        A:             {C:true,TYPE:0,ID:1},
        B:             {C:true,TYPE:0,ID:3},
        DU:            {C:true,TYPE:0,ID:12},
        DL:            {C:true,TYPE:0,ID:14},
        DR:            {C:true,TYPE:0,ID:15},
        DD:            {C:true,TYPE:0,ID:13},
        START:         {C:true,TYPE:0,ID:9},
        SELECT:        {C:true,TYPE:0,ID:8}
      },

      BINDINGS = {
        JUMP:         [NS_CONTROLER.A,NS_CONTROLER.B,KEY.W,KEY.SPACE,KEY.UP],
        LEFT:         [WII_CONTROLER.DU,NS_CONTROLER.DL,NS_CONTROLER.USHLEFT,KEY.A,KEY.LEFT],
        RIGHT:        [WII_CONTROLER.DD,NS_CONTROLER.DR,NS_CONTROLER.USHRIGHT,KEY.D,KEY.RIGHT],
        CROUCH:       [KEY.S,KEY.DOWN],
        RUN:          [NS_CONTROLER.X,NS_CONTROLER.Y,KEY.SHIFT],
        DEBUG:        [KEY.H],
        UNDEBUG:      [KEY.J],
        D_NEXTLEVEL:  [KEY.PLUS,NS_CONTROLER.START],
        D_PREVLEVEL:  [KEY.MINUS,NS_CONTROLER.SELECT],
        PAUSE:        [KEY.ESC,NS_CONTROLER.HOME]
      },

      KEYSTATE        = [];

function keycheck(nameArr) {
  for (var k in nameArr) {
    if (!nameArr[k].C && KEYSTATE[nameArr[k].ID]) {
      return {state:true};
    };
  };
  return {state:false};
};

function controlcheck(nameArr,index) {
  var gpd = gamepads;
  for (var k in nameArr) {
    if (nameArr[k].C && nameArr[k].TYPE == 0 && gpd[index] && nameArr[k] != undefined) {
      if (gpd[index].buttons[nameArr[k].ID] != undefined) {
        if (gpd[index].buttons[nameArr[k].ID].pressed) {
          return {state:true};
        };
      }
      
    } else if (nameArr[k].C && nameArr[k].TYPE == 1 && gpd[index] && nameArr[k] != undefined) {
      var tmp = Number(gpd[index].axes[nameArr[k].ID]);
      var state;
      var neg = nameArr[k].NEG;
      if (tmp == NaN) tmp = 0;
      if (neg) state = (tmp < -nameArr[k].AD) ? true : false;
      if (!neg) state = (tmp > nameArr[k].AD) ? true : false;
      if (neg) tmp = -tmp;
      if (state) {
        return {state:state,val:Number(tmp),neg:neg};
      };
    };
  };
  return {state:false};
};

function inputcheck(nameArr,index) {
  var state = (keycheck(nameArr).state || controlcheck(nameArr,index).state) ? true : false;
  var val = (controlcheck(nameArr,index).val != null) ? controlcheck(nameArr,index).val : ((state) ? 1 : 0);
  var neg = (controlcheck(nameArr,index).neg != undefined) ? controlcheck(nameArr,index).neg : ((val < 0) ? true : false);
  return new InputState(state,val,neg);
};
