var express = require("express");
var bodyParser = require("body-parser");

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
const uri = "mongodb+srv://rahuls98:AnLEEvepFOfcieeP@task-cluster-gwbqv.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE = "task-manager";
const COLLECTION = "tasks";
var db;

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

mongodb.MongoClient.connect(uri, function (err, client) {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db(DATABASE);
    console.log("\nDatabase connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8000, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
        console.log();
    });
});

//API ROUTES
app.get("/api/tasks", function(req, res) {
    db.collection(COLLECTION).find({}).toArray(function(err, tasks) {
        if(err) res.send(err);

        console.log("Retrieved tasks!");
        res.status(200).json(tasks);
    });
});

app.get("/api/task/:id", function(req, res) {
    db.collection(COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, task) {
        if(err) res.send(err);

        console.log("Retrieved task!");
        res.status(200).json(task);
    });
});

app.post("/api/task", function(req, res){
    var newTask = req.body;

    if (!req.body.title) res.send("Invalid user input");
    
    else {
        db.collection(COLLECTION).insertOne(newTask, function(err, doc) {
            if (err) res.send("Failed to insert!");
            else res.status(201).json(doc.ops[0]);
        });
    }
});