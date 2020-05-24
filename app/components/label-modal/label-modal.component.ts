import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { GlobalVarsService } from "../../services/global-vars.service";

@Component({
  selector: 'app-label-modal',
  templateUrl: './label-modal.component.html',
  styleUrls: ['./label-modal.component.css']
})
export class LabelModalComponent implements OnInit {
  labels:Object[];
  newLabel:string;
  labelColor:string;

  /* labelColors = {
    "personal": "l-ff304f",
    "work": "l-002651", 
    "shopping": "l-107a8b",
    "others": "l-85203b"
  }
 */
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private globalVarsService: GlobalVarsService
  ) { 
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
  
  /* setLabelColor(label) {
    label = label.toLowerCase()
    let labelColor:string = this.labelColors[label];
    let classes = {}
    classes[labelColor] = true;
    return classes;
  } */

  labelSubmit($event) {
    let labelInfo = {
      name: this.newLabel,
      color: this.labelColor
    };
    let username = this.globalVarsService.user.username;
    this.userService.addLabel(username, labelInfo).subscribe((updateResult) => {
      if(updateResult.success) {
        this.userService.labelRefreshFilter("New label added"); 
        return true; 
      }
    },err => { console.log(err); return false; });
  }

  deleteLabel(index) {
    console.log(index);
    this.labels.splice(index, 1);
    let username = this.globalVarsService.user.username;
    this.userService.delLabel(username, this.labels).subscribe((deleteResult) => {
      if(deleteResult.success) {
        this.userService.labelRefreshFilter("Label deleted"); 
        return true; 
      }
    },err => { console.log(err); return false; });
  }
}
