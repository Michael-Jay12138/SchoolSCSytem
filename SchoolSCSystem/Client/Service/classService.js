(function (app) {
    var classService = function ($http, classApiUrl) {
        var getAll = function () {
            return $http.get(classApiUrl + "GetClasses");
        };

        var getById = function (id) {
            return $http.get(classApiUrl + "GetClass/" + id);
        };

        var update = function (aclass) {
            return $http.put(classApiUrl + "PutClass/" + aclass.ClassId, aclass);
        };

        var create = function (aclass) {
            return $http.post(classApiUrl + "PostClass/", aclass);
        };

        var destroy = function (aclass) {
            return $http.delete(classApiUrl + "DeleteClass/" + aclass.ClassId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("classService", classService);
}(angular.module("atTheClasses")))