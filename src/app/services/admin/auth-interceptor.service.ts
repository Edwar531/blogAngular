import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subscriber, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  urlLogin: string = '/#/administrar/inicio-de-sesion';
  auth: any;
  refresh: boolean = false;
  tokenIntercept = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformid:any
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    this.auth = this.authService.getAuth();
    if (
      !request.url.includes('/admin/') ||
      request.url.includes('login') ||
      request.url.includes('refresh-token')
    ) {
      return <any>next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if(err.url?.includes('/admin/login') && err.error.error == "Unauthorized"){
              this.toastr.warning('Ha ingresado un correo o una contraseña inválida.')
          }
          return throwError(err);
        })
      );
    }

    if (this.auth) {
      request = req.clone({
        setHeaders: { authorization: `Bearer ${this.auth.token}` },
      });
    } else {
      if(isPlatformBrowser(this.platformid)){
        window.location.href = this.urlLogin;
      }

      // this.router.navigateByUrl(this.urlLogin);
    }

    return <any>next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // this.router.navigateByUrl(this.urlLogin);
      if(isPlatformBrowser(this.platformid)){
          window.location.href = this.urlLogin;
                }
        }

        return throwError(err);
      })
    );
  }
}
