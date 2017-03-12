const gulp = require('gulp');
const concat = require('gulp-concat');
const yamltojson = require('gulp-yaml');
const prettify = require('gulp-jsbeautifier');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const del = require('del');
const webserver = require('gulp-webserver');

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
const fs = require('fs');
const path = require('path');
const merge = require('merge-stream');
const gulpSequence = require('gulp-sequence');
//
const filelist = require('gulp-filelist');

/**
 * @description List directories in a directory
 * @param {string} dir The directory
 * @return {string[]} The directories
 */
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

// Concat data/<each version>/**/*.yaml in <each version>.json
gulp.task('build-data-files', function() {
  const dataPath = 'data';
  const folders = getFolders(dataPath);
  var tasks = folders.map(function(folder) {
    return gulp.src(path.join(dataPath, folder, '/**/*.yaml'))
      .pipe(concat(folder + '.yaml'))
      .pipe(yamltojson(folder + '.json'))
      .pipe(prettify(folder + '.json'))
      .pipe(gulp.dest('dist'));
  });
  return merge(tasks);
});

// Copy versions.json file to dist
gulp.task('build-version-file', function() {
  return gulp.src('data/*.json')
    .pipe(gulp.dest('dist'));
});

// Build versions.json and <each version>.json files
gulp.task('build-data', function(callback) {
  gulpSequence('build-data-files', 'build-version-file')(callback);
});

// Generate js code for the tooltip panel's templating and copy to dist
gulp.task('templates', () => {
  gulp.src('web/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'OpenAPISpecificationVisualDocumentation',
      noRedeclare: true // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js'));
});

// Copy html, css dans js files to dist
gulp.task('static', () => {
  return gulp.src('web/static/**/*')
    .pipe(gulp.dest('dist/'));
});

// Copy static and templated files to dist
gulp.task('build-web', ['static', 'templates']);

// Copy web and data files to dist
gulp.task('build', function(callback) {
  gulpSequence('clean', 'build-web', 'build-data')(callback);
});

// Deletes dist
gulp.task('clean', del.bind(null, ['dist']));

// Watch for modifications on web and data files, relaunch build if files are modified
gulp.task('watch', ['build'], function() {
  return gulp.watch(['data/**/*', 'web/**/*'], ['build']);
});

// Launch web server on dist directory with live-reload
gulp.task('webserver', function() {
  return gulp.src(['dist'])
    .pipe(webserver({
      port: 8080,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

// Launch dev mode
gulp.task('serve', function(callback) {
  gulpSequence('watch', 'webserver')(callback);
});

// Build by default
gulp.task('default', ['build']);
