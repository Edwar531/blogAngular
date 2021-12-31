import { Injectable } from '@angular/core';
import { AppConfing } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { VideoModel } from 'src/app/models/video.model';

@Injectable({
  providedIn: 'root'
})

export class VideosService {
  ENDPOINT = AppConfing.ENDPOINT;
  url_videos = 'admin/videos';
  url_create = 'admin/video/create';
  url_save = 'admin/video/store';
  url_edit = 'admin/video/{id}/edit';
  url_update = 'admin/video/{id}/update';
  url_delete = 'admin/video/{id}/delete';

  constructor(private http:HttpClient) { }

  saveUpdate(video:VideoModel,edit:boolean){
    if (edit) {
      let id = video.id.toString();
      let url = this.url_update.replace('{id}',id);
      return this.http.put(this.ENDPOINT+url,video);
    }else{
      localStorage.setItem('pageVideos','1');
      return this.http.post(this.ENDPOINT+this.url_save,video);
    }

  }

  videos(){
    return this.http.get(this.ENDPOINT+this.url_videos);
  }

  getVideo(param:string){
    let url = this.url_edit.replace('{id}',param)
    return this.http.get(this.ENDPOINT+url);
  }

  createVideo(){
    return this.http.get(this.ENDPOINT+this.url_create);
  }

  delete(id:number){
    let video_id = id.toString();
    let url = this.url_delete.replace('{id}',video_id)
    return this.http.delete(this.ENDPOINT+url);
  }

}
