(function () {
    var app = angular.module("atTheScores", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/score/list", { templateUrl: "/client/views/score/list.html" })
            .when("/score/details/:id", { templateUrl: "/client/views/score/details.html" })
            .when("/score/edit/:id", { templateUrl: "/client/views/score/edit.html" })
            .otherwise({ redirectTo: "/score/list" });
    }
    app.config(config);
    app.constant("scoreApiUrl", "/api/score/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());