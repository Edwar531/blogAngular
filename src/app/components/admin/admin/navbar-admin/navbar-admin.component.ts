import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/admin/auth.service';


import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  userAuth: any;
  urlVideoActivated = false;
  location: string;
  loadUserAuth = false;
  @ViewChild('myDiv') myDiv: ElementRef;
  constructor(private AuthS: AuthService, private router: Router,@Inject(PLATFORM_ID) private platformid:any) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformid)){
    this.location = window.location.href;
    this.router.events.subscribe((val: any) => {
      // see also
      this.location = val.url;
    });
  }
  }

  ngAfterViewInit(): void{

    this.userAuth = this.AuthS.getAuth();
    this.loadUserAuth = true;
  }


  sendLogout() {
    if(isPlatformBrowser(this.platformid)){

    this.userAuth = null;
    this.AuthS.logout().subscribe(data => {
    });
  }
  }

  goArticles() {
    if(isPlatformBrowser(this.platformid)){

    localStorage.removeItem('filterStatus');
    localStorage.removeItem('filterCategory');
    localStorage.removeItem('lastPageArticles');
    this.router.navigateByUrl('/administrar/articulos');
    }
  }

  goVideos() {
    if(isPlatformBrowser(this.platformid)){

    localStorage.removeItem('pageVideos');
    this.router.navigateByUrl('/administrar/videos');
    }
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

}
