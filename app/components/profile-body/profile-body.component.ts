import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

interface SearchObject {
  title: string;
  priority: string;
  label:string;
  status:string;
}

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.css']
})
export class ProfileBodyComponent implements OnInit {
  @ViewChild('toggleSwitch') toggleSwitch: ElementRef;
  defaultView:boolean;
  title:string;
  tasks:Task[];
  options:boolean;

  opKeys = Object.keys;
  opValues:Object;

  constructor(
    private globalVarsService: GlobalVarsService,
    private taskService: TaskService,
    private userService: UserService,
  ) 
  {
    this.getLabels();

    this.taskService.taskRefreshListen().subscribe((msg:string) => {
      this.getTasks('allTasks', null);
    });

    this.userService.labelRefreshListen().subscribe((msg:string) => {
      this.getLabels();
    });

    this.taskService.searchTransferListen().subscribe((searchObj:SearchObject) => {
      this.searchTasks(searchObj);
    });
  }

  ngOnInit(): void {
    this.globalVarsService.mode = false;
    this.title = "All Tasks"
    this.getTasks("allTasks", null);
  }

  getLabels() {
    let username = this.globalVarsService.user.username;
    this.userService.getLabels(username).subscribe((labelsArray) => {
      if(labelsArray.success) {
        labelsArray.labels[0].labels.forEach(label => {
          this.globalVarsService.labelColorPallete[label.name] = label.color;
        });
        console.log(this.globalVarsService.labelColorPallete);
      }
    }, err => { console.log(err); return false; })
  }

  toggleTheme() {
    if(this.globalVarsService.mode) {
      let classes = {
        'darkTheme': true
      }
      return classes;
    }
  }

  getTasks(resultsOf:string, field:string) {
    
    if(resultsOf=="allTasks") {
      this.taskService.getAllTasks()
      .subscribe(allTasks => {
        this.title = "All tasks";
        this.options = true;
        this.defaultView = true;
        this.tasks = allTasks.tasks;
      }, err => { console.log(err); return false;});
    }

    if(resultsOf=="filter") {
      this.taskService.filterTasks(field.toLowerCase())
      .subscribe(filteredTasks => {
        this.tasks = undefined;
        this.options = false;
        this.defaultView = false;
        this.opValues = filteredTasks;
      }, err => { console.log(err); return false;});
    }

    if(resultsOf=="sort") {
      this.taskService.sortTasks(field)
      .subscribe(sortedTasks => {
        this.options = false;
        this.defaultView = true;
        this.tasks = sortedTasks.sortedTasks;
      }, err => { console.log(err); return false;});
    }
  }

  onModeToggle() {
    this.globalVarsService.mode = this.toggleSwitch.nativeElement.checked;
  }

  getResults(operation:string, field:string) {
    this.title = operation + " by " + field;
    this.getTasks(operation.toLowerCase(), field);
  }

  backToDefault() {
    this.getTasks('allTasks', null);
  }

  searchTasks(searchObj:SearchObject) {
    var searchQuery:string = "?";
    console.log(searchObj);

    if(searchObj.title != undefined) searchQuery+= "title="+searchObj.title+"&";
    if(searchObj.priority != undefined) searchQuery+= "priority="+searchObj.priority+"&";
    if(searchObj.label != undefined) searchQuery+= "label="+searchObj.label+"&";
    if(searchObj.status != undefined) searchQuery+= "status="+searchObj.status+"&";

    if(searchQuery != "?") {
      searchQuery = searchQuery.substr(0, searchQuery.length-1);
      this.taskService.searchTask(searchQuery).subscribe(searchResults => {
        this.tasks = searchResults.tasks;
        this.title = "Search results";
        this.options = false;
        this.defaultView = true;
        return true;
      }, err => { console.log(err); return false; })
    } else {
      console.log("No search parameters provided!");
    } 
  }
}
