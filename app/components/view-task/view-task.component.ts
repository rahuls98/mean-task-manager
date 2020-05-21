import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task:Task;

  constructor(private taskService: TaskService) { 
    this.taskService.viewTransferListen().subscribe((task: Task) => {
      this.task = task;
    });
  }

  ngOnInit(): void {
    this.task = {
      title : undefined,
      dueDate : undefined,
      priority : undefined,
      label : undefined,
      status : undefined,
      isDone: undefined
    };
  }
}
