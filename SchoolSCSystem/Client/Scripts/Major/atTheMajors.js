(function () {
    var app = angular.module("atTheMajors", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/major/list", { templateUrl: "/client/views/major/list.html" })
            .when("/major/details/:id", { templateUrl: "/client/views/major/details.html" })
            .when("/major/edit/:id", { templateUrl: "/client/views/major/edit.html" })
            .otherwise({ redirectTo: "/major/list" });
    }
    app.config(config);
    app.constant("majorApiUrl", "/api/major/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());