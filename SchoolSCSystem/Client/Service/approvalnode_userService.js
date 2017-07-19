(function (app) {
    var approvalnode_userService = function ($http, approvalnode_userApiUrl) {
        var getAll = function () {
            return $http.get(approvalnode_userApiUrl + "GetApprovalNode_Users");
        };

        var getById = function (nodeid, userid) {
            return $http.get(approvalnode_userApiUrl + "GetApprovalNode_User?nodeid=" + nodeid + "&userid=" + userid);
        };

        var update = function (nodeid, userid, approvalnode_user) {
            return $http.put(approvalnode_userApiUrl + "PutApprovalNode_User/?nodeid=" + nodeid + "&userid=" + userid + "&approvalnode_user=" + JSON.stringify(approvalnode_user));
        };

        var create = function (approvalnode_user) {
            return $http.post(approvalnode_userApiUrl + "PostApprovalNode_User/", approvalnode_user);
        };

        var destroy = function (approvalnode_user) {
            return $http.delete(approvalnode_userApiUrl + "DeleteApprovalNode_User/?nodeid=" + approvalnode_user.NodeId + "&userid=" + approvalnode_user.UserId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("approvalnode_userService", approvalnode_userService);
}(angular.module("atTheApprovalNode_Users")))