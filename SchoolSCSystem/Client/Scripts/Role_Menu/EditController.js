(function (app) {
    var EditController = function ($scope, role_menuService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.role_menu = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.role_menu.RoleId && $scope.edit.role_menu.MenuId) {
                updateRole_Menu();
            }
            else {
                createRole_Menu();
            }
        };
        //更新数据
        var updateRole_Menu = function () {
            var role_menuupd, roleid,menuid;
            role_menuupd = $scope.edit.role_menu;
            roleid = $scope.edit.role_menu.RoleId;
            menuid = $scope.edit.role_menu.MenuId;
            delete (role_menuupd.Role);
            delete (role_menuupd.Menu);
            role_menuupd.RoleId = Number($scope.role);
            role_menuupd.MenuId = Number($scope.menu);
            rolename = $('#role').find("option:selected").text();
            menuname = $('#menu').find("option:selected").text();
            role_menuService.update(roleid, menuid, role_menuupd).then(function () {
                var temp = {
                    RoleId: role_menuupd.RoleId,
                    MenuId: role_menuupd.MenuId,
                    RoleName: rolename,
                    MenuName: menuname,
                }
                editRole_Menu(roleid, menuid, temp);
            })
        };
        //添加数据
        var createRole_Menu = function () {
            var role_menuadd;
            role_menuadd = $scope.edit.role_menu;
            delete (role_menuadd.Role);
            delete (role_menuadd.Menu);
            role_menuadd.RoleId = $scope.role;
            role_menuadd.MenuId = $scope.menu;
            rolename = $('#role').find("option:selected").text();
            menuname = $('#menu').find("option:selected").text();
            role_menuService.create(role_menuadd).then(function () {
                var temp = {
                    RoleId: role_menuadd.RoleId,
                    MenuId: role_menuadd.MenuId,
                    RoleName: rolename,
                    MenuName: menuname,
                }
                addRole_Menu(temp);
            });
        };
        //向列表添加数据
        var addRole_Menu = function (role_menu) {
            $scope.$root.role_menus.push(role_menu);
            $scope.$root.edit.role_menu = null;


            //location.reload([true]);
        }
        //更新列表数据
        var editRole_Menu = function (roleid,menuid, role_menu) {
            for (var i = 0; i < $scope.$root.role_menus.length; i++) {
                if ($scope.$root.role_menus[i].RoleId == roleid && $scope.$root.role_menus[i].MenuId == menuid) {
                    $scope.$root.role_menus.splice(i, 1, role_menu);
                    break;
                }
            }
            $scope.$root.edit.role_menu = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheRole_Menus")));