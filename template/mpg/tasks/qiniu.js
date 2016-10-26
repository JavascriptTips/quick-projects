/**
 * Created by zyg on 15/11/10.
 */
var path = require('path');
var qnUpload = require('gulp-qiniu');

var src = path.resolve(__dirname,'../public/sprites/*/*.png');

var audioSrc = path.resolve(__dirname,'../public/audio/*');

var optionDir = 'wx';

module.exports = function(gulp){
  gulp.task('qiniu',function(){
    gulp.src(src).pipe(qnUpload({
      accessKey: "EyEwm6Bjadr4ojSFxpKWt6k-PoyT99D5l_qMCEaL",
      secretKey: "xOUHlBygVg_dIxPcgWmEVu7GG5jl_XVQ57mrV7o0",
      bucket: "guoshencheng",
      private: false
    },{
      dir:optionDir,
      versionFile: './cdn.json'
    }))
  });
  //gulp.task('qiniu',function(){
  //  gulp.src(src).pipe(qnUpload({
  //    accessKey: "OoRT_gLqGqgXXZ1aR3L1iDIjvEYGRfWX86iqU14w",
  //    secretKey: "TSNUtEGcL50mGAuVtO9C9FBijB3R3djy6pX2_Dzz",
  //    bucket: "test",
  //    private: false
  //  },{
  //    dir:optionDir,
  //    versionFile: './cdn.json'
  //  }))
  //});
};