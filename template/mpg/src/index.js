var pixiLib = require('pixi-lib');

var render = pixiLib.createRender(document.body);

var scenesLoader = require.context('./scenes/');

scenesLoader.keys().filter(function(key){
  return /index\.js/.test(key);
}).map(function (key, i) {

  var sceneStart = scenesLoader(key);

  window['scene' + i] = function (render) {
    sceneStart(render);
  }
});

window.scene0(render);