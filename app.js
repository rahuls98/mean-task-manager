const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//DATABASE SET-UP
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to database: " + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log("Database error: " + err);
});

//SERVER SET-UP
const app = express();
const PORT = process.env.PORT || 8080;
const users = require('./routes/users');
const tasks = require('./routes/tasks');

//MIDDLEWARE SET-UP
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users);
app.use('/tasks', tasks);

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});
