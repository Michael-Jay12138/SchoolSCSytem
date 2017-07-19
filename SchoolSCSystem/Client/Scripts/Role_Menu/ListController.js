(function (app) {
    var ListController = function ($scope, role_menuService) {
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
        $.get("/api/role_menu/GetRole_MenusNum").then(function (result_un) {
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
            $.get("/api/role_menu/GetRole_MenusByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                $scope.$root.role_menus = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (role_menuname) {
            $.get("/api/role_menu/GetRole_MenusBySearch?" + "searchString=" + role_menuname).then(function (result) {
                $scope.$root.role_menus = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("role_menuname");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("role_menuname") != null)
            getBySerach(getCookie("role_menuname"));
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
            $.get("/api/role/GetRoles").then(function (result_r) {
                $.get("/api/menu/GetMenus").then(function (result_m) {
                    $scope.$root.edit = {
                        role_menu: {
                            Role: result_r,
                            Menu: result_m,
                        },
                        model: '新增'
                    };
                    $scope.$root.role = result_r[0].RoleId.toString();
                    $scope.$root.menu = result_m[0].MenuId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击编辑按钮
        $scope.edit = function (role_menu) {
            $.get("/api/role/GetRoles").then(function (result_r) {
                $.get("/api/menu/GetMenus").then(function (result_m) {
                    $scope.$root.edit = {
                        role_menu: {
                            RoleId: role_menu.RoleId,
                            MenuId:role_menu.MenuId,
                            Role: result_r,
                            Menu: result_m,
                        },
                        model: '编辑'
                    };
                    $scope.$root.role = role_menu.RoleId.toString();
                    $scope.$root.menu = role_menu.MenuId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击删除按钮
        $scope.confirmdelete = function (role_menu) {
            $scope.$root.delrole_menu = role_menu;
            //$.get("/api/role_menu/GetRole_Menu?roleid=" + role_menu.RoleId + "&menuid=" + role_menu.MenuId).then(function (result) {
            //    $scope.$root.delrole_menu = result;
            //    $scope.$apply();
            //});
        };
        //确认删除
        $scope.deleterole_menu = function () {
            role_menuService.destroy($scope.$root.delrole_menu)
                .then(function () {
                    removeRole_MenuById($scope.$root.delrole_menu.RoleId, $scope.$root.delrole_menu.MenuId);
                });
        }
        //从列表中把删除项移除
        var removeRole_MenuById = function (roleid,menuid) {
            for (var i = 0; i < $scope.role_menus.length; i++) {
                if ($scope.role_menus[i].RoleId == roleid && $scope.role_menus[i].MenuId == menuid) {
                    $scope.role_menus.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheRole_Menus")));