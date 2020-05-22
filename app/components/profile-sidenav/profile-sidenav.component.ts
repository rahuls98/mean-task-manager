import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.css']
})
export class ProfileSidenavComponent implements OnInit {
  @Input() name:string = "";
  @Input() username:string = "";
  width = '0%';
  labels:string[];

  labelColors = {
    "personal": "l-ff304f",
    "work": "l-002651", 
    "shopping": "l-107a8b",
    "others": "l-85203b"
  }

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.taskService.getLabels().subscribe((allLabels) => {
      this.labels = allLabels.labels;
    })

    this.taskService.progressRefreshListen().subscribe((progress:number) => {
      this.width = String(Math.round(progress)) + "%";
    });
  }

  setLabelColor(label) {
    label = label.toLowerCase()
    let labelColor:string = this.labelColors[label];
    let classes = {}
    classes[labelColor] = true;
    return classes;
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
