const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

const jsonPath = {
    config:'config.json',
    logs:'logs.json'
}

const getValuesFromConfigJson = RTCMultiConnectionServer.getValuesFromConfigJson;
var config = getValuesFromConfigJson(jsonPath);

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static('src'));
app.use(express.static('node_modules/webrtc-adapter/out'));
app.use(express.static('node_modules/webrtc-screen-capturing'));

app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/popper.js/dist/umd'));


app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));

app.use(express.static('public'));

app.use(express.static('views/'));

app.use('/lti',require('./lti'));

app.use('/homeTeacher',function(req, res, next){
    res.render('teacher/index');
});

app.use('/homeStudent',function(req, res, next){
    res.render('student/index');
});

app.use('/chatroomTeacher', function(req, res, next){
    res.render('teacher/ConferenceRoom');
});

app.use('/chatroomStudent', function(req, res, next){
    res.render('student/ConferenceRoom');
});


server.listen(3000, ()=>{
    console.log('Server started at port: 3000');
});

ioServer(server).on('connection', function(socket) {
    RTCMultiConnectionServer.addSocket(socket, config);    
});
