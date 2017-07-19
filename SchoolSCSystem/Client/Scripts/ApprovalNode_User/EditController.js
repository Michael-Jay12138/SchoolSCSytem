(function (app) {
    var EditController = function ($scope, approvalnode_userService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.approvalnode_user = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.approvalnode_user.NodeId && $scope.edit.approvalnode_user.UserId) {
                updateApprovalNode_User();
            }
            else {
                createApprovalNode_User();
            }
        };
        //更新数据
        var updateApprovalNode_User = function () {
            var approvalnode_userupd, nodeid, userid;
            approvalnode_userupd = $scope.edit.approvalnode_user;
            nodeid = $scope.edit.approvalnode_user.NodeId;
            userid = $scope.edit.approvalnode_user.UserId;
            delete (approvalnode_userupd.ApprovalNode);
            delete (approvalnode_userupd.User);
            approvalnode_userupd.NodeId = Number($scope.approvalnode);
            approvalnode_userupd.UserId = Number($scope.user);
            nodename = $('#node').find("option:selected").text();
            username = $('#user').find("option:selected").text();
            approvalnode_userService.update(nodeid, userid, approvalnode_userupd).then(function () {
                var temp = {
                    NodeId: approvalnode_userupd.NodeId,
                    UserId: approvalnode_userupd.UserId,
                    UserName: username,
                    ApprovalNode: nodename,
                }
                editApprovalNode_User(nodeid, userid, temp);
            })
        };
        //添加数据
        var createApprovalNode_User = function () {
            var approvalnode_useradd;
            approvalnode_useradd = $scope.edit.approvalnode_user;
            delete (approvalnode_useradd.ApprovalNode);
            delete (approvalnode_useradd.User);
            approvalnode_useradd.NodeId = $scope.approvalnode;
            approvalnode_useradd.UserId = $scope.user;
            nodename = $('#node').find("option:selected").text();
            username = $('#user').find("option:selected").text();
            approvalnode_userService.create(approvalnode_useradd).then(function () {
                var temp = {
                    NodeId: approvalnode_useradd.NodeId,
                    UserId: approvalnode_useradd.UserId,
                    NodeName: nodename,
                    NodeName: username,
                }
                addApprovalNode_User(temp);
            });
        };
        //向列表添加数据
        var addApprovalNode_User = function (approvalnode_user) {
            $scope.$root.approvalnode_users.push(approvalnode_user);
            $scope.$root.edit.approvalnode_user = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editApprovalNode_User = function (nodeid, userid, approvalnode_user) {
            for (var i = 0; i < $scope.$root.approvalnode_users.length; i++) {
                if ($scope.$root.approvalnode_users[i].NodeId == nodeid && $scope.$root.approvalnode_users[i].UserId == userid) {
                    $scope.$root.approvalnode_users.splice(i, 1, approvalnode_user);
                    break;
                }
            }
            $scope.$root.edit.approvalnode_user = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheApprovalNode_Users")));