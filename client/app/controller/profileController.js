
app.controller('profileCtr', ['$scope', '$controller', '$rootScope', '$cookieStore', 'userServ', 'articleServ', 'fileUpload',
   function($scope, $controller, $rootScope, $cookieStore, userServ, articleServ, fileUpload){
      var base = $controller('baseCtr', {$scope:$scope});
      $scope.NumberOfDays = 31;
      $scope.Years = base.createBirthday._years;
      $scope.Days = base.createBirthday._days;
      $scope.Months = base.createBirthday._months;
      var data = {};
      var isLeapYear = function () {
         var year = $scope.userInfo.birthday.year || 0;
         return ((year % 400 === 0 || year % 100 !== 0) && (year % 4 === 0)) ? 1 : 0;
      }

      var getNumberOfDaysInMonth = function () {
         var selectedMonth = $scope.userInfo.birthday.month || 0;
         return 31 - ((selectedMonth === 2) ? (3 - isLeapYear()) : ((selectedMonth - 1) % 7 % 2));
      }

      $scope.UpdateNumberOfDays = function () {
         $scope.NumberOfDays = getNumberOfDaysInMonth();
      }

      refresh();
      function refresh(){
         if($cookieStore.get("tokenkey") != null){
            $rootScope.id = $cookieStore.get("tokenkey").data;
            userServ.userInfo($rootScope.id).success(function(result, status){
               $scope.userInfo = result.data;
            });
         }
      };

      $scope.uploadAvatar = function(){
         var file = $scope.myAvatar;
         var uploadUrl = "/userupload";
         fileUpload.uploadFileToUrl(file, uploadUrl);
         data.id = $rootScope.id;
         data.nameAvatar = file.name;
         userServ.userUpdateAvatar(data).success(function(result, status){
            if(result.data === "succesfull"){
               refresh();
               $scope.message = "Avatar changed succesfull";
            }          
         });
      };

      $scope.updateInfo = function (form){
         if(form){
            userServ.userUpdateInfo($scope.userInfo).success(function(result, status){        
               if(result.data === "succesfull"){
                  refresh();
                  $scope.message = "Infomation changed succesfull";
               }    
            });
         }
      }

   }]);

app.directive('fileModel', ['$parse', function ($parse) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;

         element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
         });
      }
   };
}]);

app.service('fileUpload', ['$http', function ($http) {
   this.uploadFileToUrl = function(file, uploadUrl){
      var fd = new FormData();
      fd.append('image', file);
      $http.post(uploadUrl, fd, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
      })
      .success(function(){
      })
      .error(function(){
      });
   }
}]);

