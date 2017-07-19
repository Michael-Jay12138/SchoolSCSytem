(function (app) {
    var majorService = function ($http, majorApiUrl) {
        var getAll = function () {
            return $http.get(majorApiUrl + "GetMajors");
        };

        var getById = function (id) {
            return $http.get(majorApiUrl + "GetMajor/" + id);
        };

        var update = function (major) {
            console.log(major);
            return $http.put(majorApiUrl + "PutMajor/" + major.MajorId, major);
        };

        var create = function (major) {
            return $http.post(majorApiUrl + "PostMajor/", major);
        };

        var destroy = function (major) {
            return $http.delete(majorApiUrl + "DeleteMajor/" + major.MajorId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("majorService", majorService);
}(angular.module("atTheMajors")))