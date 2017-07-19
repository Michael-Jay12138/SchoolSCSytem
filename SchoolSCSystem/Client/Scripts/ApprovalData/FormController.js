(function (app) {
    var FormController = function ($scope, approvalDataService) {
        var userid = getCookie("userid");
        var username = getCookie("name");
        $.get("/api/user/GetUsers").then(function (result_cr) {
        $.get("/api/user/GetUsersByUser?userid="+userid).then(function (result_u) {
                $.get("/api/approvalprocess/GetApprovalProcesses").then(function (result_a) {
                    $.get("/api/course/GetCourses").then(function (result_c) {
                        $scope.edit = {
                            approvalData: {
                                ApprovalProcess: result_a,
                                Creator: result_cr,
                                User: result_u,
                                SelectCourses: result_c,
                                State: '审批中',
                                Step: 1,
                            },
                            model: '新增'
                        };
                        if (result_u != null)
                            $scope.user = result_u[0].UserId.toString();
                        else
                            $scope.user = '0';
                        $scope.creator = userid;
                        $scope.approvalprocess = result_a[0].ProcessId.toString();
                        $scope.approvaltype = '选课';
                        $scope.selectcourses = result_c[0].CourseId.toString();
                        $scope.$apply();
                    })
                })
        })
        })
        //获取cookie
            function getCookie(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            }
        //添加数据
            $scope.createApprovalData = function () {
                var approvaldataadd;
                var approvaltype = $('#approvaltype').find("option:selected").text();
                var username = $('#user').find("option:selected").text();
                var flowname = $('#approvalprocess').find("option:selected").text();
                var creatorname = $('#creator').find("option:selected").text();
                approvaldataadd = $scope.edit.approvalData;
                delete (approvaldataadd.User);
                delete (approvaldataadd.Flow);
                delete (approvaldataadd.Creator);
                delete (approvaldataadd.ApprovalProcess);
                approvaldataadd.ApprovalType = approvaltype;
                approvaldataadd.UserId = Number($scope.user);
                approvaldataadd.FlowId = Number($scope.approvalprocess);
                approvaldataadd.CreatorId = Number($scope.creator);
                approvaldataadd.SelectCourseId = $scope.selectcourses;
                approvaldataadd.SelectLeaveId = $scope.selectleaves;
                approvaldataadd.SelectClassRoomId = $scope.selectclassrooms;
                delete (approvaldataadd.SelectCourses);
                delete (approvaldataadd.SelectLeaves);
                delete (approvaldataadd.SelectClassRooms);
                approvalDataService.create(approvaldataadd).then(function () {
                    location.href = "#/approvalData/list";
                    location.reload([true]);
                })
            };
            $scope.getApproval = function () {
                var id = $scope.approvaltype;
                $scope.edit.approvalData.SelectCourses = null;
                $scope.edit.approvalData.SelectLeaves = null;
                $scope.edit.approvalData.SelectClassRooms = null;
                $scope.selectcourses = null;
                $scope.selectleaves = null;
                $scope.selectclassrooms = null;
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

                if (!$scope.$$phase) {
                    $scope.$apply();
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

            $scope.CourseApproval = function () {
                if ($scope.edit != null)
                    if ($scope.edit.approvalData != null)
                        if ($scope.edit.approvalData.SelectCourses != null)
                            return true;
            }

            $scope.LeaveApproval = function () {
                if ($scope.edit != null)
                    if ($scope.edit.approvalData != null)
                        if ($scope.edit.approvalData.SelectLeaves != null)
                            return true;
            }

            $scope.ClassRoomApproval = function () {
                if ($scope.edit != null)
                    if ($scope.edit.approvalData != null)
                        if ($scope.edit.approvalData.SelectClassRooms != null)
                            return true;
            }
        };
    
    app.controller("FormController", FormController);
}(angular.module("atTheApprovalDatas")));