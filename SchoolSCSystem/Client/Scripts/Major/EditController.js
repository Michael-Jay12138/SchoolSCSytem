(function (app) {
    var EditController = function ($scope, majorService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.major = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.major.MajorId) {
                updateMajor();
            }
            else {
                createMajor();
            }
        };
        //更新数据
        var updateMajor = function () {
            var majorupd;
            majorupd = $scope.edit.major;
            majorService.update(majorupd).then(function () {
                editMajor(majorupd);
            })
        };
        //添加数据
        var createMajor = function () {
            var majoradd;
            majoradd = $scope.edit.major;
            majoradd.MajorId = 0;
            majorService.create(majoradd).then(function (backdata) {
                majoradd.MajorId = backdata.data.MajorId;
                addMajor(majoradd);
            });
        };
        //向列表添加数据
        var addMajor = function (major) {
            $scope.$root.majors.push(major);
            $scope.$root.edit.major = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editMajor = function (major) {
            for (var i = 0; i < $scope.$root.majors.length; i++) {
                if ($scope.$root.majors[i].MajorId == major.MajorId) {
                    $scope.$root.majors.splice(i, 1, major);
                    break;
                }
            }
            $scope.$root.edit.major = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheMajors")));