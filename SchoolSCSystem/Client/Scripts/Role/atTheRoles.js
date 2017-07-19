(function () {
    var app = angular.module("atTheRoles", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/role/list", { templateUrl: "/client/views/role/list.html" })
            .when("/role/details/:id", { templateUrl: "/client/views/role/details.html" })
            .when("/role/edit/:id", { templateUrl: "/client/views/role/edit.html" })
            .otherwise({ redirectTo: "/role/list" });
    }
    app.config(config);
    app.constant("roleApiUrl", "/api/role/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());