import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/admin/auth.service';
import { subscribeOn, map, take, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  test: boolean;
  constructor(private auth: AuthService, private router: Router, private datepipe: DatePipe) {

  }

  canActivate(): any {
    let auth = this.auth.getAuth();

    if (auth?.expiration) {
      let now = new Date();

      let dateExpiration:any = new Date(auth.expiration);
      dateExpiration.setMinutes(dateExpiration.getMinutes()+40);

      if (now >= dateExpiration ) {
        this.auth.logout();
      }

      let dateRefreshToken:any = new Date(auth.expiration);
      dateRefreshToken.setMinutes(dateRefreshToken.getMinutes()+20);
      console.log('hoy= '+now);
      console.log('fecha inicio= '+auth.expiration);
      console.log('fecha expiracion '+dateExpiration);
      console.log('fecha refresh token '+dateRefreshToken);
      if (now >= dateRefreshToken) {
        return this.auth.refreshToken()
          .pipe(
            map(
              res => {
                console.log(res);
                this.auth.saveAuth(res);
                return true;

              }
            ), catchError(
              err => {

                // Absolutely needed this handler,
                // but removed the code for redirection to login and deletion of tokens
                this.router.navigateByUrl('/administrar/inicio-de-sesion');
                return of(false);
              }
            )
          );
      }else{
        return true;
      }
    } else {
      return true;
    }
  }
}
