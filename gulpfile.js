/***********************************
 * Module dependencies.
 ************************************/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

/***********************************
 * initial tasks sequence
 ************************************/
gulp.task('build', function (callback) {
  runSequence('lint', callback);
});


/***********************************
 * build sequence related tasks
 ************************************/ 
//Code quality
gulp.task('lint', function(callback) {
  return gulp.src(['server/*.js','server/lib/*.js','server/controllers/*.js','server/views/*.js','server/boot/*.js','server/data/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});