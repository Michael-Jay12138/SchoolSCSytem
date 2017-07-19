(function (app) {
    var EditController = function ($scope, classroom_userService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.classroom_user = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.classroom_user.ClassRoomId && $scope.edit.classroom_user.UserId) {
                updateClassRoom_User();
            }
            else {
                createClassRoom_User();
            }
        };
        //更新数据
        var updateClassRoom_User = function () {
            var classroom_userupd, classroomid,userid;
            classroom_userupd = $scope.edit.classroom_user;
            classroomid = $scope.edit.classroom_user.ClassRoomId;
            userid = $scope.edit.classroom_user.UserId;
            delete (classroom_userupd.ClassRoom);
            delete (classroom_userupd.User);
            classroom_userupd.ClassRoomId = Number($scope.classroom);
            classroom_userupd.UserId = Number($scope.user);
            classroomname = $('#classroom').find("option:selected").text();
            username = $('#user').find("option:selected").text();
            classroom_userService.update(classroomid, userid, classroom_userupd).then(function () {
                var temp = {
                    ClassRoomId: classroom_userupd.ClassRoomId,
                    UserId: classroom_userupd.UserId,
                    ClassRoomName: classroomname,
                    UserName: username,
                }
                editClassRoom_User(classroomid, userid, temp);
            })
        };
        //添加数据
        var createClassRoom_User = function () {
            var classroom_useradd;
            classroom_useradd = $scope.edit.classroom_user;
            delete (classroom_useradd.ClassRoom);
            delete (classroom_useradd.User);
            classroom_useradd.ClassRoomId = $scope.classroom;
            classroom_useradd.UserId = $scope.user;
            classroomname = $('#classroom').find("option:selected").text();
            username = $('#user').find("option:selected").text();
            classroom_userService.create(classroom_useradd).then(function () {
                var temp = {
                    ClassRoomId: classroom_useradd.ClassRoomId,
                    UserId: classroom_useradd.UserId,
                    ClassRoomName: classroomname,
                    UserName: username,
                }
                addClassRoom_User(temp);
            });
        };
        //向列表添加数据
        var addClassRoom_User = function (classroom_user) {
            $scope.$root.classroom_users.push(classroom_user);
            $scope.$root.edit.classroom_user = null;


            //location.reload([true]);
        }
        //更新列表数据
        var editClassRoom_User = function (classroomid,userid, classroom_user) {
            for (var i = 0; i < $scope.$root.classroom_users.length; i++) {
                if ($scope.$root.classroom_users[i].ClassRoomId == classroomid && $scope.$root.classroom_users[i].UserId == userid) {
                    $scope.$root.classroom_users.splice(i, 1, classroom_user);
                    break;
                }
            }
            $scope.$root.edit.classroom_user = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheClassRoom_Users")));