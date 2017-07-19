(function (app) {
    var DetailsController = function ($scope, $routeParams, role_menuService) {
        var roleid = $routeParams.roleid;
        var menuid = $routeParams.menuid;
        //根据id获取需要的数据
        role_menuService.getById(roleid, menuid).then(function (result) {
            $scope.role_menu = result.data;
            console.log($scope.role_menu);
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheRole_Menus")));