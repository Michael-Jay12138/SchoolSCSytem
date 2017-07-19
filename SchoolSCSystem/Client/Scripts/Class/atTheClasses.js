(function () {
    var app = angular.module("atTheClasses", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/class/list", { templateUrl: "/client/views/class/list.html" })
            .when("/class/details/:id", { templateUrl: "/client/views/class/details.html" })
            .when("/class/edit/:id", { templateUrl: "/client/views/class/edit.html" })
            .otherwise({ redirectTo: "/class/list" });
    }
    app.config(config);
    app.constant("classApiUrl", "/api/class/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());