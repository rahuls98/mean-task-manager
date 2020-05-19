import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.css']
})
export class ProfileBodyComponent implements OnInit {
  @ViewChild('toggleSwitch') toggleSwitch: ElementRef;
  title:string = "ALL TASKS"

  constructor(
    private globalVarsService: GlobalVarsService
  ) { }

  ngOnInit(): void {
    this.globalVarsService.mode = false;
  }

  onModeToggle() {
    this.globalVarsService.mode = this.toggleSwitch.nativeElement.checked;
  }

}
