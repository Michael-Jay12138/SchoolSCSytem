(function (app) {
    var ListController = function ($scope, course_teacherService) {
        if (getCookie("userid") != null && getCookie("userid") != '')
            $.get("/api/user_role/GetUser_Role?userid=" + getCookie("userid")).then(function (result) {
                $scope.IsManager = result;
            })
        else {
            $scope.IsManager = false;
        }
        //当前页面默认为1显示10行数据
        $scope.page = 1;
        $scope.pageSize = 10;
        //获取页面总数
        $.get("/api/course_teacher/GetCourse_TeachersNum").then(function (result_un) {
            if (result_un % $scope.pageSize == 0)
                $scope.un = result_un / $scope.pageSize;
            else
                $scope.un = parseInt(result_un / $scope.pageSize) + 1;
            var pages = "[{";
            for (var i = 1; i <= $scope.un; i++) {
                if (i == $scope.un)
                    pages = pages + '"page":' + i;
                else
                    pages = pages + '"page":' + i + "},{";
            }
            pages += "}]";
            var obj = eval(pages);
            $scope.pages = obj;
        })
        //判断是否已登录
        $scope.haveLogin = function () {
            return getCookie("name") != null
        }
        //获取cookie
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        //删除cookie
        function delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        }
        //根据当前页面获取数据
        var getByPage = function (page) {
            if (page < 1 || page > $scope.sn)
                return;
            $.get("/api/course_teacher/GetCourse_TeachersByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                //var temp;
                //for (var i = 0; i < result.length; i++) {
                //    temp = result[i];
                //    $.get("/api/course/GetCourse?id=" + temp.CourseId).then(function (result_r) {
                //        $.extend(temp, { CourseName: result_r.CourseName });
                //        result[i] = temp;
                //    })
                //}
                $scope.$root.course_teachers = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (course_teachername) {
            $.get("/api/course_teacher/GetCourse_TeachersBySearch?" + "searchString=" + course_teachername).then(function (result) {
                $scope.$root.course_teachers = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("course_teachername");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("course_teachername") != null)
            getBySerach(getCookie("course_teachername"));
        else
            getByPage($scope.page);
        //选择第几页
        $scope.selectPage = function (page) {
            $scope.page = page;
            getByPage(page);
        }
        //前一页
        $scope.Previous = function () {
            getByPage(--$scope.page);
        }
        //后一页
        $scope.Next = function () {
            getByPage(++$scope.page);
        }
        //判断是否当前页，用于突出显示
        $scope.isActivePage = function (page) {
            return $scope.page == page;
        }
        //点击新增按钮
        $scope.create = function () {
            $.get("/api/course/GetCourses").then(function (result_r) {
                $.get("/api/teacher/GetTeachers").then(function (result_m) {
                    $scope.$root.edit = {
                        course_teacher: {
                            Course: result_r,
                            Teacher: result_m,
                        },
                        model: '新增'
                    };
                    $scope.$root.course = result_r[0].CourseId.toString();
                    $scope.$root.teacher = result_m[0].TeacherId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击编辑按钮
        $scope.edit = function (course_teacher) {
            $.get("/api/course/GetCourses").then(function (result_r) {
                $.get("/api/teacher/GetTeachers").then(function (result_m) {
                    $scope.$root.edit = {
                        course_teacher: {
                            CourseId: course_teacher.CourseId,
                            TeacherId: course_teacher.TeacherId,
                            Course: result_r,
                            Teacher: result_m,
                        },
                        model: '编辑'
                    };
                    $scope.$root.course = course_teacher.CourseId.toString();
                    $scope.$root.teacher = course_teacher.TeacherId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击删除按钮
        $scope.confirmdelete = function (course_teacher) {
            $scope.$root.delcourse_teacher = course_teacher;
            //$.get("/api/course_teacher/GetCourse_Teacher?courseid=" + course_teacher.CourseId + "&teacherid=" + course_teacher.TeacherId).then(function (result) {
            //    $scope.$root.delcourse_teacher = result;
            //    $scope.$apply();
            //});
        };
        //确认删除
        $scope.deletecourse_teacher = function () {
            course_teacherService.destroy($scope.$root.delcourse_teacher)
                .then(function () {
                    removeCourse_TeacherById($scope.$root.delcourse_teacher.CourseId, $scope.$root.delcourse_teacher.TeacherId);
                });
        }
        //从列表中把删除项移除
        var removeCourse_TeacherById = function (courseid, teacherid) {
            for (var i = 0; i < $scope.course_teachers.length; i++) {
                if ($scope.course_teachers[i].CourseId == courseid && $scope.course_teachers[i].TeacherId == teacherid) {
                    $scope.course_teachers.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheCourse_Teachers")));