(function (app) {
    var DetailsController = function ($scope, $routeParams, approvalnode_userService) {
        var nodeid = $routeParams.nodeid;
        var userid = $routeParams.userid;
        //根据id获取需要的数据
        approvalnode_userService.getById(nodeid, userid).then(function (result) {
            $scope.approvalnode_user = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheApprovalNode_Users")));