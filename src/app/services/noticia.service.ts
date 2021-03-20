import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Noticia } from '../models/noticia'

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  direccion : string = 'http://localhost:port/api/v1/noticias';

  constructor(private http: HttpClient) {}

  getAll(){
    this.http.get(this.direccion);
  }

  getOne(id:number){
    this.http.get(this.direccion + id);
  }

  post(noticia:Noticia){
    this.http.post(this.direccion, noticia);
  }

  put(id:number, noticia:Noticia){
    this.http.post(this.direccion + id, noticia);
  }

  delete(id:number){
    this.http.delete(this.direccion + id);
  }

}
