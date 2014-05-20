'use strict';

angular.module('app.directives', [])
.directive('scrollDiv', function (){
    return{
        restrict: 'A',
        link: function (scope, element, attrs){
            var element = element[0];
            scope.$watch(function (){
                element.scrollTop = element.scrollHeight;
            });
        }
    };
});