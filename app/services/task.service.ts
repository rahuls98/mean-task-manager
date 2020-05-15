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
      {id:'1', title:'Todo one', isDone: false},
      {id:'2', title:'Todo two', isDone: true},
      {id:'3', title:'Todo three', isDone: false}
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
