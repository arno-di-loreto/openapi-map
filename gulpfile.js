const gulp = require('gulp');
const concat = require('gulp-concat');
const yamltojson = require('gulp-yaml');
const prettify = require('gulp-jsbeautifier');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const del = require('del');

gulp.task('build-data', () => {
  return gulp.src('data/*.yaml')
  .pipe(concat('data.yaml'))
  .pipe(yamltojson('data.json'))
  .pipe(prettify('data.json'))
  .pipe(gulp.dest('dist/'));
});

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

gulp.task('static', () => {
  return gulp.src('web/static/**/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-web', ['static', 'templates']);

gulp.task('build', ['build-data', 'build-web']);

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
