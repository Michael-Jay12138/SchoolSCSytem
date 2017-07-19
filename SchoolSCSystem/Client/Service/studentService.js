(function (app) {
    var studentService = function ($http, studentApiUrl) {
        var getAll = function () {
            return $http.get(studentApiUrl + "GetStudents");
        };

        var getById = function (id) {
            return $http.get(studentApiUrl + "GetStudent/" + id);
        };

        var update = function (student) {
            return $http.put(studentApiUrl + "PutStudent/" + student.StudentId, student);
        };

        var create = function (student) {
            return $http.post(studentApiUrl + "PostStudent/", student);
        };

        var destroy = function (student) {
            return $http.delete(studentApiUrl + "DeleteStudent/" + student.StudentId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("studentService", studentService);
}(angular.module("atTheStudents")))