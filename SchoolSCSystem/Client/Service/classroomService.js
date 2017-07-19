(function (app) {
    var classroomService = function ($http, classroomApiUrl) {
        var getAll = function () {
            return $http.get(classroomApiUrl + "GetClassRooms");
        };

        var getById = function (id) {
            return $http.get(classroomApiUrl + "GetClassRoom/" + id);
        };

        var update = function (classroom) {
            return $http.put(classroomApiUrl + "PutClassRoom/" + classroom.ClassRoomId, classroom);
        };

        var create = function (classroom) {
            return $http.post(classroomApiUrl + "PostClassRoom/", classroom);
        };

        var destroy = function (classroom) {
            return $http.delete(classroomApiUrl + "DeleteClassRoom/" + classroom.ClassRoomId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("classroomService", classroomService);
}(angular.module("atTheClassRooms")))