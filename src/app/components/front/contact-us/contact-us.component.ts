import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/front/mail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationsMessagePipe } from 'src/app/pipes/validations-message.pipe';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  form: FormGroup;
  dataLoading:boolean = true;
  sendLoading:boolean = true;
  constructor(private mailS:MailService,private formBuilder:FormBuilder,private toast:ToastrService,
    private validationsM:ValidationsMessagePipe,
    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      message: ['',[Validators.required, Validators.min(5)]],
    })

    this.dataLoading = false;
  }

  sendMessage(){
    this.dataLoading = true;
    if (this.form.status == 'INVALID') {
      this.form.markAllAsTouched();
      this.sendLoading = false;
    this.dataLoading = false;

      return;
    }
    this.mailS.send(this.form.value).subscribe( (data:any) => {

      if(data.result == 'success'){
        this.toast.success(data.message,'',{
          timeOut: 10000,
          positionClass: 'toast-center-center',
        });
        this.form.reset()
      }else{
        this.toast.warning('Hubo un error al enviar el mensaje, verifique su conexión a internet e intente nuevamente');
      }
    this.dataLoading = false;

    },err=>{
      console.log(err);

    });
  }

  validate(name: string) {
    let campo: any = this.form.get(name);
    if (campo) {
      if (campo.touched && campo.status == 'INVALID') {
        let err = this.validationsM.transform(campo.errors);
        return { 'valid': true, 'error': err };
      }
    }
    return { 'valid': false, 'error': '' };
  }

  goWhatsapp(){
    if(this.deviceService.isMobile() || this.deviceService.isTablet()){
      window.open('https://api.whatsapp.com/send?phone=593992747842&text=Estoy interesado/a en información sobre la terapia psicológica, mi nombre es: ');
    }else{
       window.open('https://api.whatsapp.com/send?phone=593992747842&text=Estoy interesado/a en información sobre la terapia psicológica, mi nombre es: ');
    }
  }

}
