import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  dataLoading = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.dataLoading = false;

  }

}
