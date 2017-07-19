(function (app) {
    var scoreService = function ($http, scoreApiUrl) {
        var getAll = function () {
            return $http.get(scoreApiUrl + "GetScores");
        };

        var getById = function (id) {
            return $http.get(scoreApiUrl + "GetScore/" + id);
        };

        var update = function (score) {
            return $http.put(scoreApiUrl + "PutScore/" + score.ScoreId, score);
        };

        var create = function (score) {
            return $http.post(scoreApiUrl + "PostScore/", score);
        };

        var destroy = function (score) {
            return $http.delete(scoreApiUrl + "DeleteScore/" + score.ScoreId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("scoreService", scoreService);
}(angular.module("atTheScores")))