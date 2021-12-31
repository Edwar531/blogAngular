import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { BlogService } from '../../../../services/front/blog.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-article-f',
  templateUrl: './article-f.component.html',
  styleUrls: ['./article-f.component.css']
})

export class ArticleFComponent implements OnInit {
  article: Article;
  imageP: string;
  categories: any[] = [];
  articleAnt: any;
  articleSig: any;
  dataLoading:boolean = true;
  formSearch: FormGroup;
  buttonBackHistory:boolean = false;
  innerWidth:number;
  constructor(
    private blogS: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getArticle();
    this.buttonBackHistoryOrNo()
    this.innerWidth = window.innerWidth;
  }

  @ViewChild('closeModal') closeModal: ElementRef

  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    localStorage.setItem('goPositionBlog','true');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  createForm() {
    this.formSearch = this.formBuilder.group({
      title: [''],
      category: [''],
    })

    this.dataLoading = false;
  }

  getArticle() {
    this.activatedRoute.params.subscribe(params => {
      this.blogS.article(params.categoria, params.articulo).subscribe((data: any) => {
        if (data.result == 'no encontrado') {
          this.router.navigateByUrl('/blog');
        }
        this.imageP = data.imageP;
        this.article = data.article;
        this.categories = data.categories;
        this.articleAnt = data.articleAnt;
        this.articleSig = data.articleSig;
      });
      this.createForm();
    });

  }

  search() {
    let url = '/blog';
    let title = this.formSearch.value.title;
    let category = this.formSearch.value.category;

    if(title?.length){
      title = "busqueda="+title;
    localStorage.setItem('filterTitleA',title);
    }

    if(category.length){
      category = "/categoria/"+category;
    localStorage.setItem('filterCategoryA',category);
    }

    url = url+category+'?'+title;
    let url2 = url.split('?');

    if(url2[1]?.length == 0){
      url = url.replace('?','');
    }

    this.router.navigateByUrl(url);
    this.closeModal.nativeElement.click()

  }

  changeCategory(slug:string){
      if(slug.length){
        localStorage.setItem('filterCategoryA',slug);
        this.router.navigateByUrl('/blog/categoria/'+slug);
      }else{
        localStorage.removeItem('filterCategoryA');
        this.router.navigateByUrl('/blog');
      }
    this.closeModal.nativeElement.click()

  }

  backToArticles(){

    let url = '/blog';
    let category = localStorage.getItem('filterCategoryA');
    let title = localStorage.getItem('filterTitleA');
    let page = localStorage.getItem('currentPageA');
    let orderBy = localStorage.getItem('orderByA');
    if(category != null && category?.length && category.length){
      category = "/categoria/"+category;
    }else{
      category = "";
    }

    if(title != null && title?.length && title.length){
      title = "&busqueda="+title;
    }else{
      title = "";
    }

    if(orderBy != null && orderBy?.length){
      orderBy = "&ordenar="+orderBy;
    }else{
      orderBy = "";
    }

    if(page != null && page?.length){
      if(page == '1'){
        page = "";
      }else{
        page = "&pagina="+page;
      }
    }else{
      page = "";
    }

    url = url+category+'?'+title+orderBy+page;
    url = url.replace('?&','?');

    let url2 = url.split('?');
    if(url2[1]?.length == 0){
      url = url.replace('?','');
    }

    localStorage.setItem('goPositionBlog','true');
    this.router.navigateByUrl(url);

  }
  


  buttonBackHistoryOrNo(){
    let category:any = localStorage.getItem('filterCategoryA');
    let title:any = localStorage.getItem('filterTitleA');
    let page:any = localStorage.getItem('currentPageA');
    let orderBy:any = localStorage.getItem('orderByA');
    if(category?.length || title?.length || page?.length || orderBy?.length){
      this.buttonBackHistory = true;
    }
  }
}
