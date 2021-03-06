spa
===

Single Page Application

__EXPERIMENTAL Application!__

## Creating development environment

 - Install nodejs.
 - Clone this github project.
 - In spa directory: npm install && bower install
 - Open 3 terminal window and start `karma start karma.conf.js` `gulp clean && gulp build && gulp watch` `nodemon test/mock_server/auth.server.js`
 - Edit code.

Maybe you must install some global nodejs package (e.g. npm install -g nodemon).

## Application code states

There are 3 states of code: SRC, BUILD and DIST.

 - SRC for developing and unit testing. (development)
 - BUILD for integration testing and debugging. (staging)
 - DIST for acceptance testing and production. (production)

### SRC for developing (TDD)

Application source code for developing and unit testing, under __app, less, img and test dirs__

Start (Terminal Window 1) with `karma start karma.conf.js` for continuous unit testing: edit __app__ and __test__ codes.

### BUILD for integration testing and debugging

Build application from SRC into __build__ directory. This application can be usable in integration testing or exploratory testing.

Start (Terminal Window 2) with `gulp clean && gulp build && gulp watch`

After gulp watch, the code changes trigger a build update.

Debuggable code.

Start (Terminal Window 3) a webserver with `nodemon test/mock_server/auth.server.js` and start in browser http://localhost:8080

Mock server gives you the static files and the mock data for integration testing.

### DIST (TODO)

Distributable application code: optimalized code (e.g. minify, uglify, etc.)

TODO: acceptance test, CI. 

## Testing and metrics

Test results generated into __test_out__ and __coverage__ directory.

 