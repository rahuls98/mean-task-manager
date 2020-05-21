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
        password: req.body.password
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
                        email: user.email
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

module.exports = router;