'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var cache = require('gulp-cached');
var complexity = require('gulp-complexity');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jscsStylish = require('jscs-stylish');
var jshintStylish = require('jshint-stylish');
var extend = require('util')._extend;

module.exports = function(src, options) {
  options = extend({
    taskName: 'lint',
    shouldFail: false
  }, options || {});

  gulp.task(options.taskName, function() {
    return gulp.src(src)
      .pipe(cache(options.taskName))
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylish))
      .pipe(gulpif(options.shouldFail, jshint.reporter('fail')))
      .pipe(jscs())
      .pipe(jscs.reporter(jscsStylish))
      .pipe(gulpif(options.shouldFail, jscs.reporter('fail')))
      .pipe(complexity({
        cyclomatic: [5, 15, 25],
        halstead: [15, 20, 25],
        maintainability: 100,
        breakOnErrors: false
      }));
  });

  gulp.task('watch:' + options.taskName, [options.taskName], function() {
    gulp.watch(src, [options.taskName]);
  });
};
