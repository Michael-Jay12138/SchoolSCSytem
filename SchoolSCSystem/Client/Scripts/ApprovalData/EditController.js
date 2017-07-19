(function (app) {
    var EditController = function ($scope, approvalDataService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.approvalData = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.approvalData.DataId) {
                updateApprovalData();
            }
            else {
                createApprovalData();
            }
        };
        //更新数据
        var updateApprovalData = function () {
            var approvaldataupd;
            approvaldataupd = $scope.edit.approvalData;
            delete (approvaldataupd.User);
            delete (approvaldataupd.Flow);
            delete (approvaldataupd.Creator);
            delete (approvaldataupd.ApprovalProcess);
            delete (approvaldataupd.SelectCourses);
            delete (approvaldataupd.SelectLeaves);
            delete (approvaldataupd.SelectClassRooms);
            delete (approvaldataupd.Step);
            approvaldataupd.UserId = Number($scope.user);
            approvaldataupd.FlowId = Number($scope.approvalprocess);
            approvaldataupd.CreatorId = Number($scope.creator);
            username = $('#user').find("option:selected").text();
            flowname = $('#approvalprocess').find("option:selected").text();
            creatorname = $('#creator').find("option:selected").text();
            approvaldataupd.Step = $scope.steps;
            approvaldataupd.ApprovalType = $scope.approvaltype;
            approvaldataupd.SelectCourseId = $scope.selectcourses;
            approvaldataupd.SelectLeaveId = $scope.selectleaves;
            approvaldataupd.SelectClassRoomId = $scope.selectclassrooms;
            approvalDataService.update(approvaldataupd).then(function () {
                var temp = {
                    DataId: approvaldataupd.DataId,
                    UserId: approvaldataupd.UserId,
                    FlowId: approvaldataupd.FlowId,
                    CreaotrId:approvaldataupd.CreaotrId,
                    State: approvaldataupd.State,
                    Step: approvaldataupd.Step,
                    ApprovalType: approvaldataupd.ApprovalType,
                    SelectCourseId: approvaldataupd.SelectCourseId,
                    SelectLeaveId: approvaldataupd.SelectLeaveId,
                    SelectClassRoomId: approvaldataupd.SelectClassRoomId,
                    UserName: username,
                    FlowName: flowname,
                    CreatorName: username
                }
                editApprovalData(temp);
            })
        };
        //添加数据
        var createApprovalData = function () {
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
            approvaldataadd.Step = Number($scope.steps);
            approvaldataadd.CreatorId = Number($scope.creator);
            approvaldataadd.SelectCourseId = $scope.selectcourses;
            approvaldataadd.SelectLeaveId = $scope.selectleaves;
            approvaldataadd.SelectClassRoomId = $scope.selectclassrooms;
            delete (approvaldataadd.SelectCourses);
            delete (approvaldataadd.SelectLeaves);
            delete (approvaldataadd.SelectClassRooms);
            approvalDataService.create(approvaldataadd).then(function (backdata) {
                var temp = {
                    DataId: backdata.data.DataId,
                    UserId: backdata.data.UserId,
                    FlowId: backdata.data.FlowId,
                    CreatorId: backdata.data.CreatorId,
                    State: backdata.data.State,
                    Step: backdata.data.Step,
                    ApprovalType: backdata.data.ApprovalType,
                    SelectCourseId:backdata.data.SelectCourseId,
                    SelectLeaveId:backdata.data.SelectLeaveId,
                    SelectClassRoomId:backdata.data.SelectClassRoomId,
                    UserName: username,
                    FlowName: flowname,
                    CreatorName: creatorname
                }
                addApprovalData(temp);
            })
        };
        //向列表添加数据
        var addApprovalData = function (approvalData)
        {
            $scope.$root.approvalDatas.push(approvalData);
            $scope.$root.edit.approvalData = null;
            
            //location.reload([true]);
        }
        //更新列表数据
        var editApprovalData = function (approvalData) {
            for (var i = 0; i < $scope.$root.approvalDatas.length; i++) {
                if ($scope.$root.approvalDatas[i].DataId == approvalData.DataId) {
                    $scope.$root.approvalDatas.splice(i, 1, approvalData);
                    break;
                }
            }
            $scope.$root.edit.approvalData = null;
        };

        $scope.Process = function () {
            if ($scope.edit != null)
                if ($scope.edit.approvalData != null)
                    if ($scope.edit.approvalData.Step != null)
                        return true;
        }

        $scope.getProcess = function () {
            var id = $scope.approvalprocess;
            $scope.edit.approvalData.Step = null;
            $scope.steps = null;
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

            if (!$scope.$$phase) {
                $scope.$apply();
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
                    $scope.edit.approvalData.SelectCourses=result ;
                    $scope.selectcourses = result[0].CourseId.toString();
                    $scope.$apply();
                })
            }
            else if (id == '请假') {
                $.get("/api/leave/GetLeaves").then(function (result) {
                    $scope.edit.approvalData.SelectLeaves= result;

                    $scope.selectleaves = result[0].LeaveId.toString();
                    $scope.$apply();
                })
            }
            else {
                $.get("/api/classroom/GetClassRooms").then(function (result) {
                    $scope.edit.approvalData.SelectClassRooms=result;

                    $scope.selectclassrooms = result[0].ClassRoomId.toString();
                    $scope.$apply();
                })
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }
    };
    app.controller("EditController", EditController);
}(angular.module("atTheApprovalDatas")));