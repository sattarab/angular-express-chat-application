'use strict';

angular.module('app.controllers', ['app.factory'])
.controller('HomeCtrl', ['$scope', 'socket', function ($scope, socket){
    $scope.messages = [];
    
    socket.on('init', function (data){
        $scope.name = data.name;
        $scope.users = data.users;
    });
    
    socket.on('user:join', function (data){
        $scope.messages.push({
            user: 'chatroom',
            message: data.name + ' has joined the chatroom'
        });
        $scope.users.push(data.name);
    });
    
    socket.on('user:message', function (data){
        $scope.messages.push({
            user: data.user,
            message: data.message
        })
    });

    $scope.sendMessage = function(){
        socket.emit('user:message', {
            user: $scope.name,
            message: $scope.message
        });
        
        $scope.messages.push({
            user: $scope.name,
            message: $scope.message
        });
        
        $scope.message = '';
    };
    
}])