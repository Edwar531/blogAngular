import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfing } from '../../app.config';

@Injectable({
  providedIn: 'root'
})

export class VideosFService {
  ENDPOINT = AppConfing.ENDPOINT;
  urlVideos = 'videos';

  constructor(
    private http:HttpClient
  ) { }

  videos(limit:number = 0){
    return this.http.get(this.ENDPOINT+this.urlVideos+'?limit='+limit);
  }
}
