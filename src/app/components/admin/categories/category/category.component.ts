import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/admin/categories.service';
import { Category } from '../../../../models/category.model';
import { ValidationsMessagePipe } from '../../../../pipes/validations-message.pipe';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',

})

export class CategoryComponent implements OnInit {
  categories:any[] = [];
  dtOptions: DataTables.Settings = {};
  form: FormGroup;
  category:Category = new Category;
  dataLoading:boolean = true;
  sending = false;
  edit:boolean;
  constructor( private formBuilder: FormBuilder,
    private CategoriesS:CategoriesService,
    private toastr:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private ValidationsM:ValidationsMessagePipe
    ) { }

  ngOnInit(): void {
    this.createOrUpdate();
  }

  createOrUpdate(){
    this.activatedRoute.params.subscribe((data:any) => {
      if(data?.id){
        this.edit = true;
        this.editCategory(data.id);
      }else{
        this.createCategory();
        this.edit = false;
      }
      console.log(data);
    })
  }

  editCategory(id:any){
    this.CategoriesS.edit(id).subscribe( (data:any) =>{
      if(!data?.name){
        this.router.navigateByUrl('/administrar/categorias-articulos')
      }
      this.category = data;
      this.dataLoading = false;
      this.createForm();
    })
  }

  createCategory(){
    this.CategoriesS.create().subscribe( (data:any) =>{
      this.createForm();
      this.dataLoading = false;
    })

  }
  createForm() {
    this.form = this.formBuilder.group({
      id: [this.category.id],
      name: [this.category.name, Validators.required],
    });
    this.dataLoading = false;
  }

  saveUpdate() {
    this.sending = true;
    if (this.form.status == 'INVALID') {
      this.form.markAllAsTouched();
      this.sending = false;
      return;
    }

    this.CategoriesS.saveOrUpdate(this.form.value, this.edit).subscribe((resp: any) => {

      this.dataLoading = false;
      if (resp.result == 'success') {
        this.toastr.success('Categoría agregada con éxito.');
        this.router.navigateByUrl('/administrar/categorias-articulos');
      } else if (resp.result == 'error') {

        let texterrors = '';
        for (let campo in this.form.controls) {
          if (resp.errors[campo]) {
            texterrors = texterrors + '<div>' + resp.errors[campo] + '</div>';
          }
        }
        this.toastr.warning('<div style="list-style: none;">' + texterrors + '</div>');
      } else {
        this.toastr.warning('Error al hacer petición');
      }
      this.sending = false;
    });
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

  goBack(){

    this.router.navigateByUrl('/administrar/categorias-articulos')
  }
}
