var package     = require('./package.json');
var gulp        = require('gulp');
var concat      = require('gulp-concat-util');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

// Specify vendor Javascript and CSS that you cannot use through NPM.
// You need to restart Gulp after changing these variables.
var vendorJS = [
	// 'assets/vendor/some-library/some-library.js',
];
var vendorCSS = [
	// 'assets/vendor/some-library/some-library.css',
];

var metaData =  '/*\nTheme Name: ' + package.name +
                  '\nAuthor: ' + package.author +
                  '\nAuthor URI: ' + package.homepage +
                  '\nDescription: ' + package.description +
                  '\nVersion: ' + package.version +
                  '\n*/\n';

gulp.task('compile', function() {
  gulp.src('assets/stylesheets/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(concat.header(metaData))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('.'));

  browserify({
    entries: './assets/javascript/main.js'
  }).transform(babelify, {
    presets: ['latest']
  }).bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('.'));
});

gulp.task('compileVendor', function() {
	gulp.src(vendorJS, {base: 'assets/vendor/'})
    .pipe(sourcemaps.init())
		.pipe(concat('vendor.js'))
		.pipe(uglify())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('.'));

  gulp.src(vendorCSS, {base: 'assets/vendor/'})
    .pipe(sourcemaps.init())
		.pipe(concat('vendor.css'))
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('.'));
});

gulp.task('build', ['compile', 'compileVendor']);

gulp.task('watch', ['build'], function() {
	gulp.watch('assets/**/*', ['build']);
});
