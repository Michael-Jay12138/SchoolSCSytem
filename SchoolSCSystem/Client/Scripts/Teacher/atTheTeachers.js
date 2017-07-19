(function () {
    var app = angular.module("atTheTeachers", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/teacher/list", { templateUrl: "/client/views/teacher/list.html" })
            .when("/teacher/details/:id", { templateUrl: "/client/views/teacher/details.html" })
            .when("/teacher/edit/:id", { templateUrl: "/client/views/teacher/edit.html" })
            .otherwise({ redirectTo: "/teacher/list" });
    }
    app.config(config);
    app.constant("teacherApiUrl", "/api/teacher/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());