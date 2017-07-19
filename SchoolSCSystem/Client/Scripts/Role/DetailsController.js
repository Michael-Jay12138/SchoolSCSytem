(function (app) {
    var DetailsController = function ($scope, $routeParams, roleService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        roleService.getById(id).then(function (result) {
            $scope.role = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheRoles")));