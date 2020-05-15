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

  constructor() { }

  ngOnInit(): void {
  }
  
  setPriorityClass(task:Task) {
    var priority = task.priority.toLowerCase();
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

  onToggle(task: Task) {
    task.isDone = !task.isDone;
  }

  onEdit(task: Task) {
    console.log("Edit!")
  }

  onDelete(task: Task) {
    console.log("Delete!")
  }
}
