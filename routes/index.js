var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */

router.get('/',function(req, res){
    res.sendFile(path.resolve(__dirname + "/../public/Main.html"));
});

router.post('/about',function(req,res){
  if(req.body.menu == "about"){
      alert("gg");
      res.sendFile(path.resolve(__dirname+"/../public/About.html"));
  }
});


module.exports = router;
