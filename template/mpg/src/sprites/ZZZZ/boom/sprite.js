var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('boom'),

  

    

    "spriteName" :  "boom" ,

    

  

    

    "y" :  620 ,

    

  

    

  

    

    "animateSpeed" :  0.1 ,

    

  

    

    "anchor.x" :  1 ,

    

  

    

    "scale.y" :  0.7 ,

    

  

    

    "x" :  320 ,

    

  

    

    "scale.x" :  0.7 ,

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getMc.apply(pixiLib,args);

  return mySprite;
}