﻿(function (app) {
    var ListController = function ($scope, roleService) {
        if (getCookie("userid") != null && getCookie("userid") != '')
            $.get("/api/user_role/GetUser_Role?userid=" + getCookie("userid")).then(function (result) {
                $scope.IsManager = result;
            })
        else {
            $scope.IsManager = false;
        }
        //当前页面默认为1显示10行数据
        $scope.page = 1;
        $scope.pageSize = 10;
        //获取页面总数
        $.get("/api/role/GetRolesNum").then(function (result_rn) {
            if (result_rn % $scope.pageSize == 0)
                $scope.rn = result_rn / $scope.pageSize;
            else
                $scope.rn = parseInt(result_rn / $scope.pageSize) + 1;
            var pages = "[{";
            for (var i = 1; i <= $scope.rn; i++) {
                if (i == $scope.rn)
                    pages = pages + '"page":' + i;
                else
                    pages = pages + '"page":' + i + "},{";
            }
            pages += "}]";
            var obj = eval(pages);
            $scope.pages = obj;
        })
        //判断是否已登录
        $scope.haveLogin = function () {
            return getCookie("name") != null
        }
        //获取cookie
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        //删除cookie
        function delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        }
        //根据当前页面获取数据
        var getByPage = function (page) {
            if (page < 1 || page > $scope.rn)
                return;
            $.get("/api/role/GetRolesByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                $scope.$root.roles = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (rolename) {
            $.get("/api/role/GetRolesBySearch?" + "searchString=" + rolename).then(function (result) {
                $scope.$root.roles = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("rolename");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("rolename") != null)
            getBySerach(getCookie("rolename"));
        else
            getByPage($scope.page);
        //选择第几页
        $scope.selectPage = function (page) {
            $scope.page = page;
            getByPage(page);
        }
        //前一页
        $scope.Previous = function () {
            getByPage(--$scope.page);
        }
        //后一页
        $scope.Next = function () {
            getByPage(++$scope.page);
        }
        //判断是否当前页，用于突出显示
        $scope.isActivePage = function (page) {
            return $scope.page == page;
        }
        //点击新增按钮
        $scope.create = function () {
            $scope.$root.edit = {
                role: {
                },
                model: '新增'
            };
            //$scope.$apply();
        };
        //点击编辑按钮
        $scope.edit = function (role) {
            $scope.$root.edit = {
                role: {
                    RoleId: role.RoleId,
                    RoleName: role.RoleName
                },
                model: '编辑'
            };
            //$scope.$apply();
        };
        //点击删除按钮
        $scope.confirmdelete = function (role) {
            $scope.$root.delrole = role;
        };
        //确认删除
        $scope.deleterole = function () {
            roleService.destroy($scope.$root.delrole)
                .then(function () {
                    removeRoleById($scope.$root.delrole.RoleId);
                });
        }
        //从列表中把删除项移除
        var removeRoleById = function (id) {
            for (var i = 0; i < $scope.roles.length; i++) {
                if ($scope.roles[i].RoleId == id) {
                    $scope.roles.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheRoles")));