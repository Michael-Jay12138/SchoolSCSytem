(function (app) {
    var DetailsController = function ($scope, $routeParams, studentService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        studentService.getById(id).then(function (result) {
            $scope.student = result.data;
            console.log($scope.student);
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheStudents")));