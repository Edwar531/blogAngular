import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideosFService } from 'src/app/services/front/videos-f.service';

import SwiperCore, { Pagination, Navigation,SwiperOptions } from "swiper";
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);
@Component({
  selector: 'app-last-videos',
  templateUrl: './last-videos.component.html',
  styleUrls: ['./last-videos.component.css']
})
export class LastVideosComponent implements OnInit {

  @Input() videos: any[] = [];
  breakpoints:any;
  config: SwiperOptions;
  btnModal:any;
  videoSelected:any;
  titleVideo:any;
  constructor( private sanitizer: DomSanitizer,private VideosFS:VideosFService,private modalS: NgbModal,) { }

  ngOnInit(): void {

  }

  @ViewChild('modalVideo') modalVideo: any;

  ngAfterViewInit():void{

    this.config = {
      pagination:{
      clickable: true
    },
      // navigation:true,
    loopFillGroupWithBlank:true,
      slidesPerView: 1,

      freeMode: true,
      loop: false,
      breakpoints: {

            1200: {
              slidesPerView: 2,

          },
        }
    };
  }


  onSwiper(swiper:any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  myfunc(event: Event) {

  }



  showVideo(video:any) {
    this.videoSelected = '';


    let urlp = this.urlSanitizer('https://www.youtube.com/embed/'+video.id_video);
    this.videoSelected = urlp;
    this.titleVideo = video.title;

    this.modalS.open(this.modalVideo, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal-video'}).result.then((result) => {
      if (result === 'yes') {

      }
      return;
    }, (reason) => {
      return;
    });

   }

   urlSanitizer(url: string) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }

}

