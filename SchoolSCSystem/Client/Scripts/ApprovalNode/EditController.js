(function (app) {
    var EditController = function ($scope, approvalnodeService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.approvalnode = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.approvalnode.NodeId) {

                updateApprovalNode();
            }
            else {
                createApprovalNode();
            }
        };
        //更新数据
        var updateApprovalNode = function () {
            var approvalnodeupd;
            approvalnodeupd = $scope.edit.approvalnode;
            approvalnodeService.update(approvalnodeupd).then(function () {
                editApprovalNode(approvalnodeupd);
            })
        };
        //添加数据
        var createApprovalNode = function () {
            var approvalnodeadd;
            approvalnodeadd = $scope.edit.approvalnode;
            approvalnodeadd.NodeId = 0;
            approvalnodeService.create(approvalnodeadd).then(function (backdata) {
                approvalnodeadd.NodeId = backdata.data.NodeId;
                addApprovalNode(approvalnodeadd);
            });
        };
        //向列表添加数据
        var addApprovalNode = function (approvalnode) {
            $scope.$root.approvalnodes.push(approvalnode);
            $scope.$root.edit.approvalnode = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editApprovalNode = function (approvalnode) {
            for (var i = 0; i < $scope.$root.approvalnodes.length; i++) {
                if ($scope.$root.approvalnodes[i].NodeId == approvalnode.NodeId) {
                    $scope.$root.approvalnodes.splice(i, 1, approvalnode);
                    break;
                }
            }
            $scope.$root.edit.approvalnode = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheApprovalNodes")));