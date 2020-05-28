const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//USER SCHEMA
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    labels: {
        type: Array,
        require: true
    },
    sag: {
        type: Boolean,
        require: true
    },
    gamification: {
        activeOn: {
            type: Array,
            require: true
        },
        score: {
            type: Number,
            require: true
        },
        n : {
            type: Number,
            require: true
        }
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}

module.exports.getLabels = function(username, callback) {
    User.find({username: username},  {labels: 1}, callback);
}

module.exports.addLabel = function(username, labelInfo, callback) {
    console.log(labelInfo);
    User.updateOne({ username: username}, {$addToSet: {labels: labelInfo}}, callback);
}

module.exports.delLabel = function(username, labels, callback) {
    User.updateOne({ username: username}, {$set: {labels: labels}}, callback);
}

module.exports.updateSAS = function(username, gObj ,callback) {
    console.log("Inside user.js: " + username);
    console.log(gObj);
    User.updateOne({ username: username}, {gamification: gObj}, callback);
}

module.exports.updateActiveOn = function(username, activeOn ,callback) {
    console.log("Inside user.js: " + username);
    console.log(activeOn);
    User.update({ username: username}, {$set: {"gamification.activeOn": activeOn, sag: true}}, callback);
}
