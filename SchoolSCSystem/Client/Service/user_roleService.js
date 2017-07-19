(function (app) {
    var user_roleService = function ($http, user_roleApiUrl) {
        var getAll = function () {
            return $http.get(user_roleApiUrl + "GetUser_Roles");
        };

        var getById = function (userid, roleid) {
            return $http.get(user_roleApiUrl + "GetUser_Role?userid=" + userid + "&roleid=" + roleid);
        };

        var update = function (userid, roleid, user_role) {
            return $http.put(user_roleApiUrl + "PutUser_Role/?userid=" + userid + "&roleid=" + roleid + "&user_role=" + JSON.stringify(user_role));
        };

        var create = function (user_role) {
            return $http.post(user_roleApiUrl + "PostUser_Role/", user_role);
        };

        var destroy = function (user_role) {
            return $http.delete(user_roleApiUrl + "DeleteUser_Role/?userid=" + user_role.UserId + "&roleid=" + user_role.RoleId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("user_roleService", user_roleService);
}(angular.module("atTheUser_Roles")))