import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/admin/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationsMessagePipe } from '../../../pipes/validations-message.pipe';
import { ArticlesService } from 'src/app/services/admin/articles.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})

export class ChangePassComponent implements OnInit {
  form: FormGroup;
  dataLoading = false;
  sending = false;

  data = {};
  constructor(private formBuilder: FormBuilder,private ArticlesS:ArticlesService,
    private toastr:ToastrService,private ValidationsM:ValidationsMessagePipe) { }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      password_now: ["",[Validators.required,Validators.minLength(8)]],
      password_new: ["",[Validators.required,Validators.minLength(8)]],
      password_new_repeat: ["",[Validators.required,Validators.minLength(8)]],
    });
    this.dataLoading = false;
  }

  resetForm(){
    this.form.reset();
  }
  sendPass() {


    this.sending = true;
    if (this.form.status == 'INVALID') {
      this.form.markAllAsTouched();
      this.sending = false;
      return;
    }

    this.ArticlesS.changePass(this.form.value).subscribe(
      (data:any) => {
        this.sending = false;
        if(data.result == 'success'){
          this.toastr.success('La contraseña ha sido actualizada con éxito.');
          this.form.reset();
        }else if(data.result == "error"){
          this.toastr.warning(data.message);
        }
      },
      err =>{
        this.sending = false;
        if(err?.error && err.error?.errors ){
          let texterrors = '';
          for (let campo in this.form.controls) {

            if (err.error.errors[campo]) {
              texterrors = texterrors + '<div>' + err.error.errors[campo] + '</div>';
            }
          }
          this.toastr.warning('<div style="list-style: none;">' + texterrors + '</div>');
        }else{
          this.toastr.warning('Hubo un problema al realizar la petición, verifique su conexión  a internet.');
        }
      },

      () => console.log()

    );
  }
    // validacion campos
    validate(name: string) {
      let campo: any = this.form.get(name);
      if (campo) {
        if (campo.touched && campo.status == 'INVALID') {
          let err = this.ValidationsM.transform(campo.errors);
          return { 'valid': true, 'error': err };
        }
      }
      return { 'valid': false, 'error': '' };
    }
}
