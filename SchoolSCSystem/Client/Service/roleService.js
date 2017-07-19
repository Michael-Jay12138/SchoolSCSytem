(function (app) {
    var roleService = function ($http, roleApiUrl) {
        var getAll = function () {
            return $http.get(roleApiUrl + "GetRoles");
        };

        var getById = function (id) {
            return $http.get(roleApiUrl + "GetRole/" + id);
        };

        var update = function (role) {
            return $http.put(roleApiUrl + "PutRole/" + role.RoleId, role);
        };

        var create = function (role) {
            return $http.post(roleApiUrl + "PostRole/", role);
        };

        var destroy = function (role) {
            return $http.delete(roleApiUrl + "DeleteRole/" + role.RoleId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("roleService", roleService);
}(angular.module("atTheRoles")))