import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../../models/task";
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task:Task;
  title: string;
  isChecked: boolean;

  labels = {
    'personal':'purple',
    'work':'blue',
    'shopping':'teal',
    'other':'orange'
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    if(this.task.isDone) this.isChecked = true;
    else this.isChecked = false;
  }
  
  setPriorityClass() {
    var priority = this.task.priority.toLowerCase();
    let classes = {};
    if(priority == "high") {
      classes = {'highPriority': true};
    }
    else if(priority == "normal") {
      classes = {'medPriority': true};
    }
    else{
      classes = {'lowPriority': true};
    }
    return classes;
  }

  setDecorClass() {
    let classes = {
      'is-done': this.task.isDone
    }
    return classes;
  }

  setLabelClass() {
    var label = this.task.label.toLowerCase();
    var colorClass = this.labels[label];
    let classes = {}
    classes[colorClass] = true;
    return classes;
  }

  onToggle() {
    this.task.isDone = !this.task.isDone;
    var taskStatus = { status: this.task.isDone };
    this.taskService.updateStatus(this.task._id, taskStatus).subscribe(data => {});
  }

  onEdit() {
    console.log("Edit!")
  }

  deleteTask() {
    console.log(this.task._id);
    this.taskService.deleteTask(this.task._id).subscribe(data => {
      //window.alert("Deletion complete!")
    });
  }
}
