import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ArticleComponent } from './components/admin/articles/article/article.component';
import { ArticlesComponent } from './components/admin/articles/articles.component';
import { CategoryComponent } from './components/admin/categories/category/category.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/front/home/home.component';
import { ContactUsComponent } from './components/front/contact-us/contact-us.component';
import { AboutMeComponent } from './components/front/about-me/about-me.component';
import { ServicesComponent } from './components/front/services/services.component';
import { ServiceComponent } from './components/front/service/service.component';
import { VideosComponent } from './components/admin/videos/videos.component';
import { VideoComponent } from './components/admin/video/video.component';
import { BlogComponent } from './components/front/blog/blog.component';
import { ArticleFComponent } from './components/front/blog/article-f/article-f.component';
import { VideosFComponent } from './components/front/videos-f/videos-f.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { TestimonialsComponent } from './components/front/testimonials/testimonials.component';
import { ChangePassComponent } from './components/admin/change-pass/change-pass.component';


const routes: Routes = [
  { path: 'administrar', pathMatch: 'full', redirectTo: 'administrar/inicio-de-sesion' },
  { path: 'admin', pathMatch: 'full', redirectTo: 'administrar/inicio-de-sesion' },

  {
    path: 'administrar',component:AdminComponent,
    children: [
      {path:'inicio-de-sesion',component:LoginComponent},
      {path:'articulos',component:ArticlesComponent },
      {path:'articulo/crear',component:ArticleComponent},
      {path:'articulo/:id/editar',component:ArticleComponent},
      {path:'cambiar-contraseña',component:ChangePassComponent},
      {path:'categorias-articulos',component:CategoriesComponent},
      {path:'categoria/crear',component:CategoryComponent},
      {path:'categoria/:id/editar',component:CategoryComponent},
      {path:'videos',component:VideosComponent},
      {path:'video/crear',component:VideoComponent},
      {path:'video/:id/editar',component:VideoComponent},

    ]
  },
  { path: '', pathMatch: 'full', component:HomeComponent },
  { path: 'sobre-mi', pathMatch: 'full', component:AboutMeComponent },
  { path: 'servicios', pathMatch: 'full', component:ServicesComponent },
  { path: 'blog', pathMatch: 'full', component:BlogComponent },
  { path: 'blog/categoria/:categoria', pathMatch: 'full', component:BlogComponent },
  { path: 'videos', pathMatch: 'full', component:VideosFComponent },
  { path: 'videos/video/:titulo', pathMatch: 'full', component:VideosFComponent },
  { path: 'testimonios', pathMatch: 'full', component:TestimonialsComponent },

  { path: 'blog/articulo/:categoria/:articulo', pathMatch: 'full', component:ArticleFComponent },
  { path: 'servicio/:slug', pathMatch: 'full', component:ServiceComponent },
  { path: 'contactame', pathMatch: 'full', component:ContactUsComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true, initialNavigation: 'enabled' })],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],

  exports: [RouterModule]
})



export class AppRoutingModule { }
