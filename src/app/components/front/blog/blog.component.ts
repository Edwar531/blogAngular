import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ImageWidthPipe } from 'src/app/pipes/image-width.pipe';
import { BlogService } from 'src/app/services/front/blog.service';
import { Location } from '@angular/common';
import { getJSDocParameterTags } from 'typescript';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  articles: any[] = [];
  categories: any[] = [];
  dataLoading: boolean = true;
  listStyle = true;
  filterTitle: string;
  filterCategory: string = '';
  filterCategoryName: any;
  formSearch: FormGroup;
  orderBy: string = 'recientes';
  config: any;
  innerWidth: number;
  lastScrollPosition: number;
  categorySidebarShow: boolean = false;

  constructor(
    private blogS: BlogService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.innerWidth = window.innerWidth;
    this.verifiedListStyle();
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
    };
    this.getArticles();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = event.target.innerWidth;
  }
  @ViewChild('closeModal') closeModal: ElementRef
  // @HostListener('window:scroll', ['$event'])

  // onWindowScroll(e:any) {
  //   this.lastScrollPosition = window.pageYOffset;
  // }

  @HostListener('window:popstate', ['$event'])
  onPopState($event: any) {
    console.log('Back button pressed');
  }

  goLastPosition() {

    let lastScrollPosition: any = localStorage.getItem('lastScrollPosition');
    let goPositionBlog: any = localStorage.getItem('goPositionBlog');
    // if(goPositionBlog?.length){
    //   if(lastScrollPosition?.length){
    //     setTimeout(() => {
    //       window.scrollTo({
    //         top: parseInt(lastScrollPosition),
    //         left: 0,
    //         behavior: 'smooth'
    //       });
    //     }, 1);

    //     localStorage.removeItem('goPositionBlog');
    //   }
    // }

  }

  numberPage(length: any, itemsPerPage: any) {
    let division = (length / itemsPerPage).toFixed(0);
    if (parseInt(division) == 0) {
      return 1;
    } else {
      return division;
    }
  }

  goArticle(article: any) {

    let last: any = window.pageYOffset;
    localStorage.setItem('lastScrollPosition', last);
    this.router.navigateByUrl('/blog/articulo/' + article.categorySlug + '/' + article.slug);
  }

  verifiedListStyle() {
    let value = localStorage.getItem('listStyle2');
   if(value != null && value?.length){
    if (value == 'yes') {
      this.listStyle = true;
    } else {
      this.listStyle = false;
    }
   }
  }

  changeList() {
    this.listStyle = !this.listStyle;
    if (this.listStyle == true) {
      localStorage.setItem('listStyle2', 'yes');
    } else {
      localStorage.setItem('listStyle2', 'no');
    }
  }

  getArticles() {
    this.blogS.articles().subscribe((data: any) => {
      this.articles = data.articles;
      this.categories = data.categories;
      this.getParams();
    });
  }

  orderByData(order: string): void {
    this.orderBy = order;
    this.config.currentPage = 1;
    this.replaceState();
  }

  search() {

    this.orderBy = 'recientes';
    this.filterTitle = this.formSearch.value.title;
    console.log(this.formSearch.value);
    this.filterCategory = this.formSearch.value.category;
    let cate = this.categories.filter(it => it.slug.toLowerCase() == this.formSearch.value.category);
    if (cate?.length) {
      this.filterCategoryName = cate[0].name;
    } else {
      this.filterCategoryName = '';
    }
    this.config.currentPage = 1;
    this.replaceState();
    window.scrollTo(0, 0)
    this.closeModal.nativeElement.click()
  }

  replaceState() {
    let url = '/blog';
    let category = '';
    let title = '';
    let page = '';
    let orderBy = '';
    if (this.filterCategory?.length) {
      category = "/categoria/" + this.filterCategory;
      localStorage.setItem('filterCategoryA', this.filterCategory);
    } else {
      localStorage.removeItem('filterCategoryA');
    }
    if (this.filterTitle?.length) {
      title = "&busqueda=" + this.filterTitle;
      localStorage.setItem('filterTitleA', this.filterTitle);

    } else {
      localStorage.removeItem('filterTitleA');
    }

    if (this.config.currentPage.length != 0) {
      if (this.config.currentPage == 1) {
        page = "";
        localStorage.removeItem('currentPageA');
      } else {
        page = "&pagina=" + this.config.currentPage;
        localStorage.setItem('currentPageA', this.config.currentPage);
      }
    }

    if (this.orderBy?.length) {
      if (this.orderBy == 'recientes') {
        orderBy = '';
      } else {
        orderBy = '&ordenar=' + this.orderBy;
        localStorage.setItem('orderByA', this.orderBy);
      }
    } else {
      this.orderBy = '';
      localStorage.removeItem('orderByA');
    }
    url = url + category + '?' + title + orderBy + page;
    url = url.replace('?&', '?');

    let url2 = url.split('?');
    if (url2[1]?.length == 0) {
      url = url.replace('?', '');
    }
    this.location.replaceState(url);
  }

  createForm() {
    this.formSearch = this.formBuilder.group({
      title: [this.filterTitle],
      category: [this.filterCategory],
    })
    this.dataLoading = false;
    this.goLastPosition();
  }

  changeCategory(slug: string) {
    this.closeModal.nativeElement.click()
    this.orderBy = 'recientes';
    this.filterTitle = '';
    this.filterCategory = slug;
    let cate = this.categories.filter(it => it.slug.toLowerCase() == slug);
    if (cate?.length) {
      this.filterCategoryName = cate[0].name;
    } else {
      this.filterTitle = '';
      this.filterCategory = '';
      this.filterCategoryName = '';
    }
    this.createForm();
    this.config.currentPage = 1;
    window.scrollTo(0, 0)
    this.replaceState();
  }

  getParams() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.categoria) {
        this.filterCategory = params.categoria;
      }

      let cate = this.categories.filter(it => it.slug.toLowerCase() == this.filterCategory);
      if (cate?.length) {
        this.filterCategoryName = cate[0].name;
        localStorage.setItem('filterCategoryA', params.categoria);
      } else {
        localStorage.removeItem('filterCategoryA');
      }
    })

    this.activatedRoute.queryParams.subscribe(params => {
      let busqueda = params['busqueda'];
      if (busqueda?.length) {
        this.filterTitle = busqueda;
        localStorage.setItem('filterTitleA', busqueda);
      } else {
        localStorage.removeItem('filterTitleA');
      }
      let pagina = params['pagina'];
      if (pagina?.length) {
        localStorage.setItem('currentPageA', pagina);
        this.config.currentPage = pagina;
      } else {
        localStorage.removeItem('currentPageA');
      }

      let orderBy = params['ordenar'];
      if (orderBy?.length) {
        localStorage.setItem('orderbyA', orderBy);
        this.orderBy = orderBy;
      } else {
        localStorage.removeItem('orderbyA');
      }

      this.createForm();

    });
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    window.scrollTo(0, 0);
    this.replaceState();
  }
}
