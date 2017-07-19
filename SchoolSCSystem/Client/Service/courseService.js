(function (app) {
    var courseService = function ($http, courseApiUrl) {
        var getAll = function () {
            return $http.get(courseApiUrl + "GetCourses");
        };

        var getById = function (id) {
            return $http.get(courseApiUrl + "GetCourse/" + id);
        };

        var update = function (course) {
            return $http.put(courseApiUrl + "PutCourse/" + course.CourseId, course);
        };

        var create = function (course) {
            return $http.post(courseApiUrl + "PostCourse/", course);
        };

        var destroy = function (course) {
            return $http.delete(courseApiUrl + "DeleteCourse/" + course.CourseId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("courseService", courseService);
}(angular.module("atTheCourses")))