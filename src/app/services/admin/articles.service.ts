import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../models/article.model';
import { AppConfing } from '../../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  ENDPOINT = AppConfing.ENDPOINT;

  urlArticles = 'admin/articles';
  urlArticle = 'admin/article';
  urlCreate = 'admin/article/create';
  urlStore = 'admin/article/store';
  urlUpdate = 'admin/article/{slug}/update';
  urlDisable = 'admin/article/{slug}/disable';
  urlEnable = 'admin/article/{slug}/enable';
  urlDelete = 'admin/article/{slug}/delete';
  urlChangePass = 'admin/change/pass';
  constructor(
    private http:HttpClient,
    private authS:AuthService,

    ) { }

    createArticle(){
    // solo para verificar auth
    return this.http.get(this.ENDPOINT+this.urlCreate );
  }
  
 

  articles(){

   return this.http.get(this.ENDPOINT+this.urlArticles );
  }
 
  article(slug:string){
    return this.http.get(this.ENDPOINT+'admin/article/'+slug+'/edit');
  }
  changePass(values:any){
    return this.http.post(this.ENDPOINT+this.urlChangePass,values);
  }
  sendSaveUpdate(article:any,edit:boolean){
    if (edit && article?.id) {
      let id = article.id;
      let url = this.urlUpdate.replace('{slug}',id.toString())
      return this.http.put(this.ENDPOINT+url,article);
    }
    return this.http.post(this.ENDPOINT+this.urlStore,article);
   }

   disable(id:any){
    let url = this.urlDisable.replace('{slug}',id.toString())
    return this.http.put(this.ENDPOINT+url,null);
   }

   enable(id:any,status:any){
     console.log(status);

    let url = this.urlEnable.replace('{slug}',id.toString())
    return this.http.put(this.ENDPOINT+url,status);
   }

   delete(id:any){
    let url = this.urlDelete.replace('{slug}',id.toString())
    return this.http.delete(this.ENDPOINT+url);
   }
}
