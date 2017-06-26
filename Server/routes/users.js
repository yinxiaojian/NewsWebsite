var express = require('express');
var router = express.Router();
var userFetch = require('../models/userfetch');
/* GET users listing. */

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
                    email:result[0].email,
                    col:result[0].col,
                    skin:result[0].skin
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

router.get('/logout', function(req, res) {
    if (req.session.user != null) {
        console.log("fuck");
        delete req.session.user;
        res.json({code:4});//注销成功
    } else {
        //res.json({code:5});
    }

});

router.get('/session', function(req, res) {
    if (req.session.user != null) {
        let user = req.session.user;
        let result = {
            col:user.col,
            skin:user.skin
        };
        console.log(user);
        res.json(result);
    } else {
       res.json({code:9});//未登录
    }

});

router.post('/custom', function(req, res) {

    if (req.session.user != null) {
        let user = req.session.user;
        let infor = {
            email: user.email,
            col : req.body.col,
            skin : req.body.skin
        };
        userFetch.customUpdate(infor,function (err, result){
            if(err) {
                console.log(err);
                res.json({code:0});
            } else {
                user.skin = req.body.skin;
                user.col = req.body.col;
                res.json({code:7});//更新成功
            }
        });
    } else {
        res.json({code:9});//未登录
    }

});

router.get('/status',function (req,res) {
    if(req.session.user != null)
        res.json({code:8});//登陆
    else
        res.json({code:9});//未登录
});

module.exports = router;
