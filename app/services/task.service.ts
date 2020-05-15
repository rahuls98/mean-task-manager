import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  private getTasksUrl = '/api/tasks';
  private putTaskUrl = '/api/task';

  constructor(private http: Http) { }

  getTodos() {
    return [
      {id:'1', title:"finish project", dueDate:"2020-05-15T10:31:43.772Z", priority:"low", label:"work", status:"new", isDone:false},
      {id:'2', title:"submit assignment", dueDate:"2020-05-15T10:31:43.772Z", priority:"normal", label:"shopping", status:"in progress", isDone:false},
      {id:'3', title:"walk the dog", dueDate:"2020-05-15T10:31:43.772Z", priority:"high", label:"other", status:"completed", isDone:false}
    ]
  }

  getTasks(): Promise<void | Task[]> {
    return this.http.get(this.getTasksUrl)
               .toPromise()
               .then(response => response.json() as Task[])
               .catch(this.handleError);
  }

  addTask(newTask: Task): Observable<any> {
    var headers = new Headers();
    var body = JSON.stringify(newTask);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.putTaskUrl, body, {'headers':headers});
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
