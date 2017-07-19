(function (app) {
    var teacherService = function ($http, teacherApiUrl) {
        var getAll = function () {
            return $http.get(teacherApiUrl + "GetTeachers");
        };

        var getById = function (id) {
            return $http.get(teacherApiUrl + "GetTeacher/" + id);
        };

        var update = function (teacher) {
            return $http.put(teacherApiUrl + "PutTeacher/" + teacher.TeacherId, teacher);
        };

        var create = function (teacher) {
            return $http.post(teacherApiUrl + "PostTeacher/", teacher);
        };

        var destroy = function (teacher) {
            return $http.delete(teacherApiUrl + "DeleteTeacher/" + teacher.TeacherId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("teacherService", teacherService);
}(angular.module("atTheTeachers")))