const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');

const paths = {
  scripts: {
    src: 'client/*.js',
    dest: 'public/javascripts/',
  },
};

function clean() {
  return del([paths.scripts.dest]);
}

function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(clean, scripts);

exports.clean = clean;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
