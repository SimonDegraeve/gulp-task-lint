'use strict';

var gulp = require('gulp');

require('gulp-task-update')();
require('./index')('./lib/**/*.js', {shouldFail: true});

gulp.task('test', ['lint']);
