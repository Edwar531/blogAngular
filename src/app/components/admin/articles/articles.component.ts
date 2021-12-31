import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from 'src/app/services/admin/articles.service';
import { Subject } from 'rxjs';
import { AuthService } from '../../../services/admin/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImageWidthPipe } from 'src/app/pipes/image-width.pipe';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  formula: FormGroup;

  auth: any;
  articles: any[];
  categories: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataLoading: boolean = true;


  filterCategory: any;
  filterStatus:any;
  lastPageArticles: number;
  @ViewChild('modalDisable') modalDisable: any;
  @ViewChild('modalEnable') modalEnable: any;
  @ViewChild('modalDelete') modalDelete: any;



  constructor(
    private articlesService: ArticlesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private imageW: ImageWidthPipe,

    private router: Router,
    private modalS: NgbModal,
    private ToastrS: ToastrService,

  ) { }

  ngOnInit(): void {

    this.auth = this.authService.getAuth();
    // displayStart: 1,
    this.dtOptions = {
      order: [[0, "desc"]],
      lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todas"]],
      pageLength: 10,
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
        this.articlesService.articles().subscribe((data: any) => {
          this.articles = data.articles;
          this.categories = data.categories;
          this.dtTrigger.next();
          this.dataLoading = false;
          this.apllyFilters(true);
          callback({
            recordsTotal: data.total,
            recordsFiltered: data.to,
            data: this.articles
          });
        });
      },
      columns: [
            {
          title: 'Id',
          data: 'id',
          width: '20',
        },
        {

          width: '60px',
          title: "Acc.",
          data: null,
          orderable: true,
          render: (data, type, full) => {


            if (data.status == 'eliminado') {
              return `<button class=" mb-1 btnDelete btn btn-sm btn-danger" id=${data.id}> <i class="fas fa-times" ></i> </button> <button class=" mb-1 btnEnable btn btn-sm btn-blue" id=${data.id}> <i class="fas fa-check" ></i> `
            } else if(data.status == 'no-publicado'){
              return `<button class=" mb-1 btnDisable btn btn-sm btn-warning" id=${data.id}> <i class="fas fa-ban" ></i> </button> <button class=" mb-1 btnEdit btn btn-sm btn-blue" id=${data.id}> <i class="fas fa-pencil-alt" ></i> </button> `
            } else {
              return `<button class=" mb-1 btnDisable btn btn-sm btn-warning" id=${data.id}> <i class="fas fa-ban" ></i> </button> <button class=" mb-1 btnEdit btn btn-sm btn-blue" id=${data.id}> <i class="fas fa-pencil-alt" ></i> </button> <button class=" mb-1 btnGo btn btn-sm btn-white" id=${data.id}> <i style="font-size:95%" class="fas fa-eye" ></i> </button>`
            }
          }
        },

        {
          title: "Imagen",
          data: null,
          orderable: false,
          width: '60',
          render: (data, type, full) => {
            return `<img class="img-xs" src="${this.imageW.transform(data.image_p,'xs')}">`;
          }
        },


        {
          title: 'Título',
          data: 'title'
        },
        {
          title: "Estatus",
          data: null,
          orderable: true,
          render: (data, type, full) => {
            if (data.status == 'publicado') {
              return `<span class="text-success">Publicado</span>`;
            } else if (data.status == 'no-publicado') {
              return `<span class="text-danger">No publicado</span>`;
            } else {
              return `<span class="text-secondary">Eliminado</span>`;
            }
          }
        },
        {
          title: 'Categoría',
          data: 'category'
        },

      ],

      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('td .btnGo', row).off('click');
        $('td .btnGo', row).on('click', () => {
          // window.open('/#/blog/articulo/'+data.categorySlug+'/'+data.slug);
          window.open('#/blog/articulo/'+data.categorySlug+'/'+data.slug);

        });

        $('td .btnEdit', row).off('click');
        $('td .btnEdit', row).on('click', () => {
          this.router.navigateByUrl('/administrar/articulo/' + data.id + '/editar')
        });

        $('td .btnDisable', row).off('click');
        $('td .btnDisable', row).on('click', () => {
          self.openModalDisable(this.modalDisable, data.id);
        });

        $('td .btnEnable', row).off('click');
        $('td .btnEnable', row).on('click', () => {
          this.openModalEnable(this.modalEnable, data.id)
        });

        $('td .btnDelete', row).off('click');
        $('td .btnDelete', row).on('click', () => {
          self.openModalDelete(this.modalDelete, data.id);
        });

        return row;
      },

    };
  }

  clearFilters(){


    localStorage.removeItem('filterStatus');
    localStorage.removeItem('filterCategory');
    localStorage.removeItem('lastPageArticles');
    this.filterStatus = '';
    this.filterCategory = '';
    this.lastPageArticles = 1;


    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search('');
      dtInstance.columns().search('').draw();

    });
  }

  filterCategoryChange(event: any) {

    let cate = event.target.value;
    if(cate == 'Todas'){
      cate = '';
    }

    localStorage.setItem('filterCategory',cate);
    this.filterCategory = cate;
    this.apllyFilters(false);
  }

  filterStatusChange(status: any) {

    localStorage.setItem('filterStatus', status);
    this.filterStatus = status;
    this.filterCategory = '';
    this.apllyFilters(false);

  }

  apllyFilters(recentLoad:any) {

    let draw:any;
    if(recentLoad == true){
      let status = localStorage.getItem('filterStatus');
      let cate = localStorage.getItem('filterCategory');
      let page = localStorage.getItem('lastPageArticles');

      if(status != null){
        this.filterStatus = status;
      }else{
        this.filterStatus = '';
      }
      if(cate != null){
        this.filterCategory = cate;
      }else{
        this.filterCategory = '';
      }
      if(page != null){
        this.lastPageArticles = parseInt(page);
      }else{
        this.lastPageArticles = 1;
      }

      draw = false;
    }else{
      draw = '';
    }

    if(this.filterStatus.length == 0){
      var filter1:any = 'publicado';
      var filter2:any = "no publicado";
    }else{
      var filter1:any = this.filterStatus;
      var filter2:any = this.filterStatus;
    }

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {

      if(this.filterCategory?.length){
        dtInstance.search('').column(4).search("^"+filter1+"$|^"+filter2+"$", true, false, true).column(5).search("^"+this.filterCategory+"$", true, false, true).page(this.lastPageArticles - 1).draw(draw);
      }else{
        dtInstance.search('').column(4).search("^"+filter1+"$|^"+filter2+"$", true, false, true).column(5).search("^"+this.filterCategory+"", true, false, true).page(this.lastPageArticles - 1).draw(draw);
      }

    });
  }

  openModalDisable(content: any, id: any) {
    this.modalS.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'yes') {
        this.disableArticle(id);
      }
      return;
    }, (reason) => {
      return;
    });
  }

  disableArticle(id: any) {
    this.articlesService.disable(id).subscribe((data: any) => {
      if (data.result == 'success') {
        this.ToastrS.success('Artículo movido a la lista de eliminados.');
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload();
        });
      } else {
        this.ToastrS.warning('Error al realizar la petición.');
      }
    });
  }
  // habilitar
  openModalEnable(content: any, id: any) {
    this.modalS.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.enableArticle(id, { 'status': result });
      return;
    }, (reason) => {
      return;
    });
  }

  enableArticle(id: any, status: any) {
    this.articlesService.enable(id, status).subscribe((data: any) => {
      if (data.result == 'success') {
        this.ToastrS.success('El artículo ha sido habilitado.');
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload();
        });
      } else {
        this.ToastrS.warning('Error al realizar la petición.');
      }
    });
  }
  // Eliminar
  openModalDelete(content: any, id: any) {
    this.modalS.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'yes') {
        this.deleteArticle(id);
      }

      return;
    }, (reason) => {
      return;
    });
  }

  deleteArticle(id: any) {
    this.articlesService.delete(id).subscribe((data: any) => {
      if (data.result == 'success') {
        this.ToastrS.success('El artículo ha sido eliminado.');
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload();
        });
      } else {
        this.ToastrS.warning('Error al realizar la petición.');
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();
  }

  lastPage() {
    let last = localStorage.getItem('lastPageArticles');
    if (last?.length) {
      return parseInt(last);
    }
    return 1;
  }




  @HostListener('document:click', ['$event.target'])
  onClick(element: HTMLElement) {
    if (element.classList.contains('paginate_button')) {
      let lastPage: any = localStorage.getItem('lastPageArticles');

      if (!lastPage?.length) {
        lastPage = 1;
      } else {
        lastPage = parseInt(lastPage);
      }

      let pageNow;
      if (element.innerHTML == 'Sig.') {
        pageNow = lastPage + 1;
      } else if (element.innerHTML == 'Ant.') {
        pageNow = lastPage - 1;
      } else {
        pageNow = element.innerHTML;
      }
      this.lastPageArticles = pageNow;
      localStorage.setItem('lastPageArticles', pageNow);

    }
  }

}
