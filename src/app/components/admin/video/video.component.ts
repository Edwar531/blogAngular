import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { VideosService } from '../../../services/admin/videos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ValidationsMessagePipe } from 'src/app/pipes/validations-message.pipe';
import { NotificationsMessagePipe } from 'src/app/pipes/notifications-message.pipe';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {
  dataLoading:boolean = false;
  errorsServer: any;
  video: VideoModel = new VideoModel;
  formula: FormGroup;
  edit: boolean = false;
  sending = false;
  constructor(private VideosS: VideosService, private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validationsM: ValidationsMessagePipe,
    private notiM:NotificationsMessagePipe,
    private validatorsS:ValidatorsService,

  ) { }

  ngOnInit(): void {
    this.createOrEdit();
  }

  createOrEdit(){
    localStorage.removeItem('pageVideos');
    this.activatedRoute.params.subscribe( params => {
      if (params?.id) {
        this.edit = true;
        this.getVideo(params.id);
      }else{
        this.createVideo();
      }
    });
  }

  createVideo(){
    this.VideosS.createVideo().subscribe(data =>{
      this.createForm();
    });
  }

  getVideo(param:string){
    this.VideosS.getVideo(param).subscribe( (video:any) => {
      this.video = video;
      this.createForm();
    });
  }

  saveUpdate() {
    this.sending = true;
    if (this.formula.status == 'INVALID') {
      this.sending = false;
      this.formula.markAllAsTouched();
      return;
    }

    this.VideosS.saveUpdate(this.formula.value,this.edit).subscribe((resp: any) => {
      if (resp.result == 'success') {
        this.toastr.success(resp.message);
        this.router.navigateByUrl('administrar/videos');
      } else if (resp.result == 'error') {
        let texterrors = '';
        for(let campo in this.formula.controls){

          if (resp.errors[campo]) {
            texterrors = texterrors+'<div>'+resp.errors[campo]+'</div>';
          }
       }
        this.toastr.warning('<div style="list-style: none;">'+texterrors+'</div>');
      } else {
        this.toastr.warning('error al hacer petición');
      }
      this.sending = false;
    });
  }

  createForm() {
    this.formula = this.formBuilder.group({
      id: [this.video.id],
      title: [this.video.title, [Validators.required, Validators.minLength(4)]],
      url: [this.video.url, [Validators.required, Validators.minLength(4),this.validatorsS.urlYoutube]],
    })
    this.dataLoading = true;
  }

  // valida cada campo
  validate(name: string) {
    let campo: any = this.formula.get(name);
    if (campo) {
      if (campo.touched && campo.status == 'INVALID') {
        let err = this.validationsM.transform(campo.errors);
        return { 'valid': true, 'error': err };
      }
    }
    return { 'valid': false, 'error': '' };
  }
}

