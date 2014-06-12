'use strict';

/**
 * Intercept all http request and save HTTP Header Authorization value into
 * sessionStorage with token key.
 * On request, put Authorization header value into HTTP Header.
 */
authModule.factory('authInterceptor', function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['Authorization'] = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function(response) {
            // respone has Authorization HTTP header, and token will be saved into the sessionStorage
            var tokenWithBearer = response.headers('Authorization');
            if (tokenWithBearer !== null) {
                var parts = tokenWithBearer.split(' ');
                var token = parts[1];
                $window.sessionStorage.token = token;
            }
            return response;
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
                delete $window.sessionStorage.token;
                $rootScope.isAuthenticated = false;
            }
            return $q.reject(rejection);
        }
    };
});