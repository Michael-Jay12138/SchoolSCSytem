(function () {
    var app = angular.module("atTheLeaves", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/leave/list", { templateUrl: "/client/views/leave/list.html" })
            .when("/leave/details/:id", { templateUrl: "/client/views/leave/details.html" })
            .when("/leave/edit/:id", { templateUrl: "/client/views/leave/edit.html" })
            .otherwise({ redirectTo: "/leave/list" });
    }
    app.config(config);
    app.constant("leaveApiUrl", "/api/leave/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());