(function (app) {
    var EditController = function ($scope, scoreService) {
        //点击取消
        $scope.cancel = function () {
            $scope.$root.edit.score = null;
        };
        //点击保存
        $scope.save = function () {
            if ($scope.edit.score.ScoreId) {
                updateScore();
            }
            else {
                createScore();
            }
        };
        //更新数据
        var updateScore = function () {
            var scoreupd;
            scoreupd = $scope.edit.score;
            scoreService.update(scoreupd).then(function () {
                editScore(scoreupd);
            })
        };
        //添加数据
        var createScore = function () {
            var scoreadd;
            scoreadd = $scope.edit.score;
            scoreadd.ScoreId = 0;
            scoreService.create(scoreadd).then(function (backdata) {
                scoreadd.ScoreId = backdata.data.ScoreId;
                addScore(scoreadd);
            });
        };
        //向列表添加数据
        var addScore = function (score) {
            $scope.$root.scores.push(score);
            $scope.$root.edit.score = null;

            //location.reload([true]);
        }
        //更新列表数据
        var editScore = function (score) {
            for (var i = 0; i < $scope.$root.scores.length; i++) {
                if ($scope.$root.scores[i].ScoreId == score.ScoreId) {
                    $scope.$root.scores.splice(i, 1, score);
                    break;
                }
            }
            $scope.$root.edit.score = null;
        };
    };
    app.controller("EditController", EditController);
}(angular.module("atTheScores")));