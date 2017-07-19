(function (app) {
    var approvalnodeService = function ($http, approvalnodeApiUrl) {
        var getAll = function () {
            return $http.get(approvalnodeApiUrl + "GetApprovalNodes");
        };

        var getById = function (id) {
            return $http.get(approvalnodeApiUrl + "GetApprovalNode/" + id);
        };

        var update = function (approvalnode) {
            return $http.put(approvalnodeApiUrl + "PutApprovalNode/" + approvalnode.NodeId, approvalnode);
        };

        var create = function (approvalnode) {
            return $http.post(approvalnodeApiUrl + "PostApprovalNode/", approvalnode);
        };

        var destroy = function (approvalnode) {
            return $http.delete(approvalnodeApiUrl + "DeleteApprovalNode/" + approvalnode.NodeId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("approvalnodeService", approvalnodeService);
}(angular.module("atTheApprovalNodes")))