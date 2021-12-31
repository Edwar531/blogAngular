import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category.model';
import { AppConfing } from '../../app.config';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  Category:Category = new Category;
  ENDPPOINT = AppConfing.ENDPOINT;
  urlCategories = 'admin/categories';
  urlCreate = 'admin/categories/create';
  urlStore = 'admin/categories/store';
  urlEdit = 'admin/categories/{slug}/edit';
  urlUpdate = 'admin/categories/{slug}/update';
  urlDelete = 'admin/categories/{slug}/delete';

  constructor(private http:HttpClient) {
  }

  categories(){
      return this.http.get(this.ENDPPOINT+this.urlCategories);
  }

  saveOrUpdate(values:any,edit:boolean){

    if(edit){
      let url = this.urlUpdate.replace('{slug}',values.id.toString());

      return this.http.put(this.ENDPPOINT+url,values);
    }else{
      return this.http.post(this.ENDPPOINT+this.urlStore,values);
    }
  }

  create(){

    return this.http.get(this.ENDPPOINT+this.urlCreate);
  }

  edit(id:number){
    let url = this.urlEdit.replace('{slug}',id.toString())
    return this.http.get(this.ENDPPOINT+url);
  }

  // update(id:number,values:any){
  //   let url = this.urlUpdate.replace('{slug}',id.toString())
  //   return this.http.put(this.ENDPPOINT+url,values);
  // }

  delete(id:number){
    let url = this.urlDelete.replace('{slug}',id.toString())
    return this.http.delete(this.ENDPPOINT+url);
  }
}
