import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title:string;
  date:string;
  priority:string;
  label:string;
  status:string;

  constructor() { }

  ngOnInit(): void {
  }

  addTask(event) {
  }
}
