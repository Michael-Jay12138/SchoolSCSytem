(function (app) {
    var DetailsController = function ($scope, $routeParams, scoreService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        scoreService.getById(id).then(function (result) {
            $scope.score = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheScores")));