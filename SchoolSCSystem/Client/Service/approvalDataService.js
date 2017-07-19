(function (app) {
    var approvalDataService = function ($http, approvalDataApiUrl) {
        var getAll = function () {
            return $http.get(approvalDataApiUrl + "GetApprovalDatas");
        };

        var getById = function (id) {
            return $http.get(approvalDataApiUrl + "GetApprovalData/" + id);
        };

        var update = function (approvalData) {
            return $http.put(approvalDataApiUrl + "PutApprovalData/?id=" + approvalData.DataId + "&approvalData=" + JSON.stringify(approvalData));
        };

        var create = function (approvalData) {
            return $http.post(approvalDataApiUrl + "PostApprovalData/", approvalData);
        };

        var destroy = function (approvalData) {
            return $http.delete(approvalDataApiUrl + "DeleteApprovalData/" + approvalData.DataId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("approvalDataService", approvalDataService);
}(angular.module("atTheApprovalDatas")))