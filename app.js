var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var index = require('./routes/index');
var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
//app.use('/',index);
// 
app.get('/',function(req, res){
    //console.log("get");
    res.sendFile(path.resolve(__dirname + "/public/Main.html"));
});

app.post('/',function(req, res){
    //console.log("post");
    var obj,str;
    fs.readFile(path.resolve(__dirname +'/public/json/player.json'), 'utf8', function (err, dat) {
        if (err) throw err;
        obj = JSON.parse(dat);
        obj.winner.push(req.body.playerName);
        obj.numberOfWinner = obj.numberOfWinner+1;
        str = JSON.stringify(obj)
        fs.writeFile(path.resolve(__dirname +'/public/json/player.json'), str, function (err) {
            if (err) return console.log(err);
        });
    });
    res.sendFile(path.resolve(__dirname + "/public/Main.html"));
});

app.post('/playing',function(req, res){
    fs.readFile(path.resolve(__dirname +'/public/json/question.json'),'utf8',function(err,dat){
        res.json(JSON.parse(dat));
    });
});

app.post('/play',function(req, res){
    if(req.body.menu ==  "about"){
        res.sendFile(path.resolve(__dirname+"/public/About.html"));
    }
    else if(req.body.menu =="newgame"){   
        res.sendFile(path.resolve(__dirname+"/public/game.html")); 
    }
});

app.post('/player',function(req,res){
    fs.readFile(path.resolve(__dirname +'/public/json/player.json'),'utf8',function(err,dat){
        if(err) throw err;
        var obj = JSON.parse(dat);
        res.render("index.ejs",{info:obj})
    });
    
});

app.all('*',function(req,res){
    res.sendFile(path.resolve(__dirname+"/public/Main.html"));
});

module.exports = app;
app.listen(3000,function(){
  console.log("port 3000");
});
