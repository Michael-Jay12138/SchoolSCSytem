(function (app) {
    var DetailsController = function ($scope, $routeParams, majorService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        majorService.getById(id).then(function (result) {
            $scope.major = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheMajors")));