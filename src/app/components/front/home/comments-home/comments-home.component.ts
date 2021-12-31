import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-comments-home',
  templateUrl: './comments-home.component.html',
  styleUrls: ['./comments-home.component.css']
})

export class CommentsHomeComponent implements OnInit {
  @Input() videosCount = 0;
  config: SwiperOptions = {
    pagination:{
    clickable: true
  },
    // navigation:true,
  // loopFillGroupWithBlank:true,
    slidesPerView: 1,
    spaceBetween: 15,
    freeMode: true,
    loop: false,
    breakpoints: {


         1200: {
            slidesPerView: 2,
        },
    },

  };
  constructor() { }

  ngOnInit(): void {

  }

}
