(function (app) {
    var EditController = function ($scope,leaveService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.leaves = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.leaves.LeaveId) {
                updateLeave();
            }
            else {
                createLeave();
            }
        };
        //更新数据
        var updateLeave = function () {
            var leaveupd;
            leaveupd = $scope.edit.leaves;
            leaveService.update(leaveupd).then(function () {
                editLeave(leaveupd);
            })
        };
        //添加数据
        var createLeave = function () {
            var leaveadd;
            leaveadd = $scope.edit.leaves;
            leaveadd.LeaveId = 0;
            leaveService.create(leaveadd).then(function (backdata) {
                leaveadd.LeaveId = backdata.data.LeaveId;
                addLeave(leaveadd);
            });
        };
        //向列表添加数据
        var addLeave = function (leaves) {
            $scope.$root.leaves.push(leaves);
            $scope.$root.edit.leave = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editLeave = function (leaves) {
            for (var i = 0; i < $scope.$root.leaves.length; i++) {
                if ($scope.$root.leaves[i].LeaveId == leaves.LeaveId) {
                    $scope.$root.leaves.splice(i, 1, leaves);
                    leave;
                }
            }
            $scope.$root.edit.leave = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheLeaves")));