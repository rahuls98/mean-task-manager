const mongoose = require('mongoose');

//TASK SCHEMA
const TaskSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
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
    },
    gamification: {
        checked: {
            type: Date,
            require: true
        },
        score : {
            type: Number,
            require: true
        }
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

module.exports.getTask = function(username, taskID, callback) {
    Task.find({ username:username, _id: taskID }, callback);
};

module.exports.getAllTasks = function(username, callback) {
    Task.find({username: username}, callback);
};

module.exports.updateTaskStatus = function(username, taskID, task_SAS, task_isDone, callback) {
    var obj = {}
    if(task_isDone) {
        obj["status"] = "Completed";
        obj["gamification"] = {};
        obj["gamification"]["firstCheck"] = new Date().toISOString();
        obj["gamification"]["score"] = task_SAS;
        obj["isDone"] = task_isDone;
    }
    else {
        obj["status"] = "Pending";
        obj["gamification"] = {};
        obj["gamification"]["firstCheck"] = null;
        obj["gamification"]["score"] = null;
        obj["isDone"] = task_isDone;
    }
    console.log(obj);
    Task.updateOne({ username: username, _id: taskID }, obj , callback);
}

module.exports.updateTask = function(username, taskID, taskUpd, callback) {
    Task.updateOne({ username:username, _id: taskID }, taskUpd, callback);
}

module.exports.deleteTask = function(username, taskId, callback) {
    Task.deleteOne({ username: username, _id: taskId }, callback);
};

getFieldValues = async function(filterField, username) {
    let values = await Task.distinct(filterField, {username: username});
    return await values;
};

module.exports.filterTasks = async function(username, filterField) {
    let distinctValues = await getFieldValues(filterField, username);
    var obj = {};
    for(let i=0; i<await distinctValues.length; i++) {
        var filter = {username: username};
        filter[filterField] = distinctValues[i];
        let filteredTask = await Task.find(filter);
        obj[distinctValues[i]] = await filteredTask;
    }
    return obj;
}

module.exports.sortTasks = function(username, sortBy, callback) {
    Task.find({ username: username }, callback).sort(sortBy);
}

module.exports.searchTasks = function(username, queryParams, callback) {
    var pattern = "";
    if(queryParams.title) {
        var words = queryParams.title.split(' ');
        words.forEach(word => {
            pattern += "(.*" + word + ")"
        });
        queryParams.title = {$regex: pattern, $options:"i"};
    };
    queryParams["username"] = username;
    Task.find(queryParams, callback);
}