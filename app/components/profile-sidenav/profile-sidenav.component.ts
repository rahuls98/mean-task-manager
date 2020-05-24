import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { GlobalVarsService } from '../../services/global-vars.service';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.css']
})
export class ProfileSidenavComponent implements OnInit {
  @Input() name:string = "";
  @Input() username:string = "";
  width = '0%';
  @Input() progress:number;
  sag: boolean;
  labels:string[];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private globalVarsService: GlobalVarsService,
    private router: Router,
  ) { 
    this.taskService.progressRefreshListen().subscribe((progress:number) => {
      console.log("setting progress");
      this.width = String(Math.round(progress)) + "%";
    });
  }

  ngOnInit(): void {
    if(this.globalVarsService.user.sag) {
      this.sag = true;
      console.log("setting progress");
      this.width = String(Math.round(this.progress)) + "%";
    } else {
      this.sag = false
    }
  }

  toggleTheme() {
    if(this.globalVarsService.mode) {
      let classes = {
        'darkTheme': true
      }
      return classes;
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
