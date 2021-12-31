import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfing } from '../../app.config';

import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  ENDPOINT = AppConfing.ENDPOINT;

  urlRefreshToken = 'admin/refresh-token';
  urlLogin = 'admin/login';
  urlLogout = 'admin/logout';
  userAuth: any;

  constructor(private http: HttpClient, private router: Router,@Inject(PLATFORM_ID) private platformid:any) {}

  refreshToken() {
    let auth = this.getAuth();
    return this.http.post(this.ENDPOINT + this.urlRefreshToken, this.getAuth(), { headers: new HttpHeaders().set('authorization', `Bearer ${auth.token}`) }).pipe(tap(auth => this.saveAuth(auth)));
  }

  login(user: User) {
    return this.http.post(this.ENDPOINT + this.urlLogin, user);
  }

  saveAuth(user: any) {
    let userAuth: any = user;
    if(isPlatformBrowser(this.platformid)){

    localStorage.setItem('user', JSON.stringify(userAuth));
    }
    // window.location.href = '/#/administrar/articulos';
    this.router.navigate(['/administrar/articulos']);
  //   this.router.navigateByUrl('/blogAngular', {skipLocationChange: true}).then(() => {

  // });
  }

  getAuth() {
    if(isPlatformBrowser(this.platformid)){

    let user: any = localStorage.getItem('user');
    if (user) {
      var array: any = localStorage.getItem('user');
      array = JSON.parse(array);
      return array.user;
    }
    return user;
    }

  }

  logout(){
    if(isPlatformBrowser(this.platformid)){

    localStorage.removeItem('user');
    }
  //   this.router.navigateByUrl('/blogAngular', {skipLocationChange: true}).then(() => {
  //     this.router.navigate(['/administrar/inicio-de-sesion']);
  // });
    // window.location.href = '/#/administrar/inicio-de-sesion';
    window.location.href = '#/administrar/inicio-de-sesion';

    return this.http.get(this.ENDPOINT + this.urlLogout);
  }

}
