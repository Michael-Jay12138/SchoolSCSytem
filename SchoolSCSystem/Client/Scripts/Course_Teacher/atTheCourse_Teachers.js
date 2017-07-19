(function () {
    var app = angular.module("atTheCourse_Teachers", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/course_teacher/list", { templateUrl: "/client/views/course_teacher/list.html" })
            .when("/course_teacher/details/:courseid&:teacherid", { templateUrl: "/client/views/course_teacher/details.html" })
            .when("/course_teacher/edit/:id", { templateUrl: "/client/views/course_teacher/edit.html" })
            .otherwise({ redirectTo: "/course_teacher/list" });
    }
    app.config(config);
    app.constant("course_teacherApiUrl", "/api/course_teacher/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());