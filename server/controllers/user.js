var User = require('../models/user');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.user_register = function (req, res, next) {
    console.log(req.body);
    var userObj = req.body.user;
    var user = new User(userObj);

    User.findOne({loginEmail: userObj.loginEmail}, function(err,obj) { 
        if (obj == null) {
            user.save(function (err, newUser) {
                if (err) {
                    return next(err);
                }
                res.send(newUser)
            })
        } else {
            console.log(obj);
            var duplicatedLoginNameErr = new Error("DUPLICATED");
            duplicatedLoginNameErr.status = 427; duplicatedLoginNameErr.statusText = "user exists";
            return next(duplicatedLoginNameErr);
        }
    });
    
};

exports.user_login = function (req, res, next) {
    res.clearCookie('status');

    var loginEmail = req.body.loginEmail;
    var password = req.body.password;
        
    User.findOne({loginEmail: loginEmail}, function(err,findUser) {
        if (err != null || findUser == null) {
            var passErr = new Error("USER_NOT_EXISTS");
            passErr.status = 427; 
            return next(passErr);
        } else {
            User.findOne({loginEmail: loginEmail, password: password}, function(err,findUser) {
                if (findUser != null) {
                    res.send(findUser)
                } else {
                    var passErr = new Error("INCORRECT_PASSWORD");
                    passErr.status = 427; 
                    passErr.statusText = "INCORRECT_PASSWORD";
                    return next(passErr);
                }
            })
        }
    })
};

exports.user_logout = function (req, res, next) {
    res.send('success')
    // if (req.body.api_params) {
    //     var jsonObj = JSON.parse(req.body.api_params);
    //     var os = jsonObj.os;
    // }

    // if (os) {
    //     authUtils.mobileLogout(req.session.userId, os, req, res, next, function(logoutErr, logoutResult) {
    //         if (logoutErr) {
    //             return next(logoutErr);
    //         } else {
    //             utils.destroySession(req);
    //             return utils.successResponse("logged out!", res, next);
    //         }
    //     });
    // } else {
    //     utils.destroySession(req);
    //     return utils.successResponse(consts.USER_LOGGED_OUT, res, next);
    // }
};

exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.user_list = function (req, res) {
    User.find({}, function (err, userlist) {
        if (err) return next(err);
        res.send(userlist);
    })
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('user udpated.');
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};