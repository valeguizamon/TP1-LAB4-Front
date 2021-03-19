import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbmEmpresaComponent } from './crud/empresa/abm-empresa/abm-empresa.component';
import { AbmNoticiaComponent } from './crud/noticia/abm-noticia/abm-noticia.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { Page404Component } from './pages/page404/page404.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
  { path: "index", component: IndexComponent },
  { path: ":empresa/home", component: HomeComponent } ,
  { path: ":empresa/noticia/:id", component: NoticiaComponent },
  { path: ":empresa/search", component: SearchComponent },
  { path: "crud/empresa", component: AbmEmpresaComponent },
  { path: "crud/noticia", component: AbmNoticiaComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
