import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideosFService } from 'src/app/services/front/videos-f.service';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-videos-f',
  templateUrl: './videos-f.component.html',
  styleUrls: ['./videos-f.component.css']
})
export class VideosFComponent implements OnInit {
  dataLoading:boolean = true;
  videoSelected:any;
  videos:any[] = [];
  urlVideoSelected:any;
  pageConfig:any = {}
  search:string;
  slugVideoSelected:string;
  @ViewChild('parent') input: ElementRef;
  @ViewChild('videoTop') videoTop: ElementRef;
  @ViewChild('inputSearch') inputSearch: ElementRef;
  @ViewChild('listTop') listTop: ElementRef;



  constructor(
    private sanitizer:DomSanitizer,
    private VideosFS:VideosFService,
    private location:Location,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getVideos();
    this.pageConfig = {
      itemsPerPage: 6,
      currentPage: 1,
      };
  }
  getparams(){

    this.activatedRoute.params.subscribe( (params)=>{
      let title = params['titulo'];
      let video = this.videos.filter(it => it.slug.toLowerCase() == title);
      if(title?.length){
        this.videoSelected = video[0];
        this.slugVideoSelected = video[0].slug;
        this.urlVideoSelected = this.urlSanitizer('https://www.youtube.com/embed/'+this.videoSelected.id_video);
      }
    })

    this.activatedRoute.queryParams.subscribe(params => {
      let busqueda = params['busqueda'];
      if(busqueda?.length){
        this.search = busqueda;
      }
      let page = params['pagina'];
      if(page?.length){
        this.pageConfig.currentPage = page;
      }
    });

  }
  getVideos(){
    this.VideosFS.videos().subscribe( (data:any) => {
      console.log('data');

      this.videos = data.videos;
      this.videoSelected = this.videos[0];
      if( this.videos.length == 0){
        this.router.navigateByUrl('/');
      }
      this.urlVideoSelected = this.urlSanitizer('https://www.youtube.com/embed/'+this.videoSelected.id_video);
      this.getparams();
    })
  }

  selectVideo(video:any){
    this.videoSelected = '';
    this.videoTop.nativeElement.scrollIntoView();
    let videoS = this.videos.filter(it => it.id == video.id);
    this.videoSelected = videoS[0];
    this.urlVideoSelected = this.urlSanitizer('https://www.youtube.com/embed/'+this.videoSelected.id_video);
    this.slugVideoSelected = this.videoSelected.slug;
    this.replaceState();
  }

  pageChanged(event:any){

    this.pageConfig.currentPage = event;

    let self = this;
    let idFirst:any;

    setTimeout(function(){
      idFirst = self.input.nativeElement.children[0];

      let videoS = self.videos.filter(it => it.id == idFirst.id);
      self.videoSelected = videoS[0];
      self.urlVideoSelected = self.urlSanitizer('https://www.youtube.com/embed/'+self.videoSelected.id_video);

      self.slugVideoSelected = self.videoSelected.slug;
      self.replaceState();
    }, 500 );
    this.listTop.nativeElement.scrollIntoView();
  }

  searchVideo(){
    this.search = this.inputSearch.nativeElement.value;
    this.pageConfig.currentPage = 1;
    if(this.search?.length){
      this.location.replaceState('/videos?busqueda='+this.search);
    }else{
      this.location.replaceState('/videos');
    }
  }

  emptySearch(){
    this.search = '';
    this.location.replaceState('/videos');
  }

  replaceState(){
    let url = '/videos';
    let title = '';
    let page = '';
    let slugVideo = '';

      if(this.pageConfig.currentPage == 1){
        page = ''
      }else{
      page = "&pagina="+this.pageConfig.currentPage;
      }

    if(this.slugVideoSelected?.length){
      slugVideo = "/video/"+this.slugVideoSelected;
    }else{
      slugVideo = "";
    }

    url = url+slugVideo+'?'+title+page;
    url = url.replace('?&','?');

    let url2 = url.split('?');
    if(url2[1]?.length == 0){
      url = url.replace('?','');
    }
    this.location.replaceState(url);
  }

  urlSanitizer(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  numberPage(length: any, itemsPerPage: any) {
    let division = (length / itemsPerPage).toFixed(0);
    if (parseInt(division) == 0) {
      return 1;
    } else {
      return division;
    }
  }

}
