(function (app) {
    var EditController = function ($scope, teacherService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.teacher = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.teacher.TeacherId) {
                updateTeacher();
            }
            else {
                createTeacher();
            }
        };
        //更新数据
        var updateTeacher = function () {
            var teacherupd;
            teacherupd = $scope.edit.teacher;
            teacherService.update(teacherupd).then(function () {
                editTeacher(teacherupd);
            })
        };
        //添加数据
        var createTeacher = function () {
            var teacheradd;
            teacheradd = $scope.edit.teacher;
            teacheradd.TeacherId = 0;
            teacherService.create(teacheradd).then(function (backdata) {
                teacheradd.TeacherId = backdata.data.TeacherId;
                addTeacher(teacheradd);
            });
        };
        //向列表添加数据
        var addTeacher = function (teacher) {
            $scope.$root.teachers.push(teacher);
            $scope.$root.edit.teacher = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editTeacher = function (teacher) {
            for (var i = 0; i < $scope.$root.teachers.length; i++) {
                if ($scope.$root.teachers[i].TeacherId == teacher.TeacherId) {
                    $scope.$root.teachers.splice(i, 1, teacher);
                    break;
                }
            }
            $scope.$root.edit.teacher = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheTeachers")));