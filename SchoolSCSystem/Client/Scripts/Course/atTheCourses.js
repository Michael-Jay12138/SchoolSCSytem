(function () {
    var app = angular.module("atTheCourses", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/course/list", { templateUrl: "/client/views/course/list.html" })
            .when("/course/details/:id", { templateUrl: "/client/views/course/details.html" })
            .when("/course/edit/:id", { templateUrl: "/client/views/course/edit.html" })
            .otherwise({ redirectTo: "/course/list" });
    }
    app.config(config);
    app.constant("courseApiUrl", "/api/course/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());