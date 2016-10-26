var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('sheren'),

  

    

    "spriteName" :  "sheren" ,

    

  
}]



  args.push([

    

      1,

    

      3,

    

      7,

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getSp.apply(pixiLib,args);

  return mySprite;
}