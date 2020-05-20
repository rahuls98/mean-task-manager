import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private getAllTasksURL:string = "http://localhost:8080/tasks/readAll";
  private updateTaskStatusURL:string = "http://localhost:8080/tasks/updateStatus"

  constructor(
    private http: Http,
  ) { }

  getAllTasks():Observable<any> {
    return this.http.get(this.getAllTasksURL).map(res => res.json());  
  }

  updateTaskStatus(updateObj:Object):Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify(updateObj);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.updateTaskStatusURL, body, {'headers':headers}).map(res => res.json());
  }
}
