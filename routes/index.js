var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

/* GET home page. */

router.get('/',function(req, res){
    res.sendFile(path.resolve(__dirname + "/../public/Main.html"));
});

router.post('/play',function(req,res){
  if(req.body.menu == "about"){
      res.sendFile(path.resolve(__dirname+"/../public/About.html"));
  }
  else if(req.body.menu=="newgame"){
    res.sendFile(path.resolve(__dirname+"/../public/web-app.html"));
       /* fs.readFile(path.resolve(__dirname + "/../public/json/question.json"),"utf-8",function(err,data){
            var json = JSON.parse(data);
            res.render("index.ejs",{data:json});
        });*/  
  }
});


router.all('*',function(req,res){
    res.sendFile(path.resolve(__dirname+"/../public/Main.html"));
});

module.exports = router;
