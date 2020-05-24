import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { GlobalVarsService } from '../../services/global-vars.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  labels:Object[];

  searchTitle:string;
  searchPriority:string;
  searchLabel:string;
  searchStatus:string;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private globalVarsService: GlobalVarsService,
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

  onSubmit() {
    var obj = {
      title: this.searchTitle,
      priority: this.searchPriority,
      label: this.searchLabel,
      status: this.searchStatus,
    }

    this.searchTitle = undefined;
    this.searchPriority = undefined;
    this.searchLabel = undefined;
    this.searchStatus = undefined;
    
    this.taskService.searchTransferFilter(obj);
  }
}
