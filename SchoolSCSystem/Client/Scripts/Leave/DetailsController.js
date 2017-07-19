(function (app) {
    var DetailsController = function ($scope, $routeParams, leaveService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        leaveService.getById(id).then(function (result) {
            $scope.leave = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheLeaves")));