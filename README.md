spa
===

Single Page Application

__EXPERIMENTAL Application!__

## Application code state

### SRC for developing (TDD)

Application source code for developing and unit testing, under __app, less, img and test dirs__

Start (Terminal Window 1) with `karma start karma.conf.js` for continuous unit testing: edit __app__ and __test__ codes.

### BUILD for integration testing and debugging

Build application from SRC into __build__ directory. This application can be usable in integration testing or exploratory testing.

Start (Terminal Window 2) with `gulp clean && gulp build && gulp watch`

After gulp watch, the code changes trigger a build update.

Debuggable code.

Start (Terminal Window 3) a webserver with `nodemon test/mock_server/auth.server.js` and start in browser http://localhost:8080

Mock server give you the static files and the mock data for integration testing.

### DIST

Distributable application code: optimalized code (e.g. minify, uglify, etc.)

TODO: acceptance test, CI. 
