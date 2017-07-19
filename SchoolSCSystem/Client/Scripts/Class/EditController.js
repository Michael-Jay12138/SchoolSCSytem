(function (app) {
    var EditController = function ($scope, classService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.class = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.class.ClassId) {
                updateClass();
            }
            else {
                createClass();
            }
        };
        //更新数据
        var updateClass = function () {
            var classupd;
            classupd = $scope.edit.class;
            classService.update(classupd).then(function () {
                editClass(classupd);
            })
        };
        //添加数据
        var createClass = function () {
            var classadd;
            classadd = $scope.edit.class;
            classadd.ClassId = 0;
            classService.create(classadd).then(function (backdata) {
                classadd.ClassId = backdata.data.ClassId;   
                addClass(classadd);
            });
        };
        //向列表添加数据
        var addClass = function (aclass) {
            $scope.$root.classes.push(aclass);
            $scope.$root.edit.class = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editClass = function (user) {
            for (var i = 0; i < $scope.$root.classes.length; i++) {
                if ($scope.$root.classes[i].ClassId == aclass.ClassId) {
                    $scope.$root.classes.splice(i, 1, aclass);
                    break;
                }
            }
            $scope.$root.edit.class = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheClasses")));