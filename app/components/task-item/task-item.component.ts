import { Component, OnInit, Input, forwardRef, asNativeElements } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { GlobalVarsService } from '../../services/global-vars.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  isChecked: boolean;
  isDisabled: boolean;
  isLate: boolean;
  labelColor: string;
  activeOn:string[];

  /* labelColorPallete = {
    "Personal": "#ff304f",
    "Work": "#002651", 
    "Shopping": "#107a8b",
    "Others": "#85203b"
  } */
  
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private globalVarsService: GlobalVarsService
  ) { }

  ngOnInit(): void {
    this.labelColor = this.globalVarsService.labelColorPallete[this.task.label];
    this.activeOn = this.globalVarsService.user.gamification.activeOn;
    console.log(this.labelColor);
    if(this.task.isDone) {
      this.isChecked = true;
      this.isDisabled = true;
    }
    else {
      this.isChecked = false;
      if((new Date()) > (new Date(this.task.dueDate))) this.isLate = true;
    }
    /* this.setLabelClass(); */
  }

  toggleTheme() {
    if(this.globalVarsService.mode) {
      let classes = {
        'darkTheme': true
      }
      return classes;
    }
  }

  setCompletedClass() {
    if(this.task.isDone) {
      this.isDisabled = true;
      let classes = {
        'strikeThrough': true,
      }
      return classes;
    }
  }

  toggleStatus() {
    this.task.isDone = !this.task.isDone;

    let updateObj = {
      _id: this.task._id,
      isDone: this.task.isDone,
    }

    if(this.activeOn.includes(this.task.label)) {
      let today = new Date().getTime();
      let due = new Date(this.task.dueDate).getTime();
      let diff = 24 * 3600 * 1000;
      let score = Math.trunc((due - today)/diff) + 1;
      console.log("Score: " + score);
      if(score>2) score=2;
      if(score<0) score=0;

      if(this.task.isDone) {
        updateObj["SAS"]=score;
        this.globalVarsService.updateSAS('add', score);
      }
      else {
        this.taskService.getTask(this.globalVarsService.user.username, this.task._id).subscribe((tasks) => {
          let prevScore = tasks.tasks["0"].gamification.score;
          this.globalVarsService.updateSAS('sub', prevScore);
        });
      }
    }

    this.taskService.updateTaskStatus(this.globalVarsService.user.username, updateObj)
    .subscribe(updateResult => {
        if(updateResult.success) { return true; }
      }, err => { console.log(err); return false; }
    );
  }

  setPriorityClass() {
    var priority = this.task.priority.toLowerCase();
    let classes = {};

    if(priority == "high") 
      classes = {'highPriority': true};
    else if(priority == "medium") 
      classes = {'medPriority': true};
    else 
      classes = {'lowPriority': true};

    return classes;
  }

  /* setLabelClass() {
    let label:string = this.task.label.toLowerCase();
    let labelColor:string = this.labels[label];
    let classes = {}
    classes[labelColor] = true;
    return classes;
  } */

  viewTask() {
    this.taskService.viewTransferFilter(this.task);
  }

  editTask() {
    this.taskService.editTransferFilter(this.task);
  }

  deleteTask() {
    this.taskService.deleteTask(this.globalVarsService.user.username, this.task._id)
    .subscribe(deleteResult => {
        if(deleteResult.success) {
          this.taskService.taskRefreshFilter("Task deleted!"); 
          return true; 
        }
      }, err => { console.log(err); return false; }
    );
  }
}
