import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit,OnInit } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
@Component({
  selector: 'app-summary-articles',
  templateUrl: './summary-articles.component.html',
  styleUrls: ['./summary-articles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryArticlesComponent implements OnInit {
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  @ViewChild('myCarousel') myCarousel: any;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }
  carouselItems = [1, 2, 3];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide:any) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }

}
