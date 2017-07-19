(function () {
    var app = angular.module("atTheHomes", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/home/index", { templateUrl: "/client/views/home/index.html" })
            .otherwise({ redirectTo: "/home/index" });
    }
    app.config(config);
    app.constant("homeApiUrl", "/api/home/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());