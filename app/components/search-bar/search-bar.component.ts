import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { GlobalVarsService } from '../../services/global-vars.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchTitle:string;
  searchPriority:string;
  searchLabel:string;
  searchStatus:string;

  constructor(
    private taskService: TaskService,
    private globalVarsService: GlobalVarsService,
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
