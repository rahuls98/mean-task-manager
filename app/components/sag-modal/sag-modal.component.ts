import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { GlobalVarsService } from "../../services/global-vars.service";

@Component({
  selector: 'app-sag-modal',
  templateUrl: './sag-modal.component.html',
  styleUrls: ['./sag-modal.component.css']
})
export class SagModalComponent implements OnInit {
  labels:Object[];
  labelName:string;
  selectedLabels:string[];
  isChecked:boolean;
  activeOn:boolean;

  constructor(
    private userService: UserService,
    private globalVarsService: GlobalVarsService
  ) { }

  ngOnInit(): void {
    this.labels = this.globalVarsService.getLabels();
    this.selectedLabels = this.globalVarsService.user.gamification.activeOn;
    if(this.selectedLabels == [] || this.selectedLabels == undefined) this.activeOn=false;
    else this.activeOn = true;
  }

  toggleTheme() {
    if(this.globalVarsService.mode) {
      let classes = {
        'darkTheme': true
      }
      return classes;
    }
  }

  labelSelected(labelName) {
    if(this.selectedLabels.includes(labelName)) {
      let ind = this.selectedLabels.indexOf(labelName);
      this.selectedLabels.splice(ind, 1);
    } else {
      this.selectedLabels.push(labelName);
    }
  }

  deleteLabel(labelName) {
    let ind = this.selectedLabels.indexOf(labelName);
    this.selectedLabels.splice(ind, 1);
    var body = {
      username: this.globalVarsService.user.username,
      activeOn: this.selectedLabels
    }

    this.userService.updateActiveOn(body).subscribe((updateResults) => {
      if(updateResults.success) { return true; }
    }, err => { console.log(err); return false; }
    );
  }

  activateGamification() {
    console.log("Form submitted: " + this.labelName);
    if(!this.selectedLabels.includes(this.labelName)) {
      this.selectedLabels.push(this.labelName);

      var body = {
        username: this.globalVarsService.user.username,
        activeOn: this.selectedLabels
      }
  
      this.userService.updateActiveOn(body).subscribe((updateResults) => {
        if(updateResults.success) { 
          window.location.reload();
          return true; 
        }
      }, err => { console.log(err); return false; }
      );
    }
  }
}
