import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})

export class TaskListComponent implements OnInit {
  tasks: Task[];
  _id:string;
  title:string;
  dueDate:string;
  priority:string;
  label:string;
  status:string;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().then((tasks: Task[]) => {
      this.tasks = tasks.map((task) => {
        return task;
      });
    });
  }

  receiveDetails($event) {
    var details = $event.split('|');
    this._id = details[0];
    this.title = details[1];
    this.dueDate = details[2];
    this.priority = details[3];
    this.label = details[4];
    this.status = details[5];
  }
}