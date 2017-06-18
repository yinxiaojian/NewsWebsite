var express = require('express');
var router = express.Router();
var userFetch = require('../models/userfetch');
/* GET users listing. */
router.get('/logout', function(req, res) {
    if (req.session.user != null) {
        console.log("fuck");
        delete req.session.user;
        res.json({code:4});//注销成功
    } else {
        //res.json({code:5});
    }

});

router.post('/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    userFetch.login(email,function (err, result){
        if(err) {
            console.log(err);
            res.json({code:0});
        } else {
            if (result.length==0) {
                res.json({code:1});
            } else if (result[0].password!=password) {
                res.json({code:2});
            } else if (result[0].password==password) {
                let user={
                    name:result[0].name,
                    email:result[0].email
                };
                req.session.user=user;
                res.json({code: 3,name:result[0].name,email:result[0].email});//登陆成功
            } else {
                console.log("=_^");
            }
        }
    });
});

router.post('/register', function(req, res, next) {
    let email = req.body.email;
    userFetch.registerEmail(email,function (err, result){
        if(err) {
            console.log(err);
            res.json({code:0});
        } else {
            if (result.length!=0) {
                res.json({code:1});
            } else {
                next();
            }
        }
    });
},function (req, res, next) {
    let name = req.body.name;
    userFetch.registerUser(name,function (err, result){
        if(err) {
            console.log(err);
            res.json({code:0});
        } else {
            if (result.length!=0) {
                res.json({code:2});
            } else {
                next();
            }
        }
    });
},function (req, res) {
    let infor = {
        "email" : req.body.email,
        "name" : req.body.name,
        "password" : req.body.password,
        "society" : 50,
        "entertainment" : 50,
        "tech" : 50,
        "sports" : 50,
        "car" : 50,
        "finance" : 50,
        "funny" : 50
    };
    userFetch.registerInsert(infor,function (err, result){
        if(err) {
            console.log(err);
            res.json({code:0});
        } else {
            res.json({code:3});
        }
    });
});




module.exports = router;
