(function (app) {
    var classroom_userService = function ($http, classroom_userApiUrl) {
        var getAll = function () {
            return $http.get(classroom_userApiUrl + "GetClassRoom_Users");
        };

        var getById = function (classroomid, userid) {
            return $http.get(classroom_userApiUrl + "GetClassRoom_User?classroomid=" + classroomid + "&userid=" + userid);
        };

        var update = function (classroomid, userid, classroom_user) {
            return $http.put(classroom_userApiUrl + "PutClassRoom_User/?classroomid=" + classroomid + "&userid=" + userid + "&classroom_user=" + JSON.stringify(classroom_user));
        };

        var create = function (classroom_user) {
            return $http.post(classroom_userApiUrl + "PostClassRoom_User/", classroom_user);
        };

        var destroy = function (classroom_user) {
            return $http.delete(classroom_userApiUrl + "DeleteClassRoom_User/?classroomid=" + classroom_user.ClassRoomId + "&userid=" + classroom_user.UserId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("classroom_userService", classroom_userService);
}(angular.module("atTheClassRoom_Users")))