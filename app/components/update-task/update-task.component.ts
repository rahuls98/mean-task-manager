import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from "../../services/task.service";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  @Input() _id:string;
  @Input() title:string;
  @Input() dueDate:string;
  @Input() priority:string;
  @Input() label:string;
  @Input() status:string;

  updTitle:string;
  updDate:string;
  updPriority:string;
  updLabel:string;
  updStatus:string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  updateTask(event) {
    event.preventDefault();
    var updateFields:Object = {};
    var flag:boolean = true;

    if((this.updTitle != undefined) && (this.updTitle!=this.title)) {
      console.log("Title changed: ",this.updTitle +"<-"+ this.title);
      updateFields["title"] = this.updTitle;
    }
    if((this.updDate != undefined) && (this.updDate!=this.dueDate)) {
      console.log("Date changed: ",this.updDate +"<-"+ this.dueDate);
      updateFields["dueDate"] = this.updDate;
    }
    if((this.updPriority != undefined) && (this.updPriority!=this.priority)) {
      console.log("Priority changed: ",this.updPriority +"<-"+ this.priority);
      updateFields["priority"] = this.updPriority;
    }
    if((this.updLabel != undefined) && (this.updLabel!=this.label)) {
      console.log("Label changed: ",this.updLabel +"<-"+ this.label);
      updateFields["label"] = this.updLabel;
    }
    if((this.updStatus != undefined) && (this.updStatus!=this.status)) {
      console.log("Status changed: ",this.updStatus +"<-"+ this.status);
      updateFields["status"] = this.updStatus;
    }
    if((this.updTitle == undefined) && (this.updPriority == undefined) && 
    (this.updPriority == undefined) && (this.updLabel == undefined) && 
    (this.updStatus == undefined)) { 
      console.log("No change detected!"); 
      flag=false;
    }

    /* console.log();
    console.log("Title: ",this.updTitle + "->upd | old<-" + this.title);
    console.log("Priority: ",this.updPriority + "->upd | old<-" + this.priority);
    console.log("Label: ",this.updLabel + "->upd | old<-" + this.label);
    console.log("Status: ",this.updStatus + "->upd | old<-" + this.status);  */

    if(flag) {
      this.taskService.updateTask(this._id, updateFields).subscribe(data => {
        this.updTitle = undefined;
        this.updDate = undefined;
        this.updPriority = undefined;
        this.updLabel = undefined;
        this.updStatus = undefined;
        
        window.location.reload();
      });
    }
  }
}
