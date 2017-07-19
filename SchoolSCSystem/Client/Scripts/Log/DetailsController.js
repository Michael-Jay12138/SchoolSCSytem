(function (app) {
    var DetailsController = function ($scope, $routeParams, logService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        logService.getById(id).then(function (result) {
            $scope.log = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheLogs")));