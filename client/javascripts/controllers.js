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

    socket.on('user:left', function(data){
        $scope.messages.push({
          user: 'chatroom',
          message: data.user + ' has left.'
        });
        var i, user;
        for (i = 0; i < $scope.users.length; i++) {
          user = $scope.users[i];
          if (user === data.user) {
            $scope.users.splice(i, 1);
            break;
          }
        }
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