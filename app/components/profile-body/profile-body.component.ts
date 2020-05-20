import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.css']
})
export class ProfileBodyComponent implements OnInit {
  @ViewChild('toggleSwitch') toggleSwitch: ElementRef;
  title:string;
  tasks:Task[];

  constructor(
    private globalVarsService: GlobalVarsService,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.globalVarsService.mode = false;
    this.title = "All Tasks"

    this.taskService.getAllTasks()
    .subscribe(allTasks => {
      this.tasks = allTasks.tasks;
      }, err => { console.log(err); return false;}
    );
  }

  onModeToggle() {
    this.globalVarsService.mode = this.toggleSwitch.nativeElement.checked;
  }
}
