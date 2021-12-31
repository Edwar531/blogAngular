import { Component, OnInit, Renderer2 } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { VideosService } from '../../../services/admin/videos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NotificationsMessagePipe } from 'src/app/pipes/notifications-message.pipe';
import { Router } from '@angular/router';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  // styleUrls: ['./videos.component.css']
})

export class VideosComponent implements OnInit {
  dataLoading:boolean = false;
  videos: any[] = [];
  config:any;
  numberElement: number = 0;
  search:string = 'title';
  searchtext:any = '';

  constructor(private VideosS: VideosService,
     private sanitizer: DomSanitizer,
     private modalS:NgbModal,
     private toastr:ToastrService,
     private notiM:NotificationsMessagePipe,
     private router:Router
     ) {

      this.config = {
        itemsPerPage: 8,
        currentPage: 1,
        };
      }

  ngOnInit(): void {
    this.lastPageLoad();

    this.getVideos();
  }

  lastPageLoad(){
    let p = localStorage.getItem('pageVideos');
    if (p?.length) {
      this.config.currentPage = Number(p);
    }
  }

  pageChanged(event:any){
    console.log(event);
    localStorage.setItem('pageVideos',event);
    this.config.currentPage = event;
  }

  getfilter(event:any){
    this.searchtext = event.target.value;
  }

  getVideos() {
    this.VideosS.videos().subscribe((data: any) => {
      this.videos = data;
      this.videos = this.videos.map(item => ({
        ...item,
        showVideo: false,
        showLoader: false,

      }));
      this.dataLoading = true;
    });
  }

  openModal(content:any, videoId:any) {
    this.modalS.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'yes') {
        this.deleteVideo(videoId);
      }
    }, (reason) => {
      this.getDismissReason(reason);
    });
  }

  private getDismissReason(reason: any): string {
    console.log(reason);

    if (reason === ModalDismissReasons.ESC) {
      console.log('by pressing ESC');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('BACKDROP_CLICK');

      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteVideo(id:number) {
    this.VideosS.delete(id).subscribe( (data:any) => {
      if (data.result == 'success') {
        this.videos = this.videos.filter(x => x.id !== id);
        this.toastr.success('El video ha sido eliminado con éxito.');
      }
    })
  }

 showVideo(title:string) {
  let positionNow = window.pageYOffset;

    return new Promise((resolve,reject)=>{
      let videos = this.videos.map(item => ({
        ...item,
        showVideo: false,
      }));

      for(let video of videos){
       if (video.title == title) {
         video.showVideo = true;
         video.showLoader = true;
       }
      }
      this.videos = videos;
      resolve(videos);
    }).then( resp => {

      return;
    })


  }

  goVideo(video:any){



    window.open('#/videos/video/'+video.slug);
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
