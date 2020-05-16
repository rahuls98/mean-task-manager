var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
const uri = "mongodb+srv://rahuls98:AnLEEvepFOfcieeP@task-cluster-gwbqv.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE = "task-manager";
const COLLECTION = "tasks";
var db;

var app = express();
app.use(bodyParser.json());
app.use(cors());

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
app.get("/api/readTasks", function(req, res) {
    db.collection(COLLECTION).find({}).toArray(function(err, tasks) {
        if(err) 
            res.send("Failed to read tasks:\n"+ err);
        else {
            console.log("Retrieved tasks!");
            res.status(200).json(tasks);
        }
    });
});

app.get("/api/readTask/:id", function(req, res) {
    db.collection(COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, task) {
        if(err) 
            res.send(err);
        else {
            console.log("Failed to read task:\n"+ err);
            res.status(200).json(task);
        }
    });
});

app.post("/api/createTask", function(req, res){
    var newTask = req.body;
    if(!req.body.title) 
        res.send("Invalid user input");
    else {
        db.collection(COLLECTION).insertOne(newTask, function(err, doc) {
            if(err) 
                res.send("Failed to create task:\n"+ err);
            else {
                console.log("Inserted task!");
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});


app.delete("/api/deleteTask/:id", function(req, res) {
    db.collection(COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if(err) res.send("Failed to delete task:\n"+ err);
      
        else {
            console.log("Deleted task!");
            res.status(200).json(req.params.id);
        }
    });
});

app.put("/api/updateTaskStatus/:id", function(req, res) {
    var docId = req.params.id;
    var statusUpdate = req.body.status;
    if((req.body.status !=  true) && (req.body.status !=  false))
        console.log("Invalid status in request body!");

    else {
        db.collection(COLLECTION).updateOne({_id: new ObjectID(docId)}, {$set: {isDone: statusUpdate}}, function(err, result) {
            if(err) res.send("Failed to update task status:\n"+ err);

            else {
                console.log("Updated task status!");
                res.status(200).json(docId);
            }
        });
    }
});