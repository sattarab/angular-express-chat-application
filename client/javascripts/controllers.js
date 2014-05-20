'use strict';

angular.module('app.controllers', ['app.factory'])
.controller('HomeCtrl', ['$scope', '$anchorScroll', '$location', 'socket', function ($scope, $anchorScroll, $location, socket){
    $scope.messages = [];
    
    socket.on('init', function (data){
        $scope.name = data.name;
        $scope.users = data.users;
    });
    
    socket.on('user:join', function (data){
        $scope.messages.push({
            src: '../images/notification.png',
            user: 'chatroom',
            message: data.name + ' has joined the chatroom'
        });
        $scope.users.push(data.name);
    });
    
    socket.on('user:message', function (data){
        $scope.messages.push({
            src: '../images/facebook-avatar.png',
            user: data.user,
            message: data.message
        })
    });

    socket.on('user:left', function(data){
        $scope.messages.push({
            src: '../images/notification.png',
            user: 'chatroom',
            message: data.user + ' has left'
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
    
    socket.on('user:changename', function (data){
        var index = $scope.users.indexOf(data.oldname);
        if (index != -1){
            $scope.users.splice(index, 1);
            $scope.users.push(data.name);
        }
    })
    
    $scope.sendMessage = function(){
        socket.emit('user:message', {
            user: $scope.name,
            message: $scope.message
        });
        
        $scope.messages.push({
            src: '../images/facebook-avatar.png',
            user: $scope.name,
            message: $scope.message
        });
        $scope.message = '';
    };
    
    $scope.changeName = function(){
        socket.emit('user:changename', {
            name: $scope.newname
        });
        
        var i, user;
        for (i = 0; i < $scope.users.length; i++) {
          user = $scope.users[i];
          if (user === $scope.name) {
            $scope.users.splice(i, 1);
            break;
          }
        }
        $scope.users.push($scope.newname);
        
        socket.emit('user:message', {
            user: $scope.newname,
            message: $scope.name + ' has changed the name to ' + $scope.newname
        });
        
        $scope.messages.push({
            src: '../images/facebook-avatar.png',
            user: $scope.newname,
            message: $scope.name + ' has changed the name to ' + $scope.newname
        });
        
        $scope.name = $scope.newname;
        $scope.newname = '';
    }
}])