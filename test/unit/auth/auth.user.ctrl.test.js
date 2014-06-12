'use strict';

describe("Authentication", function() {

    var $window, $httpBackend, $scope, $rootScope, $controller, ctrl;

    beforeEach(module('myApp'));

    beforeEach(inject(function(_$window_, _$httpBackend_, _$rootScope_, _$controller_) {
        $window = _$window_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        ctrl = $controller('UserCtrl', {'$scope': $rootScope});

    }));

    /**
     * You do not make test mistake. If you do, then throw exceptions.
     */
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch authentication token', function() {
        var EXPECTED_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjp7ImNvdW50ZXIiOjB9LCJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImVtYWlsIjoiam9obkBkb2UuY29tIiwicm9sZXMiOlsxMDAsMjAwLDMwMCw0MDAsNTAwLDYwMCw3MDAsODAwLDkwMCwxMDAwXSwiaWQiOjEyMywiZXhwIjoxNDAyNTYzMTkxLCJpYXQiOjE0MDI1NjMxMzF9.ziyi-9HGvHYM9cCIWkjPj1s-ChT3ZmGDxUHkBc3UhMg';
        $httpBackend.expectPOST('/authenticate', {username: 'john.doe', password: 'foobar'})
                .respond(200,
                        {
                            token: EXPECTED_TOKEN
                        });
        $rootScope.submit();
        $httpBackend.flush();
        // flush: synchronized (run) http request -> validation is available.
        // test testing purpose - generate validation error: expect($rootScope.welcome).toBe("Little Richard");
        expect($rootScope.isAuthenticated).toBe(true);
        expect($rootScope.welcome).toBe('John Doe');
        expect($rootScope.error).toBe('');
        expect($rootScope.message).toBe('');
        expect($window.sessionStorage.token).toBe(EXPECTED_TOKEN);
    });

    it('should give 401 error with wrong password', function() {
        // login data
        $rootScope.user = {username: 'john.doe', password: 'wrong_password'};
        // response mock
        $httpBackend.expectPOST('/authenticate', {username: 'john.doe', password: 'wrong_password'})
                .respond(401, {});
        $rootScope.submit();
        $httpBackend.flush();
        
        expect($rootScope.isAuthenticated).toBe(false);
        expect($rootScope.welcome).toBe('');
        expect($rootScope.error).toBe('Login failed!');
        expect($rootScope.message).toBe('');
        expect($window.sessionStorage.token).toBeUndefined();
    });
    
    it('should clear user data from application when logout', function() {
        expect($rootScope.welcome).toBe('');
        expect($rootScope.message).toBe('');
        expect($rootScope.error).toBe('');
        expect($rootScope.isAuthenticated).toBe(false);
        expect($window.sessionStorage.token).toBeUndefined();
    });
    
    // TODO: move to other js/control file
    it('should response with message when Authorization token presented', function() {
        var EXPECTED_MESSAGE = {"session":{"counter":10},"first_name":"John","last_name":"Doe","email":"john@doe.com","roles":[100,200,300,400,500,600,700,800,900,1000],"id":123,"exp":1402575969,"iat":1402575909};
        // response mock
        $httpBackend.expectGET('/api/restricted')
                .respond(200, EXPECTED_MESSAGE);
        $rootScope.callRestricted();
        $httpBackend.flush();
        expect($rootScope.message).toBe('<br>' + JSON.stringify(EXPECTED_MESSAGE));
    });
});

