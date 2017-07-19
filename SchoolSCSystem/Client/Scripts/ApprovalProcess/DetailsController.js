(function (app) {
    var DetailsController = function ($scope, $routeParams, approvalProcessService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        approvalProcessService.getById(id).then(function (result) {
            $scope.approvalProcess = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheApprovalProcesses")));