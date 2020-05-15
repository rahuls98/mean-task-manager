import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../../models/task";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task:Task;

  constructor() { }

  ngOnInit(): void {
  }

  setClasses() {
    let classes = {
      'is-done': this.task.isDone
    }

    return classes;
  }
}
