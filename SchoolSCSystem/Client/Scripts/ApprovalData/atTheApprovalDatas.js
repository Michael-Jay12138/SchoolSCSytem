(function () {
    var app = angular.module("atTheApprovalDatas", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/approvalData/list", { templateUrl: "/client/views/approvalData/list.html" })
            .when("/approvalData/details/:id", { templateUrl: "/client/views/approvalData/details.html" })
            .when("/approvalData/edit/:id", { templateUrl: "/client/views/approvalData/edit.html" })
            .when("/approvalData/form", { templateUrl: "/client/views/approvalData/form.html" })
            .when("/approvalData/confirm/:id", { templateUrl: "/client/views/approvalData/confirm.html" })
            .otherwise({ redirectTo: "/approvalData/list" });
    }
    app.config(config);
    app.constant("approvalDataApiUrl", "/api/approvalData/");
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());