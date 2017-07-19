(function (app) {
    var EditController = function ($scope, roleService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.role = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.role.RoleId) {
                updateRole();
            }
            else {
                createRole();
            }
        };
        //更新数据
        var updateRole = function () {
            var roleupd;
            roleupd = $scope.edit.role;
            roleService.update(roleupd).then(function () {
                editRole(roleupd);
            })
        };
        //添加数据
        var createRole = function () {
            var roleadd;
            roleadd = $scope.edit.role;
            roleadd.RoleId = 0;
            roleService.create(roleadd).then(function (backdata) {
                roleadd.RoleId = backdata.data.RoleId;
                addRole(roleadd);
            });
        };
        //向列表添加数据
        var addRole = function (role) {
            $scope.$root.roles.push(role);
            $scope.$root.edit.role = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editRole = function (role) {
            for (var i = 0; i < $scope.$root.roles.length; i++) {
                if ($scope.$root.roles[i].RoleId == role.RoleId) {
                    $scope.$root.roles.splice(i, 1, role);
                    break;
                }
            }
            $scope.$root.edit.role = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheRoles")));