var express = require('express'),
path = require('path'),
logfmt = require('logfmt'),
http = require('http'),
app = express(),
server = http.Server(app),
io = require('socket.io')(server),
socket = require('./server/routes/socket');

app.configure(function(){
    app.set('port', process.env.PORT || 8000);
    app.use(logfmt.requestLogger());
    app.set('views', path.join(__dirname, '/client/views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon(__dirname + '/client/images/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.multipart());
    app.use(express.cookieParser(''));
    app.use(express.session({ secret: 'chat' }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'client')));
})

if (app.get('env') === 'development') {
    app.use(express.errorHandler({ showStack: true, dumpExceptions: true}));
}

require('./routes')(app);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
io.on('connection', socket);
