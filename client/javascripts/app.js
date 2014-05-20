'use strict';

angular.module('app', ['app.controllers' , 'app.directives', 'ngRoute'])
.config(function ($routeProvider){    
    $routeProvider
    .when('/', {
        templateUrl: '/views/partials/home.html',
        controller: 'HomeCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
})