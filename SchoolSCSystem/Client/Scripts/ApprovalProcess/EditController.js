(function (app) {
    var EditController = function ($scope, approvalProcessService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.approvalProcess = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.approvalProcess.ProcessId) {
                updateApprovalProcess();
            }
            else {
                createApprovalProcess();
            }
        };
        //更新数据
        var updateApprovalProcess = function () {
            var approvalProcessupd;
            approvalProcessupd = $scope.edit.approvalProcess;
            approvalProcessService.update(approvalProcessupd).then(function () {
                editApprovalProcess(approvalProcessupd);
            })
        };
        //添加数据
        var createApprovalProcess = function () {
            var approvalProcessadd;
            approvalProcessadd = $scope.edit.approvalProcess;
            approvalProcessadd.ProcessId = 0;
            approvalProcessService.create(approvalProcessadd).then(function (backdata) {
                approvalProcessadd.ProcessId = backdata.data.ProcessId;
                addApprovalProcess(approvalProcessadd);
                    });
        };
        //向列表添加数据
        var addApprovalProcess = function (approvalProcess)
        {
            $scope.$root.approvalProcesses.push(approvalProcess);
            $scope.$root.edit.approvalProcess = null;
            
            //location.reload([true]);
        }
        //更新列表数据
        var editApprovalProcess = function (approvalProcess) {
            for (var i = 0; i < $scope.$root.approvalProcesses.length; i++) {
                if ($scope.$root.approvalProcesses[i].ProcessId == approvalProcess.ProcessId) {
                    $scope.$root.approvalProcesses.splice(i, 1, approvalProcess);
                    break;
                }
            }
            $scope.$root.edit.approvalProcess = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheApprovalProcesses")));