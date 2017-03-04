app.controller('baseCtr', ['$scope', '$window', '$location', '$timeout', '$cookieStore', 'userServ', 
	function($scope, $window, $location, $timeout, $cookieStore, userServ){
	var _years, _months, _days;
	var _errorMessage;
	var data = {};
	var onBeforeUnLoadEvent = false;

	createBirthday = function(){
		var numberOfYears = (new Date()).getYear() - 50;
		this._years = $.map($(Array(numberOfYears)), function (val, i) { return i + 1940; });
		this._months = $.map($(Array(12)), function (val, i) { return i + 1; });
		this._days = $.map($(Array(31)), function (val, i) { return i + 1; });
	}
	this.createBirthday = new createBirthday();

    if($cookieStore.get("tokenkey") == null){
        $location.path("/");
    }
    	

    // $window.onbeforeunload= function(event){
    //     if(!onBeforeUnLoadEvent){
    //         data.id = $cookieStore.get("tokenkey").data;
    //         accountServ.userLogout(data).success();
            
    //         	onBeforeUnLoadEvent = true;
            
    //     }
    // };
}])