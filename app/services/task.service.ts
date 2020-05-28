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
  prefix:string = "http://localhost:8080/tasks/";

  private addTaskURL:string           = "/create";
  private getTaskURL:string           = "/read/";
  private getAllTasksURL:string       = "/readAll";
  private updateTaskStatusURL:string  = "/updateStatus";
  private updateTaskURL:string        = "/update";
  private deleteTaskURL:string        = "/delete/";
  private filterTasksURL:string       = "/filter/";
  private sortTasksURL:string         = "/sort/";
  private searchTasksURL:string       = "/search/";

  constructor(
    private http: Http,
  ) {}

  //LISTENERS and FILTERS
  private _taskRefresh = new Subject<any>();
  taskRefreshListen(): Observable<any> { return this._taskRefresh.asObservable(); }
  taskRefreshFilter(filterBy: string) { this._taskRefresh.next(filterBy) };

  private _progressRefresh = new Subject<any>();
  progressRefreshListen(): Observable<any> { return this._progressRefresh.asObservable(); }
  progressRefreshFilter(filterBy: number) { this._progressRefresh.next(filterBy) };

  private _searchTransfer = new Subject<any>();
  searchTransferListen(): Observable<any> { return this._searchTransfer.asObservable(); }
  searchTransferFilter(filterBy: Object) { this._searchTransfer.next(filterBy) };

  private _viewTransfer = new Subject<any>();
  viewTransferListen(): Observable<any> { return this._viewTransfer.asObservable(); }
  viewTransferFilter(filterBy: Task) { this._viewTransfer.next(filterBy) };

  private _editTransfer = new Subject<any>();
  editTransferListen(): Observable<any> { return this._editTransfer.asObservable(); }
  editTransferFilter(filterBy: Task) { this._editTransfer.next(filterBy) };

  //API CALLS
  addTask(username:string, newTask: Task):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify(newTask);
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.prefix + username + this.addTaskURL, 
      body, 
      {'headers':headers}
    ).map(res => res.json());
  }

  getTask(username:string, taskID:string):Observable<any> {
    return this.http.get(
      this.prefix + username + this.getTaskURL + taskID
    ).map(res => res.json());  
  }  

  getAllTasks(username:string):Observable<any> {
    return this.http.get(
      this.prefix + username + this.getAllTasksURL
    ).map(res => res.json());  
  }

  updateTaskStatus(username:string, updateObj:Object):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify(updateObj);
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.prefix + username + this.updateTaskStatusURL, 
      body, 
      {'headers':headers}
    ).map(res => res.json());
  }

  updateTask(username:string, taskID:string, updateObj:Object):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify({_id: taskID, taskUpd:updateObj});
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.prefix + username + this.updateTaskURL, 
      body, 
      {'headers':headers}
    ).map(res => res.json());
  }

  deleteTask(username:string, taskID:string):Observable<any> {
    return this.http.delete(
      this.prefix + username + this.deleteTaskURL + taskID
    ).map(res => res.json());
  }

  filterTasks(username:string, field:string):Observable<any> {
    return this.http.get(
      this.prefix + username + this.filterTasksURL + field
    ).map(res => res.json());
  }

  sortTasks(username:string, field:string):Observable<any> {
    return this.http.get(
      this.prefix + username + this.sortTasksURL + field
    ).map(res => res.json());
  }

  searchTask(username:string, searchQuery: string):Observable<any> {
    return this.http.get(
      this.prefix + username + this.searchTasksURL + searchQuery
    ).map(res => res.json());
  }
}
