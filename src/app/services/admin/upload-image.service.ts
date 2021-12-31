import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfing } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  // private baseUrl = 'http://localhost/sapienciaServer/api/upload';
  ENDPOINT = AppConfing.ENDPOINT;
  private urlUpload = 'admin/upload-image-tinymce';

  constructor(private http: HttpClient) { }

  upload(file: File,ideditor:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('ideditor', ideditor);
    formData.append('type', 'principal');

    const req = new HttpRequest('POST', `${this.ENDPOINT}${this.urlUpload}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.ENDPOINT}${this.urlUpload}`);
  }


}
