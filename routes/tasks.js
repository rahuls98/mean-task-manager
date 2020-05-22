const express = require('express');
const router = express.Router();
const Task = require('../models/task');

module.exports = router;

router.post('/create', (req, res, next) => {
    let newTask = new Task({
        title: req.body.title,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        label: req.body.label,
        status: req.body.status,
        isDone: req.body.isDone,
        gamification: req.body.gamification
    });

    Task.addTask(newTask, (err, task) => {
        if(err)
            res.json({success: false, msg: "Failed to add task! \n (Check if due date is valid)"});
        else {
            console.log("Added new task: " + task.title);
            res.json({success: true, msg: "New task added!"});
        }
    });
});

router.get('/read/:id', (req, res, next) => {
    let taskID = req.params.id;
    Task.getTask(taskID, (err, tasks) => {
        if(err)
            res.json({success: false, msg: "Failed to retrieve tasks!"});
        else {
            console.log("Retrieved tasks: " + tasks.length);
            res.json({success: true, tasks: tasks});
        }
    });
});

router.get('/readAll', (req, res, next) => {
    Task.getAllTasks((err, tasks) => {
        if(err)
            res.json({success: false, msg: "Failed to retrieve tasks!"});
        else {
            console.log("Retrieved tasks: " + tasks.length);
            res.json({success: true, tasks: tasks});
        }
    });
});

router.put('/updateStatus', (req, res, next) => {
    let taskID = req.body._id;
    let task_isDone = req.body.isDone;
    let task_SAS = req.body.SAS;
    Task.updateTaskStatus(taskID, task_SAS, task_isDone, (err, updateResult) => {
        if(err)
            res.json({success: false, msg: "Failed to update task!"});
        else {
            console.log("Updated task: " + taskID);
            res.json({success: true, update: updateResult});
        }
    });
});

router.put('/update', (req, res, next) => {
    let taskID = req.body._id;
    let taskUpd = req.body.taskUpd;
    console.log(taskUpd)
    Task.updateTask(taskID, taskUpd, (err, updateResult) => {
        if(err)
            res.json({success: false, msg: "Failed to update task!"});
        else {
            console.log("Updated task: " + taskID);
            res.json({success: true, update: updateResult});
        }
    })
})

router.delete('/delete/:id', (req, res, next) => {
    let taskId = req.params.id;
    Task.deleteTask(taskId, (err, deleteResult) => {
        if(err)
            res.json({success: false, msg: "Failed to delete task!"});
        else {
            console.log("Deleted task: " + taskId);
            res.json({success: true, delete: deleteResult});
        }
    });
});

router.get('/filter/:field', async (req, res, next) => {
    let filterField = req.params.field;
    let filteredTasks = await Task.filterTasks(filterField);
    res.send(filteredTasks);
})

router.get('/sort/:field', (req, res, next) => {
    let sortBy = req.params.field
    Task.sortTasks(sortBy, (err, sortedTasks) => {
        if(err)
            res.json({success: false, msg: "Failed to sort tasks!"});
        else {
            console.log("Sorted tasks: " + sortedTasks.length);
            res.json({success: true, sortedTasks: sortedTasks});
        }
    });
});

router.get('/search', (req, res, next) => {
    var obj = req.query;
    Task.searchTasks(obj, (err, tasks) => {
        if(err)
            res.json({success: false, msg: "Failed to find tasks!"});
        else {
            console.log("Found tasks: " + tasks.length);
            res.json({success: true, tasks: tasks});
        }
    })
});

router.get('/labels', (req, res, next) => {
    Task.distinct('label', (err, labels) => {
        if(err)
            res.json({success: false, msg: "Failed to retrieve labels!"});
        else {
            console.log("Retrieved tasks: " + labels.length);
            res.json({success: true, labels: labels});
        }
    });
});