(function () {
    var app = angular.module("atTheApprovalNode_Users", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/approvalnode_user/list", { templateUrl: "/client/views/approvalnode_user/list.html" })
            .when("/approvalnode_user/details/:nodeid&:userid", { templateUrl: "/client/views/approvalnode_user/details.html" })
            .when("/approvalnode_user/edit/:id", { templateUrl: "/client/views/approvalnode_user/edit.html" })
            .otherwise({ redirectTo: "/approvalnode_user/list" });
    }
    app.config(config);
    app.constant("approvalnode_userApiUrl", "/api/approvalnode_user/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());