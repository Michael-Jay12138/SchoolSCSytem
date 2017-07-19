(function (app) {
    var menuService = function ($http, menuApiUrl) {
        var getAll = function () {
            return $http.get(menuApiUrl + "GetMenus");
        };

        var getById = function (id) {
            return $http.get(menuApiUrl + "GetMenu/" + id);
        };

        var update = function (menu) {
            return $http.put(menuApiUrl + "PutMenu/" + menu.MenuId, menu);
        };

        var create = function (menu) {
            return $http.post(menuApiUrl + "PostMenu/", menu);
        };

        var destroy = function (menu) {
            return $http.delete(menuApiUrl + "DeleteMenu/" + menu.MenuId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("menuService", menuService);
}(angular.module("atTheMenus")))