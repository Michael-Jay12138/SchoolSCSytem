(function () {
    var app = angular.module("atTheClassRoom_Users", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/classroom_user/list", { templateUrl: "/client/views/classroom_user/list.html" })
            .when("/classroom_user/details/:classroomid&:userid", { templateUrl: "/client/views/classroom_user/details.html" })
            .when("/classroom_user/edit/:id", { templateUrl: "/client/views/classroom_user/edit.html" })
            .otherwise({ redirectTo: "/classroom_user/list" });
    }
    app.config(config);
    app.constant("classroom_userApiUrl", "/api/classroom_user/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());