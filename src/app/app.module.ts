// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from "angular-datatables";
import {NgxPaginationModule} from 'ngx-pagination';
// pipes
import { DatePipe } from '@angular/common';
import { IdRandomPipe } from './pipes/id-random.pipe';
// components
import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/admin/articles/articles.component';
import { ArticleComponent } from './components/admin/articles/article/article.component';
import { HomeComponent } from './components/front/home/home.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { NavbarAdminComponent } from './components/admin/admin/navbar-admin/navbar-admin.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { CategoryComponent } from './components/admin/categories/category/category.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthInterceptorService } from './services/admin/auth-interceptor.service';
import { ContactUsComponent } from './components/front/contact-us/contact-us.component';
import { NavbarFrontComponent } from './components/front/layout-front/navbar-front/navbar-front.component';
import { AboutMeComponent } from './components/front/about-me/about-me.component';
import { ServicesComponent } from './components/front/services/services.component';
import { ServiceComponent } from './components/front/service/service.component';
import { FooterComponent } from './components/front/layout-front/footer/footer.component';
import { WellnessComponent } from './components/front/layout-front/wellness/wellness.component';
import { HelpYouComponent } from './components/front/home/help-you/help-you.component';
import { WhyComponent } from './components/front/home/why/why.component';
import { VideosComponent } from './components/admin/videos/videos.component';
import { VideoComponent } from './components/admin/video/video.component';

import { ValidationServerDirective } from './directives/validation-server.directive';
import { ValidationsMessagePipe } from './pipes/validations-message.pipe';
import { NotificationsMessagePipe } from './pipes/notifications-message.pipe';

import { FilterPipe } from './pipes/filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageWidthPipe } from './pipes/image-width.pipe';
import { BlogComponent } from './components/front/blog/blog.component';
import { SideBarComponent } from './components/front/blog/side-bar/side-bar.component';
import { ArticleFComponent } from './components/front/blog/article-f/article-f.component';
import { FilterBlogPipe } from './pipes/filter-blog.pipe';
import { SlugPipe } from './pipes/slug.pipe';
import { VideosFComponent } from './components/front/videos-f/videos-f.component';
import { LastArticlesComponent } from './components/front/last-articles/last-articles.component';
import { SwiperModule } from 'swiper/angular';
import { LastVideosComponent } from './components/front/home/last-videos/last-videos.component';

import { NguCarouselModule } from '@ngu/carousel';
import { SummaryArticlesComponent } from './components/front/home/summary-articles/summary-articles.component';
import { TestimonialsComponent } from './components/front/testimonials/testimonials.component';
import { ChangePassComponent } from './components/admin/change-pass/change-pass.component';
import { CommentsHomeComponent } from './components/front/home/comments-home/comments-home.component';

import { NgxJsonLdModule } from 'ngx-json-ld';



@NgModule({
  declarations: [

    ImageWidthPipe,
    AppComponent,
    ArticlesComponent,
    ArticleComponent,
    IdRandomPipe,
    HomeComponent,
    AdminComponent,
    NavbarAdminComponent,
    CategoriesComponent,
    CategoryComponent,
    LoginComponent,
    ContactUsComponent,
    NavbarFrontComponent,
    AboutMeComponent,
    ServicesComponent,
    ServiceComponent,
    FooterComponent,
    WellnessComponent,
    HelpYouComponent,
    WhyComponent,
    VideosComponent,
    VideoComponent,
    FilterPipe,
    FilterBlogPipe,
    ValidationServerDirective,
    BlogComponent,
    SideBarComponent,
    ArticleFComponent,
    SlugPipe,
    VideosFComponent,
    LastArticlesComponent,
    LastVideosComponent,
    SummaryArticlesComponent,
    TestimonialsComponent,
    ChangePassComponent,
    CommentsHomeComponent,


  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NguCarouselModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({maxOpened:2,closeButton:true,autoDismiss:true, enableHtml: true,timeOut: 4000,positionClass: 'toast-top-center'}),
    EditorModule,
    DataTablesModule,
    NgxPaginationModule,
    NgbModule,
    SwiperModule,
    NgxJsonLdModule

  ],
  providers: [
    FilterBlogPipe,
    DatePipe,
    ImageWidthPipe,
    IdRandomPipe,
    ValidationsMessagePipe,
    NotificationsMessagePipe,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
