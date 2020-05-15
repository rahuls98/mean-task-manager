import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Http, Response } from '@angular/http';

@Injectable()
export class TaskService {
  private tasksUrl = '/api/tasks';

  constructor(private http: Http) { }

  getTasks(): Promise<void | Task[]> {
    return this.http.get(this.tasksUrl)
               .toPromise()
               .then(response => response.json() as Task[])
               .catch(this.handleError);
  }

  getTodos() {
    return [
      {id:'1', title:'Todo one', isDone: false},
      {id:'2', title:'Todo two', isDone: true},
      {id:'3', title:'Todo three', isDone: false}
    ]
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
