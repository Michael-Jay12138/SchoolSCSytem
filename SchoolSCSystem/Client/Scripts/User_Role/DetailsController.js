(function (app) {
    var DetailsController = function ($scope, $routeParams, user_roleService) {
        var userid = $routeParams.userid;
        var roleid = $routeParams.roleid;
     
        //根据id获取需要的数据
        user_roleService.getById(userid, roleid).then(function (result) {
            $scope.user_role = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheUser_Roles")));