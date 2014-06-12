'use strict';

/**
 * For developing application you must start it with: nodemon test/mock_server/auth.server.js
 * 
 * Build means application created in build directory in debuggable state.
 * Dist means application created from build to production.
 * 
 * Src -> Build -> Dist
 * 
 * After you have to run this command in order:
 * gulp clean - delete build directory
 * gulp build - create build directory with application code, for developing: create css from less, etc.
 * gulp watch - watch file changes and move (transform) to build directory: you can view in browser
 * 
 * TODO: distribution task: create distributable application
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var less = require('gulp-less');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');
var path = require('path');

// project's directory structure
var BUILD_DIR = "./build";
var DIST_DIR = "./dist";
var config = {
    dirs: {
        src: {
            app: "./app",
            bower_components: "./bower_components",
            less: "./less"
        },
        build: {
            root: BUILD_DIR,
            css: BUILD_DIR + "/css",
            fonts: BUILD_DIR + "/fonts",
            js: BUILD_DIR + "/js"
        },
        dist: {
            root: DIST_DIR
        }
    },
    filter: {
        js: [
            'angular/angular.min.js',
            'angular/angular.min.js.map',
            'angular-strap/dist/angular-strap.min.js',
            'angular-strap/dist/angular-strap.tpl.min.js'
        ],
        css: [
            'bootstrap/dist/css/bootstrap.min.css'
        ]
    }
};

//
// BUILD
//

gulp.task('clean', function() {
    return gulp.src(config.dirs.build.root, {read: false})
            .pipe(clean());
});

// copy css files
gulp.task('copy-css', function() {
    return gulp.src(config.dirs.src.bower_components + "/**/*.css")
            .pipe(gulpFilter(config.filter.css))
            .pipe(flatten())
            .pipe(gulp.dest(config.dirs.build.css));
});

// copy js files
gulp.task('copy-js', function() {
    return gulp.src(config.dirs.src.bower_components + "/**/*")
            .pipe(gulpFilter(config.filter.js))
            .pipe(flatten())
            .pipe(gulp.dest(config.dirs.build.js));
});

// copy font files
gulp.task('copy-font', function() {
    return gulp.src(config.dirs.src.bower_components + "/**/fonts/*")
            .pipe(flatten())
            .pipe(gulp.dest(config.dirs.build.fonts));
});

// copy and transform less -> css
gulp.task('create-css-from-less', ['copy-css'], function() {
    return gulp.src(config.dirs.src.less + "/**/*.less")
            .pipe(less())
            .pipe(gulp.dest(config.dirs.build.css))
            .on('error', gutil.log);
});

// watchers
gulp.task('watch', function() {
    gulp.watch(config.dirs.src.app + "/**/*", ['copy-app', 'copy-app-js']);
    gulp.watch(config.dirs.src.less + "/**/*.less", ['create-css-from-less']);
    gulp.watch(config.dirs.src.bower_components + "/**/*", ['copy-css', 'copy-js', 'copy-font']);
});

// copy angular application without js
gulp.task('copy-app', function() {
    return gulp.src(config.dirs.src.app + "/**/*")
            .pipe(gulpFilter('!**/*.js'))
            .pipe(gulp.dest(config.dirs.build.root));
});

// copy and concat angular application js
gulp.task('copy-app-js', function() {
    return gulp.src(config.dirs.src.app + "/**/*.js")
            .pipe(concat('all.js'))
            .pipe(gulp.dest(config.dirs.build.root));
});

// copy app to build
gulp.task('build', ['copy-app', 'copy-app-js', 'copy-css', 'copy-js', 'copy-font', 'create-css-from-less']);



//
// DIST
//
