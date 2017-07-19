(function (app) {
    var DetailsController = function ($scope, $routeParams, course_teacherService) {
        var courseid = $routeParams.courseid;
        var teacherid = $routeParams.teacherid;
        //根据id获取需要的数据
        course_teacherService.getById(courseid, teacherid).then(function (result) {
            $scope.course_teacher = result.data;
        });
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheCourse_Teachers")));