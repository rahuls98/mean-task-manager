const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        gamification: req.body.gamification
    });

    User.addUser(newUser, (err, user) => {
        if(err)
            res.json({success: false, msg: "Failed to register user"});
        else {
            console.log("Registered new user: " + user.email);
            res.json({success: true, msg: "Registered user"});
        }
    })
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    //Matched user document returned
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({success: false, msg: "User not found"});

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //week in seconds
                });

                res.json({
                    success: true, 
                    token: 'JWT '+ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        gamification: user.gamification
                    }
                });
            } else {
                return res.json({success: false, msg: "Wrong password"});
            }
        })
    })
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    console.log("Logged in: " + req.user.username);
    res.json({user: req.user});
});

router.put('/addLabel', (req, res, next) => {
    let username = req.body.username;
    let labelInfo = req.body.labelInfo;
    User.addLabel(username, labelInfo, (err, updateResult) => {
        if(err) 
            res.json({success: false, msg: "Failed to update label info!"});
        else {
            console.log("Updated label for: " + username);
            res.json({success: true, update: updateResult});
        }
    })
});

router.get('/getLabels/:username', (req, res, next) => {
    let username = req.params.username;
    User.getLabels(username, (err, labelsArray) => {
        if(err)
            res.json({success: false, msg: "Failed to get label info!"});
        else {
            console.log("Retrieved labels for: " + username);
            res.json({success: true, labels: labelsArray});
        }
    })
})

router.put('/delLabel', (req, res, next) => {
    let username = req.body.username;
    let labels = req.body.labels;
    User.delLabel(username, labels, (err, deleteResult) => {
        if(err) 
            res.json({success: false, msg: "Failed to delete label!"});
        else {
            console.log("Deleted label for: " + username);
            res.json({success: true, update: deleteResult});
        }
    })
})

router.put('/updateActiveOn', (req, res, next) => {
    let username = req.body.username;
    let activeOn = req.body.activeOn;
    console.log(req.body);
    User.updateActiveOn(username, activeOn, (err, updateResult) => {
        if(err)
            res.json({success: false, msg: "Failed to update activeOn!"});
        else {
            console.log("Updated activeOn for: " + username);
            res.json({success: true, update: updateResult});
        }
    })
});

router.put('/updateSAS', (req, res, next) => {
    let username = req.body.username;
    let gObj = req.body.gamification;
    console.log(req.body);
    User.updateSAS(username, gObj, (err, updateResult) => {
        if(err)
            res.json({success: false, msg: "Failed to update SAS!"});
        else {
            console.log("Updated SAS for: " + username);
            res.json({success: true, update: updateResult});
        }
    })
});

module.exports = router;