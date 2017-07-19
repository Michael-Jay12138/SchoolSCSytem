(function (app) {
    var ListController = function ($scope, approvalnode_userService) {
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
        $.get("/api/approvalnode_user/GetApprovalNode_UsersNum").then(function (result_un) {
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
            $.get("/api/approvalnode_user/GetApprovalNode_UsersByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                //var temp;
                //for (var i = 0; i < result.length; i++) {
                //    temp = result[i];
                //    $.get("/api/role/GetRole?id=" + temp.RoleId).then(function (result_r) {
                //        $.extend(temp, { RoleName: result_r.RoleName });
                //        result[i] = temp;
                //    })
                //}
                $scope.$root.approvalnode_users = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (approvalnode_username) {
            $.get("/api/approvalnode_user/GetApprovalNode_UsersBySearch?" + "searchString=" + approvalnode_username).then(function (result) {
                $scope.$root.approvalnode_users = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("approvalnode_username");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("approvalnode_username") != null)
            getBySerach(getCookie("approvalnode_username"));
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
            $.get("/api/approvalnode/GetApprovalNodes").then(function (result_r) {
                $.get("/api/user/GetUsers").then(function (result_m) {
                    $scope.$root.edit = {
                        approvalnode_user: {
                            ApprovalNode: result_r,
                            User: result_m,
                        },
                        model: '新增'
                    };
                    $scope.$root.approvalnode = result_r[0].NodeId.toString();
                    $scope.$root.user = result_m[0].UserId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击编辑按钮
        $scope.edit = function (approvalnode_user) {
            $.get("/api/approvalnode/GetApprovalNodes").then(function (result_r) {
                $.get("/api/user/GetUsers").then(function (result_m) {
                    $scope.$root.edit = {
                        approvalnode_user: {
                            NodeId: approvalnode_user.NodeId,
                            UserId: approvalnode_user.UserId,
                            ApprovalNode: result_r,
                            User: result_m
                        },
                        model: '编辑'
                    };
                    $scope.$root.approvalnode = approvalnode_user.NodeId.toString();
                    $scope.$root.user = approvalnode_user.UserId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击删除按钮
        $scope.confirmdelete = function (approvalnode_user) {
            $scope.$root.delapprovalnode_user = approvalnode_user;
            //$.get("/api/role_menu/GetRole_Menu?roleid=" + role_menu.RoleId + "&menuid=" + role_menu.MenuId).then(function (result) {
            //    $scope.$root.delrole_menu = result;
            //    $scope.$apply();
            //});
        };
        //确认删除
        $scope.deleteapprovalnode_user = function () {
            approvalnode_userService.destroy($scope.$root.delapprovalnode_user)
                .then(function () {
                    removeApprovalNode_UserById($scope.$root.delapprovalnode_user.NodeId, $scope.$root.delapprovalnode_user.UserId);
                });
        }
        //从列表中把删除项移除
        var removeApprovalNode_UserById = function (nodeid, userid) {
            for (var i = 0; i < $scope.approvalnode_users.length; i++) {
                if ($scope.approvalnode_users[i].NodeId == nodeid && $scope.approvalnode_users[i].UserId == userid) {
                    $scope.approvalnode_users.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheApprovalNode_Users")));