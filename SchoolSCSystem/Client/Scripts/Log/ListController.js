(function (app) {
    var ListController = function ($scope, logService) {
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
        $.get("/api/log/GetLogsNum").then(function (result_un) {
            if (result_un % $scope.pageSize == 0)
                $scope.un = result_un / $scope.pageSize;
            else
                $scope.un = parseInt(result_un / $scope.pageSize) + 1;
            console.log($scope.un);
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
            $.get("/api/log/GetLogsByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                $scope.$root.logs = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (Description) {
            $.get("/api/log/GetLogsBySearch?" + "searchString=" + Description).then(function (result) {
                $scope.$root.logs = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("Description");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("Description") != null)
            getBySerach(getCookie("Description"));
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
                log: {
                },
                model: '新增'
            };
            //$scope.$apply();
        };
        //点击编辑按钮
        $scope.edit = function (log) {
            $scope.$root.edit = {
                log: {
                    LogId: log.LogId,
                    LogDate: log.LogDate,
                    Result: log.Result,
                    Description: log.Description,
                    Type: log.Type
                },
                model: '编辑'
            };
            //$scope.$apply();
        };
        //点击删除按钮
        $scope.confirmdelete = function (log) {
            $scope.$root.dellog = log;
        };
        //确认删除
        $scope.deletelog = function () {
            logService.destroy($scope.$root.dellog)
                .then(function () {
                    removeLogById($scope.$root.dellog.LogId);
                });
        }
        //从列表中把删除项移除
        var removeLogById = function (id) {
            for (var i = 0; i < $scope.logs.length; i++) {
                if ($scope.logs[i].LogId == id) {
                    $scope.logs.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheLogs")));