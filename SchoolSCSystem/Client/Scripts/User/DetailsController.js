(function (app) {
    var DetailsController = function ($scope, $routeParams, userService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        userService.getById(id).then(function (result) {
            $scope.user = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheUsers")));