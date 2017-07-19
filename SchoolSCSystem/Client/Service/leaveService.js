(function (app) {
    var leaveService = function ($http, leaveApiUrl) {
        var getAll = function () {
            return $http.get(leaveApiUrl + "GetLeaves");
        };

        var getById = function (id) {
            return $http.get(leaveApiUrl + "GetLeave/" + id);
        };

        var update = function (leaves) {
            return $http.put(leaveApiUrl + "PutLeave/" + leaves.LeaveId, leaves);
        };

        var create = function (leaves) {
            return $http.post(leaveApiUrl + "PostLeave/", leaves);
        };

        var destroy = function (leaves) {
            return $http.delete(leaveApiUrl + "DeleteLeave/" + leaves.LeaveId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("leaveService", leaveService);
}(angular.module("atTheLeaves")))