var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('fuck_him'),

  

    

    "spriteName" :  "fuck_him" ,

    

  

    

    "scale.y" :  0.5 ,

    

  

    

    "y" :  300 ,

    

  

    

    "x" :  100 ,

    

  

    

    "scale.x" :  0.5 ,

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getMc.apply(pixiLib,args);

  return mySprite;
}