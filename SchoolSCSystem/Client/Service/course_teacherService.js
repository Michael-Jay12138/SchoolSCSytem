(function (app) {
    var course_teacherService = function ($http, course_teacherApiUrl) {
        var getAll = function () {
            return $http.get(course_teacherApiUrl + "GetCourse_Teachers");
        };

        var getById = function (courseid, teacherid) {
            return $http.get(course_teacherApiUrl + "GetCourse_Teacher?courseid=" + courseid + "&teacherid=" + teacherid);
        };

        var update = function (courseid, teacherid, course_teacher) {
            return $http.put(course_teacherApiUrl + "PutCourse_Teacher/?courseid=" + courseid + "&teacherid=" + teacherid + "&course_teacher=" + JSON.stringify(course_teacher));
        };

        var create = function (course_teacher) {
            return $http.post(course_teacherApiUrl + "PostCourse_Teacher/", course_teacher);
        };

        var destroy = function (course_teacher) {
            return $http.delete(course_teacherApiUrl + "DeleteCourse_Teacher/?courseid=" + course_teacher.CourseId + "&teacherid=" + course_teacher.TeacherId);
        };
        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            destroy: destroy
        };
    };
    app.factory("course_teacherService", course_teacherService);
}(angular.module("atTheCourse_Teachers")))