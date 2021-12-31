import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  constructor(private deviceService: DeviceDetectorService,@Inject(PLATFORM_ID) private platformid: any) { }

  ngOnInit(): void {

  }

  isRouteAdmin(){
    if (isPlatformBrowser(this.platformid)) {

    if(window.location.href.includes('/administrar/')){
      return true;
    }
  }
    return false;

  }

  goWhatsapp(){
    if (isPlatformBrowser(this.platformid)) {

    if(this.deviceService.isMobile() || this.deviceService.isTablet()){
      window.open('https://api.whatsapp.com/send?phone=593992747842&text=Estoy interesado/a en información sobre la terapia psicológica, mi nombre es: ');
    }else{
       window.open('https://api.whatsapp.com/send?phone=593992747842&text=Estoy interesado/a en información sobre la terapia psicológica, mi nombre es: ');
    }
    }
  }

}
