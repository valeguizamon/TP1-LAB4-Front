import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page404Component } from './pages/page404/page404.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { IndexComponent } from './pages/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AbmEmpresaComponent } from './crud/empresa/abm-empresa/abm-empresa.component';
import { AbmNoticiaComponent } from './crud/noticia/abm-noticia/abm-noticia.component';
import { ModalNoticiaComponent } from './crud/noticia/modal-noticia/modal-noticia.component';
import { ModalEmpresaComponent } from './crud/empresa/modal-empresa/modal-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    HomeComponent,
    SearchComponent,
    NoticiaComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    AbmEmpresaComponent,
    AbmNoticiaComponent,
    ModalNoticiaComponent,
    ModalEmpresaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
