import { Component, OnInit } from '@angular/core';
import { Task } from "../../models/task";
import { ValidateService } from "../../services/validate.service";
import { TaskService } from "../../services/task.service";
import { GlobalVarsService } from "../../services/global-vars.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title:String;
  date:Date;
  priority:String;
  label:String;
  //status:String;

  constructor(
    private taskService: TaskService,
    private globalVarsService: GlobalVarsService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    if(this.globalVarsService.mode) {
      let classes = {
        'darkTheme': true
      }
      return classes;
    }
  }

  addTask(event) {
    var newTask:Task = {
      title: this.title,
      dueDate: this.date,
      priority: this.priority,
      label: this.label,
      status: "Pending",
      isDone: false,
      gamification : {
        firstCheck: null,
        score: null
      }
    };

    if(!this.validateService.validateAddTask(newTask)) {
      this.flashMessage.show("Please fill in all fields!", {
        cssClass: 'alert-danger', 
        timeout: 3000
      });
      return false;
    }

    this.taskService.addTask(newTask)
    .subscribe(createResults => {
      if(createResults.success) {
        this.flashMessage.show(createResults.msg, {
          cssClass: 'alert-success', 
          timeout: 3000
        });
        this.title = undefined;
        this.date = undefined;
        this.priority = undefined;
        this.label = undefined;
      } else {
        this.flashMessage.show(createResults.msg, {
          cssClass: 'alert-danger', 
          timeout: 3000
        });
      }
    }, err => { console.log(err); return false; })
  }

  listRefresh() {
    this.taskService.taskRefreshFilter("New task added!");
  }
}
