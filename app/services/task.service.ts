import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private getAllTasksURL:string = "http://localhost:8080/tasks/readAll";
  private addTaskURL:string = "http://localhost:8080/tasks/create";
  private updateTaskStatusURL:string = "http://localhost:8080/tasks/updateStatus";
  private filterTasksURL:string = "http://localhost:8080/tasks/filter/";
  private sortTasksURL:string = "http://localhost:8080/tasks/sort/";
  private deleteTaskURL:string = "http://localhost:8080/tasks/delete/";
  private searchTasksURL:string = "http://localhost:8080/tasks/search/";
  private updateTaskURL:string = "http://localhost:8080/tasks/update"

  constructor(
    private http: Http,
  ) { }

  getAllTasks():Observable<any> {
    return this.http.get(this.getAllTasksURL).map(res => res.json());  
  }

  addTask(newTask: Task):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify(newTask);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.addTaskURL, body, {'headers':headers}).map(res => res.json());
  }

  private _taskRefresh = new Subject<any>();
  taskRefreshListen(): Observable<any> { return this._taskRefresh.asObservable(); }
  taskRefreshFilter(filterBy: string) { this._taskRefresh.next(filterBy) };

  private _searchTransfer = new Subject<any>();
  searchTransferListen(): Observable<any> { return this._searchTransfer.asObservable(); }
  searchTransferFilter(filterBy: Object) { this._searchTransfer.next(filterBy) };

  private _viewTransfer = new Subject<any>();
  viewTransferListen(): Observable<any> { return this._viewTransfer.asObservable(); }
  viewTransferFilter(filterBy: Task) { this._viewTransfer.next(filterBy) };

  private _editTransfer = new Subject<any>();
  editTransferListen(): Observable<any> { return this._editTransfer.asObservable(); }
  editTransferFilter(filterBy: Task) { this._editTransfer.next(filterBy) };

  updateTaskStatus(updateObj:Object):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify(updateObj);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.updateTaskStatusURL, body, {'headers':headers}).map(res => res.json());
  }

  updateTask(taskID:String, updateObj:Object):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify({_id: taskID, taskUpd:updateObj});
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.updateTaskURL, body, {'headers':headers}).map(res => res.json());
  }

  filterTasks(field:string):Observable<any> {
    return this.http.get(this.filterTasksURL + field).map(res => res.json());
  }

  sortTasks(field:string):Observable<any> {
    return this.http.get(this.sortTasksURL + field).map(res => res.json());
  }

  deleteTask(taskID:String):Observable<any> {
    return this.http.delete(this.deleteTaskURL + taskID).map(res => res.json());
  }

  searchTask(searchQuery: string):Observable<any> {
    //console.log(searchQuery)
    return this.http.get(this.searchTasksURL + searchQuery).map(res => res.json());
  }
}
