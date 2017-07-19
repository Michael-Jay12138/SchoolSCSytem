(function (app) {
    var userService = function ($http, userApiUrl) {
        var getAll = function () {
            return $http.get(userApiUrl + "GetUsers");
        };

        var getById = function (id) {
            return $http.get(userApiUrl + "GetUser/" + id);
        };

        var update = function (user) {
            return $http.put(userApiUrl + "PutUser/" + user.UserId, user);
        };

        var create = function (user) {
            return $http.post(userApiUrl + "PostUser/", user);
        };

        var destroy = function (user) {
            return $http.delete(userApiUrl + "DeleteUser/" + user.UserId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("userService", userService);
}(angular.module("atTheUsers")))