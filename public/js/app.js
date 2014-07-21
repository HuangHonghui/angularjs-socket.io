/**
 * Created by huanghonghui on 14-7-13.
 */
/* 前端Angular.js */

//(function(){
    var app = angular.module("chatApp",['ngRoute']);


    app.config(function($routeProvider,$locationProvider){
        $routeProvider
            .when("/chat",{
                templateUrl:"partials/chat",
                controller: "ChatController"
            })
            .when("/about",{
                templateUrl:"partials/about",
                controller: "AboutController"
            })
            .otherwise({
                redirectTo:"/"
            });
    });
//})();