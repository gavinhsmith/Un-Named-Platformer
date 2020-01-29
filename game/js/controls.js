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
        H:            {C:false,ID:72}
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
        HOME:       {C:true,TYPE:0,ID:16},
        SLH:          {C:true,TYPE:1,ID:0,AD:0.5}
      },

      WII_CONTROLER = { // Nitendo Wii Controler
        B1:            {C:true,TYPE:0,ID:2},
        B2:            {C:true,TYPE:0,ID:0},
        DU:            {C:true,TYPE:0,ID:12},
        DL:            {C:true,TYPE:0,ID:14},
        DR:            {C:true,TYPE:0,ID:15},
        DD:            {C:true,TYPE:0,ID:13},
        START:         {C:true,TYPE:0,ID:9},
        SELECT:        {C:true,TYPE:0,ID:8}
      },

      BINDINGS = {
        JUMP:         [NS_CONTROLER.A,NS_CONTROLER.B,KEY.W,KEY.SPACE,KEY.UP],
        LEFT:         [WII_CONTROLER.DU,NS_CONTROLER.DL,NS_CONTROLER.SLH,KEY.A,KEY.LEFT],
        RIGHT:        [WII_CONTROLER.DD,NS_CONTROLER.DR,KEY.D,KEY.RIGHT],
        CROUCH:       [KEY.S,KEY.DOWN],
        RUN:          [NS_CONTROLER.X,NS_CONTROLER.Y,KEY.SHIFT],
        DEBUG:        [KEY.H]
      },

      KEYSTATE        = [];

function keycheck(nameArr) {
  for (var k in nameArr) {
    if (KEYSTATE[nameArr[k].ID] && !nameArr[k].C) {
      return {state:true};
    };
  };
  return {state:false};
};

function controlcheck(nameArr,index) {
  var gpd = navigator.getGamepads();
  for (var k in nameArr) {
    if (nameArr[k].C && nameArr[k].TYPE == 0 && gpd[index] && nameArr[k] != undefined) {
      if (gpd[index].buttons[nameArr[k].ID].pressed) {
        return {state:true};
      };
    } else if (nameArr[k].C && nameArr[k].TYPE == 1 && gpd[index] && nameArr[k] != undefined) {
      var tmp = gpd[index].axes[nameArr[k].ID];
      var state = (tmp >= nameArr[k].AC || tmp <= -nameArr[k].AC) ? true : false;
      var neg = (tmp >= 0) ? false : true;
      if (1 == 1) {
        return {state:state,val:Number(tmp),neg:neg};
      };
    };
  };
  return {state:false};
};

function inputcheck(nameArr) {
  var state = (keycheck(nameArr).state || controlcheck(nameArr,CONTROLLER).state) ? true : false;
  var val = (controlcheck(nameArr,CONTROLLER).val) ? controlcheck(nameArr,CONTROLLER).val : undefined;
  var neg = (controlcheck(nameArr,CONTROLLER).neg != undefined) ? controlcheck(nameArr,CONTROLLER).neg : null;
  return {state:state,val:val,neg:neg};
};
