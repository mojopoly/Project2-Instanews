const gulp = require('gulp');

const terser = require ('gulp-terser'),
    rename = require ('gulp-rename'),
    eslint = require ('gulp-eslint'),
    browserSync = require('browser-sync').create();
    
    //below have to find file
    sass = require('gulp-sass').
    autoprefixer = require('gulp-autoprefixer').
    cssname = require('gulp-cssname')
    //above drag into file and than terminal npn do 
    
    //gulp below//
    gulp.task("sass", function() {
        return gulp
          .src("./sass/style.scss")
          .pipe(sass())
          .pipe(
            autoprefixer({
              browsers: ["last 2 versions"]
            })
          )


gulp.task('eslint', function() {
    return gulp.src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}); 

gulp.task('scripts', function()
{
 return gulp
    .src('./js/*.js')
    .pipe(terser()) //minify//
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {

    browserSync.init({
        server :{
        baseDir:'./'
        }
    });

gulp.watch('js/*.js'.gulp.series('scripts'));
gulp.watch('./*html').on("change", browserSync.reload);
});


gulp.task('sayhello',function(done) {
    console.log('Hello!');
    done();

});

gulp.task('default',gulp.parallel('sayhello','watch'));








