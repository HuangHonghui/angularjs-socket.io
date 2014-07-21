/**
 * Created by huanghonghui on 14-7-12.
 */
var express = require('express');
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var io = require('socket.io')(http);



// 连接数据库
mongoose.connect('mongodb://localhost/Ton');
var Messages = require("./models/messages.js");

// 引入路由
var routes = require('./routes/index');

// 设置静态文件路径
app.use(express.static(__dirname + '/public'));

// 设置模板引擎，并把文件后缀设置成html
app.engine('.html', require('ejs').__express);
app.set("views", __dirname + '/views');
app.set('view engine', 'html');

app.use(bodyParser());

// 使用路由
app.use("/",routes);




io.on('connection', function(socket){

    Messages.find().exec(function(err,messages){
        if(err) console.error(err);

        socket.emit("init:msg",messages);
    });

    console.log("a user connected");

    socket.on("disconnect", function(){
        console.log("user disconnect");
    });

    socket.on("send:msg", function(msg){
        console.log("server on send:msg");
        var newMsg = new Messages(msg);
        newMsg.save(function(err,msgHadSaved){

            if(err) console.error(err);
//            io.emit("new:msg",msgHadSaved);
            socket.broadcast.emit("new:msg", msgHadSaved);
        });
//        console.log('mesage:',msg);
//        msg.created = new Date();
//        socket.broadcast.emit("new:msg", msg);
//        io.emit("new:msg", msg);
    });
//    socket.broadcast.emit('hi')
});

http.listen(3000, function(){
    console.log('listen on *:3000');
});