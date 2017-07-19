(function (app) {
    var ListController = function ($scope, studentService) {
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
        $.get("/api/student/GetStudentsNum").then(function (result_un) {
            if (result_un % $scope.pageSize == 0)
                $scope.un = result_un / $scope.pageSize;
            else
                $scope.un = parseInt(result_un / $scope.pageSize) + 1;
            console.log($scope.un);
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
            $.get("/api/student/GetStudentsByPage?" + "page=" + page + "&pageSize=" + $scope.pageSize).then(function (result) {
                $scope.$root.students = result;
                $scope.$apply();
                $("#table").trigger("update");
            })
        }
        //根据搜索词获取数据
        var getBySerach = function (studentname) {
            $.get("/api/student/GetStudentsBySearch?" + "searchString=" + studentname).then(function (result) {
                $scope.$root.students = result;
                $scope.$apply();
                $("#table").trigger("update");
                delCookie("studentname");
            })
        }
        //判断用何种方式获取数据
        if (getCookie("studentname") != null)
            getBySerach(getCookie("studentname"));
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
            $.get("/api/class/GetClasses").then(function (result_c) {
                $.get("/api/major/GetMajors").then(function (result_m) {
                    $scope.$root.edit = {
                        student: {
                            Class: result_c,
                            Major: result_m,
                        },
                        model: '新增'
                    };
                    $scope.$root.class = result_c[0].ClassId.toString();
                    $scope.$root.major = result_m[0].MajorId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击编辑按钮
        $scope.edit = function (student) {
            $.get("/api/class/GetClasses").then(function (result_c) {
                $.get("/api/major/GetMajors").then(function (result_m) {
                    $scope.$root.edit = {
                        student: {
                            StudentId: student.StudentId,
                            StudentName: student.StudentName,
                            StudentEmail: student.StudentEmail,
                            Class: result_c,
                            Major: result_m,

                        },
                        model: '编辑'
                    };
                    $scope.$root.class = student.ClassId.toString();
                    $scope.$root.major = student.MajorId.toString();
                    $scope.$apply();
                })
            })
        };
        //点击删除按钮
        $scope.confirmdelete = function (student) {
            $scope.$root.delstudent = student;
        };
        //确认删除
        $scope.deletestudent = function () {
            studentService.destroy($scope.$root.delstudent)
                .then(function () {
                    removeStudentById($scope.$root.delstudent.StudentId);
                });
        }
        //从列表中把删除项移除
        var removeStudentById = function (id) {
            for (var i = 0; i < $scope.students.length; i++) {
                if ($scope.students[i].StudentId == id) {
                    $scope.students.splice(i, 1);
                    break;
                }
            }
        };
    };
    app.controller("ListController", ListController);
}(angular.module("atTheStudents")));