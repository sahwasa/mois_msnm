const gulp = require("gulp"),
      gulpInc = require("gulp-file-include"),
      imgmin = require("gulp-imagemin"),
      bs = require("browser-sync").create();

function inc(){
  return gulp.src('dev/**/*.html')
  .pipe(gulpInc({
    prefix : '@@',
    basepath : '@file'
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(bs.stream());
}
function imgMin(){
  return gulp.src('dev/img/**/*.*')
  .pipe(imgmin())
  .pipe(gulp.dest('dist/img/'))
  .pipe(bs.stream());
}
function css(){
  return gulp.src('dev/css/**/*.css')
  .pipe(gulp.dest('dist/css'))
  .pipe(bs.stream());
}
function js(){
  return gulp.src('dev/js/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(bs.stream());
}
function watch(){
  bs.init({
    server :{
      baseDir : 'dist/'
    }
  });
  gulp.watch('dev/**/*.html', inc);
  gulp.watch('dev/img/**/*.*', imgMin);
  gulp.watch('dev/js/*.js', js);
  gulp.watch('dev/css/**/*.css', css);
}

exports.inc = inc;
exports.js = js;
exports.css = css;
exports.imgMin = imgMin;
exports.watch = watch;
