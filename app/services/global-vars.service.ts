import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {
  mode:boolean;

  constructor() { }

  setTheme(mode:boolean) {
    this.mode = mode;
  }
}
