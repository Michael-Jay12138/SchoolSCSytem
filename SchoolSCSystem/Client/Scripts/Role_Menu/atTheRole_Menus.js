(function () {
    var app = angular.module("atTheRole_Menus", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/role_menu/list", { templateUrl: "/client/views/role_menu/list.html" })
            .when("/role_menu/details/:roleid&:menuid", { templateUrl: "/client/views/role_menu/details.html" })
            .when("/role_menu/edit/:id", { templateUrl: "/client/views/role_menu/edit.html" })
            .otherwise({ redirectTo: "/role_menu/list" });
    }
    app.config(config);
    app.constant("role_menuApiUrl", "/api/role_menu/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());