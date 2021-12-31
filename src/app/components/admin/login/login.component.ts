import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/admin/auth.service';
import { User } from '../../../models/user.model';
import { ValidationsMessagePipe } from '../../../pipes/validations-message.pipe';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  sendLoading = false;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private ValidationsM:ValidationsMessagePipe
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['info@belizabethmontilla.com', [Validators.required, Validators.email]],
      password: [, Validators.required],
    });
  }

  sendLogin() {
    this.sendLoading = true;
    if (this.form.status == 'INVALID') {
      this.form.markAllAsTouched();
      this.sendLoading = false;
      return;
    }

    this.user = this.form.value;
    this.auth.login(this.user).subscribe((resp: any) => {
    this.sendLoading = false;


      localStorage.removeItem('filterStatus');
      localStorage.removeItem('filterCategory');
      localStorage.removeItem('lastPageArticles');

      this.auth.saveAuth(resp);
      this.sendLoading = false;
    },err=>{
    this.sendLoading = false;

      if(err?.error && err.error?.errors ){
        let texterrors = '';
        for (let campo in this.form.controls) {

          if (err.error.errors[campo]) {
            texterrors = texterrors + '<div>' + err.error.errors[campo] + '</div>';
          }
        }
        this.toastr.warning('<div style="list-style: none;">' + texterrors + '</div>');
      }
    });


  }

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
