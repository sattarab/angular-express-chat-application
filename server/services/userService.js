var userService = (function (){
    var names = {};
    
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
        } while (!isalloted(name));
        
        return name;
    }
    
    var free = function (name){
        if (name){
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
        get: get
    }
    
}());