(function () {
    var app = angular.module("atTheApprovalProcesses", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/approvalProcess/list", { templateUrl: "/client/views/approvalProcess/list.html" })
            .when("/approvalProcess/details/:id", { templateUrl: "/client/views/approvalProcess/details.html" })
            .when("/approvalProcess/edit/:id", { templateUrl: "/client/views/approvalProcess/edit.html" })
            .otherwise({ redirectTo: "/approvalProcess/list" });
    }
    app.config(config);
    app.constant("approvalProcessApiUrl", "/api/approvalProcess/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());