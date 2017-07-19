(function (app) {
    var ListController = function ($scope, approvalDataService) {
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
        $.get("/api/approvalData/GetApprovalDatasNum").then(function (result_un) {
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
            $.get("/api/approvalData/GetApprovalDatasByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                $scope.$root.approvalDatas = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (approvalDataname) {
            $.get("/api/approvalData/GetApprovalDatasBySearch?" + "searchString=" + approvalDataname).then(function (result) {
                $scope.$root.approvalDatas = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("approvalDataname");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("approvalDataname") != null)
            getBySerach(getCookie("approvalDataname"));
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
                $.get("/api/approvalprocess/GetApprovalProcesses").then(function (result_a) {
                    $.get("/api/course/GetCourses").then(function (result_c) {
                        $.get("/api/approvalnode/GetApprovalNodes").then(function (result_n) {
                            $scope.$root.edit = {
                                approvalData: {
                                ApprovalProcess: result_a,
                                Creator: result_u,
                                User: result_u,
                                SelectCourses: result_c,
                                State:'审批中',
                                Step: result_n,
                                },
                                model: '新增'
                            };
                            $scope.$root.user = result_u[0].UserId.toString();
                        $scope.$root.creator = result_u[0].UserId.toString();
                        $scope.$root.approvalprocess = result_a[0].ProcessId.toString();
                        $scope.$root.approvalprocess = '2';
                        $scope.$root.steps = result_n[0].NodeId.toString();
                        $scope.$root.approvaltype = '选课';
                        $scope.$root.selectcourses = result_c[0].CourseId.toString();
                        $scope.$apply();
                        })
                    })
                })
            })
        };
        //点击编辑按钮
        $scope.edit = function (approvalData) {
            $.get("/api/user/GetUsers").then(function (result_u){
                $.get("/api/approvalprocess/GetApprovalProcesses").then(function (result_a) {
                    $scope.$root.edit = {
                        approvalData: {
                            DataId: approvalData.DataId,
                            UserId: approvalData.UserId,
                            FlowId: approvalData.FlowId,
                            State: approvalData.State,
                            CreatorId: approvalData.CreatorId,
                            ApprovalType: approvalData.ApprovalType,
                            SelectCourseId: approvalData.SelectCourseId,
                            SelectLeaveId: approvalData.SelectLeaveId,
                            SelectClassRoomId: approvalData.SelectClassRoomId,
                            User: result_u,
                            ApprovalProcess: result_a,
                            Creator: result_u,
                            SelectCourses: null,
                            SelectLeaves: null,
                            SelectClassRooms: null
                        },
                        model: '编辑'
                    };
                    $scope.$root.user = approvalData.UserId.toString();
                    $scope.$root.creator = approvalData.CreatorId.toString();
                    $scope.$root.approvalprocess = approvalData.FlowId.toString();
                    $scope.$root.approvaltype = approvalData.ApprovalType;
                    $scope.$apply();
                    if (approvalData.FlowName == '选课审批') {
                        $.get("/api/approvalnode/GetApprovalNodesByProcessId?processid=" + $scope.approvalprocess).then(function (result) {
                            $scope.$root.edit.approvalData.Step = result;
                            $scope.$root.steps = approvalData.Step.toString();
                            $scope.$apply();
                        })
                    }
                    else if (approvalData.FlowName == '请假审批') {
                        $.get("/api/approvalnode/GetApprovalNodesByProcessId?processid=" + $scope.approvalprocess).then(function (result) {
                            $scope.$root.edit.approvalData.Step = result;
                            $scope.$root.steps = approvalData.Step.toString();
                            $scope.$apply();
                        })
                    }
                    else {
                        $.get("/api/approvalnode/GetApprovalNodesByProcessId?processid=" + $scope.approvalprocess).then(function (result) {
                            $scope.$root.edit.approvalData.Step = result;
                            $scope.$root.steps = approvalData.Step.toString();
                            $scope.$apply();
                        })
                    }
                    if (approvalData.ApprovalType == '选课') {
                        $.get("/api/course/GetCourses").then(function (result) {
                            $scope.$root.edit.approvalData.SelectCourses = result;
                            $scope.$root.selectcourses = approvalData.SelectCourseId.toString();
                            $scope.$apply();
                        })
                    }
                    else if (approvalData.ApprovalType == '请假') {
                        $.get("/api/leave/GetLeaves").then(function (result) {
                            $scope.$root.edit.approvalData.SelectLeaves = result;
                            $scope.$root.selectleaves = approvalData.SelectLeaveId.toString();
                            $scope.$apply();
                        })
                    }
                    else {
                        $.get("/api/classroom/GetClassRooms").then(function (result) {
                            $scope.$root.edit.approvalData.SelectClassRooms = result;
                            $scope.$root.selectclassrooms = approvalData.SelectClassRoomId.toString();
                            $scope.$apply();
                        })
                    }
                    })
                })
        };
        function getProcess(id) {
            if (id == '选课流程') {
                $.get("/api/approvalnode/GetApprovalNodesByProcessId?processid=" + id).then(function (result) {
                    $scope.edit.approvalData.Step = result;
                    $scope.steps = result[0].NodeId.toString();
                    $scope.$apply();
                })
            }
            else if (id == '请假流程') {
                $.get("/api/approvalnode/GetApprovalNodesByProcessId?processid=" + id).then(function (result) {
                    $scope.edit.approvalData.Step = result;
                    $scope.steps = result[0].NodeId.toString();
                    $scope.$apply();
                })
            }
            else {
                $.get("/api/approvalnode/GetApprovalNodesByProcessId?processid=" + id).then(function (result) {
                    $scope.edit.approvalData.Step = result;
                    $scope.steps = result[0].NodeId.toString();
                    $scope.$apply();
                })
            }
        }
        function getApproval(id) {
            if (id == '选课') {
                $.get("/api/course/GetCourses").then(function (result) {
                    $scope.edit.approvalData.SelectCourses = result;
                    $scope.selectcourses = result[0].CourseId.toString();
                    $scope.$apply();
                })
            }
            else if (id == '请假') {
                $.get("/api/leave/GetLeaves").then(function (result) {
                    $scope.edit.approvalData.SelectLeaves = result;

                    $scope.selectleaves = result[0].LeaveId.toString();
                    $scope.$apply();
                })
            }
            else {
                $.get("/api/classroom/GetClassRooms").then(function (result) {
                    $scope.edit.approvalData.SelectClassRooms = result;

                    $scope.selectclassrooms = result[0].ClassRoomId.toString();
                    $scope.$apply();
                })
            }
        }

        //点击删除按钮
        $scope.confirmdelete = function (approvalData) {
            $scope.$root.delapprovalData = approvalData;
        };
        //确认删除
        $scope.deleteapprovalData = function () {
            approvalDataService.destroy($scope.$root.delapprovalData)
                .then(function () {
                    removeApprovalDataById($scope.$root.delapprovalData.DataId);
                });
        }
        //从列表中把删除项移除
        var removeApprovalDataById = function (id) {
            for (var i = 0; i < $scope.approvalDatas.length; i++) {
                if ($scope.approvalDatas[i].DataId == id) {
                    $scope.approvalDatas.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheApprovalDatas")));