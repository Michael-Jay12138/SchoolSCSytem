(function () {
    var app = angular.module("atTheUsers", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/user/list", { templateUrl: "/client/views/user/list.html" })
            .when("/user/details/:id", { templateUrl: "/client/views/user/details.html" })
            .when("/user/edit/:id", { templateUrl: "/client/views/user/edit.html" })
            .when("/user/info/:id", { templateUrl: "/client/views/user/info.html" })
            .otherwise({ redirectTo: "/user/list" });
    }
    app.config(config);
    app.constant("userApiUrl", "/api/user/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());