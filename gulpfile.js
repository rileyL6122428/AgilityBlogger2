var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var partialify = require('partialify');
var ngAnnotate = require('gulp-ng-annotate');
var gutil = require('gulp-util');
var watchify = require('watchify');
var path = require('path');
var Karma = require('karma').Server;

function logError(error) {
  if (error._babel) {
    gutil.log(
      gutil.colors.red(error.name)
      + ': ' + gutil.colors.yellow(error.message)
      + '\n' + error.codeFrame
    );
  } else {
    gutil.log(gutil.colors.red(error.message));
  }

  this.emit('end');
}

gulp.task('scripts', function() {
  var bundler = watchify(browserify('./frontend/src/agilityBloggerApp.js', {
      debug: true,
      paths: ['./node_modules', './frontend/src'],
    }))
    .transform(babelify, {
      presets: ['es2015'],
    })
    .transform(partialify);

  function rebundle() {
    bundler.bundle()
      .on('error', logError)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(ngAnnotate())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./grails-app/assets/javascripts/agilityblogger'));
  }

  bundler.on('update', rebundle);

  return rebundle();
});

gulp.task('watch', ['scripts'], function() {
  gulp.watch('./frontend/src/*.js', ['scripts']);
});

gulp.task('test', function(done) {
  new Karma({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    reporters: ['dots'],
  }, done).start();
});

gulp.task('debug-test', function(done) {
  new Karma({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    browsers: ['Chrome'],
    autoWatch: false,
    reporters: ['dots'],
  }, done).start();
});

gulp.task('default', ['watch']);
