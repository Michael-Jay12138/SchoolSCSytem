(function (app) {
    var role_menuService = function ($http, role_menuApiUrl) {
        var getAll = function () {
            return $http.get(role_menuApiUrl + "GetRole_Menus");
        };

        var getById = function (roleid,menuid) {
            return $http.get(role_menuApiUrl + "GetRole_Menu?roleid=" + roleid + "&menuid=" + menuid);
        };

        var update = function (roleid, menuid, role_menu) {
            return $http.put(role_menuApiUrl + "PutRole_Menu/?roleid=" + roleid + "&menuid=" + menuid + "&role_menu=" + JSON.stringify(role_menu));
        };

        var create = function (role_menu) {
            return $http.post(role_menuApiUrl + "PostRole_Menu/", role_menu);
        };

        var destroy = function (role_menu) {
            return $http.delete(role_menuApiUrl + "DeleteRole_Menu/?roleid=" + role_menu.RoleId + "&menuid=" + role_menu.MenuId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("role_menuService", role_menuService);
}(angular.module("atTheRole_Menus")))