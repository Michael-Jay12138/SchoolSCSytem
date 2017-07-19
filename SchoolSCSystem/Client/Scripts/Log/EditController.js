(function (app) {
    var EditController = function ($scope, logService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.log = null;
        };
        //点击保存
        $scope.save = function () {
            
            if ($scope.edit.log.LogId) {
                updateLog();
            }
            else {
                createLog();
            }
        };
        //更新数据
        var updateLog = function () {
            var logupd;
            logupd = $scope.edit.log;
            logService.update(logupd).then(function () {
                editLog(logupd);
            })
        };
        //添加数据
        var createLog = function () {
            var logadd;
            logadd = $scope.edit.log;
            logadd.LogId = 0;
            logService.create(logadd).then(function (backdata) {
                logadd.LogId = backdata.data.LogId;
                addLog(logadd);
            });
        };
        //向列表添加数据
        var addLog = function (log) {
            $scope.$root.logs.push(log);
            $scope.$root.edit.log = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editLog = function (log) {
            for (var i = 0; i < $scope.$root.logs.length; i++) {
                if ($scope.$root.logs[i].LogId == log.LogId) {
                    $scope.$root.logs.splice(i, 1, log);
                    break;
                }
            }
            $scope.$root.edit.log = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheLogs")));