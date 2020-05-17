import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../models/task";
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  providers: [TaskService]
})
export class TaskItemComponent implements OnInit {
  @Input() task:Task;

  details: string;
  title: string;
  isChecked: boolean;

  labels = {
    'personal':'purple',
    'work':'blue',
    'shopping':'teal',
    'others':'orange'
  };

  @Output() transferDetails = new EventEmitter<string>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    if(this.task.isDone) this.isChecked = true;
    else this.isChecked = false;
  }
  
  onToggle() {
    this.task.isDone = !this.task.isDone;
    var taskStatus = { status: this.task.isDone };
    this.taskService.updateStatus(this.task._id, taskStatus).subscribe(data => {});
  }

  setDecorClass() {
    let classes = {
      'is-done': this.task.isDone
    }
    return classes;
  }

  setPriorityClass() {
    var priority = this.task.priority.toLowerCase();
    let classes = {};

    if(priority == "high") 
      classes = {'highPriority': true};
    else if(priority == "medium") 
      classes = {'medPriority': true};
    else 
      classes = {'lowPriority': true};

    return classes;
  }

  setLabelClass() {
    var label = this.task.label.toLowerCase();
    var colorClass = this.labels[label];
    let classes = {}
    classes[colorClass] = true;
    return classes;
  }

  editTask() {
    console.log("Edit!");
    this.details = this.task._id 
                  + '|' + this.task.title
                  + '|' + this.task.dueDate
                  + '|' + this.task.priority
                  + '|' + this.task.label
                  + '|' + this.task.status;
    this.transferDetails.emit(this.details)
  }

  deleteTask() {
    console.log(this.task._id);
    this.taskService.deleteTask(this.task._id).subscribe(data => {
      window.location.reload();
    });
  }
}
