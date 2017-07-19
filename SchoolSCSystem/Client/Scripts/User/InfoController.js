(function (app) {
    var InfoController = function ($scope, $routeParams, userService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        userService.getById(id).then(function (result) {
            $scope.edit={
                user: {
                    UserId:result.data.UserId,
                    UserName: result.data.UserName,
                    PassWord: result.data.PassWord,
                    UserAvatar: result.data.UserAvatar,
                }
            }
        });

        //更新数据
        $scope.updateUser = function () {
            var userupd;
            userupd = $scope.edit.user;
            userService.update(userupd).then(function () {
                alert("success!");
                window.location.href = "#/user/list";
                window.close();
            })
        };
    };
    app.controller("InfoController", InfoController);
}(angular.module("atTheUsers")));