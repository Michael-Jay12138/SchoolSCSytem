
(function (app) {
    var ListController = function ($scope, classroom_userService) {
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
        $.get("/api/classroom_user/GetClassRoom_UsersNum").then(function (result_un) {
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
            $.get("/api/classroom_user/GetClassRoom_UsersByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                $scope.$root.classroom_users = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (classroom_username) {
            $.get("/api/classroom_user/GetClassRoom_UsersBySearch?" + "searchString=" + classroom_username).then(function (result) {
                $scope.$root.classroom_users = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("classroom_username");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("classroom_username") != null)
            getBySerach(getCookie("classroom_username"));
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
            $.get("/api/classroom/GetClassRooms").then(function (result_r) {
                $.get("/api/user/GetUsers").then(function (result_m) {
                    $scope.$root.edit = {
                        classroom_user: {
                            ClassRoom: result_r,
                            User: result_m,
                        },
                        model: '新增'
                    };
                    $scope.$root.classroom = result_r[0].ClassRoomId.toString();
                    $scope.$root.user = result_m[0].UserId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击编辑按钮
        $scope.edit = function (classroom_user) {
            $.get("/api/classroom/GetClassRooms").then(function (result_r) {
                $.get("/api/user/GetUsers").then(function (result_m) {
                    $scope.$root.edit = {
                        classroom_user: {
                            ClassRoomId: classroom_user.ClassRoomId,
                            UserId: classroom_user.UserId,
                            ClassRoom: result_r,
                            User: result_m,
                        },
                        model: '编辑'
                    };
                    $scope.$root.classroom = classroom_user.ClassRoomId.toString();
                    $scope.$root.user = classroom_user.UserId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击删除按钮
        $scope.confirmdelete = function (classroom_user) {
            $scope.$root.delclassroom_user = classroom_user;
            //$.get("/api/classroom_user/GetClassRoom_User?classroomid=" + classroom_user.ClassRoomId + "&userid=" + classroom_user.UserId).then(function (result) {
            //    $scope.$root.delclassroom_user = result;
            //    $scope.$apply();
            //});
        };
        //确认删除
        $scope.deleteclassroom_user = function () {
            classroom_userService.destroy($scope.$root.delclassroom_user)
                .then(function () {
                    removeClassRoom_UserById($scope.$root.delclassroom_user.ClassRoomId, $scope.$root.delclassroom_user.UserId);
                });
        }
        //从列表中把删除项移除
        var removeClassRoom_UserById = function (classroomid, userid) {
            for (var i = 0; i < $scope.classroom_users.length; i++) {
                if ($scope.classroom_users[i].ClassRoomId == classroomid && $scope.classroom_users[i].UserId == userid) {
                    $scope.classroom_users.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheClassRoom_Users")));