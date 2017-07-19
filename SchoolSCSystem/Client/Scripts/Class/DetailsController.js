(function (app) {
    var DetailsController = function ($scope, $routeParams, classService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        classService.getById(id).then(function (result) {
            $scope.class = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheClasses")));