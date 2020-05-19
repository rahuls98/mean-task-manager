import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchTitle:string;
  searchPriority:string;
  searchLabel:string;
  searchStatus:string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit($event) {}
}
