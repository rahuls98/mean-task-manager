import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { GlobalVarsService } from "../../services/global-vars.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task:Task;
  labels:Object[];

  updTitle:String;
  updDate:Date;
  updPriority:String;
  updLabel:String;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private globalVarsService: GlobalVarsService,
    private flashMessage: FlashMessagesService) 
  {
    this.taskService.editTransferListen().subscribe((task:Task) => {
      this.task = task;
    });

    this.userService.labelRefreshListen().subscribe((msg:string) => {
      let username = this.globalVarsService.user.username;
      this.userService.getLabels(username).subscribe((labelsArray) => {
        if(labelsArray.success) {
          this.labels = labelsArray.labels[0].labels;
        }
      }, err => { console.log(err); return false; })
    }); 
  }

  ngOnInit(): void {
    this.task = {
      title : undefined,
      dueDate : undefined,
      priority : undefined,
      label : undefined,
      status : undefined,
      isDone: undefined,
      gamification: undefined
    };


    this.labels = this.globalVarsService.getLabels();
  }

  toggleTheme() {
    if(this.globalVarsService.mode) {
      let classes = {
        'darkTheme': true
      }
      return classes;
    }
  }

  updateTask(){
    var updateFields:Object = {};
    var flag:boolean = true;

    if((this.updTitle != undefined) && (this.updTitle!=this.task.title)) {
      console.log("Title changed: ",this.updTitle +"<-"+ this.task.title);
      updateFields["title"] = this.updTitle;
    }
    if((this.updDate != undefined) && (this.updDate!=this.task.dueDate)) {
      console.log("Date changed: ",this.updDate +"<-"+ this.task.dueDate);
      updateFields["dueDate"] = this.updDate;
    }
    if((this.updPriority != undefined) && (this.updPriority!=this.task.priority)) {
      console.log("Priority changed: ",this.updPriority +"<-"+ this.task.priority);
      updateFields["priority"] = this.updPriority;
    }
    if((this.updLabel != undefined) && (this.updLabel!=this.task.label)) {
      console.log("Label changed: ",this.updLabel +"<-"+ this.task.label);
      updateFields["label"] = this.updLabel;
    }
    if((this.updTitle == undefined) && (this.updPriority == undefined) && 
    (this.updPriority == undefined) && (this.updLabel == undefined)) { 
      console.log("No change detected!"); 
      flag=false;
    }

    if(flag) {
      console.log(updateFields);
      this.taskService.updateTask(this.globalVarsService.user.username, this.task._id, updateFields)
      .subscribe(updateResults => {
        if(updateResults.success) {
          this.flashMessage.show("Task updated!", {
            cssClass: 'alert-success', 
            timeout: 3000
          });
          window.location.reload();
        } else {
          this.flashMessage.show("Failed to update task!", {
            cssClass: 'alert-danger', 
            timeout: 3000
          });
        }
      }, err => { console.log(err); return false; })
    }
  }
}
