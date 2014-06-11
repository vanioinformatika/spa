var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var less = require('gulp-less');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var path = require('path');
var gulpBowerFiles = require('gulp-bower-files');

// filters
var filterCSS = gulpFilter('**/bootstrap.*css');
var filterJS = gulpFilter(['!**/bootstrap.js', '!**/jquery*']);
var filterCSSMAP = gulpFilter(['**/bootstrap*']);

// temporary dir for vendor js files
var VENDOR = "./vendor";
var BOWER_COMPONENTS = "./bower_components";

// application source code (devel)
var SRC = "./app";
var SRC_LESS_ALL = path.join("less", "**", "*.less");

// application build for debugging (devel)
var BLD = "./build";
var BLD_CSS = BLD + "/css";
var BLD_FONT = BLD + "/fonts";
var BLD_JAVASCRIPT = BLD + "/js";
var BLD_IMAGES = path.join(BLD, "img");

// application distribution (prod) - releasing
var DIST = "./dist";
var DIST_ALL = path.join(DIST, "**");
var DIST_CSS = path.join(DIST, "css");
var DIST_JAVASCRIPT = path.join(DIST, "js");
var DIST_IMAGES = path.join(DIST, "img");

//
// BUILD
//
gulp.task('clean', function() {
    return gulp.src(BLD, {read: false})
            .pipe(clean());
});

// copy bower_components JavaScript files to VENDOR directory
gulp.task('bower-files', function() {
    gulpBowerFiles().pipe(gulp.dest(VENDOR));
});

// copy css files to VENDOR directory
gulp.task('copy-css', ['bower-files'], function() {
    return gulp.src(VENDOR + "/**/*.css")
            .pipe(filterCSS)
            .pipe(flatten())
            .pipe(gulp.dest(BLD_CSS));
});

// copy css map files to VENDOR directory
gulp.task('copy-css-map', ['copy-css'], function() {
    return gulp.src(BOWER_COMPONENTS + "/**/*.map")
            .pipe(filterCSSMAP)
            .pipe(flatten())
            .pipe(gulp.dest(BLD_CSS));
});

// copy js files from vendor
gulp.task('copy-js', ['bower-files'], function() {
    return gulp.src(VENDOR + "/**/*.js")
            .pipe(filterJS)
            .pipe(flatten())
            .pipe(gulp.dest(BLD_JAVASCRIPT));
});

// copy font files from vendor
gulp.task('copy-font', function() {
    return gulp.src(BOWER_COMPONENTS + "/**/fonts/*")
            .pipe(flatten())
            .pipe(gulp.dest(BLD_FONT));
});

// copy and transform less -> css
gulp.task('create-css-from-less', ['copy-css'], function() {
    return gulp.src("./less/**/*.less")
            .pipe(less())
            .pipe(gulp.dest(BLD_CSS))
            .on('error', gutil.log);
});

// automatic build on file change
gulp.task('watch', function() {
    //gulp.watch(SRC + "/**/*", ['build']);
    gulp.watch("./less/**/*.less", ['create-css-from-less']);
});

// copy angular application
gulp.task('copy-app', function() {
    return gulp.src(SRC + "/**/*")
            .pipe(gulp.dest(BLD));
});

// copy app to build
gulp.task('build', ['copy-app', 'copy-css', 'copy-js', 'copy-css-map', 'copy-font', 'create-css-from-less']);



//
// DIST
//
