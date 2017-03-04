app.controller('regisCtr', ['$scope', '$controller', '$window', '$controller', '$cookieStore', '$location', 'userServ', '$timeout', 
    function($scope, $controller, $window, $controller, $cookieStore, $location, userServ, $timeout){
    
    var _years, _months, _days;
    var _errorMessage;
    var data = {};
    var numberOfYears = (new Date()).getYear() - 50;
    
    $scope.NumberOfDays = 31;
    $scope.Years = $.map($(Array(numberOfYears)), function (val, i) { return i + 1940; });
    $scope.Months = $.map($(Array(12)), function (val, i) { return i + 1; });
    $scope.Days = $.map($(Array(31)), function (val, i) { return i + 1; });

 	var isLeapYear = function () {
        var year = $scope.account.birthday.year || 0;
        return ((year % 400 === 0 || year % 100 !== 0) && (year % 4 === 0)) ? 1 : 0;
    }

    var getNumberOfDaysInMonth = function () {
        var selectedMonth = $scope.account.birthday.month || 0;
        return 31 - ((selectedMonth === 2) ? (3 - isLeapYear()) : ((selectedMonth - 1) % 7 % 2));
    }

    $scope.UpdateNumberOfDays = function () {
        $scope.NumberOfDays = getNumberOfDaysInMonth();
    }

    $scope.register = function (form){
        if(form){
            userServ.register($scope.account).success(function(result, status){
                if(result.error){
                    $scope.message = result.error;
                }else{                      
                    $cookieStore.put("tokenkey", result);
                    $location.path("/home");
                }
            });
        }        
    }

    // var data = {};
    // var onBeforeUnLoadEvent = false;
    // $window.onbeforeunload= function(event){
    //     if(!onBeforeUnLoadEvent){
    //         data.id = $cookieStore.get("tokenkey").data;
    //         accountServ.userLogout(data).success();
    //         $timeout(function() {
    //             onBeforeUnLoadEvent = true;
    //         }, 100000);
    //     }
    // };


    // var data = {};
    // $window.onbeforeunload = $timeout(function (event){        
    //               

        
    // }, 4000)

    $scope.test = function (event){
        // data.id = "56f554ea5abfe1c00d7aa4aa";
        // accountServ.userClose(data).success(function(result, status){
        //         console.log("bye bye");
        // });  
                      
    }
}]);