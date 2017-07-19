(function (app) {
    var DetailsController = function ($scope, $routeParams, classroom_userService) {
        var classroomid = $routeParams.classroomid;
        var userid = $routeParams.userid;
        //根据id获取需要的数据
        classroom_userService.getById(classroomid, userid).then(function (result) {
            $scope.classroom_user = result.data;
            console.log($scope.classroom_user);
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheClassRoom_Users")));