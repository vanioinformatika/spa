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

// temporary dir for vendor js files
var VENDOR = "vendor";
var BOWER_COMPONENTS = "bower_components";

// application source code (devel)
var SRC = "app";
var SRC_LESS_BASE = path.join(SRC, "less");
var SRC_LESS_ALL = path.join(SRC_LESS_BASE, "**", "*.less");
var SRC_IMAGES_BASE = path.join(SRC, "img");

// application build for debugging (devel)
var BLD = "build";
var BLD_ALL = path.join(BLD, "**");
var BLD_CSS = path.join(BLD, "css");
var BLD_JAVASCRIPT = path.join(BLD, "js");
var BLD_IMAGES = path.join(BLD, "img");

// application distribution (prod) - releasing
var DIST = "dist";
var DIST_ALL = path.join(DIST, "**");
var DIST_CSS = path.join(DIST, "css");
var DIST_JAVASCRIPT = path.join(DIST, "js");
var DIST_IMAGES = path.join(DIST, "img");

//
// BUILD
//
gulp.task('clean-build', function() {
    return gulp.src(BLD, {read: false})
            .pipe(clean());
});

// copy bower_components JavaScript files to VENDOR directory
gulp.task('bower-files', ['clean-build'], function() {
    gulpBowerFiles().pipe(gulp.dest(VENDOR));
});

// copy bower_components css files to VENDOR directory
gulp.task('copy-css', ['bower-files'], function() {
    return gulp.src(VENDOR + "/**/*.css")
            .pipe(filterCSS)
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

// copy app to build
gulp.task('build', function() {
    return gulp.src(SRC + "/**/*")
            .pipe(gulp.dest(BLD));
});

//gulp.task('css', function() {
//    return gulp.src(SRC_LESS_ALL)
//            .pipe(less({
//                paths: [path.join(SRC_LESS_ALL, 'includes')]
//            }))
//            .pipe(gulp.dest(BLD_CSS))
//            .on('error', gutil.log);
//});

//
// DIST
//
