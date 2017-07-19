(function (app) {
    var DetailsController = function ($scope, $routeParams, approvalnodeService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        approvalnodeService.getById(id).then(function (result) {
            $scope.approvalnode = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheApprovalNodes")));