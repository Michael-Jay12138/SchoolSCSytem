(function (app) {
    var EditController = function ($scope, user_roleService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.user_role = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.user_role.UserId && $scope.edit.user_role.RoleId) {
                updateUser_Role();
            }
            else {
                createUser_Role();
            }
        };
        //更新数据
        var updateUser_Role = function () {
            var user_roleupd, userid,roleid;
            user_roleupd = $scope.edit.user_role;
            userid = $scope.edit.user_role.UserId;
            roleid = $scope.edit.user_role.RoleId;
            delete (user_roleupd.User);
            delete (user_roleupd.Role);
            user_roleupd.UserId = Number($scope.user);
            user_roleupd.RoleId = Number($scope.role);
            username = $('#user').find("option:selected").text();
            rolename = $('#role').find("option:selected").text();
            user_roleService.update(userid,roleid, user_roleupd).then(function () {
                var temp = {
                    UserId: user_roleupd.UserId,
                    RoleId: user_roleupd.RoleId,
                    UserName: username,
                    RoleName: rolename,
                }
                editUser_Role(userid,roleid, temp);
            })
        };
        //添加数据
        var createUser_Role = function () {
            var user_roleadd;
            user_roleadd = $scope.edit.user_role;
            delete (user_roleadd.User);
            delete (user_roleadd.Role);
            user_roleadd.UserId = $scope.user;
            user_roleadd.RoleId = $scope.role;
            username = $('#user').find("option:selected").text();
            rolename = $('#role').find("option:selected").text();
            user_roleService.create(user_roleadd).then(function (backdata) {
                var temp = {
                    UserId: user_roleadd.UserId,
                    RoleId: user_roleadd.RoleId,
                    UserName: username,
                    RoleName: rolename,
                }
                addUser_Role(temp);
            });
        };
        //向列表添加数据
        var addUser_Role = function (user_role) {
            $scope.$root.user_roles.push(user_role);
            $scope.$root.edit.user_role = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editUser_Role = function (userid, roleid, user_role) {
            for (var i = 0; i < $scope.$root.user_roles.length; i++) {
                if ($scope.$root.user_roles[i].UserId == userid && $scope.$root.user_roles[i].RoleId == roleid) {
                    $scope.$root.user_roles.splice(i, 1, user_role);
                    break;
                }
            }
            $scope.$root.edit.user_role = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheUser_Roles")));