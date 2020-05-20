import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  isChecked: boolean;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    if(this.task.isDone) this.isChecked = true;
    else this.isChecked = false;
  }

  setCompletedClass() {
    if(this.task.isDone) {
      let classes = {
        'strikeThrough': true
      }
      return classes;
    }
  }

  toggleStatus() {
    this.task.isDone = !this.task.isDone;
    let updateObj = {
      _id: this.task._id,
      isDone: this.task.isDone
    }

    this.taskService.updateTaskStatus(updateObj)
    .subscribe(status => {
        if(status.success) { return true; }
      }, err => { console.log(err); return false; }
    );
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
}
