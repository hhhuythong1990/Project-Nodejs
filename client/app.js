var app = angular.module("appSocialNetwork", ['ngRoute', 'ngCookies', 'angularMoment']);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        controller: 'loginCtr',
        templateUrl: 'app/views/login.html'        
    })
    .when('/register', {
        controller: '',
        templateUrl: 'app/views/register.html'        
    })
    .when('/home', {
        controller: 'homeCtr',
        templateUrl: 'app/views/home.html'        
    })
    .when('/search', {
        controller: '',
        templateUrl: 'app/views/search.html'        
    })
    .when('/page/:userId', {
        controller: '',
        templateUrl: 'app/views/page.html'        
    })
    .when('/request', {
        controller: '',
        templateUrl: 'app/views/request.html'        
    })
    .when('/friend', {
        controller: '',
        templateUrl: 'app/views/friend.html'        
    })
    .when('/profile', {
        controller: 'profileCtr',
        templateUrl: 'app/views/profile.html'        
    })
    .when('/person', {
        controller: 'personCtr',
        templateUrl: 'app/views/person.html'        
    })
    .otherwise({
        redirectTo: '/'
    });
    // $locationProvider.html5Mode(true);
});


app.run(function($cookieStore, $rootScope, $location){
    $rootScope.APP_NAME = "NEIGHBOR NETWORK";
    
    if($cookieStore.get("tokenkey") == null){
        $location.path("/");
    }
    
    
});
