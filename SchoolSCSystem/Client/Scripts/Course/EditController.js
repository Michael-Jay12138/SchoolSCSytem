(function (app) {
    var EditController = function ($scope, courseService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.course = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.course.CourseId) {
                updateCourse();
            }
            else {
                createCourse();
            }
        };
        //更新数据
        var updateCourse = function () {
            var courseupd;
            courseupd = $scope.edit.course;
            courseService.update(courseupd).then(function () {
                editCourse(courseupd);
            })
        };
        //添加数据
        var createCourse = function () {
            var courseadd;
            courseadd = $scope.edit.course;
            courseadd.CourseId = 0;
            courseService.create(courseadd).then(function (backdata) {
                courseadd.CourseId = backdata.data.CourseId;
                addCourse(courseadd);
            });
        };
        //向列表添加数据
        var addCourse = function (course) {
            $scope.$root.courses.push(course);
            $scope.$root.edit.course = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editCourse = function (course) {
            for (var i = 0; i < $scope.$root.courses.length; i++) {
                if ($scope.$root.courses[i].CourseId == course.CourseId) {
                    $scope.$root.courses.splice(i, 1, course);
                    break;
                }
            }
            $scope.$root.edit.course = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheCourses")));