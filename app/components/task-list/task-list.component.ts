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
  tasks: Task[]
  selectedTask: Task

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService
      .getTasks()
      .then((tasks: Task[]) => {
        this.tasks = tasks.map((task) => {
          return task;
        });
      });

    /* this.tasks = this.taskService.getTodos(); */
  }
}
