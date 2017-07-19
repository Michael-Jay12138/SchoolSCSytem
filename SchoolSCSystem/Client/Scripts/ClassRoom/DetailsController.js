(function (app) {
    var DetailsController = function ($scope, $routeParams, classroomService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        classroomService.getById(id).then(function (result) {
            $scope.classroom = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheClassRooms")));