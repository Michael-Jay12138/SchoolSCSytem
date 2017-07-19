(function () {
    var app = angular.module("atTheUser_Roles", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/user_role/list", { templateUrl: "/client/views/user_role/list.html" })
            .when("/user_role/details/:userid&:roleid", { templateUrl: "/client/views/user_role/details.html" })
            .when("/user_role/edit/:id", { templateUrl: "/client/views/user_role/edit.html" })
            .otherwise({ redirectTo: "/user_role/list" });
    }
    app.config(config);
    app.constant("user_roleApiUrl", "/api/user_role/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());