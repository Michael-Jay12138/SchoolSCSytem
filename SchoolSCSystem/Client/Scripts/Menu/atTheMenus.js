(function () {
    var app = angular.module("atTheMenus", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/menu/list", { templateUrl: "/client/views/menu/list.html" })
            .when("/menu/details/:id", { templateUrl: "/client/views/menu/details.html" })
            .when("/menu/edit/:id", { templateUrl: "/client/views/menu/edit.html" })
            .otherwise({ redirectTo: "/menu/list" });
    }
    app.config(config);
    app.constant("menuApiUrl", "/api/menu/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());