import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticlesService } from 'src/app/services/admin/articles.service';
import { Article } from '../../../../models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IdRandomPipe } from 'src/app/pipes/id-random.pipe';
import { AuthService } from 'src/app/services/admin/auth.service';
import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NotificationsMessagePipe } from 'src/app/pipes/notifications-message.pipe';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ValidationsMessagePipe } from '../../../../pipes/validations-message.pipe';
import { DatePipe } from '@angular/common';
import { UploadImageService } from 'src/app/services/admin/upload-image.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  dateNow: any;
  formula: FormGroup;
  article: Article = new Article;
  categories:any[] = [];
  functionTest: string;
  edit: boolean = false;
  dataLoading: boolean = true;
  editorLoading: boolean = true;
  sendLoading: boolean = false;
  progressInfo:any = { show: false, percentage: 0 };
  fileInfo:any;
  imageP:string;
  hourNow:any;
  categorySelected = 'si';
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private articlesService: ArticlesService,
    private idRandomPipe: IdRandomPipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private Auth: AuthService,
    private notiM: NotificationsMessagePipe,
    private validatorsS: ValidatorsService,
    private validationsM: ValidationsMessagePipe,
    private dateP: DatePipe,
    private uploadS:UploadImageService,
  ) {

  }

  ngOnInit(): void {
    this.createOrUpdate();
  }

  //  UPLOAD IMAGE PRINCIPAL
  selectFile(event:any) {
    let file = event.target.files[0];
    console.log(file);
    if(!file?.type || !file.type.match('image.*') ){
     this.toastr.warning('Formato de imagen invalido.')
    }
    this.upload(file);
  }

  upload(file:any) {

    this.progressInfo = { show: true, percentage: 0 };
    this.uploadS.upload(file,this.article.ideditor).subscribe(
      event => {
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {

          let total = 0;
          if(event?.total){
            total = event.total;
          }
          this.progressInfo.percentage = Math.round(100 * event.loaded / total);

        } else if (event instanceof HttpResponse) {
          if(event.body.result == 'error'){
            if(event.body?.message){
              this.toastr.warning(event.body.message);
            }else{
             let errorsText = '';
            for(let error in event.body.errors ){
              errorsText = errorsText+'<li>'+event.body.errors[error]+'</li>';
            }
            this.toastr.warning('<ul class="list-none">'+errorsText+'</ul>');
            }

            this.progressInfo.show = false;

          }else if(event.body.result == 'success'){
            this.progressInfo.show = false;
            this.imageP = event.body.location;
          }
          // this.fileInfo = this.uploadS.getFiles();
        }
      },
      err => {
        this.progressInfo.show = false;
        this.progressInfo.percentage = 0;
        this.toastr.warning('Error al subir archivo:' + file.name);
      });
  }
  // --------
  // FORM
  createForm() {
    this.formula = this.formBuilder.group({
      id: [this.article.id],
      ideditor: [this.article.ideditor, Validators.required],
      title: [this.article.title, [Validators.required]],
      category_id: [this.article.category_id, [Validators.required]],
      status: [this.article.status, [Validators.required]],
      description: [this.article.description, Validators.required],
      // date: [this.article.date, Validators.required],
      // hour: [this.article.hour, Validators.required],

      author: [this.article.author, Validators.required],

    })
    this.dataLoading = false;
    setInterval(() => {
      this.editorLoading = false;
    }, 700);
  }

  createOrUpdate() {
    this.activatedRoute.params.subscribe(params => {
      if (params?.id) {
        this.edit = true;

        this.getArticle(params.id);
      } else {
        this.categorySelected = 'no';
        localStorage.removeItem('filterStatus');
        localStorage.removeItem('filterCategory');
        localStorage.removeItem('lastPageArticles');
        this.createArticle();
      }
    });
    return;
  }

  getArticle(slug: string) {
    this.articlesService.article(slug).subscribe((data: any) => {
      this.categories = data.categories;
      this.article = data.article;
      this.imageP = data.imageP;

      this.createForm();
    });
  }

  createArticle() {
    this.articlesService.createArticle().subscribe((data:any) => {
      let dateNow = this.dateP.transform(new Date, 'yyyy-MM-dd', 'es-ES');
      let hourNow = this.dateP.transform(new Date, 'HH:mm:ss', 'es-ES');
      this.categories = data.categories;
      this.article.status = 'publicado';
      this.article.ideditor = this.idRandomPipe.transform();
      this.article.date = dateNow;
      this.article.hour = hourNow;
      this.article.author = 'Belizabeth Montilla';
      this.createForm();
    });
  }

  config() {
    return {
      max_chars: 100,
      language: 'es',
      images_upload_handler: this.image_upload_handler,
      images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
      height: 700,
      image_dimensions: false,
      // media_dimensions: false,
      // media_alt_source: false,
      // media_poster: false,
      content_style: 'img {width: 100%;max-height:100%} .iframe { height: 0; position: relative; padding-bottom: 56.25%;} .iframe iframe {left: 0;height: 100%; position: absolute;top: 0; width: 100%;}',

      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime  table paste code help wordcount',

      ],
      menubar: false,
      toolbar: 'undo redo | formatselect |  image bold italic  | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    }
  }

  // save
  saveUpdate() {
    this.sendLoading = true;
    if (this.formula.status == 'INVALID') {
      this.toastr.warning('Verifique que los campos contienen el formato correcto y vuelva a intentarlo.');
      this.formula.markAllAsTouched();
      this.sendLoading = false;
      return;
    }
    this.article = this.formula.value;
    this.articlesService.sendSaveUpdate(this.article, this.edit).subscribe((resp: any) => {

      this.sendLoading = false;

      if (resp.result == 'success') {
        this.toastr.success('Artículo guardado con éxito.');
        this.router.navigateByUrl('/administrar/articulos');
      } else if (resp.result == 'error') {

        let texterrors = '';
        for (let campo in this.formula.controls) {
          if (resp.errors[campo]) {
            texterrors = texterrors + '<div>' + resp.errors[campo] + '</div>';
          }
        }
        this.toastr.warning('<div style="list-style: none;">' + texterrors + '</div>');
      } else {
        this.toastr.warning('Error al hacer petición');
      }
    });

  }

  // validacion campos
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

  // TINYMCE
  media_url_resolver(data: any, resolve: any/*, reject*/) {
    var embedHtml = '<p class="iframe"><iframe width="100%" src="' + data.url + '"></iframe></p>';
    resolve({ html: embedHtml });
  }

  urlimageEditor() {
    let headers = { headers: new HttpHeaders().set('authorization', `Bearer ${this.Auth.getAuth().token}`) };
    let headers2 = JSON.stringify(headers);
    return 'http://localhost/blogApi/api/admin/upload-image-tinymce?ideditor=' + this.article.ideditor;
  }

  image_upload_handler = (blobInfo: any, success: any, failure: any, progress: any) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', this.urlimageEditor());
    let token: any = this.Auth.getAuth().token;
    xhr.setRequestHeader("Authorization", "bearer " + token);
    xhr.onload = function () {
      if (xhr.status !== 200) {
        // failure('HTTP Error: ' + xhr.status);
        console.log(xhr);
        failure('La imagen no se pudo cargar.');
        return;
      }

      let json = JSON.parse(xhr.responseText);
      if(json.result == 'error'){
        if(json?.message){
          failure(json.message);
        }else{
          let errorsText = '';
          for(let error in json.errors ){
            errorsText = errorsText+json.errors[error]+'<br>';
          }
          failure(errorsText);
        }

      }

      if (!json || typeof json.location !== 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }
      success(json.location);
    };
    let formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
  }

}


