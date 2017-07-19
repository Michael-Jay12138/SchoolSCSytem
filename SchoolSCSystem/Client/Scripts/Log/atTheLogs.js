(function () {
    var app = angular.module("atTheLogs", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/log/list", { templateUrl: "/client/views/log/list.html" })
            .when("/log/details/:id", { templateUrl: "/client/views/log/details.html" })
            .when("/log/edit/:id", { templateUrl: "/client/views/log/edit.html" })
            .otherwise({ redirectTo: "/log/list" });
    }
    app.config(config);
    app.constant("logApiUrl", "/api/log/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());