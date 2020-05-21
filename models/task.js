const mongoose = require('mongoose');

//TASK SCHEMA
const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    dueDate: {
        type: Date,
        min: getPreviousDate(),
        require: true
    },
    priority: {
        type: String,
        require: true
    },
    label: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);

function getPreviousDate() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString();
}

module.exports.addTask = function(newTask, callback) {
    newTask.save(callback);
};

module.exports.getTask = function(taskID, callback) {
    Task.find({ _id: taskID }, callback);
};

module.exports.getAllTasks = function(callback) {
    Task.find({}, callback);
};

module.exports.updateTaskStatus = function(taskID, task_isDone, callback) {
    var obj = {}
    if(task_isDone) {
        obj["status"] = "Completed";
        obj["isDone"] = task_isDone;
    }
    else {
        obj["status"] = "Pending";
        obj["isDone"] = task_isDone;
    }
    Task.updateOne({ _id: taskID }, obj , callback);
}

module.exports.updateTask = function(taskID, taskUpd, callback) {
    Task.updateOne({ _id: taskID }, taskUpd, callback);
}

module.exports.deleteTask = function(taskId, callback) {
    Task.deleteOne({ _id: taskId }, callback);
};

getFieldValues = async function(filterField) {
    let values = await Task.distinct(filterField);
    return await values;
};

module.exports.filterTasks = async function(filterField) {
    let distinctValues = await getFieldValues(filterField);
    var obj = {};
    for(let i=0; i<await distinctValues.length; i++) {
        var filter = {};
        filter[filterField] = distinctValues[i];
        let filteredTask = await Task.find(filter);
        obj[distinctValues[i]] = await filteredTask;
    }
    return obj;
}

module.exports.sortTasks = function(sortBy, callback) {
    Task.find({}, callback).sort(sortBy);
}

module.exports.searchTasks = function(queryParams, callback) {
    var pattern = "";
    if(queryParams.title) {
        var words = queryParams.title.split(' ');
        words.forEach(word => {
            pattern += "(.*" + word + ")"
        });
        queryParams.title = {$regex: pattern, $options:"i"};
    };
    Task.find(queryParams, callback);
}