import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/services/admin/categories.service';
import { Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  // styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  categories:any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataLoading = true;
  sending = false;

  @ViewChild('modalDelete') modalDelete: any;
  constructor(private CategoriesS:CategoriesService,
    private router:Router,
    private modalS: NgbModal,
    private toast:ToastrService
    ) { }

  ngOnInit(): void {
    this.getCategories();
    this.dtOptions = {
      order: [[0, "desc"]],
      lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todas"]],
      pageLength: 20,
      responsive: true,
      pagingType: 'full_numbers',
      dom: `<'row'<'col-md-6'l><'col-md-6 mb-2'f>r>
          t
          <'row'<'col-md-6'i><'col-md-6'p>>`,
      language: {
        "lengthMenu": `<div class="input-group mb-3"><div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="fas fa-eye"></i> </span>
            </div>
            _MENU_
          </div>`,
        "zeroRecords": "Datos no disponibles",
        "info": "Página <b>_PAGE_</b> de <b>_PAGES_</b>",
        "infoEmpty": "Datos no disponibles",
        "infoFiltered": "( Filtrando de _MAX_ entradas )",
        search: '<span class="hide-sm" style="margin-right:-4px;padding:5px 13px 8px 14px;border:solid 1px var(--grey);border-top-left-radius:4px;border-bottom-left-radius:4px;border-right:none" ><i class="fas fa-search"></i></span>',
        searchPlaceholder: " Buscar",
        "paginate": {
          "first": "",
          "last": "",
          "next": "Sig.",
          "previous": "Ant."
        },
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.CategoriesS.categories().subscribe((data: any) => {
          this.categories = data;
          this.dtTrigger.next();
          this.dataLoading = false;
          this.sending = false;
          callback({
            recordsTotal: data.total,
            recordsFiltered: data.to,
            data: this.categories
          });
        });
      },
      columns: [
        {
          title: 'Id',
          data: 'id',
          width: '40',
        },

        {
          width: '30',
          title: "Acc.",
          data: null,
          orderable: true,
          render: (data, type, full) => {
              return `<button class="mb-1 btnDelete btn btn-sm btn-danger" id=${data.id}> <i class="fas fa-trash-alt" ></i> </button> <button class="mb-1 btnEdit btn btn-sm btn-blue" id=${data.id}> <i class="fas fa-pencil-alt" ></i> </button> `
          }
        },
        {
          title: 'Nombre',
          data: 'name'
        },
      ],

      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('td .btnEdit', row).off('click');
        $('td .btnEdit', row).on('click', () => {
          this.router.navigateByUrl('/administrar/categoria/' + data.id + '/editar')
        });
        $('td .btnDelete', row).off('click');
        $('td .btnDelete', row).on('click', () => {
          self.openModalDelete( data.id );
        });
        return row;
      },

    };
  }

  openModalDelete(id: any) {
    this.modalS.open(this.modalDelete, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'yes') {
        this.deleteCategory(id);
      }
      return;
    }, (reason) => {
      return;
    });
  }

  deleteCategory(id:number){
    this.sending = true;
    var self = this;
    this.CategoriesS.delete(id).subscribe((resp:any) => {
      if (resp.result == 'success') {
        this.toast.success('Categoría eliminada con éxito.');
        self.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload();
        });
        this.sending = false;
      }else if(resp.result == 'error'){
        this.sending = false;
        this.toast.warning(resp.message);
      }
      this.sending = false;

    })
  }

  getCategories(){
    this.CategoriesS.categories().subscribe((data:any)=>{
      this.categories = data;
    });
  }


}
