const gulp = require('gulp');

const terser = require('gulp-terser'),
      rename = require('gulp-rename'),
      eslint = require('gulp-eslint'),
      browserSync = require('browser-sync').create();
      sass = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      cssnano = require("gulp-cssnano");

//Check your file paths to make sure your SASS is compiling to a build folder
//Your compiled & minified files in your build folder is what you'll be linking to your index.html
gulp.task("sass", function() {
return gulp
    .src("../scss/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
        })
    )
    .pipe(gulp.dest("../build/css"))
    .pipe(cssnano())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest("../build/css"))
    .pipe(browserSync.stream()); //add this so your browser refreshes after scss changes are made
});

//This handles "errors" in our JS that we define
//Hint: you'll need your .eslintrc file in your root project directory for this
gulp.task('eslint', function() {
    return gulp.src('../js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//Compiles and minifies your JS. Check your files paths
//Use the minified JS in you final production 
gulp.task('scripts', function() {
    return gulp
    .src('../js/*.js')
    .pipe(terser())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('../build/js'))
    .pipe(browserSync.stream());
});

//Watches for changes from the root directory to the files you specify
gulp.task('watch', function() {
    
    browserSync.init({
        server:{
        baseDir: './'
        }
    });
    
    //Add JS and SASS files in an array to watch for changes//
    //Add SASS task as part of what gets executed when a change is dedected to your JS and SASS
    gulp.watch(['js/*.js', '../scss/*.scss'], gulp.series(['sass', 'scripts', 'eslint',]));//add 'sass'
    gulp.watch('../*.html').on("change", browserSync.reload);
});

//Default task to run when 'gulp' command is used
//Watch task should be linked so that other tasks must run when watch is ran
gulp.task('default', gulp.series('watch'));