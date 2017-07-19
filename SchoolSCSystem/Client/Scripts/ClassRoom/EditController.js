
(function (app) {
    var EditController = function ($scope, classroomService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.classroom = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.classroom.ClassRoomId) {
                updateClassRoom();
            }
            else {
                createClassRoom();
            }
        };
        //更新数据
        var updateClassRoom = function () {
            var classroomupd;
            classroomupd = $scope.edit.classroom;
            classroomService.update(classroomupd).then(function () {
                editClassRoom(classroomupd);
            })
        };
        //添加数据
        var createClassRoom = function () {
            var classroomadd;
            classroomadd = $scope.edit.classroom;
            classroomadd.ClassRoomId = 0;
            classroomService.create(classroomadd).then(function (backdata) {
                classroomadd.ClassRoomId = backdata.data.ClassRoomId;
                addClassRoom(classroomadd);
            });
        };
        //向列表添加数据
        var addClassRoom = function (classroom) {
            $scope.$root.classrooms.push(classroom);
            $scope.$root.edit.classroom = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editClassRoom = function (classroom) {
            for (var i = 0; i < $scope.$root.classrooms.length; i++) {
                if ($scope.$root.classrooms[i].ClassRoomId == classroom.ClassRoomId) {
                    $scope.$root.classrooms.splice(i, 1, classroom);
                    break;
                }
            }
            $scope.$root.edit.classroom = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheClassRooms")));