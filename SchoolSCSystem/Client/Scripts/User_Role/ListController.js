(function (app) {
    var ListController = function ($scope, user_roleService) {
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
        $.get("/api/user_role/GetUser_RolesNum").then(function (result_un) {
            if (result_un % $scope.pageSize == 0)
                $scope.un = result_un / $scope.pageSize;
            else
                $scope.un = parseInt(result_un / $scope.pageSize) + 1;
            var pages = "[{";
            for (var i = 1; i <= $scope.un; i++) {
                if (i == $scope.un)
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
            if (page < 1 || page > $scope.sn)
                return;
            $.get("/api/user_role/GetUser_RolesByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                //var temp;
                //for (var i = 0; i < result.length; i++) {
                //    temp = result[i];
                //    $.get("/api/role/GetRole?id=" + temp.RoleId).then(function (result_r) {
                //        $.extend(temp, { RoleName: result_r.RoleName });
                //        result[i] = temp;
                //    })
                //}
                $scope.$root.user_roles = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (user_rolename) {
            $.get("/api/user_role/GetUser_RolesBySearch?" + "searchString=" + user_rolename).then(function (result) {
                $scope.$root.user_roles = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("user_rolename");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("user_rolename") != null)
            getBySerach(getCookie("user_rolename"));
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
            $.get("/api/user/GetUsers").then(function (result_u) {
                $.get("/api/role/GetRoles").then(function (result_r) {
                    $scope.$root.edit = {
                        user_role: {
                            User: result_u,
                            Role: result_r
                        },
                        model: '新增'
                    };
                    $scope.$root.user = result_u[0].UserId.toString();
                    $scope.$root.role = result_r[0].RoleId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击编辑按钮
        $scope.edit = function (user_role) {
            $.get("/api/user/GetUsers").then(function (result_u) {
                $.get("/api/role/GetRoles").then(function (result_r) {
                    $scope.$root.edit = {
                        user_role: {
                            UserId: user_role.UserId,
                            RoleId: user_role.RoleId,
                            User: result_u,
                            Role: result_r,
                        },
                        model: '编辑'
                    };
                    $scope.$root.user = user_role.UserId.toString();
                    $scope.$root.role = user_role.RoleId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击删除按钮
        $scope.confirmdelete = function (user_role) {
            $scope.$root.deluser_role = user_role;
            //$.get("/api/user_role/GetUser_Role?userid=" + user_role.UserId + "&roleid=" + user_role.RoleId).then(function (result) {
            //    $scope.$root.deluser_role = result;
            //    $scope.$apply();
            //});
        };
        //确认删除
        $scope.deleteuser_role = function () {
            user_roleService.destroy($scope.$root.deluser_role)
                .then(function () {
                    removeUser_RoleById($scope.$root.deluser_role.UserId, $scope.$root.deluser_role.RoleId);
                });
        }
        //从列表中把删除项移除
        var removeUser_RoleById = function (userid,roleid) {
            for (var i = 0; i < $scope.user_roles.length; i++) {
                if ($scope.user_roles[i].UserId == userid && $scope.user_roles[i].RoleId == roleid) {
                    $scope.user_roles.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheUser_Roles")));