const PLAYERSPRITES = {
        STILL_LEFT:     new Sprite('assets/img/player/char_still_l.png',256,512,1,1),
        STILL_RIGHT:    new Sprite('assets/img/player/char_still_r.png',256,512,1,1),
        WALK_LEFT:      new Sprite('assets/img/player/char_walk_l.png',256,512,4,3),
        WALK_RIGHT:     new Sprite('assets/img/player/char_walk_r.png',256,512,4,3),
        HEARTS:         new Sprite('assets/img/player/hearts.png',1408,256,5,1)
      };
const LEVELSPRITES = {
        THEME: {
          GROUND: [
            new Sprite('assets/img/theme/air.png',512,512,1,10), // Air (00)
            new Sprite('assets/img/theme/ground/sprite_00.png',512,512,1,10), // Ground Flat (01)
            new Sprite('assets/img/theme/ground/sprite_03.png',512,512,1,10), // Dirt (02)
            new Sprite('assets/img/theme/ground/sprite_01.png',512,512,1,10), // Upper-Right Corner In-Wall Ground (03)
            new Sprite('assets/img/theme/ground/sprite_02.png',512,512,1,10), // Upper-Left Corner In-Wall Ground (04)
            new Sprite('assets/img/theme/ground/sprite_04.png',512,512,1,10), // Left Clift (05)
            new Sprite('assets/img/theme/ground/sprite_05.png',512,512,1,10), // Right Clift (06)
            new Sprite('assets/img/theme/ground/sprite_06.png',512,512,1,10), // Tall Grass (07)
            null,
            new Sprite('assets/img/theme/ground/sprite_07.png',512,512,1,10),  // Right Grass (09)
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
            new Sprite('assets/img/theme/ground/sprite_23.png',512,512,1,10),  // Left Clift On Wall (25)
            new Sprite('assets/img/theme/ground/sprite_24.png',512,512,1,10),  // Left Clift No Drop (26)
            new Sprite('assets/img/theme/ground/sprite_25.png',512,512,1,10),  // Right Clift On Wall (27)
            new Sprite('assets/img/theme/ground/sprite_26.png',512,512,1,10),  // Right Clift No Drop (28)
            new Sprite('assets/img/theme/ground/sprite_27.png',512,512,1,10),  // Grass Full Cross (29)
            new Sprite('assets/img/theme/ground/sprite_28.png',512,512,1,10),  // Up fade to small (30)
            new Sprite('assets/img/theme/ground/sprite_29.png',512,512,1,10),  // Down fade to small (31)
            new Sprite('assets/img/theme/ground/sprite_30.png',512,512,1,10),  // Left fade to small (32)
            new Sprite('assets/img/theme/ground/sprite_31.png',512,512,1,10),  // Right fade to small (33)
            new Sprite('assets/img/theme/ground/sprite_32.png',512,512,1,10),  // Generic Block (34)
            new Sprite('assets/img/theme/ground/sprite_c_33.png',512,512,1,10), // Dark Dirt (35)
            new Sprite('assets/img/theme/ground/sprite_00.png',512,512,1,10,{shade:[{color:'#000',intensity:0.125,y:128,height:128},{color:'#000',intensity:0.25,y:256,height:128},{color:'#000',intensity:0.375,y:384,height:128}]}),  // Gradient Flat Ground (36)
            new Sprite('assets/img/theme/ground/sprite_04.png',512,512,1,10,{shade:[{color:'#000',intensity:0.125,y:128,x:0,height:32},{color:'#000',intensity:0.125,y:160,x:32,height:32},{color:'#000',intensity:0.125,y:192,x:0,height:64},{color:'#000',intensity:0.25,y:256,x:0,height:32},{color:'#000',intensity:0.25,y:288,x:32,height:32},{color:'#000',intensity:0.25,y:320,x:0,height:64},{color:'#000',intensity:0.375,y:384,x:0,height:32},{color:'#000',intensity:0.375,y:384+32,x:32,height:32},{color:'#000',intensity:0.375,y:384+64,x:0,height:64}]}) // Dark Left Clift (37)
          ]
        }
      };
