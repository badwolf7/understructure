const gulp = require('gulp'),

      // css
      autoprefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      minifyCss = require('gulp-minify-css'),

      // live update
      livereload = require('gulp-livereload'),

      // javascript
      uglify = require('gulp-uglify'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      concat = require('gulp-concat'),

      // images
      imagemin = require('gulp-imagemin'),

      // utility
      changed = require('gulp-changed'),
      next = require('gulp-next'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),

      // node
      colors = require('colors');



var dirs = {
  src: {
    css: "./src/css/**/*.css",
    img: "./src/img/**/*.*",
    js: "./src/js/**/*.js",
    scss: {
      all: "./src/scss/**/*.scss",
      main: "./src/scss/virgil.scss"
    }
  },
  public: {
    css: "./public/assets/css",
    img: "./public/assets/img",
    js: "./public/assets/js"
  }
}





gulp.task('scssMain', ['scssPretty'], function(){
  gulp.src(dirs.src.scss.main)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.css))
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(rename({extname:'.min.css'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.css))
    .pipe(livereload())
});

gulp.task('scssPretty', function(){
  gulp.src(dirs.src.scss.main)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.css))
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.css))
    .pipe(livereload())
});

gulp.task('scss', ['scssMain'], function(){
  return gulp.src(dirs.src.scss.all)
    .pipe(livereload())
    .pipe(next(function(){
      console.log('\n Finished SCSS'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('css', function(){
  return gulp.src(dirs.src.css)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.css))
      .pipe(minifyCss({
        compatibility: 'ie7'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.css))
    .pipe(livereload())
    .pipe(next(function(){
      console.log('\n Finished CSS'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('images', function(){
  // Images
  // jpg, png, gif  =>  all others ignored
  return gulp.src(dirs.src.img)
    .pipe(changed(dirs.public.img))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(dirs.public.img))
    .pipe(livereload())
    .pipe(next(function(){
      console.log('\n Finished Images'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('javascript', ['javascriptPretty'], function(){
  return gulp.src(dirs.src.js)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.js))
      .pipe(uglify())
      .pipe(concat('virgil.js'))
      .pipe(rename({extname:'.min.js'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.js))
    .pipe(livereload())
    .pipe(next(function(){
      console.log('\n Finished JavaScript'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('javascriptPretty', function(){
  return gulp.src(dirs.src.js)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.js))
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(concat('virgil.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.js))
    .pipe(livereload())
    .pipe(next(function(){
      console.log('\n Finished JavaScript'.bgGreen.black.bold);
      console.log('\n');
    }));
});



gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(dirs.src.scss.all, ['scss']);
  gulp.watch(dirs.src.css, ['css']);
  gulp.watch(dirs.src.img, ['images']);
  gulp.watch(dirs.src.js, ['javascript']);

  console.log('\n Watching Files...'.bgGreen.black.bold);
  console.log('\n');
});

gulp.task('default', ['scss','css','images','javascript'], function(){
  gulp.start('watch');
});

gulp.task('production', ['scssMain','css','images','javascript']);