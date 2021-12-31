import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfing } from '../../app.config';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  ENDPOINT = AppConfing.ENDPOINT;
  urlBLog = 'blog';
  urlLastArticles = 'articles/last';


  constructor(
    private http:HttpClient,

  ) { }

  articles(){
   return this.http.get(this.ENDPOINT+this.urlBLog );
  }

  article(category:string,article:string){
    return this.http.get(this.ENDPOINT+'blog/'+category+'/'+article);
  }

  lastArticles(){
    return this.http.get(this.ENDPOINT+this.urlLastArticles );
   }
}
