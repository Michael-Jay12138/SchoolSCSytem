(function (app) {
    var DetailsController = function ($scope, $routeParams, teacherService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        teacherService.getById(id).then(function (result) {
            $scope.teacher = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheTeachers")));