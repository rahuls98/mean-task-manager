import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchResults:Task[];
  searchTitle:string;
  searchPriority:string;
  searchLabel:string;
  searchStatus:string;

  _id:string;
  title:string;
  dueDate:string;
  priority:string;
  label:string;
  status:string;

  @Output() transferDetails = new EventEmitter<string>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  onSubmit($event) {
    event.preventDefault();
    var searchQuery:string = "?";

    if(this.searchTitle != undefined) searchQuery+= "title="+this.searchTitle+"&";
    if(this.searchPriority != undefined) searchQuery+= "priority="+this.searchPriority+"&";
    if(this.searchLabel != undefined) searchQuery+= "label="+this.searchLabel+"&";
    if(this.searchStatus != undefined) searchQuery+= "status="+this.searchStatus+"&";

    if(searchQuery != "?") {
      searchQuery = searchQuery.substr(0, searchQuery.length-1);
      this.taskService.searchTask2(searchQuery).then((tasks: Task[]) => {
        this.searchResults = tasks.map((task) => {
          this.searchTitle = undefined;
          this.searchPriority = undefined;
          this.searchLabel = undefined;
          this.searchStatus = undefined;
          return task;
        });
      });
    } else {
      console.log("No search parameters provided!");
    } 
  }

  receiveDetails($event) {
    this.transferDetails.emit($event);
  }
}
