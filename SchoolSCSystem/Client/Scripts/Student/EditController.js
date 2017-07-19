(function (app) {
    var EditController = function ($scope, studentService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.student = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.student.StudentId) {
                updateStudent();
            }
            else {
                createStudent();
            }
        };
        //更新数据
        var updateStudent = function () {
            var studentupd;
            studentupd = $scope.edit.student;
            delete (studentupd.Class);
            delete (studentupd.Major);
            studentupd.ClassId = Number($scope.class);
            studentupd.MajorId = Number($scope.major);
            classname = $('#class').find("option:selected").text();
            majorname = $('#major').find("option:selected").text();
            studentService.update(studentupd).then(function (backdata) {
                var temp = {
                    StudentId: studentupd.StudentId,
                    StudentName: studentupd.StudentName,
                    StudentEmail: studentupd.StudentEmail,
                    ClassId: studentupd.ClassId,
                    MajorId: studentupd.MajorId,
                    ClassName: classname,
                    MajorName: majorname,
                }
                editStudent(temp);
            })
        };
        //添加数据
        var createStudent = function () {
            var studentadd
            studentadd = $scope.edit.student;
            delete (studentadd.Class);
            delete (studentadd.Major);
            studentadd.ClassId = $scope.class;
            studentadd.MajorId = $scope.major;
            classname = $('#class').find("option:selected").text();
            majorname = $('#major').find("option:selected").text();
            studentService.create(studentadd).then(function (backdata) {
                var temp = {
                    StudentId: backdata.data.StudentId,
                    StudentName: backdata.data.StudentName,
                    StudentEmail: backdata.data.StudentEmail,
                    ClassId: backdata.data.ClassId,
                    MajorId: backdata.data.MajorId,
                    ClassName: classname,
                    MajorName: majorname,
                }
                addStudent(temp);
            })
        };
        //向列表添加数据
        var addStudent = function (student) {
            $scope.$root.students.push(student);
            $scope.$root.edit.student = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editStudent = function (student) {
            for (var i = 0; i < $scope.$root.students.length; i++) {
                if ($scope.$root.students[i].StudentId == student.StudentId) {
                    $scope.$root.students.splice(i, 1, student);
                    break;
                }
            }
            $scope.$root.edit.student = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheStudents")));