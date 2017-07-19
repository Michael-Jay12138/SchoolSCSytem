(function (app) {
    var EditController = function ($scope, course_teacherService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.course_teacher = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.course_teacher.CourseId && $scope.edit.course_teacher.TeacherId) {
                updatecourse_teacher();
            }
            else {
                createcourse_teacher();
            }
        };
        //更新数据
        var updatecourse_teacher = function () {
            var course_teacherupd, courseid, teacherid;
            course_teacherupd = $scope.edit.course_teacher;
            courseid = $scope.edit.course_teacher.CourseId;
            teacherid = $scope.edit.course_teacher.TeacherId;
            delete (course_teacherupd.Course);
            delete (course_teacherupd.Teacher);
            course_teacherupd.CourseId = Number($scope.course);
            course_teacherupd.TeacherId = Number($scope.teacher);
            coursename = $('#course').find("option:selected").text();
            teachername = $('#teacher').find("option:selected").text();
            course_teacherService.update(courseid, teacherid, course_teacherupd).then(function () {
                var temp = {
                    CourseId: course_teacherupd.CourseId,
                    TeacherId: course_teacherupd.TeacherId,
                    CourseName: coursename,
                    TeacherName: teachername,
                }
                editcourse_teacher(courseid, teacherid, temp);
            })
        };
        //添加数据
        var createcourse_teacher = function () {
            var course_teacheradd;
            course_teacheradd = $scope.edit.course_teacher;
            delete (course_teacheradd.Course);
            delete (course_teacheradd.Teacher);
            course_teacheradd.CourseId = $scope.course;
            course_teacheradd.TeacherId = $scope.teacher;
            coursename = $('#course').find("option:selected").text();
            teachername = $('#teacher').find("option:selected").text();
            course_teacherService.create(course_teacheradd).then(function () {
                var temp = {
                    CourseId: course_teacheradd.CourseId,
                    TeacherId: course_teacheradd.TeacherId,
                    CourseName: coursename,
                    TeacherName: teachername,
                }
                addcourse_teacher(temp);
            });
        };
        //向列表添加数据
        var addcourse_teacher = function (course_teacher) {
            $scope.$root.course_teachers.push(course_teacher);
            $scope.$root.edit.course_teacher = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editcourse_teacher = function (courseid, teacherid, course_teacher) {
            for (var i = 0; i < $scope.$root.course_teachers.length; i++) {
                if ($scope.$root.course_teachers[i].CourseId == courseid && $scope.$root.course_teachers[i].TeacherId == teacherid) {
                    $scope.$root.course_teachers.splice(i, 1, course_teacher);
                    break;
                }
            }
            $scope.$root.edit.course_teacher = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheCourse_Teachers")));