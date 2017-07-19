(function (app) {
    var logService = function ($http, logApiUrl) {
        var getAll = function () {
            return $http.get(logApiUrl + "GetLogs");
        };

        var getById = function (id) {
            return $http.get(logApiUrl + "GetLog/" + id);
        };

        var update = function (log) {
            return $http.put(logApiUrl + "PutLog/" + log.LogId, log);
        };

        var create = function (log) {
            return $http.post(logApiUrl + "PostLog/", log);
        };

        var destroy = function (log) {
            return $http.delete(logApiUrl + "DeleteLog/" + log.LogId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("logService", logService);
}(angular.module("atTheLogs")))