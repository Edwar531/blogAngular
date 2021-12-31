import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfing } from '../../app.config';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  ENDPOINT = AppConfing.ENDPOINT;
  urlRnavbar = 'means-navbar';
  constructor(  private http:HttpClient,) {

  }

  navbar(){
    return this.http.get(this.ENDPOINT+this.urlRnavbar);
  }
}




