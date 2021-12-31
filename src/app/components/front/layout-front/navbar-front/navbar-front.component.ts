import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NavbarService } from 'src/app/services/front/navbar.service';


@Component({
  selector: 'app-navbar-front',
  templateUrl: './navbar-front.component.html',
  styleUrls: ['./navbar-front.component.css']
})

export class NavbarFrontComponent implements OnInit {
  navbar2:boolean = false;
  categories:any[] = [];
  categoryModalShow:boolean = false;
  videoCount:any;


  constructor(
    public router:Router,
    private navbarS:NavbarService,
    private deviceService: DeviceDetectorService,
    @Inject(PLATFORM_ID) private platformid:any
    ) { }

  ngOnInit(): void {
    if(!this.isRouteAdmin()){
      this.getNav();
    }
  }



  getNav()
{
  this.navbarS.navbar().subscribe( (data:any) => {
    this.categories = data.categories;
    this.videoCount = data.videos.length;
    console.log(data);
  })
}



  isRouteAdmin(){
    if(isPlatformBrowser(this.platformid)){
      if(window.location.href.includes('/administrar/')){
        return true;
      }
      return false;
    }else{
      return false;
    }
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e:any) {
    if(isPlatformBrowser(this.platformid)){
        // ovultar dropdown
    let dropdown:any = document.querySelector('.dropdown-menu');

    dropdown.classList.remove("show");
    // mostrar o no navbar 2
      if (this.isRouteAdmin() == false){
        let element:any = document.querySelector('.navbar-front');

        if (window.pageYOffset > element.clientHeight) {
           this.navbar2 = true;
        } else {
          this.navbar2 = false;
        }
      }
    }


    }

    goWhatsapp(){
    if(isPlatformBrowser(this.platformid)){
      if(this.deviceService.isMobile() || this.deviceService.isTablet()){
        window.open('https://api.whatsapp.com/send?phone=593992747842&text=Estoy interesado/a en información sobre la terapia psicológica, mi nombre es: ');
      }else{
         window.open('https://api.whatsapp.com/send?phone=593992747842&text=Estoy interesado/a en información sobre la terapia psicológica, mi nombre es: ');
      }
          }
    }
}
