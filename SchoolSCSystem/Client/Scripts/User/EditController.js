(function (app) {
    var EditController = function ($scope, userService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.user = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.user.UserId) {
                updateUser();
            }
            else {
                createUser();
            }
        };
        //更新数据
        var updateUser = function () {
            var userupd;
            userupd = $scope.edit.user;
            console.log(userupd);
                    userService.update(userupd).then(function () {
                        editUser(userupd);
            })
        };
        //添加数据
        var createUser = function () {
            var useradd;
            useradd = $scope.edit.user;
            useradd.UserId = 0;
            userService.create(useradd).then(function (backdata) {
                useradd.UserId = backdata.data.UserId;
                addUser(useradd);
                    });
        };
        //向列表添加数据
        var addUser=function(user)
        {
            $scope.$root.users.push(user);
            $scope.$root.edit.user = null;
            
            //location.reload([true]);
        }
        //更新列表数据
        var editUser = function (user) {
            for (var i = 0; i < $scope.$root.users.length; i++) {
                if ($scope.$root.users[i].UserId == user.UserId) {
                    $scope.$root.users.splice(i, 1, user);
                    break;
                }
            }
            $scope.$root.edit.user = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheUsers")));