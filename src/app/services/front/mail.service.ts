import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfing } from '../../app.config';

@Injectable({
  providedIn: 'root'
})

export class MailService {
  urlMail:string = 'mails/contact';
  ENDPOINT = AppConfing.ENDPOINT;

  constructor(private http:HttpClient) { }

  send(userContact:any){
    return this.http.post(this.ENDPOINT+this.urlMail,userContact);
  }
}
