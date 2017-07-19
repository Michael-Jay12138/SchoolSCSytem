(function () {
    var app = angular.module("atTheApprovalNodes", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/approvalnode/list", { templateUrl: "/client/views/approvalnode/list.html" })
            .when("/approvalnode/details/:id", { templateUrl: "/client/views/approvalnode/details.html" })
            .when("/approvalnode/edit/:id", { templateUrl: "/client/views/approvalnode/edit.html" })
            .otherwise({ redirectTo: "/approvalnode/list" });
    }
    app.config(config);
    app.constant("approvalnodeApiUrl", "/api/approvalnode/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());