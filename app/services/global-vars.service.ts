import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {
  mode:boolean; //toggle for the app theme

  constructor() { }

  setTheme(mode:boolean) {
    this.mode = mode;
  }
}
