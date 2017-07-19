(function (app) {
    var DetailsController = function ($scope, $routeParams, courseService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        courseService.getById(id).then(function (result) {
            $scope.course = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheCourses")));