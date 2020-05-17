import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  providers: [TaskService]
})
export class NewTaskComponent implements OnInit {
  tasks: Task[];
  title:string;
  date:string;
  priority:string;
  label:string;
  status:string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  addTask(event) {
    event.preventDefault();
    var newTask = { title: this.title,
                    dueDate: this.date,
                    priority: this.priority,
                    label: this.label, 
                    status: this.status,
                    isDone: false
                  };

    this.taskService.addTask(newTask).subscribe(data => {
      window.location.reload();
    });
  }
}
