(function () {
    var app = angular.module("atTheStudents", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/student/list", { templateUrl: "/client/views/student/list.html" })
            .when("/student/details/:id", { templateUrl: "/client/views/student/details.html" })
            .when("/student/edit/:id", { templateUrl: "/client/views/student/edit.html" })
            .otherwise({ redirectTo: "/student/list" });
    }
    app.config(config);
    app.constant("studentApiUrl", "/api/student/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());