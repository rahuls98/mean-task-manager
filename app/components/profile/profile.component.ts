import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

interface Credentials {
  name?: string,
  username?: string
  email?: string,
  gamification?: Object
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Credentials;
  //user:Options = {name: "Rahul Suresh",username: "rahs98",email: "rahs98@gmail.com"};

  constructor(
    private authService: AuthService,
    private globalVarsService: GlobalVarsService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile()
    .subscribe(profile => {
        this.user = profile.user;
        this.globalVarsService.user = profile.user;
      }, err => { console.log(err); return false; }
    );
  }

  toggleTheme() {
    if(this.globalVarsService.mode) {
      let classes = {
        'darkTheme': true
      }
      return classes;
    }
  }
}
