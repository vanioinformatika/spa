'use strict';

/**
 * Authentication module.
 * @type @exp;angular@call;module
 */
var authModule = angular.module('vanio.auth', []);

authModule.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

