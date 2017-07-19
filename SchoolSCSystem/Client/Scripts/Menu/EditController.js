(function (app) {
    var EditController = function ($scope, menuService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.menu = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.menu.MenuId) {
                updateMenu();
            }
            else {
                createMenu();
            }
        };
        //更新数据
        var updateMenu = function () {
            var menuupd;
            menuupd = $scope.edit.menu;
            var parentname = $('#parentname').find("option:selected").text();
            menuupd.ParentId = $scope.parentname;
            console.log(menuupd);
            menuService.update(menuupd).then(function () {
                menuupd.ParentName = parentname;
                editMenu(menuupd);
            })
        };
        //添加数据
        var createMenu = function () {
            var menuadd;
            menuadd = $scope.edit.menu;
            menuadd.MenuId = 0;
            menuadd.ParentId = $scope.parentname;
            var parentname = $('#parentname').find("option:selected").text();
            menuService.create(menuadd).then(function (backdata) {
                menuadd.MenuId = backdata.data.MenuId;
                menuadd.ParentName = parentname;
                addMenu(menuadd);
            });
        };
        //向列表添加数据
        var addMenu = function (menu) {
            $scope.$root.menus.push(menu);
            $scope.$root.edit.menu = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editMenu = function (menu) {
            for (var i = 0; i < $scope.$root.menus.length; i++) {
                if ($scope.$root.menus[i].MenuId == menu.MenuId) {
                    $scope.$root.menus.splice(i, 1, menu);
                    break;
                }
            }
            $scope.$root.edit.menu = null;
        };
        $scope.getLevel = function () {
            var id = $scope.parentname;
            if (id == 0) {
                $scope.edit.menu.MenuLevel = 1;
            }
            else {
                menuService.getById(id).then(function (result) {
                    $scope.edit.menu.MenuLevel = result.data.MenuLevel + 1;
                });
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    };
    app.controller("EditController", EditController);
}(angular.module("atTheMenus")));