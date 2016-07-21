var eslint = require('gulp-eslint');

module.exports = function (gulp) {


  gulp.task('eslint', function () {
    return gulp.src([
      '**/*.js',
      '**/*.jsx',
    ]).pipe(eslint())
    .pipe(eslint.format());
  });
};