(function (app) {
    var approvalProcessService = function ($http, approvalProcessApiUrl) {
        var getAll = function () {
            return $http.get(approvalProcessApiUrl + "GetApprovalProcesss");
        };

        var getById = function (id) {
            return $http.get(approvalProcessApiUrl + "GetApprovalProcess/" + id);
        };

        var update = function (approvalProcess) {
            return $http.put(approvalProcessApiUrl + "PutApprovalProcess/" + approvalProcess.ProcessId, approvalProcess);
        };

        var create = function (approvalProcess) {
            return $http.post(approvalProcessApiUrl + "PostApprovalProcess/", approvalProcess);
        };

        var destroy = function (approvalProcess) {
            return $http.delete(approvalProcessApiUrl + "DeleteApprovalProcess/" + approvalProcess.ProcessId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("approvalProcessService", approvalProcessService);
}(angular.module("atTheApprovalProcesses")))