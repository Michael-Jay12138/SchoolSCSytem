(function (app) {
    var DetailsController = function ($scope, $routeParams, approvalDataService) {
        var id = $routeParams.id;
        //根据id获取需要的数据
        approvalDataService.getById(id).then(function (result) {
            $scope.approvalData = result.data;
            if ($scope.approvalData.State == '已驳回')
            {
                $scope.continue = false;
                $scope.approvalData.NextUserId = '0';
            }
            else
            {
                $scope.continue = true;
                $.get("/api/user/GetNextConfig?processid=" + $scope.approvalData.FlowId + "&step=" + (++$scope.approvalData.Step)).then(function (result_u) {
                    $scope.approvors = result_u;
                    if (result_u != null)
                        $scope.approvalData.NextUserId = result_u[0].UserId.toString();
                    else
                        $scope.approvalData.NextUserId = '0';
                    $scope.$apply();
                })
            }
            
        });
        //获取cookie
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }

        //同意审批
        $scope.passApprovalData = function () {
            var approvaldatapas;
            approvaldatapas = $scope.approvalData;
            approvaldatapas.UserId = approvaldatapas.NextUserId;
            if (approvaldatapas.UserId != 0)
                approvaldatapas.State = '审批中';
            else
                approvaldatapas.State = '已审批';
            approvalDataService.update(approvaldatapas).then(function () {
                location.href = "#/approvalData/list";
                location.reload([true]);
            })
        };
        //驳回审批
        $scope.rejectApprovalData = function () {
            var approvaldatarej;
            approvaldatarej = $scope.approvalData;
            approvaldatarej.UserId = approvaldatarej.CreatorId;
            approvaldatarej.State = '已驳回';
            approvalDataService.update(approvaldatarej).then(function () {
                location.href = "#/approvalData/list";
                location.reload([true]);
            })
        };

        $scope.confirmReject = function () {
            var approvaldatarej;
            approvaldatarej = $scope.approvalData;
            approvaldatarej.UserId = '0';
            approvalDataService.update(approvaldatarej).then(function () {
                window.location.href = "#/approvalData/list";
                window.close();
            })
        }
    };
    app.controller("DetailsController", DetailsController);
}(angular.module("atTheApprovalDatas")));