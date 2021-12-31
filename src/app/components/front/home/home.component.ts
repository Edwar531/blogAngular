import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { VideosFService } from '../../../services/front/videos-f.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('service1') service1:ElementRef;
  @ViewChild('service2') service2:ElementRef;
  @ViewChild('service3') service3:ElementRef;
  @ViewChild('service4') service4:ElementRef;
  lastVideos:any[] = [];
  lastArticles:any[] = [];
  dataLoading = true;

  constructor(private router:Router,private VideosFS:VideosFService,@Inject(PLATFORM_ID) private platformid:any) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

    this.dataLoading = false;
    this.getLastVideosArtilces();
  }

  getLastVideosArtilces(){
    this.VideosFS.videos(6).subscribe( (data:any) => {
      this.lastVideos = data.videos;
      this.lastArticles = data.articles;
    })
  }

  scrollServices() {
    if(isPlatformBrowser(this.platformid)){
      let goServices = localStorage.getItem('goServices');
      let self = this;

      if (goServices?.length) {
          if (goServices == 'service1') {
            self.service1.nativeElement.scrollIntoView();
          } else if (goServices == 'service2') {
            self.service2.nativeElement.scrollIntoView();
          } else if (goServices == 'service3') {
            self.service3.nativeElement.scrollIntoView();
          } else if (goServices == 'service4') {
            self.service4.nativeElement.scrollIntoView();
          }
      }

      localStorage.removeItem('goServices');
    }

  }


}
