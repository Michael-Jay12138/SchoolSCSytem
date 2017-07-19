(function (app) {
    var DetailsController = function ($scope, $routeParams, menuService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        menuService.getById(id).then(function (result) {
            $scope.menu = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheMenus")));