import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { GlobalVarsService } from "../../services/global-vars.service";

@Component({
  selector: 'app-label-modal',
  templateUrl: './label-modal.component.html',
  styleUrls: ['./label-modal.component.css']
})
export class LabelModalComponent implements OnInit {
  labels:string[];
  newLabel;
  labelColor;

  labelColors = {
    "personal": "l-ff304f",
    "work": "l-002651", 
    "shopping": "l-107a8b",
    "others": "l-85203b"
  }

  constructor(
    private taskService: TaskService,
    private globalVarsService: GlobalVarsService
  ) { }

  ngOnInit(): void {
    /* this.taskService.getLabels().subscribe((allLabels) => {
      this.labels = allLabels.labels;
    }); */

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
  
  setLabelColor(label) {
    label = label.toLowerCase()
    let labelColor:string = this.labelColors[label];
    let classes = {}
    classes[labelColor] = true;
    return classes;
  }

  labelSubmit($event) {
    event.preventDefault();
    console.log(this.newLabel);
    console.log(this.labelColor);
  }
}
