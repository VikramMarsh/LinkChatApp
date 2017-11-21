var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io=require('socket.io')(server);

var bodyParser = require('body-parser');
var config = require('./webpack.config.js');
var webpack = require('webpack');
var mongoose=require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var port = process.env.PORT || 8080;

var signup =require('./routes/signup.route');
var login =require('./routes/login.route');
var profile =require('./routes/profile.route');
var messages=require('./routes/message.route');
var member =require('./routes/member.route');
var jwt=require('jsonwebtoken');
var expressJWT = require('express-jwt');
var configJWT=require('./config');

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

// Routing

app.use(bodyParser.json());
app.use('/',express.static(path.resolve(__dirname,'./public')));

// app.use(expressJWT(configJWT).unless({path:['/api/login','/api/signup']}));

app.use('/api',signup);
app.use('/api',login);
app.use('/api/profile',profile);
app.use('/api/member',member);
app.use('/api',messages);

// Route
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
})

//DB connection
mongoose.connect('mongodb://localhost/chat');
var appDB = mongoose.connection;
appDB.on('error', console.error.bind(console, 'connection error:'));
appDB.once('open', function() {
    console.log("connnected with mongo");
});

//Socket Connection

// //Socket middleware to authenticate socket connection
// io.use(function(socket, next) {
//   if(socket) {
//     var token = socket.handshake.query.jwtToken,
//               decodedToken;
//     try {
//       decodedToken = jwt.verify(token,configJWT.secret);
//       console.log("token valid for user", decodedToken.username);
//       socket.username = decodedToken.username;
//       next();
//       } catch (err) {
//         console.log(err);
//         next(new Error("not valid token"));
//         //socket.disconnect();
//         socket.emit('disconnect', err);
//       }
//     }
//   });



var connectedSockets=[];

io.on('connection',function(socket){
	console.log("some Connected");

	if(connectedSockets.indexOf(socket)===-1)
		connectedSockets.push(socket);


	console.log("no of connected sockets %s",connectedSockets.length);
	

	socket.on('privateroom',(data)=>{
		socket.join(data.username);
		console.log("joined room")
	});

	socket.on('leaveroom',(data)=>{
		socket.leave(data.username);
		console.log("roomleft")
	})


	socket.on('to:from',(data)=>{
		console.log(data);
		socket.join(data.to+":"+data.from);
		console.log("room between user");
	});

	socket.on('leave:to:from',(data=>{
		socket.leave(data.to+":"+data.from);
		console.log("to:roomleft:from");
	}));

	

	socket.on('privateSentMessage',(data)=>{
		console.log(data);
		socket.broadcast.to(data.to).emit('privateRecievedMessage',
			{to:data.to,
			from:data.from,
			email:data.email,
			message:data.message,
			time:data.time,
			date:data.date,
			baseDate:data.baseDate});

		socket.broadcast.to(data.from+":"+data.to).emit('betweenUser',
			{to:data.to,
			from:data.from,
			email:data.email,
			message:data.message,
			time:data.time,
			date:data.date,
			baseDate:data.baseDate});


	})



	socket.on('username',(data)=>{
		socket.username=data.username;
		socket.email=data.email;
		socket.broadcast.emit('username',{
			username:socket.username,
			id:socket.id,
			email:socket.email
		});
		var sendConnectedUserList=connectedSockets.map((item)=>{
			return{
				id:item.id,
				username:item.username,
				email:item.email
			}
		});

		socket.broadcast.emit('newConnectedUser',sendConnectedUserList);

	});

	socket.on('getConnectedClients',(nothing,cb)=>{
  		var connectedUserList=connectedSockets.map((item)=>{
  			return{
  				id:item.id,
  				username:item.username,
  				email:item.email
  			}
  		});
  		cb(connectedUserList);
  	});

	socket.on('disconnect', function(){
    	console.log(socket.username+' disconnected');

    	var index=connectedSockets.indexOf(socket);
    	connectedSockets.splice(index,1);

    	console.log("no of connected sockets %s",connectedSockets.length);

    	var sendConnectedUserList=connectedSockets.map((item)=>{
			return{
				id:item.id,
				username:item.username,
				email:item.email
			}
		});

		socket.broadcast.emit('newDisconnectedUser',sendConnectedUserList);


  	});

});


server.listen(port, function(){
  console.log('listening on *:8080');

});