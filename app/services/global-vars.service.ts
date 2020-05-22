import { Injectable } from '@angular/core';
import { TaskService } from '../services/task.service';

interface Credentials {
  name?: string,
  username?: string
  email?: string,
  gamification?: {
    score?: number,
    n?: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {
  user:Credentials;
  mode:boolean; //toggle for the app theme
  forward = [];
  backward = [];
  progress:number;

  constructor(private taskService: TaskService) { }

  setTheme(mode:boolean) {
    this.mode = mode;
  }

  updateSAS(option:string, SAS:number) {
    if(option=='add') {
      console.log("Add SAS: " + SAS);
      let score = this.user.gamification.score;
      this.user.gamification.score = score + SAS;
      this.user.gamification.n += 1;
    } 
    else if(option=='sub') {
      console.log("Sub SAS: " + SAS);
      let score = this.user.gamification.score;
      this.user.gamification.score = score - SAS;
      this.user.gamification.n -= 1;
    }

    if(this.user.gamification.n > 0) {
      if(this.user.gamification.score < 0) {
        this.progress = 0;
      } else {
        this.progress = (this.user.gamification.score / (this.user.gamification.n * 2)) * 100;
      }
    }
    else this.progress = 0;

    this.taskService.progressRefreshFilter(this.progress);
    console.log(this.user.gamification);
  }
}
