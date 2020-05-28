const express = require('express');
const router = express.Router();
const Task = require('../models/task');

module.exports = router;

router.post('/:username/create', (req, res, next) => {
    let username = req.params.username;
    let newTask = new Task({
        username: username,
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

router.get('/:username/read/:id', (req, res, next) => {
    let username = req.params.username;
    let taskID = req.params.id;
    Task.getTask(username, taskID, (err, tasks) => {
        if(err)
            res.json({success: false, msg: "Failed to retrieve task!"});
        else {
            console.log("Retrieved task: " + tasks.length);
            res.json({success: true, tasks: tasks});
        }
    });
});

router.get('/:username/readAll', (req, res, next) => {
    let username = req.params.username;
    Task.getAllTasks(username, (err, tasks) => {
        if(err)
            res.json({success: false, msg: "Failed to retrieve tasks!"});
        else {
            console.log("Retrieved tasks: " + tasks.length);
            res.json({success: true, tasks: tasks});
        }
    });
});

router.put('/:username/updateStatus', (req, res, next) => {
    let username = req.params.username;
    let taskID = req.body._id;
    let task_isDone = req.body.isDone;
    let task_SAS = req.body.SAS;
    Task.updateTaskStatus(username, taskID, task_SAS, task_isDone, (err, updateResult) => {
        if(err)
            res.json({success: false, msg: "Failed to update task!"});
        else {
            console.log("Updated task: " + taskID);
            res.json({success: true, update: updateResult});
        }
    });
});

router.put('/:username/update', (req, res, next) => {
    let username = req.params.username;
    let taskID = req.body._id;
    let taskUpd = req.body.taskUpd;
    console.log(taskUpd)
    Task.updateTask(username, taskID, taskUpd, (err, updateResult) => {
        if(err)
            res.json({success: false, msg: "Failed to update task!"});
        else {
            console.log("Updated task: " + taskID);
            res.json({success: true, update: updateResult});
        }
    })
})

router.delete('/:username/delete/:id', (req, res, next) => {
    let username = req.params.username;
    let taskId = req.params.id;
    Task.deleteTask(username, taskId, (err, deleteResult) => {
        if(err)
            res.json({success: false, msg: "Failed to delete task!"});
        else {
            console.log("Deleted task: " + taskId);
            res.json({success: true, delete: deleteResult});
        }
    });
});

router.get('/:username/filter/:field', async (req, res, next) => {
    let username = req.params.username;
    let filterField = req.params.field;
    let filteredTasks = await Task.filterTasks(username, filterField);
    res.send(filteredTasks);
})

router.get('/:username/sort/:field', (req, res, next) => {
    let username = req.params.username;
    let sortBy = req.params.field
    Task.sortTasks(username, sortBy, (err, sortedTasks) => {
        if(err)
            res.json({success: false, msg: "Failed to sort tasks!"});
        else {
            console.log("Sorted tasks: " + sortedTasks.length);
            res.json({success: true, sortedTasks: sortedTasks});
        }
    });
});

router.get('/:username/search', (req, res, next) => {
    let username = req.params.username;
    var obj = req.query;
    Task.searchTasks(username, obj, (err, tasks) => {
        if(err)
            res.json({success: false, msg: "Failed to find tasks!"});
        else {
            console.log("Found tasks: " + tasks.length);
            res.json({success: true, tasks: tasks});
        }
    })
});

/* router.get('/labels', (req, res, next) => {
    Task.distinct('label', (err, labels) => {
        if(err)
            res.json({success: false, msg: "Failed to retrieve labels!"});
        else {
            console.log("Retrieved tasks: " + labels.length);
            res.json({success: true, labels: labels});
        }
    });
}); */