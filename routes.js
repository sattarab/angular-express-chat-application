var routes  = require('./server/routes');

var auth = function (req, res, next){ 
    if (!req.isAuthenticated()){
        res.send(401); 
    }
    else{
        next();
    }
};

exports = module.exports = function (app, passport){
    app.get('/', function(req, res){
        res.render('index');
    });
}