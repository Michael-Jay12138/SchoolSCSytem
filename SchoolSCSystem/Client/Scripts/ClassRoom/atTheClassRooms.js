(function () {
    var app = angular.module("atTheClassRooms", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/classroom/list", { templateUrl: "/client/views/classroom/list.html" })
            .when("/classroom/details/:id", { templateUrl: "/client/views/classroom/details.html" })
            .when("/classroom/edit/:id", { templateUrl: "/client/views/classroom/edit.html" })
            .otherwise({ redirectTo: "/classroom/list" });
    }
    app.config(config);
    app.constant("classroomApiUrl", "/api/classroom/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());