import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/front/service.service';
import { isPlatformBrowser, Location } from '@angular/common';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  service: any = [];


  constructor(private serviceS: ServiceService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    @Inject(PLATFORM_ID) private platformid:any
    ) { }

  ngOnInit(): void {
    this.getService();
  }

  getService() {

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        let slug: any = params.get('slug')
        this.service = this.serviceS.get(slug);
      }
    )
  }

  goBack(service: string) {
    let ser;
    if (service == "Terapias Individuales") {
      ser = 'service1';
    } else if (service == "Terapias de Pareja") {
      ser = 'service2';
    } else if (service == "Terapias Familiares") {
      ser = 'service3';
    } else if (service == "Terapias Grupales") {
      ser = 'service4';
    } else {
      ser = '';
    }
    console.log(ser);
    this.location.back();
    if(isPlatformBrowser(this.platformid)){
      localStorage.setItem('goServices', ser);
    }


  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    let ser;
    if (this.service[2].name == "Terapias Individuales") {
      ser = 'service1';
    } else if (this.service[2].name == "Terapias de Pareja") {
      ser = 'service2';
    } else if (this.service[2].name == "Terapias Familiares") {
      ser = 'service3';
    } else if (this.service[2].name == "Terapias Grupales") {
      ser = 'service4';
    } else {
      ser = '';
    }


    localStorage.setItem('goServices', ser);
  }

}


