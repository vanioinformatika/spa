// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
// base path, that will be used to resolve files and exclude
        basePath: '',
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-strap/dist/angular-strap.js',
            'app/*.js',
            'app/**/*.js',
            'test/mock/**/*.js',
            'test/unit/**/*.test.js'
        ],
        preprocessors: {
            'test/unit/**/*.test.js': 'coverage'
        },
        // list of files / patterns to exclude
        exclude: [],
        // web server port
        port: 9876,
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-html-reporter',
            'karma-coverage'
        ],
        reporters: ['dots', 'junit', 'html', 'coverage'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'test'
        },
        htmlReporter: {
            outputDir: 'test_out',
            templatePath: __dirname + '/test/jasmine_template.html'
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};
