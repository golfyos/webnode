var express = require('express');
var path = require('path');
var fs = requrire('fs');
var router = express.Router();

/* GET home page. */

router.get('/',function(req, res){
    res.sendFile(path.resolve(__dirname + "/../public/Main.html"));
});

router.post('/play',function(req,res){
  if(req.body.menu == "about"){
      res.sendFile(path.resolve(__dirname+"/../public/About.html"));
  }
  else{
    res.sendFile(path.resolve(__dirname+"/../public/web-app.html"));
  }
});

router.all('*',function(req,res){
    res.sendFile(path.resolve(__dirname+"/../public/Main.html"));
});

module.exports = router;
