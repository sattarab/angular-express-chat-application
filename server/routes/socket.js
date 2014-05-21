var userService = (function (){
    var names = {};
    var time = 0;
    
    var isalloted = function (name){
        if (!name || names[name]){ 
            return true;
        }
        else{
            names[name] = true;
            return false;
        }
    };
    
    var getname = function (){
        var name,
        i = 1;
        
        do{
            name = 'user' + i
            i++;
        } while (isalloted(name));
        
        return name;
    }
    
    var free = function (name){
        if (names[name]){
            delete names[name];
        }
    }
    
    var freeall = function (){
        for (var i = 0; i < names.length; i++){
            delete names[name];
        }
    }
    
    var get = function (){
        var res = [];
        
        for(user in names){
            res.push(user);
        }
        
        return res;
    }
    
    return{
        isalloted: isalloted,
        getname: getname,
        free: free,
        freeall: freeall,
        get: get,
        time: time
    }
    
}());

module.exports = function (socket){
        var name = userService.getname();
        var oldname;
        console.log('count: ' + userService.get().length);
        
        socket.emit('init', {
            name: name,
            users: userService.get(),
            count: userService.get().length
        });
        
        socket.broadcast.emit('user:join', {
            name: name,
            count: userService.get().length
        });
        
        socket.on('user:message', function (data){
            console.log('name: ' + data.user);
            console.log('data: ' + data.message);
            socket.broadcast.emit('user:message', {
                user: data.user,
                message: data.message
            })
        });
        
        socket.on('user:changename', function (data){
            if (!userService.isalloted(data.name)){
                oldname = name;
                userService.free(name);
                name = data.name;
                console.log('oldname: ' + oldname);
                console.log('name: ' + name);
                socket.broadcast.emit('user:changename', {
                    oldname: oldname,
                    name: name
                });
            }
        });
        
        socket.on('disconnect', function(){
            console.log('in disconnect');
            userService.free(name);
            socket.broadcast.emit('user:left', {
                user: name,
                count: userService.get().length
            });
        });
        
        socket.on('session:truncate', function(){
            socket.broadcast.emit('session:truncate', function (){
                userService.freeall();
            })
        })
}