import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/services/front/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  // dataLoading = true;
  max = 140;
  @ViewChild('service1') service1x: ElementRef;
  @ViewChild('service2') service2x: ElementRef;
  @ViewChild('service3') service3x: ElementRef;
  @ViewChild('service4') service4x: ElementRef;
  constructor(private serviceS: ServiceService, @Inject(PLATFORM_ID) private platformid: any) { }

  ngOnInit(): void {

    // this.service1 = this.serviceS.services.service1;
    // this.service2 = this.serviceS.services.service2;
    // this.service3 = this.serviceS.services.service3;
    // this.service4 = this.serviceS.services.service4;
    // console.log('x');
    // console.log(this.serviceS.services.service1[1].parrafo[0]);
    // console.log('x');


  }

  ngAfterViewInit(): void {
    this.scrollServices();
    // this.dataLoading = false;
  }

  scrollServices() {
    if (isPlatformBrowser(this.platformid)) {
      let goServices = localStorage.getItem('goServices');
      let self = this;

      if (goServices?.length) {
        if (goServices == 'service1') {
          self.service1x.nativeElement.scrollIntoView();
        } else if (goServices == 'service2') {
          self.service2x.nativeElement.scrollIntoView();
        } else if (goServices == 'service3') {
          self.service3x.nativeElement.scrollIntoView();
        } else if (goServices == 'service4') {
          self.service4x.nativeElement.scrollIntoView();
        }
      }
      localStorage.removeItem('goServices');
    }


  }

  cutText(text: string) {
    let texto = this.serviceS.get(text);
    if (texto == undefined) {
      return "No existe";
    }
    texto = texto[0].parrafos[0];
    if (texto?.length > this.max)
      return texto.substring(0, this.max) + ' ...';
    else
      return texto;
  }

  showBtnMore(text: string) {
    let texto = this.serviceS.get(text);
    if (texto == undefined) {
      return false;
    }

    texto = texto[0].parrafos[0];

    if (texto?.length > this.max)
      return true;
    else
      return false;
  }

}
